import React from 'react';
import { StyleSheet, View } from 'react-native';

interface LevelBarsProps {
  /** How many of the 5 bars are filled (1–5). */
  filled: number;
  color: string;
}

/**
 * Rising bars, used as the experience-level icon.
 *
 * The filled and empty states have to be obvious at a glance: this is a list
 * of five options whose *only* visual difference is this icon, and read down
 * the page they have to look like a rising scale rather than five copies of
 * the same picture. Empty bars are therefore a flat ink wash rather than the
 * old hairline grey, which sat close enough to the filled colour that the
 * levels were indistinguishable without stopping to count.
 */
export function LevelBars({ filled, color }: LevelBarsProps) {
  return (
    <View style={styles.row}>
      {[0, 1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={[
            styles.bar,
            {
              height: 9 + i * 5,
              backgroundColor: i < filled ? color : EMPTY,
            },
          ]}
        />
      ))}
    </View>
  );
}

/** Clearly present, clearly not filled. */
const EMPTY = 'rgba(18,48,60,0.15)';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: 30, gap: 3 },
  bar: {
    width: 6,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
  },
});
