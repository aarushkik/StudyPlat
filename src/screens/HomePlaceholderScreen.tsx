import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Mascot, ScreenContainer } from '@/components';
import { accents, colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getDailyGoal, getExperienceLevel, PLACEMENT_LEVELS } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';

/**
 * Minimal placeholder home. Confirms the onboarding + placement choices carried
 * through and hints at what's coming. The real dashboard (lesson path, XP,
 * streaks, boss battles) is intentionally out of scope for this milestone.
 */
export function HomePlaceholderScreen() {
  const { courseId, dailyGoalId, experienceLevelId, placementLevelId } = useOnboarding();
  const course = getCourse(courseId);
  const goal = getDailyGoal(dailyGoalId);
  const experience = getExperienceLevel(experienceLevelId);
  const level = placementLevelId ? PLACEMENT_LEVELS[placementLevelId] : undefined;
  const accent = course ? accents[course.accent] : accents.pink;

  return (
    <ScreenContainer scroll>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.flex}>
          <Text style={typography.caption}>Welcome to</Text>
          <Text style={typography.title}>stuAP</Text>
        </View>
        <Mascot size="small" expression="happy" />
      </View>

      {/* Placement result */}
      {level ? (
        <View style={styles.levelCard}>
          <Text style={styles.levelEmoji}>{level.emoji}</Text>
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
            <View style={[styles.badge, { backgroundColor: accent.soft }]}>
              <Text style={styles.emoji}>{course.emoji}</Text>
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
          <Text style={typography.label}>DAILY GOAL</Text>
          <Text style={[typography.subtitle, styles.dualValue]}>
            {goal ? `${goal.minutes} min` : '—'}
          </Text>
          <Text style={typography.caption}>{goal ? goal.tag : 'per day'}</Text>
        </View>
        <View style={[styles.card, styles.half, shadows.sm]}>
          <Text style={typography.label}>EXPERIENCE</Text>
          <Text style={[typography.subtitle, styles.dualValue]} numberOfLines={2}>
            {experience ? experience.label : '—'}
          </Text>
        </View>
      </View>

      {/* Placeholder for the future lesson path */}
      <View style={styles.pathCard}>
        <Text style={styles.pathEmoji}>🗺️</Text>
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
  levelEmoji: { fontSize: 34 },
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
  emoji: { fontSize: 26 },
  muted: { marginTop: spacing.sm, color: colors.textMuted },

  dualRow: { flexDirection: 'row', gap: spacing.lg },
  half: { flex: 1 },
  dualValue: { marginTop: spacing.sm },

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
  pathEmoji: { fontSize: 40, marginBottom: spacing.sm },
  pathTitle: { color: colors.primaryDark },
  pathBody: { textAlign: 'center', marginTop: spacing.xs },
});
