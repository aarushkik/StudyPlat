import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors, palette, radius, spacing, typography } from '@/theme';
import type { PlacementQuestion, Stimulus } from '@/types';

interface QuestionCardProps {
  question: PlacementQuestion;
  /** The answer UI (choices or text input), rendered by the parent. */
  children: React.ReactNode;
}

/** Renders a question's skill kicker, prompt, optional stimulus, and answers. */
export function QuestionCard({ question, children }: QuestionCardProps) {
  return (
    <View>
      <Text style={styles.kicker}>{question.skillTag}</Text>
      <Text style={[typography.title, styles.prompt]}>{question.prompt}</Text>
      {question.stimulus ? <StimulusBlock stimulus={question.stimulus} /> : null}
      <View style={styles.answers}>{children}</View>
    </View>
  );
}

function StimulusBlock({ stimulus }: { stimulus: Stimulus }) {
  if (stimulus.kind === 'code') {
    return (
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{stimulus.content}</Text>
      </View>
    );
  }
  if (stimulus.kind === 'formula') {
    return (
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{stimulus.content}</Text>
      </View>
    );
  }
  if (stimulus.kind === 'paragraph') {
    return (
      <View style={styles.paragraphBox}>
        <Text style={styles.paragraphText}>{stimulus.content}</Text>
      </View>
    );
  }
  // chart / image → labeled placeholder (real media plugs in later).
  const icon = stimulus.kind === 'chart' ? 'bar-chart-outline' : 'image-outline';
  return (
    <View style={styles.mediaBox}>
      <Ionicons name={icon} size={34} color={colors.textMuted} />
      {stimulus.caption ? <Text style={styles.caption}>{stimulus.caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  kicker: { ...typography.label, color: colors.primary, marginBottom: spacing.sm },
  prompt: { marginBottom: spacing.lg },
  answers: { marginTop: spacing.sm },

  codeBox: {
    backgroundColor: '#2A2140',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  codeText: {
    color: '#F3EEFF',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
  formulaBox: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  formulaText: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  paragraphBox: {
    backgroundColor: palette.parchment,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  paragraphText: { ...typography.body, color: colors.textPrimary, fontStyle: 'italic' },
  mediaBox: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  caption: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
});
