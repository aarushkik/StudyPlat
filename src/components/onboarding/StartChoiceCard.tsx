import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useCardAnimation } from './useCardAnimation';

interface StartChoiceCardProps {
  icon: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  /** Show the "RECOMMENDED" ribbon and a slightly more inviting style. */
  recommended?: boolean;
}

/** Larger choice card for "Where would you like to start?". */
export function StartChoiceCard({ icon, title, subtitle, selected, onPress, recommended }: StartChoiceCardProps) {
  const { scale, onPressIn, onPressOut } = useCardAnimation(selected);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.card,
          shadows.sm,
          recommended && !selected && styles.recommended,
          selected && styles.selected,
        ]}
      >
        {recommended ? (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>RECOMMENDED</Text>
          </View>
        ) : null}
        <View style={[styles.badge, { backgroundColor: recommended ? colors.primarySoft : colors.background }]}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={26} color={colors.primary} />
        </View>
        <View style={styles.text}>
          <Text style={[typography.subtitle, selected && styles.textSelected]}>{title}</Text>
          <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text>
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
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  recommended: { borderColor: colors.primarySoft, backgroundColor: colors.primaryTint },
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  ribbon: {
    position: 'absolute',
    top: -10,
    right: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  ribbonText: { ...typography.label, color: colors.white, fontSize: 11, letterSpacing: 0.5 },
  badge: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  text: { flex: 1 },
  subtitle: { marginTop: 2 },
  textSelected: { color: colors.primaryDark },
});
