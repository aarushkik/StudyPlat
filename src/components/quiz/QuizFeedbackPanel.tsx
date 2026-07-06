import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/ui';
import { Mascot } from '@/components/Mascot';
import { colors, radius, spacing, typography } from '@/theme';

interface QuizFeedbackPanelProps {
  correct: boolean;
  explanation: string;
  onContinue: () => void;
}

/**
 * Bottom feedback panel that slides up after checking an answer. Supportive by
 * design: a cheerful "Correct!" or a gentle "Not quite" with a helpful
 * explanation and Stu reacting alongside.
 */
export function QuizFeedbackPanel({ correct, explanation, onContinue }: QuizFeedbackPanelProps) {
  const slide = useRef(new Animated.Value(80)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [slide, fade]);

  const accent = correct ? colors.successDark : colors.dangerDark;

  return (
    <Animated.View
      style={[
        styles.panel,
        { backgroundColor: correct ? colors.successSoft : colors.dangerSoft, opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.headerRow}>
        <Mascot size={64} expression={correct ? 'excited' : 'worried'} accessory="none" />
        <View style={styles.titleWrap}>
          <View style={styles.titleRow}>
            <Ionicons name={correct ? 'checkmark-circle' : 'information-circle'} size={24} color={accent} />
            <Text style={[styles.title, { color: accent }]}>{correct ? 'Correct!' : 'Not quite'}</Text>
          </View>
          <Text style={styles.explanation}>{explanation}</Text>
        </View>
      </View>

      <AppButton label="Continue" onPress={onContinue} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  titleWrap: { flex: 1, marginLeft: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  title: { ...typography.subtitle, fontWeight: '800' },
  explanation: { ...typography.body, color: colors.textPrimary, marginTop: spacing.xs },
});
