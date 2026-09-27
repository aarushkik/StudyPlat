import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useAppTheme } from '@/theme/ThemeProvider';

/** Glass is navigation chrome, not a backdrop for long-form reading. */
export function GlassSurface({ children, style, ...props }: ViewProps) {
  const theme = useAppTheme();
  const [reduceTransparency, setReduceTransparency] = useState(true);
  useEffect(() => {
    if (Platform.OS === 'web') {
      const preference = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-transparency: reduce)') : null;
      const update = () => setReduceTransparency(preference?.matches ?? true);
      update();
      preference?.addEventListener('change', update);
      return () => preference?.removeEventListener('change', update);
    }
    if (Platform.OS !== 'ios') return;
    let alive = true;
    void AccessibilityInfo.isReduceTransparencyEnabled().then((value) => { if (alive) setReduceTransparency(value); }).catch(() => undefined);
    const listener = AccessibilityInfo.addEventListener('reduceTransparencyChanged', setReduceTransparency);
    return () => { alive = false; listener.remove(); };
  }, []);
  const glass = !reduceTransparency && Platform.OS === 'ios' && isGlassEffectAPIAvailable() && isLiquidGlassAvailable();
  return <View {...props} style={[{ borderRadius: 28, borderCurve: 'continuous', overflow: 'hidden', borderWidth: 1, borderColor: theme.glassEdge, boxShadow: theme.shadow }, style]}>
    {glass ? <GlassView colorScheme={theme.mode} glassEffectStyle="regular" style={StyleSheet.absoluteFill} />
      : !reduceTransparency && Platform.OS !== 'android' ? <BlurView tint={theme.isDark ? 'dark' : 'light'} intensity={70} style={StyleSheet.absoluteFill} /> : null}
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: reduceTransparency || Platform.OS === 'android' ? theme.colors.surface : glass ? 'transparent' : theme.glass }]} />
    {children}
  </View>;
}
