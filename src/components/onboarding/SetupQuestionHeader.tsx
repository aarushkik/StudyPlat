import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar, TopBackButton } from '@/components/ui';
import { Mascot } from '@/components/Mascot';
import type { MascotPose } from '@/components/Mascot';
import { colors, radius, spacing, typography } from '@/theme';

interface SetupQuestionHeaderProps {
  onBack: () => void;
  /** 1-based position in the setup flow, shown as a "Step n of total" chip. */
  step: number;
  total: number;
  /** The screen's headline question. */
  question: string;
  /** Optional supporting line under the headline. */
  subtitle?: string;
  mascotPose?: MascotPose;
}

/**
 * Shared top block for the setup screens: back control and progress bar, a
 * step chip so the flow always feels finite, then the headline with Stu as a
 * small reacting accent. Deliberately a clean headline rather than a speech
 * bubble — the bubble is saved for moments where Stu is actually talking.
 */
export function SetupQuestionHeader({
  onBack,
  step,
  total,
  question,
  subtitle,
  mascotPose = 'neutral',
}: SetupQuestionHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <TopBackButton onPress={onBack} style={styles.back} />
        <ProgressBar progress={step / total} />
      </View>

      <View style={styles.headlineRow}>
        <View style={styles.textCol}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>
              Step {step} of {total}
            </Text>
          </View>
          <Text style={typography.title}>{question}</Text>
          {subtitle ? <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text> : null}
        </View>
        <Mascot size={72} pose={mascotPose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  back: { marginLeft: -spacing.md, marginRight: spacing.xs },
  headlineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  textCol: { flex: 1, paddingRight: spacing.md },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    marginBottom: spacing.sm,
  },
  chipText: { ...typography.overline, color: colors.primary },
  subtitle: { marginTop: spacing.sm },
});
