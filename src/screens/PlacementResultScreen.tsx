import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, ScreenContainer } from '@/components/ui';
import { CourseIcon, Glyph, PlacementIcon } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getScoreGoal, PLACEMENT_LEVELS } from '@/data';
import { getQuestMap, headStartFor } from '@/data/questMap';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PlacementResult'>;

/**
 * The reveal at the end of placement: which level the student landed on, and —
 * the part that actually matters — how much of the quest map that opens. Saying
 * "your map opens at stop 10" makes the result concrete before they ever see it.
 */
export function PlacementResultScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, goalScoreId, placementLevelId } = useOnboarding();

  const course = getCourse(courseId);
  const goal = getScoreGoal(goalScoreId);
  const level = PLACEMENT_LEVELS[placementLevelId ?? 'beginner'];
  const map = getQuestMap(courseId);
  const headStart = headStartFor(placementLevelId);

  const scale = useRef(new Animated.Value(0.5)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const shift = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 6, bounciness: 14 }),
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(shift, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 6 }),
      ]),
    ]).start();
  }, [scale, fade, shift]);

  const startQuest = () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

  return (
    <ScreenContainer padded={false}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ alignItems: 'center', transform: [{ scale }] }}>
          <Mascot size={182} pose="celebrate" />
        </Animated.View>

        <Animated.View style={{ opacity: fade, transform: [{ translateY: shift }] }}>
          <Text style={[typography.title, styles.title]}>Your map is drawn</Text>

          <View style={[styles.levelCard, shadows.md]}>
            <LinearGradient
              colors={['#FFF6FA', '#FFE9F2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.levelTile}>
              <PlacementIcon id={level.id} color={colors.primary} size={38} />
            </View>
            <Text style={styles.levelLabel}>Your starting point</Text>
            <Text style={typography.heading}>{level.title}</Text>
            <Text style={[typography.bodyStrong, styles.headline]}>{level.headline}</Text>
            <Text style={[typography.body, styles.desc]}>{level.description}</Text>
          </View>

          <View style={styles.summary}>
            <Row leading={course ? <CourseIcon courseId={course.id} size={22} animate={false} /> : null} text={course?.name ?? 'Your course'} />
            <View style={styles.divider} />
            <Row leading={<Glyph name="target" size={20} color={colors.textSecondary} strokeWidth={2.1} />} text={goal?.label ?? 'Your goal'} />
            <View style={styles.divider} />
            <Row
              leading={<Glyph name="map" size={20} color={colors.textSecondary} strokeWidth={2.1} />}
              text={
                headStart > 0
                  ? `${headStart} stops already behind you across ${map.units.length} regions`
                  : `${map.units.length} regions charted and waiting`
              }
            />
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Open the map" icon="map" emphasis onPress={startQuest} />
      </View>
    </ScreenContainer>
  );
}

function Row({ leading, text }: { leading: React.ReactNode; text: string }) {
  return (
    <View style={styles.summaryRow}>
      <View style={styles.rowIcon}>{leading}</View>
      <Text style={styles.summaryText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl },
  title: { textAlign: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },

  levelCard: {
    borderRadius: radius.xxl,
    borderWidth: 2,
    borderColor: colors.primarySoft,
    padding: spacing.xl,
    alignItems: 'center',
    overflow: 'hidden',
  },
  levelTile: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  levelLabel: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  headline: { color: colors.primaryDeep, textAlign: 'center', marginTop: spacing.xs },
  desc: { textAlign: 'center', marginTop: spacing.sm },

  summary: {
    alignSelf: 'stretch',
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  rowIcon: { width: 24, alignItems: 'center' },
  summaryText: { ...typography.bodyStrong, flexShrink: 1 },
  divider: { height: 1, backgroundColor: colors.border },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
