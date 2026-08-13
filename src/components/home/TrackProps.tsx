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
 * **Props are placed against the trail, not against the track.** Each one sits
 * in the gap between two stops, on the side the path has just swung away from.
 * Scattering them at random heights put them wherever, including directly
 * behind a stop, and the result read as decoration dropped on top of the
 * screen rather than objects standing in the world. Following the path's own
 * rhythm is what makes them look placed.
 *
 * Each also gets a ground patch — a soft ellipse in the track's dark tone,
 * under its feet. The sprites carry no baked shadow, deliberately, because the
 * ground colour changes per track; this puts the contact back without dirtying
 * the art. It is the single thing that stops a prop looking pasted on.
 *
 * Props render behind the stops, so a stop passing in front of one is depth.
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

/** How many stops go by between props on an expanded track. */
const STOP_PITCH = 2;
/** Fallback spacing where a track has no stops to hang props off. */
const BAND_PITCH = 300;
/** Clear of the plaque block. */
const TOP_MARGIN = 130;
/** A prop is positioned by its top edge, so this covers a whole landmark. */
const BOTTOM_MARGIN = 175;

function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Where a stop sits, so props can be placed in the gaps between them. */
export interface PropAnchor {
  /** Top of the stop, in track coordinates. */
  top: number;
  /** Its offset from centre — negative is left. */
  off: number;
  /** Its diameter. */
  size: number;
}

interface TrackPropsProps {
  kind: SkylineKind;
  width: number;
  height: number;
  /** The track's stops, in order. Empty on a collapsed track. */
  anchors: PropAnchor[];
  /** Position in the course, used to seed placement. */
  seed: number;
}

interface Placed {
  name: PropName;
  x: number;
  y: number;
  size: number;
  flip: boolean;
}

export const TrackProps = React.memo(TrackPropsImpl);

function TrackPropsImpl({ kind, width, height, anchors, seed }: TrackPropsProps) {
  const placed = useMemo<Placed[]>(() => {
    const rand = makeRandom(seed * 7717 + 11);

    // The signature prop is placed outright rather than drawn from a weighted
    // pool. A lighthouse that only *probably* turns up on the coast is not an
    // identity, and the odds of missing it on a short track are high.
    const signature = SIGNATURE[kind];
    const hasSignature = Boolean(PROP_ART[signature]);

    // Universal props are drawn without replacement, so no track shows the
    // same bench twice.
    const bag = UNIVERSAL.filter((p) => PROP_ART[p]);
    for (let i = bag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (!hasSignature && bag.length === 0) return [];

    /** Slots to fill: a y to stand at, and which side to stand on. */
    const slots: { y: number; side: -1 | 1 }[] = [];

    if (anchors.length >= 2) {
      // Walk the trail and drop a prop in every other gap, on the side the
      // path has just swung away from. That is the side with room, and it
      // reads as something you pass rather than something in your way.
      for (let i = 0; i + 1 < anchors.length; i += STOP_PITCH) {
        const a = anchors[i];
        const b = anchors[i + 1];
        const mid = (a.top + a.size + b.top) / 2;
        const lean = (a.off + b.off) / 2;
        slots.push({ y: mid - 40, side: lean > 0 ? -1 : 1 });
      }
    } else {
      // A collapsed track has no stops, so fall back to even bands.
      const span = height - TOP_MARGIN - BOTTOM_MARGIN;
      const n = span < 120 ? 0 : Math.max(1, Math.floor(span / BAND_PITCH));
      let side: -1 | 1 = rand() < 0.5 ? -1 : 1;
      for (let i = 0; i < n; i += 1) {
        side = side === 1 ? -1 : 1;
        slots.push({ y: TOP_MARGIN + (span / n) * (i + 0.25 + rand() * 0.4), side });
      }
    }
    if (slots.length === 0) return [];

    // The landmark goes in the middle slot, where it is most likely to be seen.
    const landmarkAt = hasSignature ? Math.floor(slots.length / 2) : -1;

    return slots.map((slot, i) => {
      const isLandmark = i === landmarkAt;
      const name = isLandmark ? signature : bag[i % bag.length];
      // Landmarks run half again as large: they are what the place is named
      // after, and at bench size that reads as coincidence.
      const size = isLandmark ? 132 + rand() * 22 : 88 + rand() * 18;
      // Hugged to the edge. Portrait sprites carry their own side padding
      // inside the square canvas, so a small negative offset insets them
      // rather than clipping; wide ones lose a sliver, which reads as the
      // object continuing past the frame.
      const x = slot.side < 0 ? -size * 0.08 : width - size * 0.92;
      return {
        name,
        x,
        y: slot.y,
        size,
        // Never mirror the landmark — it is the one prop seen often enough
        // that flipping between visits would show.
        flip: !isLandmark && rand() < 0.4,
      };
    });
  }, [kind, height, width, anchors, seed]);

  if (placed.length === 0) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {placed.map((p, i) => (
        <View key={i} style={[styles.slot, { left: p.x, top: p.y, width: p.size, height: p.size }]}>
          {/* Contact with the ground. The sprites ship without a baked shadow
              on purpose — the ground colour changes per track — so this puts
              it back in the track's own tone. */}
          <View
            style={[
              styles.ground,
              {
                width: p.size * 0.58,
                height: p.size * 0.15,
                borderRadius: p.size * 0.075,
                left: p.size * 0.21,
                top: p.size * 0.9,
              },
            ]}
          />
          <Image
            source={PROP_ART[p.name] as ImageSourcePropType}
            resizeMode="contain"
            style={[styles.art, p.flip ? { transform: [{ scaleX: -1 }] } : null]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: { position: 'absolute' },
  ground: { position: 'absolute', backgroundColor: 'rgba(18,48,60,0.13)' },
  art: { width: '100%', height: '100%' },
});
