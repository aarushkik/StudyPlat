import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, radius, spacing, spring, typography } from '@/theme';

/** Visual state driven by the quiz flow. */
export type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong' | 'missed';

interface AnswerChoiceProps {
  /** Position in the list, rendered as the A/B/C/D key. */
  index: number;
  label: string;
  state: ChoiceState;
  onPress?: () => void;
  disabled?: boolean;
}

const KEYS = ['A', 'B', 'C', 'D', 'E'];

/**
 * A tappable answer choice.
 *
 * Each option carries a lettered key so a student can talk about "C" out loud,
 * and the card sits on a lip that sinks when pressed — the same physics as the
 * buttons elsewhere. Feedback is deliberately gentle: correct pops, wrong gives
 * a small shake rather than a jolt, and the answer that *was* right lights up
 * quietly beside it instead of shouting.
 */
export function AnswerChoice({ index, label, state, onPress, disabled }: AnswerChoiceProps) {
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;

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
      pop.setValue(0);
      Animated.sequence([
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 14 }),
        Animated.spring(pop, { toValue: 0, useNativeDriver: true, speed: 40, bounciness: 14 }),
      ]).start();
    }
  }, [state, shake, pop]);

  const s = STATE[state];
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });
  const sink = press.interpolate({ inputRange: [0, 1], outputRange: [0, 3] });
  /**
   * Correct answers *lift* rather than scale. These cards run the full width of
   * the screen's padding, so a springy scale — which overshoots its target by
   * design — pushed the card past both edges and made it look broken at the
   * exact moment the student got it right.
   */
  const lift = pop.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });

  const to = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();

  return (
    <Animated.View style={[styles.holder, { transform: [{ translateX }, { translateY: lift }] }]}>
      <View style={[styles.lip, { backgroundColor: s.edge }]} />
      <Animated.View style={{ transform: [{ translateY: sink }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: state === 'selected', disabled }}
          disabled={disabled}
          onPressIn={() => to(1)}
          onPressOut={() => to(0)}
          onPress={onPress}
          style={[styles.choice, { backgroundColor: s.bg, borderColor: s.border }]}
        >
          <View style={[styles.key, { backgroundColor: s.keyBg, borderColor: s.border }]}>
            <Text style={[styles.keyText, { color: s.keyText }]}>{KEYS[index] ?? '?'}</Text>
          </View>
          <Text style={[styles.label, { color: s.text }]}>{label}</Text>
          {s.icon ? <Glyph name={s.icon} size={20} color={s.edge} strokeWidth={2.8} /> : null}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

type Style = {
  bg: string;
  border: string;
  edge: string;
  text: string;
  keyBg: string;
  keyText: string;
  icon?: GlyphName;
};

const STATE: Record<ChoiceState, Style> = {
  idle: {
    bg: colors.surface,
    border: colors.ink,
    edge: colors.ink,
    text: colors.textPrimary,
    keyBg: colors.background,
    keyText: colors.textSecondary,
  },
  selected: {
    bg: colors.primaryTint,
    border: colors.ink,
    edge: colors.primary,
    text: colors.primaryDeep,
    keyBg: colors.primary,
    keyText: colors.white,
  },
  correct: {
    bg: colors.successSoft,
    border: colors.ink,
    edge: colors.success,
    text: colors.successDark,
    keyBg: colors.success,
    keyText: colors.white,
    icon: 'check',
  },
  wrong: {
    bg: colors.dangerSoft,
    border: colors.ink,
    edge: colors.danger,
    text: colors.dangerDark,
    keyBg: colors.danger,
    keyText: colors.white,
    icon: 'close',
  },
  // The right answer, shown after a miss — present but not celebratory.
  missed: {
    bg: colors.surface,
    border: colors.ink,
    edge: colors.success,
    text: colors.successDark,
    keyBg: colors.successSoft,
    keyText: colors.successDark,
    icon: 'check',
  },
};

const LIP = 5;

const styles = StyleSheet.create({
  holder: { marginBottom: spacing.md },
  lip: { position: 'absolute', left: 0, right: 0, top: LIP, bottom: -LIP, borderRadius: radius.lg },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 3,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  key: {
    width: 34,
    height: 34,
    // A squircle, not a disc: the round shapes in this app are map stops.
    borderRadius: 13,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { ...typography.label, fontSize: 14 },
  label: { ...typography.bodyStrong, flex: 1 },
});
