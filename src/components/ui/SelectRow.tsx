import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Glyph } from '@/components/icons';
import { chunky, chunkyRadius, colors, depth, fonts, spacing, spring } from '@/theme';

interface SelectRowProps {
  /** Leading art — an illustration, glyph, or level bars. */
  leading: React.ReactNode;
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  /** Selection colour. Tints the lip and the tick when chosen. */
  accent?: string;
  /** Soft background used behind the leading art. */
  tint?: string;
  /** Drop the tinted tile behind `leading` (for art that carries its own). */
  bareLeading?: boolean;
}

/**
 * The one selectable row every setup screen is built from — course, experience
 * level, score goal, exam timing. Sharing it keeps the selected state, the
 * press physics and the tick identical across the whole flow; callers only
 * vary the leading art and the accent.
 *
 * Selection is carried by the *lip*, not by a border colour swap. Every other
 * surface in the app sits on a coloured drop, and a row that instead grew a
 * 2px outline read as a form control from a different app. Choosing one now
 * lifts it and turns its shadow the accent colour — the same move the answer
 * choices in the quiz make.
 *
 * Nothing scales. These rows are full-bleed, and a spring overshoots its
 * target by design, so scaling up pushes them past both screen edges.
 */
export function SelectRow({
  leading,
  title,
  subtitle,
  selected,
  onPress,
  accent = colors.primary,
  tint = colors.primaryTint,
  bareLeading = false,
}: SelectRowProps) {
  const press = useRef(new Animated.Value(0)).current;
  const c = chunky({
    depth: selected ? depth.button : depth.card,
    radius: chunkyRadius.card,
    shadow: selected ? accent : colors.ink,
  });

  const to = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      style={[c.wrap, styles.wrap]}
    >
      <View style={c.lip} />
      <Animated.View
        style={[
          c.face,
          styles.card,
          selected && { backgroundColor: colors.surfaceSelected },
          { transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] }) }] },
        ]}
      >
        <View
          style={[
            styles.tile,
            !bareLeading && { backgroundColor: tint, borderWidth: 3, borderColor: colors.ink },
          ]}
        >
          {leading}
        </View>

        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={[styles.check, selected && { backgroundColor: accent }]}>
          {selected ? <Glyph name="check" size={15} color={colors.white} strokeWidth={3.4} /> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  tile: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  body: { flex: 1, minWidth: 0, gap: 1 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 17, lineHeight: 20, color: colors.ink },
  subtitle: { fontFamily: fonts.bodySemibold, fontSize: 12.5, lineHeight: 16, color: colors.textMuted },
  // Always ink-ruled, filled only when chosen. An empty circle that changes
  // only its border colour is easy to miss at a glance down a list of eight.
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.ink,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
