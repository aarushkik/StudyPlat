import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import type { QuestNode } from '@/types/quest';

interface ProgressPanelProps {
  onSelect: (node: QuestNode) => void;
}

/** Eight days of session volume. Placeholder shape until sessions are logged. */
const WEEK = [40, 52, 48, 66, 61, 74, 70, 88];
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'];

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
export function BattlesPanel({ onSelect }: ProgressPanelProps) {
  const { map, stateOf, completed } = useQuest();

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
          {WEEK.map((v, i) => (
            <View key={i} style={styles.barCol}>
              <View
                style={[
                  styles.bar,
                  { height: Math.round(v * 0.62), backgroundColor: i === WEEK.length - 1 ? colors.primary : '#BDE9F0' },
                ]}
              />
              <Text style={styles.barLabel}>{WEEK_LABELS[i]}</Text>
            </View>
          ))}
        </View>
      </ChunkyCard>

      <Text style={styles.section}>TRACK BY TRACK</Text>
      <View style={styles.tight}>
        {tracks.map(({ unit, pct }) => (
          <ChunkyCard key={unit.id} contentStyle={styles.trackRow}>
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
        {WEAK.map((w) => (
          <ChunkyCard key={w.name} contentStyle={styles.weakCard}>
            <View style={styles.weakTop}>
              <Text style={styles.weakName}>{w.name}</Text>
              <Text style={styles.weakPct}>{w.pct}%</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${w.pct}%` }]} />
            </View>
            <Pressable accessibilityRole="button" style={styles.drill}>
              <Text style={styles.drillText}>DRILL THIS · {w.count} QUESTIONS</Text>
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
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  deltaText: { fontFamily: fonts.bodyHeavy, fontSize: 12.5, color: palette.inkSoft },

  bars: { marginTop: 14, flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 80 },
  barCol: { flex: 1, alignItems: 'center', gap: 6 },
  bar: {
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 3,
    borderColor: colors.ink,
  },
  barLabel: { fontFamily: fonts.bodyHeavy, fontSize: 10, color: '#A8B6BA' },

  section: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.6, color: colors.textMuted, marginTop: 20 },
  sectionWarn: { color: palette.ember },
  tight: { marginTop: 9, gap: 7 },
  stack: { marginTop: 9, gap: 9 },
  stackTop: { marginTop: 9 },

  trackRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 11 },
  trackDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: colors.ink },
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
    borderRadius: 15,
    backgroundColor: palette.violet,
    borderWidth: 3,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bossPip: { width: 18, height: 18, borderRadius: 5, backgroundColor: '#E4D3FA', transform: [{ rotate: '45deg' }] },
  bossBody: { flex: 1, minWidth: 0 },
  bossName: { fontFamily: fonts.displayHeavy, fontSize: 17, lineHeight: 19, color: colors.ink },
  bossMeta: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted, marginTop: 1 },

  weakCard: { paddingHorizontal: 15, paddingVertical: 13 },
  weakTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  weakName: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 14.5, color: colors.ink },
  weakPct: { fontFamily: fonts.displayHeavy, fontSize: 18, color: palette.ember },
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
    borderRadius: 13,
    paddingVertical: 10,
    alignItems: 'center',
  },
  drillText: { fontFamily: fonts.bodyBlack, fontSize: 12.5, letterSpacing: 1, color: colors.white },
});
