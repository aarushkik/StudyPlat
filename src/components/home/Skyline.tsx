import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SkylineKind } from '@/data/tracks';

/**
 * The silhouette standing behind a track.
 *
 * Ten sets of three to five blocks, ported from the design build. Each is the
 * track's own dark tone at 20% over its sky, anchored to the bottom of the
 * band — so it reads as a distant skyline rather than as decoration sitting on
 * the path.
 *
 * Deliberately cheap. This is what replaced a procedural canopy renderer that
 * cost several hundred SVG nodes per track; a skyline is a handful of plain
 * Views and says "which place is this?" just as clearly at a glance.
 */

interface Block {
  /** Offsets are from the design's ~390pt canvas and scale with the screen. */
  left: number;
  bottom: number;
  width: number;
  height: number;
  /** Uniform radius, or `dome` for a half-round top, or `arch` for a flat cap. */
  radius: number | 'dome' | 'cap';
}

const S = (left: number, bottom: number, width: number, height: number, radius: Block['radius']): Block => ({
  left,
  bottom,
  width,
  height,
  radius,
});

const SETS: Record<SkylineKind, Block[]> = {
  // Rolling swells — coasts and shorelines.
  waves: [S(-30, 4, 180, 54, 'dome'), S(120, 0, 210, 60, 'dome'), S(268, 10, 150, 44, 'dome')],
  // A city block of flat-topped buildings.
  towers: [S(10, 0, 44, 118, 8), S(60, 0, 30, 84, 6), S(96, 0, 38, 104, 6), S(248, 0, 50, 138, 10), S(304, 0, 34, 92, 6)],
  // Round-capped industrial stacks.
  chimneys: [S(4, 0, 54, 118, 26), S(68, 0, 34, 76, 16), S(258, 0, 46, 138, 22), S(312, 0, 62, 90, 30)],
  // Flat-topped rock, softly cornered.
  mesa: [S(-24, 0, 186, 92, 14), S(146, 0, 118, 136, 12), S(276, 0, 160, 78, 14)],
  // Full circles, floating clear of the ground.
  gears: [S(14, 8, 88, 88, 'dome'), S(114, -14, 70, 70, 'dome'), S(276, 12, 112, 112, 'dome')],
  // Low domes sitting on the waterline.
  islands: [S(-6, 0, 150, 58, 'cap'), S(156, 0, 108, 42, 'cap'), S(286, 0, 140, 68, 'cap')],
  // Big soft hills.
  ridge: [S(-44, 0, 200, 116, 'cap'), S(116, 0, 178, 146, 'cap'), S(266, 0, 190, 96, 'cap')],
  // Thin stalks over a low bank.
  reeds: [S(26, 0, 13, 116, 8), S(52, 0, 13, 88, 8), S(298, 0, 13, 136, 8), S(324, 0, 13, 98, 8), S(-14, 0, 200, 38, 'dome')],
  // Masts with crossbars.
  pylons: [S(38, 0, 10, 146, 4), S(298, 0, 10, 166, 4), S(18, 116, 52, 10, 4), S(276, 136, 52, 10, 4)],
  // Two big summits. The end of every course.
  peak: [S(-34, 0, 218, 186, 'cap'), S(146, 0, 258, 226, 'cap')],
};

/** The width the design's offsets were authored against. */
const DESIGN_WIDTH = 390;

interface SkylineProps {
  kind: SkylineKind;
  /** The track's dark tone. */
  color: string;
  width: number;
  /** Height of the band the skyline sits in. */
  height: number;
}

export function Skyline({ kind, color, width, height }: SkylineProps) {
  const scale = width / DESIGN_WIDTH;

  return (
    <View pointerEvents="none" style={[styles.band, { height }]}>
      {SETS[kind].map((b, i) => {
        const w = b.width * scale;
        const h = b.height * scale;
        const radius =
          b.radius === 'dome'
            ? { borderRadius: Math.min(w, h) / 2 }
            : b.radius === 'cap'
              ? { borderTopLeftRadius: w / 2, borderTopRightRadius: w / 2 }
              : { borderRadius: b.radius * scale };

        return (
          <View
            key={i}
            style={[
              styles.block,
              radius,
              { left: b.left * scale, bottom: b.bottom * scale, width: w, height: h, backgroundColor: color },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // Anchored to the *top* of the track, not the bottom. A track is a couple of
  // thousand points tall, so a bottom-anchored skyline sits far below the fold
  // and is never seen; at the top it greets you as you cross in.
  band: { position: 'absolute', left: 0, right: 0, top: 0, overflow: 'hidden' },
  block: { position: 'absolute', opacity: 0.2 },
});
