import 'react-native-url-polyfill/auto';
import { createClient, processLock, type SupabaseClient } from '@supabase/supabase-js';
import { deviceStorage } from './storage';

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

function validConfiguration(): boolean {
  try {
    const url = new URL(SUPABASE_URL);
    if (url.protocol !== 'https:' || /placeholder|your-project-ref/i.test(url.hostname)) return false;
    if (!SUPABASE_ANON_KEY || /placeholder|your-anon-public-key|^sb_secret_/i.test(SUPABASE_ANON_KEY)) return false;
    // A privileged key must never become a public client credential.
    if (SUPABASE_ANON_KEY.startsWith('eyJ')) {
      const payload = JSON.parse(atob(SUPABASE_ANON_KEY.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.role === 'anon';
    }
    return SUPABASE_ANON_KEY.startsWith('sb_publishable_');
  } catch { return false; }
}

export const isSupabaseConfigured = validConfiguration();
// Keep Supabase's original key name so existing secure sessions migrate in place.
export const AUTH_STORAGE_KEY = isSupabaseConfigured
  ? `sb-${new URL(SUPABASE_URL).hostname.split('.')[0]}-auth-token`
  : 'studyplat.auth';

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? SUPABASE_URL : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? SUPABASE_ANON_KEY : 'placeholder-anon-key',
  {
    auth: {
      storage: deviceStorage,
      storageKey: AUTH_STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: 'pkce',
      lock: processLock,
    },
  },
);
