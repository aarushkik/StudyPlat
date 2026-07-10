import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme';

interface WordmarkProps {
  /** Font size of "stu"; the AP badge scales from it. */
  size?: number;
  /** `brand` for light backgrounds, `light` for colored/dark backgrounds. */
  variant?: 'brand' | 'light';
}

/**
 * The stuAP wordmark: "stu" + an "AP" badge. Highlighting AP as a chip is the
 * brand's signature — a distinctive lockup rather than a plain word.
 */
export function Wordmark({ size = 34, variant = 'brand' }: WordmarkProps) {
  const stuColor = variant === 'brand' ? colors.primary : colors.white;
  const badgeBg = variant === 'brand' ? colors.primary : colors.white;
  const apColor = variant === 'brand' ? colors.white : colors.primary;

  return (
    <View style={styles.row}>
      <Text style={[styles.stu, { fontSize: size, color: stuColor }]}>stu</Text>
      <View
        style={[
          styles.badge,
          { backgroundColor: badgeBg, borderRadius: size * 0.28, paddingHorizontal: size * 0.2, marginLeft: size * 0.1 },
        ]}
      >
        <Text style={[styles.ap, { fontSize: size * 0.82, color: apColor }]}>AP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  stu: { fontFamily: fonts.bold, letterSpacing: -0.5 },
  badge: { paddingVertical: 2, justifyContent: 'center' },
  ap: { fontFamily: fonts.bold, letterSpacing: 0.5 },
});
