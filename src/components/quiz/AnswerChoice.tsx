import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

/** Visual state driven by the quiz flow. */
export type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong';

interface AnswerChoiceProps {
  label: string;
  state: ChoiceState;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * A tappable answer choice with supportive feedback: pops on correct, gives a
 * gentle (non-harsh) shake on wrong, and highlights the right answer on reveal.
 */
export function AnswerChoice({ label, state, onPress, disabled }: AnswerChoiceProps) {
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'wrong') {
      shake.setValue(0);
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0.5, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 70, useNativeDriver: true }),
      ]).start();
    } else if (state === 'correct') {
      pop.setValue(1);
      Animated.sequence([
        Animated.spring(pop, { toValue: 1.04, useNativeDriver: true, speed: 40, bounciness: 14 }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 14 }),
      ]).start();
    }
  }, [state, shake, pop]);

  const s = STATE[state];
  // Gentle shake — small offset so wrong answers never feel harsh.
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });

  return (
    <Animated.View style={{ transform: [{ translateX }, { scale: pop }] }}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={[styles.choice, { backgroundColor: s.bg, borderColor: s.border }]}
      >
        <Text style={[styles.label, { color: s.text }]}>{label}</Text>
        {s.icon ? <Ionicons name={s.icon} size={20} color={s.border} /> : null}
      </Pressable>
    </Animated.View>
  );
}

const STATE: Record<ChoiceState, { bg: string; border: string; text: string; icon?: keyof typeof Ionicons.glyphMap }> = {
  idle: { bg: colors.surface, border: colors.border, text: colors.textPrimary },
  selected: { bg: colors.primaryTint, border: colors.primary, text: colors.primaryDark },
  correct: { bg: colors.successSoft, border: colors.success, text: colors.successDark, icon: 'checkmark-circle' },
  wrong: { bg: colors.dangerSoft, border: colors.danger, text: colors.dangerDark, icon: 'close-circle' },
};

const styles = StyleSheet.create({
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  label: { ...typography.bodyStrong, flex: 1, paddingRight: spacing.sm },
});
