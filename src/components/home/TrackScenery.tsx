import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import type { SkylineKind } from '@/data/tracks';

/**
 * What a track is made of behind the path.
 *
 * The silhouette at the bottom (see `Skyline`) establishes *where* you are, but
 * it only occupies the last 200pt of a track that can run to 2,400. Everything
 * above it was flat colour. This fills that with three layers, cheapest first:
 *
 * 1. **Sky** — a soft wash down from the top, so the ground reads as lit from
 *    above rather than as a swatch.
 * 2. **Drift** — a few big, very pale shapes: clouds over land, currents under
 *    water, dust over rock. They sit near the top where the eye lands after a
 *    track boundary.
 * 3. **Scatter** — small motifs of the place itself, thinned right out and
 *    spread the full height, so a long walk through one track always has
 *    something in the corner of the eye.
 *
 * Everything is drawn in the track's own `dark` at low alpha, so a track is
 * never decorated in a colour it does not already own. And everything is
 * *seeded* — the same track draws the same landscape every time you scroll
 * back to it, which is the difference between scenery and noise.
 *
 * The last time this app grew scenery it became unreadable, from three
 * mistakes worth not repeating: values inverted so the ground was darker than
 * what stood on it, a different shade per element so every object competed,
 * and enough density that the negative space disappeared. So: one colour, one
 * alpha, and a deliberately thin scatter.
 */

/** The width the layout was authored against, matching `Skyline`. */
const DESIGN_WIDTH = 390;

/** One small motif per this many points of track. */
const SCATTER_PITCH = 92;
/** One large one per this many. Scale variety is what stops it reading as confetti. */
const LANDMARK_PITCH = 620;

/** Deterministic RNG — same track, same landscape, every time. */
function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface MotifProps {
  x: number;
  y: number;
  /** Roughly the motif's half-width, in points. */
  s: number;
  color: string;
}

/**
 * One small thing that belongs to this place.
 *
 * Each is three or four primitives at most. A motif is read at a glance and at
 * 13% alpha; anything more detailed turns to mush at that weight and costs
 * nodes on a list that already renders a couple of thousand.
 */
const MOTIF: Record<SkylineKind, (p: MotifProps) => React.ReactElement> = {
  // Foam on the shoreline: two broken crests and a bubble.
  waves: ({ x, y, s, color }) => (
    <G>
      <Path
        d={`M${x - s} ${y} q${s * 0.5} ${-s * 0.55} ${s} 0`}
        stroke={color}
        strokeWidth={s * 0.3}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d={`M${x - s * 0.3} ${y + s * 0.7} q${s * 0.42} ${-s * 0.5} ${s * 0.85} 0`}
        stroke={color}
        strokeWidth={s * 0.26}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={x + s * 1.05} cy={y - s * 0.5} r={s * 0.22} fill={color} />
    </G>
  ),
  // Crates stacked at the roadside.
  towers: ({ x, y, s, color }) => (
    <G>
      <Rect x={x - s} y={y - s * 0.9} width={s * 1.15} height={s * 0.9} rx={s * 0.22} fill={color} />
      <Rect x={x + s * 0.25} y={y - s * 0.55} width={s * 0.8} height={s * 0.55} rx={s * 0.18} fill={color} />
    </G>
  ),
  // A puff of smoke drifting off a stack.
  chimneys: ({ x, y, s, color }) => (
    <G>
      <Circle cx={x - s * 0.5} cy={y} r={s * 0.45} fill={color} />
      <Circle cx={x + s * 0.25} cy={y - s * 0.3} r={s * 0.62} fill={color} />
      <Circle cx={x + s * 0.95} cy={y + s * 0.1} r={s * 0.38} fill={color} />
    </G>
  ),
  // A barrel cactus with one arm.
  mesa: ({ x, y, s, color }) => (
    <G>
      <Rect x={x - s * 0.22} y={y - s * 1.3} width={s * 0.44} height={s * 1.3} rx={s * 0.22} fill={color} />
      <Path
        d={`M${x + s * 0.1} ${y - s * 0.75} h${s * 0.35} a${s * 0.2} ${s * 0.2} 0 0 1 ${s * 0.2} ${s * 0.2} v${s * 0.3}`}
        stroke={color}
        strokeWidth={s * 0.26}
        strokeLinecap="round"
        fill="none"
      />
    </G>
  ),
  // A loose cog.
  gears: ({ x, y, s, color }) => (
    <G>
      <Circle cx={x} cy={y} r={s * 0.62} stroke={color} strokeWidth={s * 0.3} fill="none" />
      {[0, 90, 180, 270].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <Rect
            key={deg}
            x={x + Math.cos(a) * s * 0.78 - s * 0.15}
            y={y + Math.sin(a) * s * 0.78 - s * 0.15}
            width={s * 0.3}
            height={s * 0.3}
            rx={s * 0.08}
            fill={color}
          />
        );
      })}
    </G>
  ),
  // A palm leaning off a sandbar.
  islands: ({ x, y, s, color }) => (
    <G>
      <Path
        d={`M${x} ${y} q${s * 0.18} ${-s * 0.7} ${s * 0.05} ${-s * 1.2}`}
        stroke={color}
        strokeWidth={s * 0.2}
        strokeLinecap="round"
        fill="none"
      />
      {[-1, 0, 1].map((k) => (
        <Path
          key={k}
          d={`M${x + s * 0.05} ${y - s * 1.2} q${k * s * 0.55} ${-s * 0.3} ${k * s * 0.8} ${s * 0.12}`}
          stroke={color}
          strokeWidth={s * 0.22}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </G>
  ),
  // A conifer on the slope.
  ridge: ({ x, y, s, color }) => (
    <G>
      <Path d={`M${x} ${y - s * 1.5} L${x + s * 0.72} ${y - s * 0.35} L${x - s * 0.72} ${y - s * 0.35} Z`} fill={color} />
      <Path d={`M${x} ${y - s * 0.95} L${x + s * 0.9} ${y} L${x - s * 0.9} ${y} Z`} fill={color} />
    </G>
  ),
  // A cattail over a lily pad.
  reeds: ({ x, y, s, color }) => (
    <G>
      <Rect x={x - s * 0.1} y={y - s * 1.5} width={s * 0.2} height={s * 1.5} rx={s * 0.1} fill={color} />
      <Ellipse cx={x} cy={y - s * 1.3} rx={s * 0.25} ry={s * 0.45} fill={color} />
      <Path
        d={`M${x + s * 0.5} ${y} a${s * 0.6} ${s * 0.28} 0 1 1 ${s * 1.2} 0 a${s * 0.6} ${s * 0.28} 0 1 1 ${-s * 1.2} 0`}
        fill={color}
      />
    </G>
  ),
  // Two birds on the wire.
  pylons: ({ x, y, s, color }) => (
    <G>
      {[0, 1].map((k) => (
        <Path
          key={k}
          d={`M${x + k * s * 1.3 - s * 0.55} ${y} q${s * 0.28} ${-s * 0.38} ${s * 0.55} 0 q${s * 0.28} ${-s * 0.38} ${s * 0.55} 0`}
          stroke={color}
          strokeWidth={s * 0.2}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </G>
  ),
  // Loose rock chips below the summit.
  peak: ({ x, y, s, color }) => (
    <G>
      <Path d={`M${x - s * 0.9} ${y} L${x - s * 0.3} ${y - s * 0.7} L${x + s * 0.15} ${y} Z`} fill={color} />
      <Path d={`M${x + s * 0.2} ${y} L${x + s * 0.7} ${y - s * 0.45} L${x + s} ${y} Z`} fill={color} />
    </G>
  ),
};

/**
 * The big pale shape drifting near the top of a track.
 *
 * Land tracks get clouds; water gets a current; rock and works get haze. All
 * the same shape family — overlapping ellipses — because the point is a soft
 * mass, not a recognisable object.
 */
function drift(kind: SkylineKind): 'cloud' | 'current' {
  return kind === 'waves' || kind === 'islands' || kind === 'reeds' ? 'current' : 'cloud';
}

interface TrackSceneryProps {
  kind: SkylineKind;
  /** The track's dark tone — everything here is drawn in it. */
  color: string;
  width: number;
  height: number;
  /** Position in the course, used to seed the layout. */
  seed: number;
}

export const TrackScenery = React.memo(TrackSceneryImpl);

function TrackSceneryImpl({ kind, color, width, height, seed }: TrackSceneryProps) {
  const scale = width / DESIGN_WIDTH;

  const { motifs, landmarks, drifts } = useMemo(() => {
    const rand = makeRandom(seed * 9973 + kind.length * 131);

    // Motifs start below the plaque and stop above the silhouette, so the
    // scatter never fights either.
    const top = 150;
    const bottom = Math.max(top + 1, height - 190);
    const span = bottom - top;
    const count = span < SCATTER_PITCH ? 0 : Math.min(22, Math.floor(span / SCATTER_PITCH));

    const placed = Array.from({ length: count }, (_, i) => {
      // One per band, jittered — an even scatter over a tall track clumps.
      const band = top + (span / count) * (i + rand() * 0.85);
      // Biased outward: the path runs down the middle and the margins are the
      // part of the track that is genuinely empty.
      const edge = rand() < 0.5 ? -1 : 1;
      const x = width / 2 + edge * (width * (0.22 + rand() * 0.27));
      return { x, y: band, s: (8 + rand() * 8) * scale, flip: rand() < 0.5 };
    });

    // The same motif drawn big and faint, a few times over the whole track.
    // One size of everything reads as texture; two reads as distance.
    const bigCount = span < LANDMARK_PITCH ? 0 : Math.min(5, Math.floor(span / LANDMARK_PITCH));
    const landmarks = Array.from({ length: bigCount }, (_, i) => {
      const band = top + (span / bigCount) * (i + 0.15 + rand() * 0.6);
      const edge = rand() < 0.5 ? -1 : 1;
      return {
        // Pushed far enough out that the shape is cut by the screen edge. A
        // landmark that fits entirely on screen reads as another object on the
        // path; one that runs off it reads as landscape continuing past the
        // frame, which is the whole point of the layer.
        x: width / 2 + edge * (width * (0.44 + rand() * 0.13)),
        y: band,
        s: (44 + rand() * 20) * scale,
        flip: rand() < 0.5,
      };
    });

    const driftCount = height > 900 ? 3 : height > 400 ? 2 : 1;
    const clouds = Array.from({ length: driftCount }, (_, i) => ({
      x: width * (0.12 + rand() * 0.76),
      y: 165 + i * (Math.min(height, 1400) / (driftCount + 1)) * 0.7 + rand() * 60,
      s: (34 + rand() * 26) * scale,
    }));

    return { motifs: placed, landmarks, drifts: clouds };
  }, [kind, width, height, seed, scale]);

  const Motif = MOTIF[kind];
  const driftKind = drift(kind);

  return (
    <Svg pointerEvents="none" style={StyleSheet.absoluteFill} width={width} height={height}>
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.5} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </LinearGradient>
      </Defs>

      {/* Light from above. Short, so it never washes out the track's colour. */}
      <Rect x={0} y={0} width={width} height={Math.min(height, 340)} fill="url(#sky)" />

      {/* Group opacity composites the whole group once, so overlapping parts
          of a cloud do not double-darken where they meet. */}
      <G opacity={0.11}>
        {drifts.map((d, i) =>
          driftKind === 'cloud' ? (
            // Three discs sharing one baseline, filled between: a flat bottom
            // under a bumpy top. Stacked ellipses give a lumpy oval instead,
            // which at this weight just reads as a smudge.
            <G key={`d${i}`}>
              <Rect
                x={d.x - d.s * 0.86}
                y={d.y - d.s * 0.3}
                width={d.s * 1.78}
                height={d.s * 0.3}
                fill={color}
              />
              <Circle cx={d.x - d.s * 0.55} cy={d.y - d.s * 0.32} r={d.s * 0.32} fill={color} />
              <Circle cx={d.x + d.s * 0.04} cy={d.y - d.s * 0.52} r={d.s * 0.52} fill={color} />
              <Circle cx={d.x + d.s * 0.63} cy={d.y - d.s * 0.29} r={d.s * 0.29} fill={color} />
            </G>
          ) : (
            <G key={`d${i}`}>
              <Path
                d={`M${d.x - d.s} ${d.y} q${d.s * 0.5} ${-d.s * 0.3} ${d.s} 0 q${d.s * 0.5} ${d.s * 0.3} ${d.s} 0`}
                stroke={color}
                strokeWidth={d.s * 0.16}
                strokeLinecap="round"
                fill="none"
              />
              <Path
                d={`M${d.x - d.s * 0.6} ${d.y + d.s * 0.42} q${d.s * 0.4} ${-d.s * 0.24} ${d.s * 0.8} 0`}
                stroke={color}
                strokeWidth={d.s * 0.13}
                strokeLinecap="round"
                fill="none"
              />
            </G>
          ),
        )}
      </G>

      {/* Far: big and barely there, so it reads as distance rather than as a
          second set of objects at the same remove. */}
      <G opacity={0.075}>
        {landmarks.map((m, i) => (
          <G key={`l${i}`} transform={m.flip ? `translate(${m.x * 2} 0) scale(-1 1)` : undefined}>
            <Motif x={m.x} y={m.y} s={m.s} color={color} />
          </G>
        ))}
      </G>

      <G opacity={0.16}>
        {motifs.map((m, i) => (
          <G key={`m${i}`} transform={m.flip ? `translate(${m.x * 2} 0) scale(-1 1)` : undefined}>
            <Motif x={m.x} y={m.y} s={m.s} color={color} />
          </G>
        ))}
      </G>
    </Svg>
  );
}
