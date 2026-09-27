import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useHaptics } from '@/hooks/useHaptics';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, radius, spacing, spring, typography } from '@/theme';

/** Visual state driven by the quiz flow. */
export type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong' | 'missed' | 'struck';

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
 * buttons elsewhere. Feedback is deliberately gentle: correct changes color, wrong gives
 * a small shake rather than a jolt, and the answer that *was* right lights up
 * quietly beside it instead of shouting.
 */
export function AnswerChoice({ index, label, state, onPress, disabled }: AnswerChoiceProps) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);
  const STATE = makeSTATE(appTheme);

  const { motionEnabled } = useMotionPreference();
  const haptic = useHaptics();
  const inactive = disabled || state === 'struck';
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!motionEnabled) { shake.setValue(0); pop.setValue(0); return; }
    if (state === 'wrong') {
      shake.setValue(0);
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0.5, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 70, useNativeDriver: true }),
      ]).start();
    }
    return () => { shake.stopAnimation(); pop.stopAnimation(); };
  }, [state, shake, pop, motionEnabled]);

  const s = STATE[state];
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });
  const sink = press.interpolate({ inputRange: [0, 1], outputRange: [0, 3] });
  const lift = pop.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });

  const to = (v: number) => {
    if (!motionEnabled) { press.setValue(v); return; }
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();
  };

  return (
    <Animated.View style={[styles.holder, { transform: [{ translateX }, { translateY: lift }] }]}>
      <View style={[styles.lip, { backgroundColor: s.edge }]} />
      <Animated.View style={{ transform: [{ translateY: sink }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${KEYS[index] ?? index + 1}. ${label}${state === 'struck' ? '. Ruled out' : state === 'correct' || state === 'missed' ? '. Correct answer' : state === 'wrong' ? '. Your answer, incorrect' : ''}`}
          accessibilityState={{ selected: state === 'selected', disabled: inactive }}
          disabled={inactive}
          onPressIn={() => to(1)}
          onPressOut={() => to(0)}
          onPress={() => { if (state !== 'selected') haptic(); onPress?.(); }}
          style={[styles.choice, { backgroundColor: s.bg, borderColor: s.border }]}
        >
          <View style={[styles.key, { backgroundColor: s.keyBg, borderColor: s.border }]}>
            <Text style={[styles.keyText, { color: s.keyText }]}>{KEYS[index] ?? '?'}</Text>
          </View>
          <Text style={[styles.label, { color: s.text }, state === 'struck' && styles.struckLabel]}>
            {label}
          </Text>
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

const makeSTATE = ({ colors }: AppTheme): Record<ChoiceState, Style> => ({
  idle: {
    bg: colors.surface,
    border: colors.border,
    edge: colors.border,
    text: colors.textPrimary,
    keyBg: colors.background,
    keyText: colors.textSecondary,
  },
  selected: {
    bg: colors.primaryTint,
    border: colors.primary,
    edge: colors.primary,
    text: colors.primaryDeep,
    keyBg: colors.primary,
    keyText: colors.textOnPrimary,
  },
  correct: {
    bg: colors.successSoft,
    border: colors.success,
    edge: colors.success,
    text: colors.successDark,
    keyBg: '#2A6E45',
    keyText: colors.white,
    icon: 'check',
  },
  wrong: {
    bg: colors.dangerSoft,
    border: colors.danger,
    edge: colors.danger,
    text: colors.dangerDark,
    keyBg: '#A93B1C',
    keyText: colors.white,
    icon: 'close',
  },
  // Ruled out by a companion before answering. Deliberately the locked
  // palette rather than the danger one: it is not a mistake the student made,
  // it is an option that has been taken off the table for them.
  struck: {
    bg: colors.locked,
    border: colors.overlayStrong,
    edge: colors.overlayStrong,
    text: colors.lockedText,
    keyBg: 'transparent',
    keyText: colors.lockedText,
    icon: 'close',
  },
  // The right answer, shown after a miss — present but not celebratory.
  missed: {
    bg: colors.surface,
    border: colors.success,
    edge: colors.success,
    text: colors.successDark,
    keyBg: colors.successSoft,
    keyText: colors.successDark,
    icon: 'check',
  },
});

const LIP = 2;

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  holder: { marginBottom: spacing.md },
  lip: { position: 'absolute', left: 0, right: 0, top: LIP, bottom: -LIP, borderRadius: radius.lg },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  key: {
    width: 34,
    height: 34,
    // A squircle, not a disc: the round shapes in this app are map stops.
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { ...typography.label, fontSize: 14 },
  label: { ...typography.bodyStrong, flex: 1 },
  struckLabel: { textDecorationLine: 'line-through' },
});
