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
 * one line here — it cannot be built from a template. Anything absent is
 * skipped, so this stays correct whether the set is empty, partial or whole.
 *
 * Every file is a 512² canvas with the object trimmed to its own bounds,
 * centred, and sat on a common baseline six points off the bottom. That is
 * what lets one `size` drive all twenty: a bench keeps its width and a
 * lighthouse its height, and both stand on the same ground line.
 */
export const PROP_ART: Partial<Record<PropName, ImageSourcePropType>> = {
  signpost: require('../../assets/props/prop-signpost.png'),
  campfire: require('../../assets/props/prop-campfire.png'),
  tent: require('../../assets/props/prop-tent.png'),
  chest: require('../../assets/props/prop-chest.png'),
  milestone: require('../../assets/props/prop-milestone.png'),
  lantern: require('../../assets/props/prop-lantern.png'),
  bookstack: require('../../assets/props/prop-bookstack.png'),
  bench: require('../../assets/props/prop-bench.png'),
  banner: require('../../assets/props/prop-banner.png'),
  backpack: require('../../assets/props/prop-backpack.png'),
  lighthouse: require('../../assets/props/prop-lighthouse.png'),
  watertower: require('../../assets/props/prop-watertower.png'),
  forge: require('../../assets/props/prop-forge.png'),
  desertrock: require('../../assets/props/prop-desertrock.png'),
  cogpillar: require('../../assets/props/prop-cogpillar.png'),
  stilthut: require('../../assets/props/prop-stilthut.png'),
  cabin: require('../../assets/props/prop-cabin.png'),
  duckboard: require('../../assets/props/prop-duckboard.png'),
  radiopylon: require('../../assets/props/prop-radiopylon.png'),
  cairn: require('../../assets/props/prop-cairn.png'),
};

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
const PROP_PITCH = 400;
/** Where the first one can appear — clear of the plaque block. */
const TOP_MARGIN = 130;
/**
 * And the last. A prop is positioned by its top edge, so this has to cover a
 * whole landmark's height or the tallest one hangs past the track boundary.
 */
const BOTTOM_MARGIN = 190;

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
    const span = height - TOP_MARGIN - BOTTOM_MARGIN;
    // A short track still earns one prop — the preview track runs to about
    // 570pt, which is under the pitch but far too tall to leave bare.
    if (span < 240) return [];
    const count = Math.min(6, Math.max(1, Math.floor(span / PROP_PITCH)));

    const rand = makeRandom(seed * 7717 + 11);

    // The signature prop is placed outright rather than drawn from a weighted
    // pool. A lighthouse that only *probably* turns up on the coast is not an
    // identity, and the odds of missing it entirely on a short track are high.
    const signature = SIGNATURE[kind];
    const hasSignature = Boolean(PROP_ART[signature]);

    // Universal props are drawn without replacement, so no track ever shows
    // the same bench twice.
    const bag = UNIVERSAL.filter((p) => PROP_ART[p]);
    for (let i = bag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (!hasSignature && bag.length === 0) return [];

    // Sides alternate rather than being drawn at random. Two props in a row on
    // the same side leaves a long empty stripe down the other, which is more
    // noticeable than any single placement.
    let side = rand() < 0.5 ? -1 : 1;

    const out = [];
    for (let i = 0; i < count; i += 1) {
      // The signature prop takes a slot in the middle of the track, where it
      // is most likely to be seen, rather than the first one under the plaque.
      const isSignature = hasSignature && i === Math.floor(count / 2);
      const name = isSignature ? signature : bag[i % Math.max(1, bag.length)];
      if (!name) continue;

      side *= -1;
      const y = TOP_MARGIN + (span / count) * (i + 0.2 + rand() * 0.55);
      // Landmarks run half again as large. They are what the place is called
      // after, and at the same size as a bench that reads as coincidence.
      const size = isSignature ? 138 + rand() * 26 : 94 + rand() * 22;
      // Barely off the edge. Portrait sprites carry their own side padding
      // inside the square canvas, so a small negative offset insets them
      // rather than clipping them; the wide ones lose a sliver, which reads
      // as the object continuing past the frame.
      const x = side < 0 ? -size * 0.08 : width - size * 0.92;
      out.push({
        name,
        x,
        y,
        size,
        // Never mirror the landmark: it is the one prop a student will see
        // often enough to notice it flipping between visits.
        flip: !isSignature && rand() < 0.4,
      });
    }
    return out;
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
