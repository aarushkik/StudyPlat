import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Glyph } from '@/components/icons';
import { colors, palette, radius, spacing, typography } from '@/theme';
import type { PlacementQuestion, QuestionDifficulty, Stimulus } from '@/types';

interface QuestionCardProps {
  question: PlacementQuestion;
  /** The answer UI (choices or text input), rendered by the parent. */
  children: React.ReactNode;
}

/** Human-readable difficulty, with a color that escalates alongside it. */
const DIFFICULTY: Record<QuestionDifficulty, { label: string; color: string; tint: string }> = {
  foundation: { label: 'Foundation', color: '#1F9A6E', tint: '#DFF6EC' },
  developing: { label: 'Developing', color: '#1173C4', tint: '#DDEEFF' },
  ap_ready: { label: 'AP level', color: '#C4740F', tint: '#FCEBD4' },
  advanced: { label: 'Challenge', color: '#8E1E4F', tint: '#FFE1EC' },
};

/** Renders a question's skill kicker, prompt, optional stimulus, and answers. */
export function QuestionCard({ question, children }: QuestionCardProps) {
  const difficulty = DIFFICULTY[question.difficulty];

  return (
    <View>
      <View style={styles.tags}>
        <View style={styles.skillTag}>
          <Text style={styles.skillText}>{question.skillTag}</Text>
        </View>
        <View style={[styles.difficultyTag, { backgroundColor: difficulty.tint }]}>
          <Text style={[styles.difficultyText, { color: difficulty.color }]}>{difficulty.label}</Text>
        </View>
      </View>

      <Text style={[typography.title, styles.prompt]}>{question.prompt}</Text>
      {question.stimulus ? <StimulusBlock stimulus={question.stimulus} /> : null}
      <View style={styles.answers}>{children}</View>
    </View>
  );
}

/**
 * Supporting material above the prompt. Each kind gets a container that looks
 * like the thing it is — a dark editor for code, a chalk panel for a formula,
 * a ruled parchment for a passage — so students orient before they read.
 */
function StimulusBlock({ stimulus }: { stimulus: Stimulus }) {
  if (stimulus.kind === 'code') {
    return (
      <View style={styles.codeBox}>
        <View style={styles.codeBar}>
          {['#FF5A6A', '#FFB02E', '#37C98B'].map((c) => (
            <View key={c} style={[styles.codeDot, { backgroundColor: c }]} />
          ))}
        </View>
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
        {stimulus.caption ? <Text style={styles.sourceLine}>{stimulus.caption}</Text> : null}
      </View>
    );
  }

  // chart / image → a labeled frame; real media plugs in here later.
  return (
    <View style={styles.mediaBox}>
      <Glyph name={stimulus.kind === 'chart' ? 'chart' : 'page'} size={30} color={colors.textMuted} strokeWidth={2} />
      <Text style={styles.caption}>{stimulus.caption ?? stimulus.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  skillTag: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    flexShrink: 1,
  },
  skillText: { ...typography.overline, color: colors.primary },
  difficultyTag: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 5 },
  difficultyText: { ...typography.overline },

  prompt: { marginBottom: spacing.lg },
  answers: { marginTop: spacing.sm },

  codeBox: { backgroundColor: '#2A2140', borderRadius: radius.lg, overflow: 'hidden', marginBottom: spacing.lg },
  codeBar: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  codeDot: { width: 9, height: 9, borderRadius: 5 },
  codeText: {
    color: '#F3EEFF',
    fontSize: 14,
    lineHeight: 21,
    padding: spacing.lg,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },

  formulaBox: {
    backgroundColor: '#2F2A40',
    borderRadius: radius.lg,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  formulaText: { fontSize: 24, fontWeight: '700', color: '#FFF3E6', letterSpacing: 0.5 },

  paragraphBox: {
    backgroundColor: palette.parchment,
    borderRadius: radius.lg,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  paragraphText: { ...typography.body, color: colors.textPrimary, fontStyle: 'italic' },
  sourceLine: { ...typography.caption, marginTop: spacing.sm },

  mediaBox: {
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  caption: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
});
