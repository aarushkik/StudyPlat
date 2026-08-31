import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuest } from '@/state/QuestContext';
import { useOnboarding } from '@/state/OnboardingContext';
import { drillSize } from '@/data';
import { weakSpots, weakSpotMeta } from '@/data/weakSpots';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;
import type { QuestNode } from '@/types/quest';

interface ProgressPanelProps {
  onSelect: (node: QuestNode) => void;
  /** Switch to the map and scroll to this track. */
  onJumpToTrack: (index: number) => void;
}

/**
 * The last seven days, ending today.
 *
 * This used to be a hard-coded curve that rose pleasingly to the right. It
 * looked good and it was a lie: a student who had never opened the app saw a
 * full week of invented activity above a mastery figure of 0%. Per-day session
 * counts are not stored yet, but the streak is, and that is enough to say
 * truthfully which of the last seven days were practised.
 */
function lastSevenDays(streakDays: number): { label: string; hit: boolean; today: boolean }[] {
  const initials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const offset = 6 - i;
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    return {
      label: initials[d.getDay()],
      // The streak counts back from today, so the most recent `streakDays`
      // days are the practised ones.
      hit: offset < streakDays,
      today: offset === 0,
    };
  });
}

/** One line under the week, saying what the squares mean. */
function streakDaysLabel(streakDays: number): string {
  if (streakDays === 0) return 'No sessions yet — finish a stop and this week fills in.';
  if (streakDays === 1) return 'One day running. Come back tomorrow to keep it.';
  return `${streakDays} days running.`;
}

const WEAK: { name: string; pct: number; count: number }[] = [
  { name: 'Photosynthesis', pct: 58, count: 12 },
  { name: 'Enzyme Kinetics', pct: 62, count: 9 },
  { name: 'Water Potential', pct: 66, count: 8 },
];

/**
 * Progress — the whole run, measured.
 *
 * One number at the top, because a student who opens this tab wants to know if
 * they are winning before they want a breakdown. Then the shape of the week,
 * then every track as a bar, then the three things worth drilling — each with
 * the drill attached, so noticing a weakness and acting on it is one tap.
 *
 * The boss roster lives here too. Sixty fights is progress data as much as it
 * is a menu, and it has nowhere better to be.
 */
export function BattlesPanel({ onSelect, onJumpToTrack }: ProgressPanelProps) {
  const { map, stateOf, completed } = useQuest();
  const navigation = useNavigation<Nav>();
  const { courseId } = useOnboarding();
  const { streakDays, skills } = useQuest();
  const week = useMemo(() => lastSevenDays(streakDays), [streakDays]);
  const weak = useMemo(() => weakSpots(skills, courseId), [skills, courseId]);

  const { tracks, mastery, bossesBeaten, bossTotal, nextBoss } = useMemo(() => {
    const cleared = new Set(completed);
    const rows = map.units.map((unit) => {
      const done = unit.nodes.filter((n) => cleared.has(n.id)).length;
      return {
        unit,
        done,
        pct: Math.round((done / unit.nodes.length) * 100),
      };
    });
    const bosses = map.units.flatMap((u) => u.nodes.filter((n) => n.kind === 'boss'));
    return {
      tracks: rows,
      mastery: Math.round((cleared.size / map.order.length) * 100),
      bossesBeaten: bosses.filter((b) => cleared.has(b.id)).length,
      bossTotal: bosses.length,
      nextBoss: bosses.find((b) => stateOf(b.id) !== 'complete'),
    };
  }, [map, completed, stateOf]);

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Every track, measured.</Text>
        </View>
        <Image source={MASCOT_ART.progress} style={styles.headArt} resizeMode="contain" />
      </View>

      <ChunkyCard style={styles.masteryWrap} contentStyle={styles.mastery}>
        <View style={styles.masteryTop}>
          <View>
            <Text style={styles.overline}>COURSE MASTERY</Text>
            <Text style={styles.big}>
              {mastery}
              <Text style={styles.bigUnit}>%</Text>
            </Text>
          </View>
          <View style={styles.delta}>
            <Text style={styles.deltaText}>{bossesBeaten} of {bossTotal} bosses</Text>
          </View>
        </View>

        <View style={styles.bars}>
          {week.map((d, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.day, d.hit && styles.dayHit, d.today && styles.dayToday]} />
              <Text style={[styles.barLabel, d.today && styles.barLabelToday]}>{d.label}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.weekNote}>
          {streakDaysLabel(streakDays)}
        </Text>
      </ChunkyCard>

      <Text style={styles.section}>TRACK BY TRACK</Text>
      <View style={styles.tight}>
        {tracks.map(({ unit, pct }, i) => (
          <ChunkyCard
            key={unit.id}
            onPress={() => onJumpToTrack(i)}
            accessibilityLabel={`Go to ${unit.track.place} on the map`}
            contentStyle={styles.trackRow}
          >
            <View style={[styles.trackDot, { backgroundColor: unit.track.deep }]} />
            <Text style={styles.trackName} numberOfLines={1}>
              {unit.track.place}
            </Text>
            <View style={styles.miniTrack}>
              <View style={[styles.miniFill, { width: `${pct}%`, backgroundColor: unit.track.deep }]} />
            </View>
            <Text style={styles.trackPct}>{pct}%</Text>
          </ChunkyCard>
        ))}
      </View>

      {nextBoss ? (
        <>
          <Text style={styles.section}>NEXT FIGHT</Text>
          <ChunkyCard onPress={() => onSelect(nextBoss)} style={styles.stackTop} contentStyle={styles.bossRow}>
            <View style={styles.bossCrest}>
              <View style={styles.bossPip} />
            </View>
            <View style={styles.bossBody}>
              <Text style={styles.bossName} numberOfLines={2}>
                {nextBoss.title}
              </Text>
              <Text style={styles.bossMeta}>
                {nextBoss.minutes} min · {nextBoss.xp} XP
              </Text>
            </View>
          </ChunkyCard>
        </>
      ) : null}

      <Text style={[styles.section, styles.sectionWarn]}>NEEDS WORK</Text>
      <View style={styles.stack}>
        {weak.map((w) => (
          <ChunkyCard key={w.name} contentStyle={styles.weakCard}>
            <View style={styles.weakTop}>
              <Text style={styles.weakName}>{w.name}</Text>
              <Text style={styles.weakPct}>{w.pct >= 0 ? `${w.pct}%` : '—'}</Text>
            </View>
            <Text style={styles.weakMeta}>{weakSpotMeta(w)}</Text>
            {w.pct >= 0 ? (
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${w.pct}%` }]} />
              </View>
            ) : null}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Drill ${w.name}, ${w.count} questions`}
              onPress={() =>
                navigation.navigate('Quiz', { title: w.name, count: drillSize(courseId, w.count), xp: w.count * 5 })
              }
              style={({ pressed }) => [styles.drill, pressed && styles.drillPressed]}
            >
              <Text style={styles.drillText}>DRILL THIS · {drillSize(courseId, w.count)} QUESTIONS</Text>
            </Pressable>
          </ChunkyCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 18, paddingTop: 4, paddingBottom: 26 },

  head: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginTop: 6 },
  headText: { flex: 1 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 30, lineHeight: 32, letterSpacing: -0.6, color: colors.ink },
  subtitle: { fontFamily: fonts.bodySemibold, fontSize: 13.5, color: palette.mutedDeep, marginTop: 3 },
  headArt: { width: 132, height: 132, marginBottom: -10, marginRight: -10 },

  masteryWrap: { marginTop: 10 },
  mastery: { padding: 16 },
  masteryTop: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  overline: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.6, color: colors.textMuted },
  big: { fontFamily: fonts.displayHeavy, fontSize: 46, lineHeight: 48, color: colors.ink, marginTop: 2 },
  bigUnit: { fontSize: 22, color: colors.textMuted },
  delta: {
    marginBottom: 6,
    backgroundColor: '#D6F2F6',
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  deltaText: { fontFamily: fonts.bodyHeavy, fontSize: 12.5, color: palette.inkSoft },

  bars: { marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 7 },
  barCol: { flex: 1, alignItems: 'center', gap: 7 },
  // A day is hit or it is not. A bar height would imply a volume the app does
  // not measure.
  day: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 34,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgba(18,48,60,0.18)',
    backgroundColor: 'rgba(18,48,60,0.05)',
  },
  dayHit: { backgroundColor: colors.primary, borderColor: colors.ink },
  dayToday: { borderColor: colors.ink },
  barLabel: { fontFamily: fonts.bodyHeavy, fontSize: 10, color: '#A8B6BA' },
  barLabelToday: { color: colors.ink },
  weekNote: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted, marginTop: 12 },

  section: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.6, color: colors.textMuted, marginTop: 20 },
  sectionWarn: { color: palette.ember },
  tight: { marginTop: 9, gap: 7 },
  stack: { marginTop: 9, gap: 9 },
  stackTop: { marginTop: 9 },

  trackRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 11 },
  trackDot: { width: 15, height: 15, borderRadius: 8, borderWidth: 3, borderColor: colors.ink },
  trackName: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 13.5, color: colors.ink },
  miniTrack: {
    width: 88,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#E9DCC6',
    borderWidth: 2,
    borderColor: colors.ink,
    overflow: 'hidden',
  },
  miniFill: { height: '100%' },
  trackPct: { fontFamily: fonts.displayHeavy, fontSize: 13, color: colors.textSecondary, width: 34, textAlign: 'right' },

  bossRow: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 13 },
  bossCrest: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: palette.violet,
    borderWidth: 3,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bossPip: { width: 18, height: 18, borderRadius: 6, backgroundColor: '#E4D3FA', transform: [{ rotate: '45deg' }] },
  bossBody: { flex: 1, minWidth: 0 },
  bossName: { fontFamily: fonts.displayHeavy, fontSize: 17, lineHeight: 19, color: colors.ink },
  bossMeta: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted, marginTop: 1 },

  weakCard: { paddingHorizontal: 15, paddingVertical: 13 },
  weakTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  weakName: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 14.5, color: colors.ink },
  weakPct: { fontFamily: fonts.displayHeavy, fontSize: 18, color: palette.ember },
  weakMeta: { fontFamily: fonts.bodySemibold, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
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
  drill: {
    marginTop: 11,
    backgroundColor: palette.ember,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 17,
    paddingVertical: 10,
    alignItems: 'center',
  },
  drillPressed: { transform: [{ translateY: 2 }], opacity: 0.92 },
  drillText: { fontFamily: fonts.bodyBlack, fontSize: 12.5, letterSpacing: 1, color: colors.white },
});
