import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, ScreenContainer } from '@/components/ui';
import { Glyph, PlacementIcon } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography, fonts } from '@/theme';
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
    /**
     * Staggered in parallel, not sequenced.
     *
     * This used to wait for the mascot's bouncy spring to report completion
     * before fading the card in. When that spring does not settle — a dropped
     * frame, a backgrounded app, a paused animation loop — the sequence never
     * advances and the entire result stays at opacity 0, leaving the student
     * looking at a mascot and a button on an empty screen.
     *
     * Nothing the student needs to read should be gated behind an animation
     * finishing. A delay gives the same staggered feel and always arrives.
     */
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 6, bounciness: 14 }),
      Animated.sequence([
        Animated.delay(260),
        Animated.parallel([
          Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.spring(shift, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 6 }),
        ]),
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

          <View style={styles.levelWrap}>
            <View style={styles.levelCardLip} />
            <View style={styles.levelCard}>
              <View style={styles.levelTile}>
                <PlacementIcon id={level.id} color={colors.primary} size={38} />
              </View>
              <Text style={styles.levelLabel}>Your starting point</Text>
              <Text style={typography.heading}>{level.title}</Text>
              <Text style={[typography.bodyStrong, styles.headline]}>{level.headline}</Text>
              <Text style={[typography.body, styles.desc]}>{level.description}</Text>
            </View>
          </View>

          <View style={styles.summaryWrap}>
            <View style={styles.summaryLip} />
            <View style={styles.summary}>
            <Row
              leading={
                course ? <Text style={styles.summaryAbbr}>{course.abbr}</Text> : null
              }
              text={course?.name ?? 'Your course'}
            />
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

  // Wrapper, lip, face — in that order. The lip used to be a sibling *inside*
  // the card, which meant it painted over the card's own cream fill and left
  // every line of text sitting on turquoise.
  levelWrap: { position: 'relative', marginBottom: 5 },
  levelCard: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    alignItems: 'center',
  },
  /** The card's hard 5pt drop, in the brand colour. */
  levelCardLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 5,
    bottom: -5,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  levelTile: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    borderWidth: 3,
    borderColor: colors.ink,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  summaryAbbr: { fontFamily: fonts.displayHeavy, fontSize: 13, color: colors.primaryDeep },
  levelLabel: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  headline: { color: colors.primaryDeep, textAlign: 'center', marginTop: spacing.xs },
  desc: { textAlign: 'center', marginTop: spacing.sm },

  summaryWrap: { alignSelf: 'stretch', position: 'relative', marginTop: spacing.xl, marginBottom: 4 },
  summaryLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 4,
    bottom: -4,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 3,
    borderColor: colors.ink,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  rowIcon: { width: 24, alignItems: 'center' },
  summaryText: { ...typography.bodyStrong, flexShrink: 1 },
  divider: { height: 2, borderRadius: 1, backgroundColor: 'rgba(18,48,60,0.14)' },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
