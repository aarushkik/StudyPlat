import React from 'react';
import Svg, { Ellipse, G, Path, Rect } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import type { SkylineKind } from '@/data/tracks';

/**
 * The silhouette standing behind a track.
 *
 * Ten sets of three to five shapes, ported from the design build. Each is the
 * track's own dark tone at 20% over its sky, sitting on the ground line — so
 * it reads as a distant skyline rather than decoration on the path.
 *
 * Drawn in SVG rather than as plain Views. The design's waves and hills are
 * *ellipses* — a 180×54 swell — and React Native clamps `borderRadius` to half
 * the shorter side, which turns every one of them into a pill. Three pills in
 * a row merge into a single flat bar with no horizon in it at all.
 *
 * Still cheap: three to five nodes per track, against the several hundred the
 * procedural canopy it replaced needed.
 */

interface Block {
  /** Offsets are from the design's ~390pt canvas and scale with the screen. */
  left: number;
  bottom: number;
  width: number;
  height: number;
  /**
   * `ellipse` — a full swell or disc.
   * `cap` — a dome: half-ellipse on a flat base, for hills and islands.
   * `[n, 'top']` — a block with only its top corners rounded. This is what a
   *   building is: it stands *on* the ground, so rounding its bottom corners
   *   floats it like a pill. The design says `8px 8px 0 0`; rendering that as
   *   a uniform `rx` was wrong.
   * `[n, 'all']` — every corner, for rock and rope.
   */
  shape: 'ellipse' | 'cap' | [number, 'top' | 'all'];
}

const S = (left: number, bottom: number, width: number, height: number, shape: Block['shape']): Block => ({
  left,
  bottom,
  width,
  height,
  shape,
});

/**
 * The ten silhouette sets.
 *
 * Corner radii run well above the design's, and deliberately. These shapes are
 * the only landscape in the app, and a cartoon skyline is built from rounded
 * masses — a tower with an 8pt cap still reads as an office block, one with a
 * 20pt cap reads as a toy. The proportions are untouched; only the corners
 * are.
 */
const SETS: Record<SkylineKind, Block[]> = {
  // Rolling swells — coasts and shorelines.
  waves: [S(-30, 4, 180, 54, 'ellipse'), S(120, 0, 210, 60, 'ellipse'), S(268, 10, 150, 44, 'ellipse')],
  // A city block. Domed tops, standing on the ground.
  towers: [
    S(10, 0, 44, 118, [20, 'top']),
    S(60, 0, 30, 84, [14, 'top']),
    S(96, 0, 38, 104, [17, 'top']),
    S(248, 0, 50, 138, [23, 'top']),
    S(304, 0, 34, 92, [16, 'top']),
  ],
  // Round-capped industrial stacks — the caps go fully semicircular.
  chimneys: [
    S(4, 0, 54, 118, [27, 'top']),
    S(68, 0, 34, 76, [17, 'top']),
    S(258, 0, 46, 138, [23, 'top']),
    S(312, 0, 62, 90, [31, 'top']),
  ],
  // Flat-topped rock, softly cornered.
  mesa: [S(-24, 0, 186, 92, [26, 'top']), S(146, 0, 118, 136, [24, 'top']), S(276, 0, 160, 78, [26, 'top'])],
  // Full discs, floating clear of the ground.
  gears: [S(14, 8, 88, 88, 'ellipse'), S(114, -14, 70, 70, 'ellipse'), S(276, 12, 112, 112, 'ellipse')],
  // Low domes on the waterline.
  islands: [S(-6, 0, 150, 58, 'cap'), S(156, 0, 108, 42, 'cap'), S(286, 0, 140, 68, 'cap')],
  // Big soft hills.
  ridge: [S(-44, 0, 200, 116, 'cap'), S(116, 0, 178, 146, 'cap'), S(266, 0, 190, 96, 'cap')],
  // Thin stalks over a low bank. Fully rounded — they are reeds, not posts.
  reeds: [
    S(26, 0, 13, 116, [7, 'all']),
    S(52, 0, 13, 88, [7, 'all']),
    S(298, 0, 13, 136, [7, 'all']),
    S(324, 0, 13, 98, [7, 'all']),
    S(-14, 0, 200, 38, 'ellipse'),
  ],
  // Masts with crossbars.
  pylons: [
    S(38, 0, 10, 146, [5, 'all']),
    S(298, 0, 10, 166, [5, 'all']),
    S(18, 116, 52, 10, [5, 'all']),
    S(276, 136, 52, 10, [5, 'all']),
  ],
  // Two big summits. The end of every course.
  peak: [S(-34, 0, 218, 186, 'cap'), S(146, 0, 258, 226, 'cap')],
};

/** The width the design's offsets were authored against. */
const DESIGN_WIDTH = 390;

/** How far the tallest shape in a set reaches above the ground line. */
const REACH: Record<SkylineKind, number> = Object.fromEntries(
  Object.entries(SETS).map(([kind, blocks]) => [
    kind,
    Math.max(...blocks.map((b) => b.bottom + b.height)),
  ]),
) as Record<SkylineKind, number>;

/** How tall the skyline is on a given screen — the track must leave it room. */
export function skylineHeight(kind: SkylineKind, width: number): number {
  return Math.ceil(REACH[kind] * (width / DESIGN_WIDTH));
}

interface SkylineProps {
  kind: SkylineKind;
  /** The track's dark tone. */
  color: string;
  width: number;
}

export function Skyline({ kind, color, width }: SkylineProps) {
  const scale = width / DESIGN_WIDTH;
  const height = skylineHeight(kind, width);

  return (
    <View pointerEvents="none" style={[styles.band, { height }]}>
      <Svg width={width} height={height}>
        <G opacity={0.2}>
          {SETS[kind].map((b, i) => {
            const w = b.width * scale;
            const h = b.height * scale;
            const x = b.left * scale;
            // Blocks are anchored to the bottom of the band.
            const yBottom = height - b.bottom * scale;
            const y = yBottom - h;

            if (b.shape === 'ellipse') {
              return <Ellipse key={i} cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} fill={color} />;
            }
            if (b.shape === 'cap') {
              // Half-ellipse: one arc from the left foot to the right foot.
              return (
                <Path
                  key={i}
                  d={`M${x} ${yBottom} A ${w / 2} ${h} 0 0 1 ${x + w} ${yBottom} Z`}
                  fill={color}
                />
              );
            }
            const [rRaw, corners] = b.shape;
            // Clamp, or a wide cap on a narrow tower crosses itself.
            const r = Math.min(rRaw * scale, w / 2, h);
            if (corners === 'all') {
              return <Rect key={i} x={x} y={y} width={w} height={h} rx={r} fill={color} />;
            }
            return (
              <Path
                key={i}
                d={
                  `M${x} ${yBottom}` +
                  `V${y + r}` +
                  `A${r} ${r} 0 0 1 ${x + r} ${y}` +
                  `H${x + w - r}` +
                  `A${r} ${r} 0 0 1 ${x + w} ${y + r}` +
                  `V${yBottom}Z`
                }
                fill={color}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  // Anchored to the bottom of the track and clipped by it, so the silhouette
  // stands on the boundary line between one place and the next. On a collapsed
  // track that is right behind the pip strip; on an open one it is the horizon
  // you walk towards.
  band: { position: 'absolute', left: 0, right: 0, bottom: 0, overflow: 'hidden' },
});
