import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/theme/ThemeProvider';

/**
 * Light pooling along the top of a coloured surface, fading out by the middle.
 *
 * Put it inside a surface with `overflow: 'hidden'`, after any background
 * layer and before the content. It is what turns a flat coloured card into a
 * piece of tinted glass. Drawn nowhere under Reduce Transparency, where
 * surfaces are meant to read as plain and solid.
 */
export function Sheen({ strength = 0.2, reach = 0.55 }: { strength?: number; reach?: number }) {
  const { solid, glass } = useAppTheme();
  if (solid) return null;
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[`rgba(255,255,255,${strength})`, glass.sheenClear]}
      locations={[0, reach]}
      style={StyleSheet.absoluteFill}
    />
  );
}
