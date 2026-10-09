import { useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '@/theme';
import type { QuestUnit } from '@/types/quest';
import { GlassSurface } from '@/components/ui/GlassSurface';

interface UnitBannerProps {
  unit: QuestUnit;
  /** Stops cleared in this track. */
  cleared: number;
}

/**
 * The glass capsule naming the track you are currently in.
 *
 * It floats just under the HUD once you scroll past the top of the map, and
 * re-labels itself as you cross from one track into the next. Being glass,
 * the track's own colours pass underneath it, so the header still changes
 * colour as the landscape does — the strongest signal that you have moved —
 * without each track needing its own text colours to stay readable.
 */
export function UnitBanner({ unit, cleared }: UnitBannerProps) {
  const styles = useThemedStyles(createStyles);

  const { track } = unit;
  const n = track.n < 10 ? `0${track.n}` : `${track.n}`;

  return (
    <GlassSurface style={styles.bar}>
      <View style={styles.body}>
        <Text style={styles.kicker} numberOfLines={1}>
          TRACK {n} · {track.place.toUpperCase()}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
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

const createStyles = ({ colors }: AppTheme) => StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 9,
    marginHorizontal: 14,
    marginTop: 6,
    borderRadius: 27,
  },
  body: { flex: 1, minWidth: 0 },
  kicker: { fontFamily: fonts.bodyBlack, fontSize: 10, lineHeight: 13, letterSpacing: 1.6, color: colors.textSecondary },
  title: { fontFamily: fonts.displayHeavy, fontSize: 19, lineHeight: 21, marginTop: 1, color: colors.textPrimary },
  // Concentric with the capsule: a smaller capsule inset from its end.
  counter: {
    backgroundColor: colors.overlaySoft,
    borderRadius: 18,
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  counterText: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.ink },
});
