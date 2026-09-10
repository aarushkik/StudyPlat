import test from 'node:test';
import assert from 'node:assert/strict';
import { createChunkedStorage, splitStorageValue } from '../src/lib/chunkedStorage';

test('UTF-8 chunks stay within SecureStore byte limits and round-trip emoji', async () => {
  const value = '🌊日é'.repeat(2000);
  const pieces = splitStorageValue(value);
  assert.equal(pieces.join(''), value);
  assert.ok(pieces.every(p => Buffer.byteLength(p) <= 1800));
  const data = new Map<string,string>();
  const storage = createChunkedStorage({ getItem: async k => data.get(k) ?? null, setItem: async (k,v) => { data.set(k,v); }, removeItem: async k => { data.delete(k); } });
  await storage.setItem('test', value); assert.equal(await storage.getItem('test'), value);
  await storage.removeItem('test'); assert.equal(data.size, 0);
});
test('failed writes retain old data and concurrent operations serialize', async () => {
  const data = new Map<string,string>(); let writes = 0; let failAt = Infinity;
  const storage = createChunkedStorage({ getItem: async k => data.get(k) ?? null, setItem: async (k,v) => { if (++writes === failAt) throw Error('disk full'); data.set(k,v); }, removeItem: async k => { data.delete(k); } });
  await storage.setItem('test','old'); failAt = writes + 2;
  await assert.rejects(storage.setItem('test','x'.repeat(6000)), /disk full/);
  assert.equal(await storage.getItem('test'),'old'); failAt = Infinity;
  await Promise.all([storage.setItem('test','first'), storage.setItem('test','last')]);
  assert.equal(await storage.getItem('test'),'last');
});
test('legacy stored sessions migrate without losing data; incomplete chunks fail closed', async () => {
  const data = new Map([['session','__chunks__:2'], ['session.0','legacy'], ['session.1','token']]);
  const storage = createChunkedStorage({ getItem: async k => data.get(k) ?? null, setItem: async (k,v) => { data.set(k,v); }, removeItem: async k => { data.delete(k); } });
  assert.equal(await storage.getItem('session'), 'legacytoken');
  await storage.setItem('session','new'); assert.equal(data.has('session.0'), false);
  data.set('session','__chunks__:2'); await assert.rejects(storage.getItem('session'), /incomplete/);
});
