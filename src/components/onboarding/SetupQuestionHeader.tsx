import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, SpeechBubble, TopBackButton } from '@/components/ui';
import { Mascot } from '@/components/Mascot';
import type { MascotAccessory, MascotExpression } from '@/components/Mascot';
import { spacing } from '@/theme';

interface SetupQuestionHeaderProps {
  onBack: () => void;
  /** 0–1 onboarding progress. */
  progress: number;
  /** The question Stu asks in the speech bubble. */
  question: string;
  mascotExpression?: MascotExpression;
  mascotAccessory?: MascotAccessory;
}

/**
 * Shared top block for the setup screens: back button + progress bar, then Stu
 * beside a speech bubble asking the screen's question. Keeps every setup screen
 * visually consistent.
 */
export function SetupQuestionHeader({
  onBack,
  progress,
  question,
  mascotExpression = 'happy',
  mascotAccessory = 'book',
}: SetupQuestionHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <TopBackButton onPress={onBack} style={styles.back} />
        <ProgressBar progress={progress} />
      </View>

      <View style={styles.mascotRow}>
        <Mascot size="small" expression={mascotExpression} accessory={mascotAccessory} />
        <SpeechBubble text={question} tail="left" style={styles.bubble} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  back: { marginLeft: -spacing.sm, marginRight: spacing.sm },
  mascotRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  bubble: { flex: 1, marginLeft: spacing.md },
});
