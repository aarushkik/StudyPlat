import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/theme';
import { isLightTrack } from '@/data/tracks';
import type { QuestUnit } from '@/types/quest';
import { GlassSurface } from '@/components/ui/GlassSurface';

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
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const { track } = unit;
  const light = isLightTrack(track.deep);
  const ink = colors.textPrimary;
  const sub = colors.textSecondary;
  const n = track.n < 10 ? `0${track.n}` : `${track.n}`;

  return (
    <GlassSurface style={styles.bar}>
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
    </GlassSurface>
  );
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginHorizontal: 14,
    marginBottom: 8,
    borderRadius: 22,
  },
  body: { flex: 1, minWidth: 0 },
  kicker: { fontFamily: fonts.bodyBlack, fontSize: 10, lineHeight: 13, letterSpacing: 1.6 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 19, lineHeight: 21, marginTop: 1 },
  counter: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  counterText: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.ink },
});
