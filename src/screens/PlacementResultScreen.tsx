import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, Mascot, ScreenContainer } from '@/components';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { getCourse, getDailyGoal, PLACEMENT_LEVELS } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PlacementResult'>;

/** Screen 6: celebrate and reveal the recommended starting level. */
export function PlacementResultScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, dailyGoalId, placementLevelId } = useOnboarding();

  const course = getCourse(courseId);
  const goal = getDailyGoal(dailyGoalId);
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
          <Text style={[typography.title, styles.title]}>Your AP starting point is ready.</Text>

          <View style={styles.levelCard}>
            <Text style={styles.levelEmoji}>{level.emoji}</Text>
            <Text style={styles.levelLabel}>RECOMMENDED START</Text>
            <Text style={typography.heading}>{level.title}</Text>
            <Text style={[typography.bodyStrong, styles.headline]}>{level.headline}</Text>
            <Text style={[typography.body, styles.desc]}>{level.description}</Text>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryEmoji}>{course?.emoji ?? '📘'}</Text>
              <Text style={styles.summaryText}>{course?.name ?? 'Your course'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.summaryText}>
                {goal ? `${goal.minutes} min / day` : 'Daily goal'}
              </Text>
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
  levelEmoji: { fontSize: 44, marginBottom: spacing.sm },
  levelLabel: { ...typography.label, color: colors.primary, marginBottom: spacing.xs },
  headline: { color: colors.primaryDark, textAlign: 'center', marginTop: spacing.xs },
  desc: { textAlign: 'center', marginTop: spacing.sm },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  summaryEmoji: { fontSize: 20 },
  summaryText: { ...typography.bodyStrong },
  divider: { width: 1, height: 24, backgroundColor: colors.border, marginHorizontal: spacing.lg },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
