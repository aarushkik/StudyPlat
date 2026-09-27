import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import { deviceStorage } from '@/lib/storage';
import { createSaveQueue } from '@/lib/saveQueue';
import { colors as lightColors, darkColors, palette, type ThemeColors } from './colors';
import { makeTypography } from './typography';
import { chunky as makeChunky, type ChunkyOptions } from './chunky';
import { stroke } from './stroke';
import { resolveAppearance, type AppearancePreference } from './appearance';
export type { AppearancePreference } from './appearance';

function makeTheme(mode: 'light' | 'dark') {
  const colors: ThemeColors = mode === 'dark' ? darkColors : { ...lightColors, border: '#CBDBDA', background: '#F5F6F0' };
  return {
    mode, isDark: mode === 'dark', colors, palette, stroke,
    typography: makeTypography(colors),
    chunky: (options?: ChunkyOptions) => makeChunky(options, colors),
    glass: mode === 'dark' ? 'rgba(19,40,50,0.82)' : 'rgba(255,253,247,0.82)',
    glassEdge: mode === 'dark' ? 'rgba(202,246,245,0.18)' : 'rgba(255,255,255,0.9)',
    shadow: mode === 'dark' ? '0 12px 36px rgba(0,0,0,0.26)' : '0 12px 36px rgba(18,48,60,0.1)',
  };
}
export type AppTheme = ReturnType<typeof makeTheme>;
const themes = { light: makeTheme('light'), dark: makeTheme('dark') };
const ThemeContext = createContext(themes.light);
const PreferenceContext = createContext({ preference: 'system' as AppearancePreference, setPreference: (_: AppearancePreference) => {}, error: null as string | null });
const KEY = 'studyplat.appearance';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreferenceState] = useState<AppearancePreference>('system');
  const [error, setError] = useState<string | null>(null);
  const changed = useRef(false);
  const saves = useMemo(() => createSaveQueue<string>((value) => deviceStorage.setItem(KEY, value)), []);
  useEffect(() => {
    let alive = true;
    void deviceStorage.getItem(KEY).then((saved) => {
      if (alive && !changed.current && (saved === 'system' || saved === 'light' || saved === 'dark')) setPreferenceState(saved);
    }).catch(() => { if (alive) setError('Your saved appearance could not be loaded.'); });
    return () => { alive = false; };
  }, []);
  const setPreference = useCallback((next: AppearancePreference) => {
    changed.current = true;
    setPreferenceState(next);
    setError(null);
    void saves.save(next).catch(() => setError('Appearance changed for now. Tap your choice again to retry saving it.'));
  }, [saves]);
  const controls = useMemo(() => ({ preference, setPreference, error }), [preference, setPreference, error]);
  return <PreferenceContext.Provider value={controls}><ThemeContext.Provider value={themes[resolveAppearance(preference, system)]}>{children}</ThemeContext.Provider></PreferenceContext.Provider>;
}

export const useAppTheme = () => useContext(ThemeContext);
export const useAppearancePreference = () => useContext(PreferenceContext);
/** Style factories run once per theme; switching appearance never remounts a screen. */
export function useThemedStyles<T>(factory: (theme: AppTheme) => T): T {
  const theme = useAppTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}
