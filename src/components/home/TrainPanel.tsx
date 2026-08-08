import React, { useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard } from '@/components/ui';
import { chunky, colors, fonts, palette } from '@/theme';
import { useQuest } from '@/state/QuestContext';

/**
 * Practice — everything off the trail.
 *
 * The point of this tab is that nothing on it can hurt you: no stop is spent,
 * no streak is at risk. So it leads with one dark recommendation card that
 * already knows what you are worst at, and only then offers the menu. A grid
 * of four equal options with no recommendation is a decision, and a decision
 * is what stops people practising.
 */

const WEAK: { name: string; meta: string; pct: number }[] = [
  { name: 'Photosynthesis', meta: '41 answered · 8 wrong last week', pct: 58 },
  { name: 'Enzyme Kinetics', meta: '29 answered · trending down', pct: 62 },
  { name: 'Water Potential', meta: '18 answered · few attempts', pct: 66 },
];

const MODES: { name: string; meta: string; tile: string }[] = [
  { name: 'Timed set', meta: 'Exam pacing', tile: '#FBE6C7' },
  { name: 'Mistakes', meta: '38 saved', tile: '#D6F2F6' },
  { name: 'Boss rematch', meta: '2 available', tile: '#E8DFF7' },
  { name: 'Free response', meta: 'Long form', tile: '#DEEFE1' },
];

export function TrainPanel() {
  const { xp } = useQuest();

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Practice</Text>
          <Text style={styles.subtitle}>Off the trail. Nothing here can hurt your streak.</Text>
        </View>
        <Image source={MASCOT_ART.point} style={styles.headArt} resizeMode="contain" />
      </View>

      <Recommended xp={xp} />

      <Text style={styles.section}>WEAKEST CATEGORIES</Text>
      <View style={styles.stack}>
        {WEAK.map((w) => (
          <ChunkyCard key={w.name} onPress={() => {}} contentStyle={styles.weakCard}>
            <View style={styles.weakBody}>
              <Text style={styles.weakName}>{w.name}</Text>
              <Text style={styles.weakMeta}>{w.meta}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${w.pct}%` }]} />
              </View>
            </View>
            <Text style={styles.weakPct}>{w.pct}%</Text>
          </ChunkyCard>
        ))}
      </View>

      <Text style={styles.section}>OTHER WAYS IN</Text>
      <View style={styles.grid}>
        {MODES.map((m) => (
          <ChunkyCard key={m.name} onPress={() => {}} style={styles.gridItem} contentStyle={styles.modeCard}>
            <View style={[styles.modeTile, { backgroundColor: m.tile }]} />
            <Text style={styles.modeName}>{m.name}</Text>
            <Text style={styles.modeMeta}>{m.meta}</Text>
          </ChunkyCard>
        ))}
      </View>
    </ScrollView>
  );
}

/**
 * The one card that decides for you. Ink ground with a turquoise lip — the
 * only place in the light half of the app that inverts, so it cannot be
 * mistaken for one more option in the list.
 */
function Recommended({ xp }: { xp: number }) {
  const press = useRef(new Animated.Value(0)).current;
  const c = chunky({ depth: 6, radius: 26, shadow: '#05707F', background: colors.ink, border: colors.ink });
  const to = (v: number) =>
    Animated.spring(press, { toValue: v, useNativeDriver: true, speed: 50, bounciness: 0 }).start();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Start the weak-spot drill"
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      style={[c.wrap, styles.heroWrap]}
    >
      <View style={c.lip} />
      <Animated.View
        style={[
          c.face,
          styles.hero,
          { transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] }) }] },
        ]}
      >
        {/* A turquoise wash bleeding off the top-right corner. */}
        <View style={styles.heroGlow} pointerEvents="none" />
        <Text style={styles.heroKicker}>RECOMMENDED TODAY</Text>
        <Text style={styles.heroTitle}>Weak-spot drill</Text>
        <Text style={styles.heroBody}>
          12 questions pulled from Photosynthesis, Enzyme Kinetics and Water Potential.
        </Text>
        <View style={styles.heroCta}>
          <Text style={styles.heroCtaText}>START · 4 MIN</Text>
        </View>
        <Text style={styles.heroXp}>{xp} XP earned so far</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 18, paddingTop: 4, paddingBottom: 26 },

  head: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 6 },
  headText: { flex: 1 },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: colors.ink,
  },
  subtitle: { fontFamily: fonts.bodySemibold, fontSize: 13.5, color: palette.mutedDeep, marginTop: 3 },
  headArt: { width: 104, height: 104, marginBottom: -8 },

  heroWrap: { marginTop: 12 },
  hero: { padding: 18, overflow: 'hidden' },
  heroGlow: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(5,177,201,0.22)',
  },
  heroKicker: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.8, color: '#7FE0EC' },
  heroTitle: { fontFamily: fonts.displayHeavy, fontSize: 24, lineHeight: 26, color: colors.white, marginTop: 4 },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 19,
    color: '#A9C3C9',
    marginTop: 5,
    maxWidth: 250,
  },
  heroCta: {
    alignSelf: 'flex-start',
    marginTop: 14,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  heroCtaText: { fontFamily: fonts.bodyBlack, fontSize: 13, letterSpacing: 1, color: '#052F37' },
  heroXp: { fontFamily: fonts.bodySemibold, fontSize: 11.5, color: '#7C9199', marginTop: 12 },

  section: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.textMuted,
    marginTop: 20,
  },
  stack: { marginTop: 9, gap: 9 },

  weakCard: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 15, paddingVertical: 13 },
  weakBody: { flex: 1 },
  weakName: { fontFamily: fonts.bodyHeavy, fontSize: 15, color: colors.ink },
  weakMeta: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted, marginTop: 1 },
  barTrack: {
    marginTop: 8,
    height: 10,
    borderRadius: 7,
    backgroundColor: palette.sand,
    borderWidth: 2,
    borderColor: colors.ink,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: palette.ember },
  weakPct: { fontFamily: fonts.displayHeavy, fontSize: 20, color: palette.ember },

  grid: { marginTop: 9, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  // Two per row: half the 375-wide gutter box, less half the 10pt gap.
  gridItem: { width: '48%' },
  modeCard: { padding: 14 },
  modeTile: { width: 34, height: 34, borderRadius: 12, borderWidth: 3, borderColor: colors.ink },
  modeName: { fontFamily: fonts.bodyHeavy, fontSize: 14.5, color: colors.ink, marginTop: 10 },
  modeMeta: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted },
});
