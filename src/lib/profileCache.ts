import type { Profile } from './profile';
import { deviceStorage } from './storage';

export const GUEST_PROFILE_ID = 'guest';
export const GUEST_MODE_KEY = 'studyplat.guest-mode';
export interface CachedProfile { version: 1; profile: Profile; baseline: Profile | null; dirty: boolean; guestId?: string; importedGuestIds?: string[]; pendingMutation?: { id: string; profile: Profile; baseline: Profile } }
const keyFor = (id: string) => `studyplat.profile.${id}`;

export async function readProfileCache(id: string): Promise<CachedProfile | null> {
  const raw = await deviceStorage.getItem(keyFor(id));
  if (!raw) return null;
  const value = JSON.parse(raw) as CachedProfile;
  if (value.version !== 1 || !value.profile || typeof value.profile.xp !== 'number') {
    throw new Error('Your saved progress could not be read.');
  }
  return value;
}
export async function writeProfileCache(id: string, value: CachedProfile): Promise<void> {
  await deviceStorage.setItem(keyFor(id), JSON.stringify(value));
}
export async function clearProfileCache(id: string): Promise<void> {
  await deviceStorage.removeItem(keyFor(id));
}

// Auth waits for pending writes before changing identity. Deletion stops the
// writer before erasing its cache, so an old timer cannot recreate erased data.
let active: { id: string; flush: () => Promise<void>; stop: () => void; drain: () => Promise<void> } | null = null;
export async function flushProfile(): Promise<void> { await active?.flush(); }
export function registerProfileWriter(writer: NonNullable<typeof active>): () => void {
  active = writer;
  return () => { if (active === writer) active = null; };
}
export async function prepareProfileExit(erase: boolean): Promise<void> {
  const writer = active;
  if (!writer) return;
  if (!erase) {
    await writer.flush();
    return; // Identity cleanup stops it after sign-out succeeds.
  }
  writer.stop();
  if (erase) {
    await writer.drain().catch(() => undefined);
    await clearProfileCache(writer.id);
  }
}
