/** Drivers must atomically replace one string key. */
export interface StringStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const PREFIX = '__studyplat_v2__:';
const LEGACY_PREFIX = '__chunks__:';
const MAX_CHUNKS = 4096;
let generation = 0;

/** SecureStore limits bytes, not UTF-16 code units. Keep surrogate pairs intact. */
export function splitStorageValue(value: string, byteLimit = 1800): string[] {
  const parts: string[] = [];
  let part = '';
  let bytes = 0;
  for (const char of value) {
    const point = char.codePointAt(0)!;
    const size = point <= 0x7f ? 1 : point <= 0x7ff ? 2 : point <= 0xffff ? 3 : 4;
    if (bytes + size > byteLimit && part) {
      parts.push(part);
      part = '';
      bytes = 0;
    }
    part += char;
    bytes += size;
  }
  parts.push(part);
  return parts;
}

function chunkKeys(key: string, header: string | null): string[] {
  if (!header) return [];
  if (header.startsWith(LEGACY_PREFIX)) {
    const count = Number(header.slice(LEGACY_PREFIX.length));
    if (!Number.isInteger(count) || count < 1 || count > MAX_CHUNKS) throw new Error('Invalid stored data.');
    return Array.from({ length: count }, (_, i) => `${key}.${i}`);
  }
  if (!header.startsWith(PREFIX)) return [];
  const [version, countText] = header.slice(PREFIX.length).split(':');
  const count = Number(countText);
  if (!/^[a-z0-9-]+$/.test(version) || !Number.isInteger(count) || count < 1 || count > MAX_CHUNKS) {
    throw new Error('Invalid stored data.');
  }
  return Array.from({ length: count }, (_, i) => `${key}.${version}.${i}`);
}

export function createChunkedStorage(driver: StringStorage): StringStorage {
  const queues = new Map<string, Promise<unknown>>();
  const serialized = <T>(key: string, work: () => Promise<T>): Promise<T> => {
    const result = (queues.get(key) ?? Promise.resolve()).catch(() => undefined).then(work);
    queues.set(key, result);
    void result.finally(() => { if (queues.get(key) === result) queues.delete(key); }).catch(() => undefined);
    return result;
  };
  const discard = async (keys: string[]) => {
    await Promise.all(keys.map((key) => driver.removeItem(key).catch(() => undefined)));
  };
  return {
    getItem: (key) => serialized(key, async () => {
      const header = await driver.getItem(key);
      const keys = chunkKeys(key, header);
      if (!keys.length) return header;
      const parts = await Promise.all(keys.map((partKey) => driver.getItem(partKey)));
      if (parts.some((part) => part === null)) throw new Error('Stored data is incomplete.');
      return parts.join('');
    }),
    setItem: (key, value) => serialized(key, async () => {
      const previous = chunkKeys(key, await driver.getItem(key));
      const parts = splitStorageValue(value);
      if (parts.length > MAX_CHUNKS) throw new Error('Stored data is too large.');
      const version = `${Date.now().toString(36)}-${(++generation).toString(36)}`;
      const keys = parts.map((_, i) => `${key}.${version}.${i}`);
      try {
        for (let i = 0; i < parts.length; i += 1) await driver.setItem(keys[i], parts[i]);
        // Commit only after all chunks exist. Failed refreshes preserve the
        // previous session, unlike deleting the old chunks before writing.
        await driver.setItem(key, `${PREFIX}${version}:${parts.length}`);
      } catch (error) {
        await discard(keys);
        throw error;
      }
      await discard(previous);
    }),
    removeItem: (key) => serialized(key, async () => {
      const keys = chunkKeys(key, await driver.getItem(key));
      await driver.removeItem(key);
      await discard(keys);
    }),
  };
}
