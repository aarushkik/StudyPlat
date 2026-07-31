import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, radius, shadows, spacing, typography } from '@/theme';

interface QuestStepProps {
  index: number;
  total: number;
  icon: GlyphName;
  title: string;
  description: string;
  /** Node color + connector tint. */
  color: string;
  tint: string;
}

/**
 * A single milestone in the "quest ahead" timeline: a numbered node on a
 * connecting rail beside a content card. Reads as a journey rather than a
 * bulleted feature list — the same visual language as the quest map itself.
 */
export function QuestStep({ index, total, icon, title, description, color, tint }: QuestStepProps) {
  const isLast = index === total - 1;
  return (
    <View style={[styles.row, !isLast && styles.rowGap]}>
      <View style={styles.rail}>
        {!isLast ? <View style={[styles.line, { backgroundColor: tint }]} /> : null}
        <View style={[styles.node, { backgroundColor: color }]}>
          <Glyph name={icon} size={21} color={colors.white} strokeWidth={2.2} />
        </View>
        <View style={[styles.nodeRing, { borderColor: tint }]} pointerEvents="none" />
      </View>

      <View style={[styles.card, shadows.sm]}>
        <Text style={[styles.step, { color }]}>Step {index + 1}</Text>
        <Text style={typography.subtitle}>{title}</Text>
        <Text style={[typography.body, styles.desc]}>{description}</Text>
      </View>
    </View>
  );
}

const NODE = 46;

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowGap: { paddingBottom: spacing.lg },
  rail: { width: NODE, alignItems: 'center' },
  line: { position: 'absolute', top: NODE / 2, bottom: -spacing.lg, width: 4, borderRadius: radius.pill },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeRing: {
    position: 'absolute',
    top: -4,
    width: NODE + 8,
    height: NODE + 8,
    borderRadius: radius.pill,
    borderWidth: 3,
  },
  card: {
    flex: 1,
    marginLeft: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  step: { ...typography.overline, marginBottom: 2 },
  desc: { marginTop: 2 },
});
