import React, { useMemo } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import type { SkylineKind } from '@/data/tracks';

/**
 * Full-colour props standing beside the path.
 *
 * The procedural scenery layer (`TrackScenery`) gives a track texture and a
 * sense of place, but it cannot give it *character* — a signpost with a
 * crooked pennant, a campfire, a chest half-buried in sand. Those are the cues
 * that say you are on a journey, and built out of circles and rectangles they
 * come out looking like placeholder geometry. So they are drawn art.
 *
 * Ten universal props appear in every track. Ten signature props are tied to
 * one landscape each, so a place owns an object nobody else has: a lighthouse
 * only ever stands on the coast.
 *
 * Props render *behind* the stops. Ninety points of prop does not fit in the
 * gutter beside a path that swings 160 points across the screen, so instead of
 * squeezing them into the margins they sit near the edge and let a stop
 * overlap them. Something passing in front of something else is depth; a prop
 * shoved into the last 40 points of screen is just a prop that does not fit.
 *
 * Generation prompts and filenames: `docs/sprite-prompts.md`.
 */

export type PropName =
  | 'signpost'
  | 'campfire'
  | 'tent'
  | 'chest'
  | 'milestone'
  | 'lantern'
  | 'bookstack'
  | 'bench'
  | 'banner'
  | 'backpack'
  | 'lighthouse'
  | 'watertower'
  | 'forge'
  | 'desertrock'
  | 'cogpillar'
  | 'stilthut'
  | 'cabin'
  | 'duckboard'
  | 'radiopylon'
  | 'cairn';

/**
 * The art itself.
 *
 * Metro needs a static string literal in every `require`, so each sprite is
 * one line here — it cannot be built from a template. Add a line as each file
 * lands in `src/assets/props/`; anything absent is skipped, so this works
 * correctly whether the set is empty, partial, or complete.
 *
 * ```ts
 * signpost: require('../../assets/props/prop-signpost.png'),
 * ```
 */
export const PROP_ART: Partial<Record<PropName, ImageSourcePropType>> = {};

/** Props that suit any landscape. */
const UNIVERSAL: PropName[] = [
  'signpost',
  'campfire',
  'tent',
  'chest',
  'milestone',
  'lantern',
  'bookstack',
  'bench',
  'banner',
  'backpack',
];

/** The one prop that belongs to each landscape and nowhere else. */
const SIGNATURE: Record<SkylineKind, PropName> = {
  waves: 'lighthouse',
  towers: 'watertower',
  chimneys: 'forge',
  mesa: 'desertrock',
  gears: 'cogpillar',
  islands: 'stilthut',
  ridge: 'cabin',
  reeds: 'duckboard',
  pylons: 'radiopylon',
  peak: 'cairn',
};

/** One prop per this many points of track. */
const PROP_PITCH = 470;
/** Where the first one can appear — below the plaque. */
const TOP_MARGIN = 210;
/** And the last — above the silhouette at the foot of the track. */
const BOTTOM_MARGIN = 210;

function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface TrackPropsProps {
  kind: SkylineKind;
  width: number;
  height: number;
  /** Position in the course, used to seed placement. */
  seed: number;
}

export const TrackProps = React.memo(TrackPropsImpl);

function TrackPropsImpl({ kind, width, height, seed }: TrackPropsProps) {
  const placed = useMemo(() => {
    // Only props whose art actually exists can be placed. The signature prop
    // is weighted heavily so the track's own object is the one you see most.
    const signature = SIGNATURE[kind];
    const pool: PropName[] = [
      ...(PROP_ART[signature] ? [signature, signature] : []),
      ...UNIVERSAL.filter((p) => PROP_ART[p]),
    ];
    if (pool.length === 0) return [];

    const span = height - TOP_MARGIN - BOTTOM_MARGIN;
    const count = span < PROP_PITCH ? 0 : Math.min(6, Math.floor(span / PROP_PITCH));
    if (count === 0) return [];

    const rand = makeRandom(seed * 7717 + 11);
    // Sides alternate rather than being drawn at random. Two props in a row on
    // the same side leaves a long empty stripe down the other, which is more
    // noticeable than any single placement.
    let side = rand() < 0.5 ? -1 : 1;

    return Array.from({ length: count }, (_, i) => {
      side *= -1;
      const y = TOP_MARGIN + (span / count) * (i + 0.2 + rand() * 0.55);
      const size = 74 + rand() * 20;
      // Hugging the edge, allowing a stop to pass in front.
      const x = side < 0 ? -size * 0.14 : width - size * 0.86;
      return {
        name: pool[Math.floor(rand() * pool.length)],
        x,
        y,
        size,
        // Mirrored half the time, but only the universal props: a lighthouse
        // reads fine either way, a signpost's arrows do not always.
        flip: rand() < 0.4,
      };
    });
  }, [kind, height, width, seed]);

  if (placed.length === 0) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {placed.map((p, i) => (
        <Image
          key={i}
          source={PROP_ART[p.name] as ImageSourcePropType}
          resizeMode="contain"
          style={[
            styles.prop,
            {
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              transform: p.flip ? [{ scaleX: -1 }] : undefined,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  prop: { position: 'absolute' },
});
