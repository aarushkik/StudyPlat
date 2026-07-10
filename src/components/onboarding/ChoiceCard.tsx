import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useCardAnimation } from './useCardAnimation';

interface ChoiceCardProps {
  /** A custom icon element (rendered inside a tinted tile). */
  icon: React.ReactNode;
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

/** Generic icon + label + description selection card used across setup steps. */
export function ChoiceCard({ icon, label, description, selected, onPress }: ChoiceCardProps) {
  const { scale, onPressIn, onPressOut } = useCardAnimation(selected);

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
        <View style={[styles.tile, selected && styles.tileSelected]}>{icon}</View>
        <View style={styles.body}>
          <Text style={[typography.subtitle, selected && styles.textSelected]} numberOfLines={1}>
            {label}
          </Text>
          {description ? (
            <Text style={typography.caption} numberOfLines={1}>
              {description}
            </Text>
          ) : null}
        </View>
        <View style={[styles.check, selected ? styles.checkOn : styles.checkEmpty]}>
          {selected ? <Ionicons name="checkmark" size={18} color={colors.white} /> : null}
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
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  tile: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  tileSelected: { backgroundColor: colors.surface },
  body: { flex: 1, paddingRight: spacing.sm },
  textSelected: { color: colors.primaryDark },
  check: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary },
  checkEmpty: { borderWidth: 2, borderColor: colors.border },
});
