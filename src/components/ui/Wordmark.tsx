import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { chunky, chunkyRadius, colors, fonts } from '@/theme';

interface WordmarkProps {
  /** Font size of "Study"; the Plat badge scales from it. */
  size?: number;
  /** `brand` for cream backgrounds, `light` for the night ground. */
  variant?: 'brand' | 'light';
}

/**
 * The StudyPlat wordmark: "Study" followed by a "Plat" badge.
 *
 * Boxing the second half is the lockup's signature — it reads as a word and a
 * chip rather than a plain string, and it echoes the chunky ink border that
 * every other surface in the app carries. "Plat" is the part worth boxing:
 * it's the platypus, and it's what makes the name stick.
 */
export function Wordmark({ size = 34, variant = 'brand' }: WordmarkProps) {
  const onNight = variant === 'light';
  const wordColor = onNight ? colors.white : colors.ink;
  const badgeBg = onNight ? colors.primary : colors.primary;
  const badgeInk = onNight ? colors.ink : colors.ink;
  const badgeText = onNight ? colors.ink : colors.white;

  const c = chunky({ depth: Math.max(3, size * 0.1), radius: chunkyRadius.chip, shadow: badgeInk });

  return (
    <View style={styles.row}>
      <Text style={[styles.word, { fontSize: size, color: wordColor }]}>Study</Text>
      <View style={[c.wrap, { marginLeft: size * 0.14 }]}>
        <View style={c.lip} />
        <View
          style={[
            c.face,
            {
              backgroundColor: badgeBg,
              borderColor: badgeInk,
              paddingHorizontal: size * 0.24,
              paddingVertical: size * 0.06,
            },
          ]}
        >
          <Text style={[styles.badgeText, { fontSize: size * 0.78, color: badgeText }]}>Plat</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  word: { fontFamily: fonts.displayHeavy, letterSpacing: -0.5 },
  badgeText: { fontFamily: fonts.displayHeavy, letterSpacing: -0.2 },
});
