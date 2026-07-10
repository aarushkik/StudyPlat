import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar, TopBackButton } from '@/components/ui';
import { Mascot } from '@/components/Mascot';
import type { MascotAccessory, MascotExpression } from '@/components/Mascot';
import { spacing, typography } from '@/theme';

interface SetupQuestionHeaderProps {
  onBack: () => void;
  /** 0–1 onboarding progress. */
  progress: number;
  /** The screen's headline question. */
  question: string;
  /** Optional supporting line under the headline. */
  subtitle?: string;
  mascotExpression?: MascotExpression;
  mascotAccessory?: MascotAccessory;
}

/**
 * Shared top block for the setup screens: back button + progress bar, then a
 * bold headline with Stu as a small friendly accent. Deliberately a clean
 * headline layout (not a mascot speech bubble) to feel original.
 */
export function SetupQuestionHeader({
  onBack,
  progress,
  question,
  subtitle,
  mascotExpression = 'happy',
  mascotAccessory = 'none',
}: SetupQuestionHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <TopBackButton onPress={onBack} style={styles.back} />
        <ProgressBar progress={progress} />
      </View>

      <View style={styles.headlineRow}>
        <View style={styles.textCol}>
          <Text style={typography.title}>{question}</Text>
          {subtitle ? <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text> : null}
        </View>
        <Mascot size={68} expression={mascotExpression} accessory={mascotAccessory} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  back: { marginLeft: -spacing.sm, marginRight: spacing.sm },
  headlineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xl },
  textCol: { flex: 1, paddingRight: spacing.md, paddingTop: spacing.xs },
  subtitle: { marginTop: spacing.sm },
});
