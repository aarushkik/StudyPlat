import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  CourseIcon,
  ExamIcon,
  Mascot,
  MapIcon,
  PlacementIcon,
  ScoreGoalIcon,
  ScreenContainer,
  Wordmark,
} from '@/components';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getExamTimeframe, getExperienceLevel, getScoreGoal, PLACEMENT_LEVELS } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';

/**
 * Minimal placeholder home. Confirms the onboarding + placement choices carried
 * through and hints at what's coming. The real dashboard (lesson path, XP,
 * streaks, boss battles) is intentionally out of scope for this milestone.
 */
export function HomePlaceholderScreen() {
  const { courseId, goalScoreId, examTimeframeId, experienceLevelId, placementLevelId } = useOnboarding();
  const course = getCourse(courseId);
  const goal = getScoreGoal(goalScoreId);
  const exam = getExamTimeframe(examTimeframeId);
  const experience = getExperienceLevel(experienceLevelId);
  const level = placementLevelId ? PLACEMENT_LEVELS[placementLevelId] : undefined;

  return (
    <ScreenContainer scroll>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.flex}>
          <Text style={typography.caption}>Welcome to</Text>
          <Wordmark size={28} variant="brand" />
        </View>
        <Mascot size="small" expression="happy" />
      </View>

      {/* Placement result */}
      {level ? (
        <View style={styles.levelCard}>
          <View style={styles.levelTile}>
            <PlacementIcon id={level.id} color={colors.primary} size={30} />
          </View>
          <View style={styles.flex}>
            <Text style={typography.label}>YOUR STARTING LEVEL</Text>
            <Text style={[typography.subtitle, styles.levelTitle]}>{level.title}</Text>
            <Text style={typography.caption}>{level.headline}</Text>
          </View>
        </View>
      ) : null}

      <View style={[styles.card, shadows.sm]}>
        <Text style={typography.label}>YOUR COURSE</Text>
        {course ? (
          <View style={styles.row}>
            <View style={styles.badge}>
              <CourseIcon courseId={course.id} size={44} />
            </View>
            <View style={styles.flex}>
              <Text style={typography.subtitle}>{course.name}</Text>
              <Text style={typography.caption}>{course.blurb}</Text>
            </View>
          </View>
        ) : (
          <Text style={[typography.body, styles.muted]}>No course selected yet.</Text>
        )}
      </View>

      <View style={styles.dualRow}>
        <View style={[styles.card, styles.half, shadows.sm]}>
          <Text style={typography.label}>GOAL SCORE</Text>
          {goal ? (
            <>
              <View style={styles.tileIcon}>
                <ScoreGoalIcon id={goal.id} color={colors.primary} size={24} />
              </View>
              <Text style={[typography.bodyStrong, styles.tileValue]} numberOfLines={2}>
                {goal.label}
              </Text>
            </>
          ) : (
            <Text style={[typography.subtitle, styles.tileValue]}>—</Text>
          )}
        </View>
        <View style={[styles.card, styles.half, shadows.sm]}>
          <Text style={typography.label}>AP EXAM</Text>
          {exam ? (
            <>
              <View style={styles.tileIcon}>
                <ExamIcon id={exam.id} color={colors.primary} size={24} />
              </View>
              <Text style={[typography.bodyStrong, styles.tileValue]} numberOfLines={2}>
                {exam.label}
              </Text>
            </>
          ) : (
            <Text style={[typography.subtitle, styles.tileValue]}>—</Text>
          )}
        </View>
      </View>

      <View style={[styles.card, shadows.sm]}>
        <Text style={typography.label}>EXPERIENCE</Text>
        <Text style={[typography.subtitle, styles.dualValue]} numberOfLines={2}>
          {experience ? experience.label : '—'}
        </Text>
      </View>

      {/* Placeholder for the future lesson path */}
      <View style={styles.pathCard}>
        <View style={styles.pathIcon}>
          <MapIcon color={colors.primary} size={34} />
        </View>
        <Text style={[typography.subtitle, styles.pathTitle]}>Your lesson path</Text>
        <Text style={[typography.body, styles.pathBody]}>
          Lessons, XP, streaks, and review battles will appear here soon.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },

  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primaryTint,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.primarySoft,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  levelTile: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelTitle: { color: colors.primaryDark },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, gap: spacing.md },
  badge: { width: 52, height: 52, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  muted: { marginTop: spacing.sm, color: colors.textMuted },

  dualRow: { flexDirection: 'row', gap: spacing.lg },
  half: { flex: 1 },
  dualValue: { marginTop: spacing.sm },
  tileIcon: { marginTop: spacing.md, marginBottom: spacing.xs },
  tileValue: { marginTop: 2 },

  pathCard: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.primarySoft,
    borderStyle: 'dashed',
    padding: spacing.xxl,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  pathIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  pathTitle: { color: colors.primaryDark },
  pathBody: { textAlign: 'center', marginTop: spacing.xs },
});
