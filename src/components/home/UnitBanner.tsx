import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glyph } from '@/components/icons';
import { accents, colors, radius, shadows, spacing, typography } from '@/theme';
import type { QuestUnit } from '@/types/quest';

interface UnitBannerProps {
  unit: QuestUnit;
  /** Stops cleared in this unit, for the inline progress readout. */
  cleared: number;
  onOpenGuide: () => void;
}

/**
 * The header that rides above each region of the map. It stays pinned while
 * that region scrolls, so you always know which unit the stops under your
 * thumb belong to. Colored by the course accent, with a live cleared count.
 */
export function UnitBanner({ unit, cleared, onOpenGuide }: UnitBannerProps) {
  const accent = accents[unit.accent];
  const total = unit.nodes.length;

  return (
    <View style={styles.holder}>
      <View style={[styles.banner, shadows.md]}>
        <LinearGradient
          colors={[accent.base, accent.deep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.body}>
          <Text style={styles.kicker}>
            {unit.section} · {unit.unit}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {unit.title}
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(cleared / total) * 100}%` }]} />
            </View>
            <Text style={styles.count}>
              {cleared}/{total}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${unit.title} guide`}
          onPress={onOpenGuide}
          hitSlop={8}
          style={({ pressed }) => [styles.guide, pressed && styles.guidePressed]}
        >
          <Glyph name="page" size={24} color={colors.white} strokeWidth={2.2} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // An opaque strip behind the banner so pinned headers never show the trail
  // sliding underneath them.
  holder: { backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.xl,
    overflow: 'hidden',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  body: { flex: 1, paddingRight: spacing.md },
  kicker: { ...typography.overline, color: 'rgba(255,255,255,0.82)' },
  title: { ...typography.heading, color: colors.white, marginTop: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  track: { flex: 1, height: 7, borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.32)', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.white },
  count: { ...typography.label, color: 'rgba(255,255,255,0.92)' },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: 'rgba(255,255,255,0.3)', marginRight: spacing.md },
  guide: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  guidePressed: { opacity: 0.55, transform: [{ scale: 0.92 }] },
});
