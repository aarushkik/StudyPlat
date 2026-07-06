import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProgressBar } from '@/components/ui';
import { colors, palette, spacing } from '@/theme';

interface QuizProgressHeaderProps {
  onClose: () => void;
  /** 0–1 quiz progress. */
  progress: number;
  /** 0–1 running "confidence" (share of answers correct so far). */
  confidence: number;
}

/** Quiz top bar: close button, animated progress, and a confidence meter. */
export function QuizProgressHeader({ onClose, progress, confidence }: QuizProgressHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close quiz">
        <Ionicons name="close" size={28} color={colors.textMuted} />
      </Pressable>

      <View style={styles.bar}>
        <ProgressBar progress={progress} color={colors.primary} />
      </View>

      <View style={styles.confidence}>
        <Ionicons name="flash" size={16} color={palette.amber} />
        <View style={styles.miniTrack}>
          <ProgressBar progress={confidence} color={colors.success} height={8} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  bar: { flex: 1 },
  confidence: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniTrack: { width: 40 },
});
