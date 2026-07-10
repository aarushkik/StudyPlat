import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';

interface QuestStepProps {
  index: number;
  total: number;
  icon: string;
  title: string;
  description: string;
  /** Node color + connector tint. */
  color: string;
  tint: string;
}

/**
 * A single milestone in the "quest ahead" timeline: a numbered node on a
 * connecting rail beside a content card. Reads as a journey/path — distinct
 * from a plain feature list.
 */
export function QuestStep({ index, total, icon, title, description, color, tint }: QuestStepProps) {
  const isLast = index === total - 1;
  return (
    <View style={[styles.row, !isLast && styles.rowGap]}>
      <View style={styles.rail}>
        {!isLast ? <View style={[styles.line, { backgroundColor: tint }]} /> : null}
        <View style={[styles.node, { backgroundColor: color }]}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.white} />
        </View>
      </View>

      <View style={[styles.card, shadows.sm]}>
        <Text style={[styles.step, { color }]}>STEP {index + 1}</Text>
        <Text style={typography.subtitle}>{title}</Text>
        <Text style={[typography.body, styles.desc]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowGap: { paddingBottom: spacing.lg },
  rail: { width: 44, alignItems: 'center', position: 'relative' },
  line: { position: 'absolute', top: 22, bottom: 0, left: 20, width: 4, borderRadius: radius.pill },
  node: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginLeft: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  step: { ...typography.label, marginBottom: 2 },
  desc: { marginTop: 2 },
});
