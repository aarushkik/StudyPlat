import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * The Supabase client.
 *
 * Two things here are specific to React Native and easy to get wrong.
 *
 * **Session storage.** Supabase defaults to `localStorage`, which does not
 * exist on native, so a session would be lost the moment the app closed. The
 * adapter below keeps it in the device keychain instead. SecureStore refuses
 * values over 2048 bytes, and a Supabase session carrying a large JWT can pass
 * that, so long values are split across numbered chunks rather than silently
 * failing to save — a user who signs in and is signed out again on next launch
 * is a bug that only shows up after you ship.
 *
 * **`detectSessionInUrl` is off.** That flag is for the browser flow where the
 * provider redirects back with tokens in the URL fragment. On native the
 * redirect comes back through the app's deep link scheme and is handled
 * explicitly in `AuthContext`; leaving it on makes the client race with that.
 */

const CHUNK_LIMIT = 1800;

/** Reads/writes a value across as many keychain entries as it needs. */
const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    const head = await SecureStore.getItemAsync(key);
    if (head === null) return null;
    if (!head.startsWith(CHUNK_PREFIX)) return head;

    const count = Number(head.slice(CHUNK_PREFIX.length));
    const parts: string[] = [];
    for (let i = 0; i < count; i += 1) {
      const part = await SecureStore.getItemAsync(`${key}.${i}`);
      // A missing chunk means a partial write; treat the whole value as absent
      // rather than handing back a truncated session that fails oddly later.
      if (part === null) return null;
      parts.push(part);
    }
    return parts.join('');
  },

  async setItem(key: string, value: string): Promise<void> {
    await clearChunks(key);
    if (value.length <= CHUNK_LIMIT) {
      await SecureStore.setItemAsync(key, value);
      return;
    }
    const count = Math.ceil(value.length / CHUNK_LIMIT);
    for (let i = 0; i < count; i += 1) {
      await SecureStore.setItemAsync(`${key}.${i}`, value.slice(i * CHUNK_LIMIT, (i + 1) * CHUNK_LIMIT));
    }
    await SecureStore.setItemAsync(key, `${CHUNK_PREFIX}${count}`);
  },

  async removeItem(key: string): Promise<void> {
    await clearChunks(key);
    await SecureStore.deleteItemAsync(key);
  },
};

const CHUNK_PREFIX = '__chunks__:';

async function clearChunks(key: string): Promise<void> {
  const head = await SecureStore.getItemAsync(key).catch(() => null);
  if (head === null || !head.startsWith(CHUNK_PREFIX)) return;
  const count = Number(head.slice(CHUNK_PREFIX.length));
  for (let i = 0; i < count; i += 1) {
    await SecureStore.deleteItemAsync(`${key}.${i}`).catch(() => undefined);
  }
}

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Whether the app has been given credentials.
 *
 * Checked before every call rather than assumed, so a missing `.env` shows a
 * clear message on the sign-in screen instead of an opaque network error.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key',
  {
    auth: {
      // The web build can use localStorage; native cannot.
      storage: Platform.OS === 'web' ? undefined : secureStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
