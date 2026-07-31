import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CourseIcon, Glyph, type GlyphName } from '@/components/icons';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import type { APCourse } from '@/types';

interface QuestHudProps {
  course?: APCourse;
  streakDays: number;
  gems: number;
  /** Lessons finished today and the goal, drawn as a small ring. */
  today: number;
  goal: number;
}

/**
 * The status bar that floats over the map: which course you're in on the left,
 * then streak, gems, and today's progress. It sits above the scroll rather than
 * inside it so the numbers stay visible while you explore the trail.
 */
export function QuestHud({ course, streakDays, gems, today, goal }: QuestHudProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, shadows.sm, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.courseChip}>
        {course ? <CourseIcon courseId={course.id} size={26} animate={false} /> : null}
        <Text style={styles.courseName} numberOfLines={1}>
          {course?.shortName ?? 'Your course'}
        </Text>
      </View>

      <View style={styles.stats}>
        <Stat glyph="flame" color={colors.gold} value={String(streakDays)} label="day streak" />
        <Stat glyph="gem" color={colors.splash} value={String(gems)} label="gems" />
        <GoalRing today={today} goal={goal} />
      </View>
    </View>
  );
}

function Stat({ glyph, color, value, label }: { glyph: GlyphName; color: string; value: string; label: string }) {
  return (
    <View style={styles.stat} accessibilityLabel={`${value} ${label}`}>
      <Glyph name={glyph} size={20} color={color} />
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

/** Today's lessons against the daily goal, as a tiny segmented ring. */
function GoalRing({ today, goal }: { today: number; goal: number }) {
  const done = Math.min(today, goal);
  return (
    <View style={styles.stat} accessibilityLabel={`${done} of ${goal} lessons today`}>
      <View style={styles.pips}>
        {Array.from({ length: goal }).map((_, i) => (
          <View key={i} style={[styles.pip, i < done && styles.pipOn]} />
        ))}
      </View>
      <Text style={styles.statValue}>
        {done}/{goal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  courseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    paddingLeft: spacing.sm,
    paddingRight: spacing.md,
    paddingVertical: 5,
    flexShrink: 1,
  },
  courseName: { ...typography.label, color: colors.primaryDeep, flexShrink: 1 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginLeft: 'auto' },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statValue: { ...typography.numeral, fontSize: 15 },
  pips: { flexDirection: 'row', gap: 3 },
  pip: { width: 6, height: 14, borderRadius: 3, backgroundColor: colors.disabledBg },
  pipOn: { backgroundColor: colors.success },
});
