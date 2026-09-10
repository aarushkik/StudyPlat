import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { MASCOT_ART, MASCOT_ASPECT, MASCOT_SIZES, type MascotProps } from './Mascot.types';

/** Stu holds a purposeful drawn pose. No ambient bobbing or floating. */
export function Mascot({ pose = 'neutral', size = 'medium', shadow = true }: MascotProps) {
  const width = typeof size === 'number' ? size : MASCOT_SIZES[size];
  const height = width * MASCOT_ASPECT;
  return <View style={{ width, height }} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
    {shadow && <View style={[styles.shadow, { width: width * 0.3, height: width * 0.035, borderRadius: width, left: width * 0.35, bottom: height * 0.035 }]} />}
    <Image source={MASCOT_ART[pose]} style={{ width, height }} resizeMode="contain" />
  </View>;
}
const styles = StyleSheet.create({ shadow: { position: 'absolute', backgroundColor: colors.ink, opacity: 0.07 } });
