import React from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { PROP_ART, type PropName } from '@/data/props';
import { colors } from '@/theme';

interface PropBadgeProps {
  name: PropName;
  /** Outer tile size. The sprite is scaled to stand inside it. */
  size?: number;
  /** Tile fill behind the sprite. */
  tint: string;
  radius?: number;
  /** Dim the whole badge — for a locked companion or an unmet condition. */
  dim?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A prop sprite standing in a tinted tile.
 *
 * The emblems across the panels — practice modes, companions, the next fight —
 * were flat coloured squares. Four of them in a grid read as placeholders
 * waiting for art, which is exactly what they were, and it was the blandest
 * thing in a build that otherwise has drawn art everywhere.
 *
 * The sprites already exist. They were made for the map, but a lantern is a
 * lantern, and standing one in a tile turns a colour swatch into an object.
 * The tile keeps the chunky treatment — 3px ink border, hard corners — so the
 * badge belongs to the same family as everything around it.
 *
 * **Scale is left to the art.** Every sprite sits on a common baseline with
 * its object trimmed to its own bounds, so `contain` inside a square box makes
 * a lighthouse tall and thin and a bench low and wide, both standing on the
 * tile floor. Normalising them to fill equally would flatten the one thing
 * that makes a set of emblems look like a set of objects.
 *
 * Anything missing from `PROP_ART` falls back to the bare tinted tile, so a
 * partial sprite set degrades to what was there before rather than a gap.
 */
export function PropBadge({ name, size = 44, tint, radius, dim = false, style }: PropBadgeProps) {
  const art = PROP_ART[name];
  const r = radius ?? Math.round(size * 0.34);

  return (
    <View
      style={[
        styles.tile,
        { width: size, height: size, borderRadius: r, backgroundColor: tint },
        dim && styles.dim,
        style,
      ]}
    >
      {art ? (
        <Image
          source={art}
          resizeMode="contain"
          // A touch larger than the tile, pushed down, so the object's feet
          // meet the floor instead of floating on the sprite's own baseline
          // padding. The overshoot is smaller than every sprite's headroom,
          // so nothing loses its top.
          style={{ width: size * 1.06, height: size * 1.06, marginBottom: -size * 0.045 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderWidth: 3,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  dim: { opacity: 0.5 },
});
