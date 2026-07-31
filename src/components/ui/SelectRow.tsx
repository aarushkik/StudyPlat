import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Glyph } from '@/components/icons';
import { useCardAnimation } from '@/components/onboarding/useCardAnimation';
import { colors, radius, shadows, spacing, typography } from '@/theme';

interface SelectRowProps {
  /** Leading art — an illustration, glyph, or level bars. */
  leading: React.ReactNode;
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  /** Selection color; defaults to the brand rose. */
  accent?: string;
  /** Soft background used when selected. */
  tint?: string;
  /** Drop the tinted tile behind `leading` (for full-color illustrations). */
  bareLeading?: boolean;
}

/**
 * The one selectable row every setup screen is built from — course, experience
 * level, score goal, exam timing. Sharing it keeps the selected state, the
 * press physics, and the tick identical across the whole flow; the callers only
 * vary the leading art and the accent.
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
  const { scale, translateY, onPressIn, onPressOut } = useCardAnimation(selected);

  return (
    <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.card,
          selected ? shadows.sm : shadows.none,
          selected && { borderColor: accent, backgroundColor: tint },
        ]}
      >
        <View style={[styles.tile, !bareLeading && { backgroundColor: selected ? colors.surface : tint }]}>
          {leading}
        </View>

        <View style={styles.body}>
          <Text style={[typography.subtitle, selected && { color: accent }]} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={typography.caption} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={[styles.check, selected ? { backgroundColor: accent, borderColor: accent } : styles.checkEmpty]}>
          {selected ? <Glyph name="check" size={15} color={colors.white} strokeWidth={3.2} /> : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  tile: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  body: { flex: 1, paddingRight: spacing.sm, gap: 1 },
  check: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkEmpty: { borderColor: colors.border, backgroundColor: 'transparent' },
});
