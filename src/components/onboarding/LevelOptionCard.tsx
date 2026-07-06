import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { LevelBars } from './LevelBars';
import { useCardAnimation } from './useCardAnimation';

interface LevelOptionCardProps {
  label: string;
  /** 1–5 filled bars for this level. */
  bars: number;
  selected: boolean;
  onPress: () => void;
}

/** Experience-level option: increasing bars icon + label, selectable. */
export function LevelOptionCard({ label, bars, selected, onPress }: LevelOptionCardProps) {
  const { scale, onPressIn, onPressOut } = useCardAnimation(selected);
  const barColor = selected ? colors.primary : colors.textMuted;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, selected ? shadows.sm : shadows.none, selected && styles.selected]}
      >
        <View style={styles.icon}>
          <LevelBars filled={bars} color={barColor} />
        </View>
        <Text style={[typography.bodyStrong, styles.label, selected && styles.labelSelected]} numberOfLines={2}>
          {label}
        </Text>
        <View style={[styles.check, selected ? styles.checkOn : styles.checkEmpty]}>
          {selected ? <Ionicons name="checkmark" size={16} color={colors.white} /> : null}
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
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  icon: { width: 44, alignItems: 'flex-start', marginRight: spacing.md },
  label: { flex: 1 },
  labelSelected: { color: colors.primaryDark },
  check: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary },
  checkEmpty: { borderWidth: 2, borderColor: colors.border },
});
