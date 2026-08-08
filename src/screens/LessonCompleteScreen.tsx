import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '@/components/ui';
import { Glyph, type GlyphName } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'LessonComplete'>;
type Route = RouteProp<RootStackParamList, 'LessonComplete'>;

/**
 * The payoff at the end of a stop. Three numbers, one line of encouragement
 * pitched to how it actually went, and a single way back to the map — the
 * screen should feel like a reward, not a report card.
 */
export function LessonCompleteScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { streakDays } = useQuest();

  const { title, correct, total, xp } = params;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const verdict = VERDICTS.find((v) => accuracy >= v.min)!;

  const pop = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    // Staggered in parallel rather than sequenced — the same fix as the
    // placement result. `pop` also drives the copy's opacity, so gating it
    // behind a bouncy spring settling risks a summary the student cannot read.
    Animated.parallel([
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 6, bounciness: 14 }),
      Animated.sequence([
        Animated.delay(240),
        Animated.spring(rise, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 6 }),
      ]),
    ]).start();
  }, [pop, rise]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar style="dark" />

        <View style={styles.body}>
          <Animated.View style={{ transform: [{ scale: pop }] }}>
            <Mascot size={190} pose="celebrate" />
          </Animated.View>

          <Animated.View style={[styles.copy, { opacity: pop, transform: [{ translateY: rise }] }]}>
            <Text style={[typography.display, styles.headline]}>{verdict.headline}</Text>
            <Text style={[typography.body, styles.sub]} numberOfLines={2}>
              {title}
            </Text>

            <View style={[styles.stats, shadows.md]}>
              <Stat glyph="star" color={colors.gold} value={`+${xp}`} label="XP" />
              <View style={styles.divider} />
              <Stat glyph="target" color={colors.success} value={`${accuracy}%`} label="Accuracy" />
              <View style={styles.divider} />
              <Stat glyph="flame" color={colors.primary} value={String(streakDays)} label="Day streak" />
            </View>

            <Text style={[typography.body, styles.note]}>{verdict.note}</Text>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <AppButton
            label="Back to the map"
            icon="map"
            emphasis
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

/** Matched to accuracy, highest threshold first. */
const VERDICTS = [
  { min: 100, headline: 'Flawless', note: 'Every single one. That skill is yours now.' },
  { min: 80, headline: 'Strong run', note: 'That is comfortably above where you need to be for the exam.' },
  { min: 50, headline: 'Good progress', note: 'Solid footing. The next pass through will tighten the gaps.' },
  { min: 0, headline: 'Round one done', note: 'Rough first attempt is how it starts. Come back and take it again.' },
];

function Stat({ glyph, color, value, label }: { glyph: GlyphName; color: string; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Glyph name={glyph} size={22} color={color} strokeWidth={2.2} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  copy: { alignItems: 'center', alignSelf: 'stretch' },
  headline: { textAlign: 'center', marginTop: spacing.md },
  sub: { textAlign: 'center', marginTop: spacing.xs },

  stats: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    marginTop: spacing.xxl,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { ...typography.title, fontSize: 24, lineHeight: 30, marginTop: spacing.xs },
  divider: { width: 1, backgroundColor: colors.border, marginVertical: spacing.xs },

  note: { textAlign: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.md },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
});
