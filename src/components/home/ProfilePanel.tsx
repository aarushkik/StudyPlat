import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CourseIcon, Glyph, PlacementIcon, type GlyphName } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getExamTimeframe, getExperienceLevel, getScoreGoal, PLACEMENT_LEVELS } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import { useQuest } from '@/state/QuestContext';

/**
 * The student's own page: what they've built up, and the plan they set during
 * setup. Everything here is real state carried through from onboarding and the
 * map, so it stays honest as they play.
 */
export function ProfilePanel() {
  const { courseId, goalScoreId, examTimeframeId, experienceLevelId, placementLevelId } = useOnboarding();
  const { xp, gems, streakDays, completed, map } = useQuest();

  const course = getCourse(courseId);
  const goal = getScoreGoal(goalScoreId);
  const exam = getExamTimeframe(examTimeframeId);
  const experience = getExperienceLevel(experienceLevelId);
  const level = placementLevelId ? PLACEMENT_LEVELS[placementLevelId] : undefined;
  const totalStops = map.units.reduce((n, u) => n + u.nodes.length, 0);

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Mascot size={104} expression="proud" />
        <View style={styles.heroText}>
          <Text style={typography.title}>Your quest</Text>
          <Text style={[typography.body, styles.heroBody]} numberOfLines={2}>
            {course ? `${course.name} · ${completed.length} of ${totalStops} stops cleared` : 'No course selected yet'}
          </Text>
        </View>
      </View>

      <View style={styles.statGrid}>
        <StatTile glyph="flame" color={colors.gold} value={String(streakDays)} label="Day streak" />
        <StatTile glyph="star" color={colors.primary} value={String(xp)} label="XP earned" />
        <StatTile glyph="gem" color={colors.splash} value={String(gems)} label="Gems" />
        <StatTile glyph="flag" color={colors.success} value={String(completed.length)} label="Stops cleared" />
      </View>

      {level ? (
        <View style={styles.levelCard}>
          <View style={styles.levelTile}>
            <PlacementIcon id={level.id} color={colors.primary} size={30} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.levelLabel}>Starting level</Text>
            <Text style={[typography.subtitle, { color: colors.primaryDeep }]}>{level.title}</Text>
            <Text style={typography.caption}>{level.headline}</Text>
          </View>
        </View>
      ) : null}

      <Text style={[typography.overline, styles.sectionLabel]}>Your plan</Text>
      <View style={[styles.list, shadows.xs]}>
        {course ? (
          <Row leading={<CourseIcon courseId={course.id} size={26} animate={false} />} label="Course" value={course.name} />
        ) : null}
        <Row glyph="target" label="Goal score" value={goal?.label ?? 'Not set'} />
        <Row glyph="calendar" label="Exam" value={exam?.label ?? 'Not set'} />
        <Row glyph="chart" label="Experience" value={experience?.label ?? 'Not set'} last />
      </View>
    </ScrollView>
  );
}

function StatTile({ glyph, color, value, label }: { glyph: GlyphName; color: string; value: string; label: string }) {
  return (
    <View style={[styles.tile, shadows.xs]}>
      <Glyph name={glyph} size={22} color={color} strokeWidth={2.2} />
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

function Row({
  glyph,
  leading,
  label,
  value,
  last,
}: {
  glyph?: GlyphName;
  leading?: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <View style={styles.rowIcon}>
        {leading ?? (glyph ? <Glyph name={glyph} size={22} color={colors.textSecondary} strokeWidth={2.1} /> : null)}
      </View>
      <Text style={[typography.body, styles.rowLabel]}>{label}</Text>
      <Text style={[typography.bodyStrong, styles.rowValue]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing.xl, paddingBottom: spacing.huge },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroText: { flex: 1 },
  heroBody: { marginTop: spacing.xs },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl },
  tile: {
    flexGrow: 1,
    flexBasis: '45%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: 2,
  },
  tileValue: { ...typography.title, fontSize: 26, lineHeight: 32, marginTop: spacing.sm },

  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primaryTint,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.primarySoft,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  levelTile: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLabel: { ...typography.overline, color: colors.primary },

  sectionLabel: { marginTop: spacing.xxl, marginBottom: spacing.sm },
  list: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 28, alignItems: 'center' },
  rowLabel: { flexShrink: 0 },
  rowValue: { flex: 1, textAlign: 'right' },
});
