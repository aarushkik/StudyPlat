import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glyph } from '@/components/icons';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import type { QuestUnit } from '@/types/quest';

interface UnitBannerProps {
  unit: QuestUnit;
  /** Stops cleared in this area, for the inline progress readout. */
  cleared: number;
  /** Bosses beaten in this area, out of six. */
  bossesCleared: number;
  onOpenGuide: () => void;
}

/**
 * The header that rides above each area of the map. It stays pinned while that
 * area scrolls, so you always know which unit the stops under your thumb belong
 * to. Colored by the area's own biome rather than the course, so the banner
 * changes with the landscape — and it counts bosses, because six of them are
 * what actually stands between here and the next area.
 */
/**
 * Real AP unit names run long — "Consequences of Industrialization" is 33
 * characters — and at the banner's display size anything past ~21 was being
 * cut to an ellipsis. Step the type down instead of truncating: the unit name
 * is the one thing on the banner a student needs to read in full.
 */
function titleSizeFor(title: string): { fontSize: number; lineHeight: number } {
  if (title.length > 32) return { fontSize: 14, lineHeight: 20 };
  if (title.length > 30) return { fontSize: 15, lineHeight: 22 };
  if (title.length > 27) return { fontSize: 16, lineHeight: 23 };
  if (title.length > 23) return { fontSize: 18, lineHeight: 25 };
  if (title.length > 19) return { fontSize: 20, lineHeight: 28 };
  return { fontSize: 22, lineHeight: 30 };
}

export function UnitBanner({ unit, cleared, bossesCleared, onOpenGuide }: UnitBannerProps) {
  const theme = unit.track;
  const total = unit.nodes.length;

  return (
    <View style={styles.holder}>
      <View style={[styles.banner, shadows.md]}>
        <LinearGradient
          colors={[theme.deep, theme.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.body}>
          <Text style={styles.kicker} numberOfLines={1}>
            {unit.section} · {theme.place}
          </Text>
          <Text style={[styles.title, titleSizeFor(unit.title)]} numberOfLines={1}>
            {unit.title}
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(cleared / total) * 100}%` }]} />
            </View>
            <View style={styles.bosses}>
              <Glyph name="swords" size={13} color={colors.white} strokeWidth={2.4} />
              <Text style={styles.count}>{bossesCleared}/6</Text>
            </View>
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
  body: { flex: 1, paddingRight: spacing.sm },
  kicker: { ...typography.overline, color: 'rgba(255,255,255,0.82)' },
  title: { ...typography.heading, color: colors.white, marginTop: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm },
  track: { flex: 1, height: 7, borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.32)', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.white },
  bosses: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  count: { ...typography.label, color: 'rgba(255,255,255,0.92)' },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: 'rgba(255,255,255,0.3)', marginRight: spacing.md },
  guide: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  guidePressed: { opacity: 0.55, transform: [{ scale: 0.92 }] },
});
