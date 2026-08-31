import React, { useMemo } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import type { SkylineKind } from '@/data/tracks';
import { PROP_ART, SIGNATURE_PROP, type PropName } from '@/data/props';

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
  /** The current stop also parks the mascot to its left. */
  current?: boolean;
}

/** An axis-aligned box in track coordinates. */
interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** How tall a stop's caption runs beneath it, and how wide it spreads. */
const LABEL_H = 46;
const LABEL_W = 210;
/** The mascot parked beside the current stop: 148pt left of it, ~110 wide. */
const MASCOT_W = 116;
const MASCOT_LEFT = 148;
/** Clear air between a prop and anything tappable. */
const CLEARANCE = 10;
/**
 * How much of a sprite's square canvas the drawing actually fills across.
 *
 * Every sprite is centred with its own side padding, so a 100pt slot draws
 * something closer to 90pt wide. Measuring the slot rather than the art would
 * push props off the screen to avoid collisions that are not really there.
 */
const INK_WIDTH = 0.9;
/** Below this a prop reads as a speck rather than an object; drop it instead. */
const MIN_SIZE = 62;

/** Everything a prop must not stand on: the stops, their captions, the mascot. */
function blockersFor(anchors: PropAnchor[], width: number): Rect[] {
  const half = width / 2;
  const out: Rect[] = [];
  for (const a of anchors) {
    out.push({ x: half + a.off - a.size / 2, y: a.top, w: a.size, h: a.size });
    // The caption is centred under the stop and overflows it by a long way —
    // "PHOTOELECTRON SPECTROSCOPY" is wider than any stop is round.
    out.push({ x: half + a.off - LABEL_W / 2, y: a.top + a.size, w: LABEL_W, h: LABEL_H });
    if (a.current) {
      out.push({ x: Math.max(6, half + a.off - MASCOT_LEFT), y: a.top - 6, w: MASCOT_W, h: a.size });
    }
  }
  return out;
}

/** How much clear room a band of the track has on each side. */
function roomIn(blockers: Rect[], top: number, bottom: number, width: number) {
  let left = width;
  let right = width;
  for (const b of blockers) {
    if (b.y + b.h <= top || b.y >= bottom) continue;
    left = Math.min(left, b.x - CLEARANCE);
    right = Math.min(right, width - (b.x + b.w) - CLEARANCE);
  }
  return { left: Math.max(0, left), right: Math.max(0, right) };
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
    const signature = SIGNATURE_PROP[kind];
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

    /**
     * Fit each prop into whichever margin actually has room for it.
     *
     * The side used to be chosen from the way the path was leaning, on the
     * assumption that the outside of a bend is clear. It is not: a stop's
     * caption spreads far wider than the stop, the mascot parks 148pt to the
     * left of wherever you are, and a landmark is tall enough to reach the
     * next stop down — which may lean the other way. The result was props
     * standing on labels and behind buttons.
     *
     * So the margins are measured instead. Each prop takes the roomier side
     * of its own band, shrinks if that side is tight, and is dropped if the
     * band has no room for anything worth drawing. A gap with nothing in it
     * looks like open country; a signpost through a boss's name looks broken.
     */
    const blockers = blockersFor(anchors, width);

    return slots.flatMap((slot, i) => {
      const isLandmark = i === landmarkAt;
      const name = isLandmark ? signature : bag[i % bag.length];
      // Landmarks run half again as large: they are what the place is named
      // after, and at bench size that reads as coincidence.
      const wanted = isLandmark ? 132 + rand() * 22 : 88 + rand() * 18;

      const room = roomIn(blockers, slot.y, slot.y + wanted, width);
      // Prefer the side the path swung away from, but only while it fits;
      // otherwise take the roomier one.
      const preferred = slot.side < 0 ? 'left' : 'right';
      const side =
        room[preferred] >= wanted * INK_WIDTH
          ? preferred
          : room.left >= room.right
            ? 'left'
            : 'right';

      const available = room[side];
      const size = Math.min(wanted, available / INK_WIDTH);
      if (size < MIN_SIZE) return [];

      // Hugged to the edge, then held off any blocker by the clearance it was
      // measured against. Portrait sprites carry their own side padding inside
      // the square canvas, so a small negative offset insets them rather than
      // clipping; wide ones lose a sliver, which reads as the object
      // continuing past the frame.
      const bleed = size * (1 - INK_WIDTH) * 0.5;
      const x = side === 'left' ? -bleed : width - size + bleed;
      return [
        {
          name,
          x,
          y: slot.y,
          size,
          // Never mirror the landmark — it is the one prop seen often enough
          // that flipping between visits would show.
          flip: !isLandmark && rand() < 0.4,
        },
      ];
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
