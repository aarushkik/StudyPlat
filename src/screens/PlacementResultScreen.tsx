import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, CourseIcon, Mascot, PlacementIcon, ScreenContainer } from '@/components';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getScoreGoal, PLACEMENT_LEVELS } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PlacementResult'>;

/** Screen 6: celebrate and reveal the recommended starting level. */
export function PlacementResultScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, goalScoreId, placementLevelId } = useOnboarding();

  const course = getCourse(courseId);
  const goal = getScoreGoal(goalScoreId);
  const level = PLACEMENT_LEVELS[placementLevelId ?? 'beginner'];

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
          <Mascot size="large" expression="celebrating" animated />
        </Animated.View>

        <Animated.View style={{ opacity: fade, transform: [{ translateY: shift }] }}>
          <Text style={[typography.title, styles.title]}>Your AP quest is mapped!</Text>

          <View style={styles.levelCard}>
            <View style={styles.levelTile}>
              <PlacementIcon id={level.id} color={colors.primary} size={38} />
            </View>
            <Text style={styles.levelLabel}>YOUR STARTING POINT</Text>
            <Text style={typography.heading}>{level.title}</Text>
            <Text style={[typography.bodyStrong, styles.headline]}>{level.headline}</Text>
            <Text style={[typography.body, styles.desc]}>{level.description}</Text>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              {course ? <CourseIcon courseId={course.id} color={colors.primary} size={20} /> : null}
              <Text style={styles.summaryText}>{course?.name ?? 'Your course'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Ionicons name="flag-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.summaryText}>{goal ? goal.label : 'Your goal'}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Start my AP quest" onPress={startQuest} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl },
  title: { textAlign: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },

  levelCard: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.xxl,
    borderWidth: 2,
    borderColor: colors.primarySoft,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.sm,
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
  levelLabel: { ...typography.label, color: colors.primary, marginBottom: spacing.xs },
  headline: { color: colors.primaryDark, textAlign: 'center', marginTop: spacing.xs },
  desc: { textAlign: 'center', marginTop: spacing.sm },

  summary: {
    alignSelf: 'stretch',
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  summaryText: { ...typography.bodyStrong, flexShrink: 1 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
