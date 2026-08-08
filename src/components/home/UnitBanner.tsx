import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/theme';
import { isLightTrack } from '@/data/tracks';
import type { QuestUnit } from '@/types/quest';

interface UnitBannerProps {
  unit: QuestUnit;
  /** Stops cleared in this track. */
  cleared: number;
}

/**
 * The band naming the track you are currently in.
 *
 * Full-bleed and ruled top and bottom in ink — not an inset card. It sits
 * directly on the track's own colour so the header changes as you cross from
 * one place to the next, which is the strongest signal that you have moved.
 *
 * Text flips to cream on the darker tracks. The design only ever shows the
 * amber track and hard-codes ink, but these palettes run to slate, and ink on
 * slate is unreadable.
 */
export function UnitBanner({ unit, cleared }: UnitBannerProps) {
  const { track } = unit;
  const light = isLightTrack(track.deep);
  const ink = light ? colors.ink : colors.surface;
  const sub = light ? 'rgba(18,48,60,0.70)' : 'rgba(255,255,255,0.82)';
  const n = track.n < 10 ? `0${track.n}` : `${track.n}`;

  return (
    <View style={[styles.bar, { backgroundColor: track.deep }]}>
      <View style={styles.body}>
        <Text style={[styles.kicker, { color: sub }]} numberOfLines={1}>
          TRACK {n} · {track.place.toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: ink }]} numberOfLines={1}>
          {unit.title}
        </Text>
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {cleared}/{unit.nodes.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.ink,
  },
  body: { flex: 1, minWidth: 0 },
  kicker: { fontFamily: fonts.bodyBlack, fontSize: 10, lineHeight: 13, letterSpacing: 1.6 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 19, lineHeight: 21, marginTop: 1 },
  counter: {
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  counterText: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.ink },
});
