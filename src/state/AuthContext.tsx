import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

/** The providers the app offers. Supabase calls Microsoft "azure". */
export type AuthProvider = 'google' | 'azure';

interface AuthContextValue {
  /** Null until the stored session has been checked. */
  session: Session | null;
  user: User | null;
  /** True while the app is restoring a session on launch. */
  restoring: boolean;
  /** Which provider is mid-flight, so the screen can show it. */
  pending: AuthProvider | null;
  /** Last failure, in words a student could act on. */
  error: string | null;
  signIn: (provider: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Who is signed in.
 *
 * The OAuth flow on native is: open the provider in a system browser sheet,
 * let it redirect back to the app's own scheme, then hand the returned code to
 * Supabase for a session. `openAuthSessionAsync` is what makes the sheet close
 * itself on that redirect — `openBrowserAsync` leaves the user staring at a
 * finished login page with no way back.
 *
 * The redirect URL has to match one registered in Supabase exactly, and the
 * scheme has to match `app.json`. Both are the usual reasons this fails, so
 * the URL is built from `Linking.createURL` rather than hard-coded.
 */
export function AuthProviderComponent({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [pending, setPending] = useState<AuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Restore whatever is in the keychain, then follow every later change.
  useEffect(() => {
    let alive = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (alive) setSession(data.session);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setRestoring(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (alive) setSession(next);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (provider: AuthProvider) => {
    if (!isSupabaseConfigured) {
      setError('This build has no Supabase keys yet. Add them to .env and restart.');
      return;
    }

    setError(null);
    setPending(provider);
    try {
      const redirectTo = Linking.createURL('auth/callback');

      const { data, error: startError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          // Supabase would otherwise navigate the current context itself,
          // which on native means nothing happens at all.
          skipBrowserRedirect: true,
        },
      });
      if (startError) throw startError;
      if (!data?.url) throw new Error('The sign-in provider did not return a URL.');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      if (result.type === 'cancel' || result.type === 'dismiss') {
        // Backing out of the sheet is a normal thing to do, not an error.
        return;
      }
      if (result.type !== 'success' || !result.url) {
        throw new Error('Sign-in did not complete.');
      }

      await completeSignIn(result.url);
    } catch (e) {
      setError(messageFor(e));
    } finally {
      setPending(null);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Even if the network call fails, drop the local session — a user who
      // taps sign out and stays signed in has every reason to distrust it.
    } finally {
      setSession(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      restoring,
      pending,
      error,
      signIn,
      signOut,
      clearError: () => setError(null),
    }),
    [session, restoring, pending, error, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Turn the redirect URL into a session.
 *
 * Supabase can hand back either an authorisation `code` (PKCE, the default) or
 * tokens in the URL fragment (implicit). Both are handled: which one arrives
 * depends on the provider and the project's settings, and getting this wrong
 * shows up as a successful-looking login that leaves the user signed out.
 */
async function completeSignIn(url: string): Promise<void> {
  const parsed = new URL(url);
  const code = parsed.searchParams.get('code');

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    return;
  }

  const fragment = new URLSearchParams(parsed.hash.replace(/^#/, ''));
  const access_token = fragment.get('access_token');
  const refresh_token = fragment.get('refresh_token');
  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({ access_token, refresh_token });
    if (error) throw error;
    return;
  }

  const providerError = parsed.searchParams.get('error_description') ?? fragment.get('error_description');
  throw new Error(providerError ?? 'Sign-in finished without returning a session.');
}

/** Provider errors are terse and often technical; say something actionable. */
function messageFor(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (/provider is not enabled/i.test(raw)) {
    return 'That sign-in method is not switched on in Supabase yet.';
  }
  if (/redirect/i.test(raw)) {
    return 'The redirect URL is not on the allow-list in Supabase.';
  }
  if (/network|fetch/i.test(raw)) {
    return 'Could not reach the server. Check your connection and try again.';
  }
  return raw;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProviderComponent');
  return ctx;
}
