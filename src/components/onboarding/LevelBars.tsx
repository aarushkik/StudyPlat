import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme';

interface LevelBarsProps {
  /** How many of the 5 bars are filled (1–5). */
  filled: number;
  color: string;
}

/** Increasing-height signal bars used as the experience-level icon. */
export function LevelBars({ filled, color }: LevelBarsProps) {
  return (
    <View style={styles.row}>
      {[0, 1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={[
            styles.bar,
            { height: 8 + i * 5, backgroundColor: i < filled ? color : colors.border },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: 30 },
  bar: { width: 5, borderRadius: radius.sm, marginRight: 3 },
});
