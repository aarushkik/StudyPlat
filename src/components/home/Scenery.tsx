import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { biomes, type BiomeId, type BiomeTheme, type LandmarkKind } from '@/theme/biomes';

/**
 * The landscape one area of the trail is drawn on, seen from directly above.
 *
 * Three rules keep this readable rather than busy:
 *
 * 1. **Light ground, darker cover.** The ground is the biome's pale hill
 *    colour and it is meant to be *seen* between the trees. Filling every gap
 *    is what turns a forest into green mud.
 * 2. **One flat colour per silhouette.** A crown is a ring of lobes painted a
 *    single base colour, so it reads as one clean shape; shading is exactly two
 *    accents on top — a shadow crescent low-right, a couple of lit lobes
 *    top-left. Shading each lobe separately makes every tree a smear.
 * 3. **Wide size variation.** Crowns range from small scrub to canopy giants.
 *    Uniform size is what reads as wallpaper.
 *
 * Sixteen biomes share four cover systems and derive every shade from the
 * biome's own palette, so a new biome needs a palette and nothing else.
 */

interface SceneryProps {
  width: number;
  height: number;
  biome: BiomeId;
  /** Keeps placement stable but different between areas. */
  seed: number;
  /** Where the centre of the road sits at a given y. */
  trailXAt: (y: number) => number;
  /** How much space to leave either side of the road. */
  clearance: number;
  /** Ground colours of the neighbouring areas, for the transition bands. */
  groundAbove?: string;
  groundBelow?: string;
}

/** How an area is covered. Four systems carry all sixteen biomes. */
type Cover = 'canopy' | 'arid' | 'reef' | 'mineral';

const COVER: Record<BiomeId, Cover> = {
  meadow: 'canopy',
  coast: 'reef',
  forest: 'canopy',
  wetland: 'canopy',
  savanna: 'canopy',
  jungle: 'canopy',
  reef: 'reef',
  desert: 'arid',
  canyon: 'arid',
  highland: 'canopy',
  caverns: 'mineral',
  tundra: 'canopy',
  glacier: 'mineral',
  storm: 'canopy',
  volcano: 'mineral',
  summit: 'mineral',
};

/**
 * 0–1. How much of the ground the cover takes up.
 *
 * Kept well below 1 on purpose — the gaps are what let you read the ground,
 * and the ground is most of what tells you which area you are in.
 */
const DENSITY: Record<BiomeId, number> = {
  meadow: 0.54,
  // Water and sand read as empty where grass reads as ground, so the pale
  // biomes need more on them to feel as populated as the green ones.
  coast: 0.52,
  forest: 0.72,
  wetland: 0.6,
  savanna: 0.5,
  jungle: 0.78,
  reef: 0.68,
  desert: 0.42,
  canyon: 0.46,
  highland: 0.56,
  caverns: 0.54,
  tundra: 0.48,
  glacier: 0.44,
  storm: 0.58,
  volcano: 0.5,
  summit: 0.46,
};

/** Biomes whose crowns should read as palms rather than broadleaf. */
const TROPICAL: ReadonlySet<BiomeId> = new Set<BiomeId>(['jungle', 'savanna', 'coast', 'reef', 'wetland']);

/** Deterministic 0–1 noise; no randomness so the map never reshuffles. */
function noise(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/** Blend two hex colours. Lets every biome derive a full range from two stops. */
function mix(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const out = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${out.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The palette one area paints with.
 *
 * `ground` is the biome's own pale hill colour, which is what makes a meadow
 * read as a meadow and a desert as sand at a glance. Cover sits *darker* than
 * the ground — the reference forest works because the canopy is the dark
 * shape on a light field, not the other way round.
 */
interface Shades {
  ground: string;
  groundSoft: string;
  groundDeep: string;
  base: string;
  shade: string;
  light: string;
  lift: string;
  cast: string;
}

function shadesFor(theme: BiomeTheme, cover: Cover): Shades {
  const mineral = cover === 'mineral' || cover === 'arid';
  const [light, deep] = mineral ? theme.stone : theme.flora;
  return {
    ground: theme.hills[0],
    groundSoft: theme.hills[1],
    groundDeep: theme.hills[2],
    // Stone sits on top of its own dark ground in the night biomes, so it has
    // to be lifted or the rocks vanish into the floor.
    base: mineral ? mix(light, '#FFFFFF', 0.1) : deep,
    shade: mix(mineral ? light : deep, '#000000', 0.22),
    light: mineral ? mix(light, '#FFFFFF', 0.32) : light,
    lift: mix(light, '#FFFFFF', 0.34),
    cast: mix(theme.hills[2], '#000000', 0.28),
  };
}

/** One thing standing on the ground, ready to be depth-sorted. */
interface Piece {
  x: number;
  y: number;
  r: number;
  n: number;
  kind: number;
}

/**
 * Pack the area on a jittered grid, skipping the road corridor.
 *
 * A plain grid reads as wallpaper and pure random clumps badly, so each cell
 * gets at most one piece nudged off centre. Radius varies widely inside the
 * cell, which is what gives a natural mix of saplings and full crowns.
 */
function packCover(
  width: number,
  height: number,
  cell: number,
  seed: number,
  density: number,
  trailXAt: (y: number) => number,
  clearance: number,
): Piece[] {
  const cols = Math.max(2, Math.round(width / cell));
  const rows = Math.max(2, Math.round(height / cell));
  const cw = width / cols;
  const ch = height / rows;
  const pieces: Piece[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const n = seed * 131 + row * 17 + col * 7;
      if (noise(n) > density) continue;

      const x = cw * (col + 0.5) + (noise(n + 1) - 0.5) * cw * 0.8;
      const y = ch * (row + 0.5) + (noise(n + 2) - 0.5) * ch * 0.8;

      if (Math.abs(x - trailXAt(y)) < clearance) continue;

      // Cubed so most crowns are modest and a few are properly large.
      const t = noise(n + 3) ** 3;
      pieces.push({ x, y, r: cell * (0.24 + t * 0.42), n, kind: Math.floor(noise(n + 4) * 100) });
    }
  }

  return pieces.sort((a, b) => a.y - b.y);
}

export function Scenery({
  width,
  height,
  biome,
  seed,
  trailXAt,
  clearance,
  groundAbove,
  groundBelow,
}: SceneryProps) {
  const theme = biomes[biome];
  const cover = COVER[biome];
  const shades = shadesFor(theme, cover);
  const cell = cover === 'canopy' ? 98 : cover === 'reef' ? 92 : 104;
  const pieces = packCover(width, height, cell, seed, DENSITY[biome], trailXAt, clearance);

  const topId = `fade-top-${seed}`;
  const botId = `fade-bot-${seed}`;
  // Both sides of a boundary fade, so the band you actually see is twice this.
  // Much deeper and the seam stops being a seam and starts being fog.
  const FADE = 118;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute' }}>
      <Defs>
        <LinearGradient id={topId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={groundAbove ?? shades.ground} stopOpacity={1} />
          <Stop offset="1" stopColor={groundAbove ?? shades.ground} stopOpacity={0} />
        </LinearGradient>
        <LinearGradient id={botId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={groundBelow ?? shades.ground} stopOpacity={0} />
          <Stop offset="1" stopColor={groundBelow ?? shades.ground} stopOpacity={1} />
        </LinearGradient>
      </Defs>

      <Rect x={0} y={0} width={width} height={height} fill={shades.ground} />
      <GroundWash width={width} height={height} shades={shades} seed={seed} />

      <Landmark width={width} height={height} theme={theme} trailXAt={trailXAt} clearance={clearance} />

      <G>
        {pieces.map((p, i) => (
          <CoverPiece key={i} piece={p} cover={cover} shades={shades} theme={theme} tropical={TROPICAL.has(biome)} />
        ))}
      </G>

      {/* Areas are separate tiles, so without these the boundary between two
          biome palettes is a hard horizontal seam. Each end dissolves into the
          neighbouring area's ground. */}
      {groundAbove ? <Rect x={0} y={0} width={width} height={FADE} fill={`url(#${topId})`} /> : null}
      {groundBelow ? <Rect x={0} y={height - FADE} width={width} height={FADE} fill={`url(#${botId})`} /> : null}
    </Svg>
  );
}

/**
 * Broad, soft patches of the biome's other two hill tones. Just enough to stop
 * the ground reading as flat paint — it stays lighter than anything growing on
 * it.
 */
function GroundWash({
  width,
  height,
  shades,
  seed,
}: {
  width: number;
  height: number;
  shades: Shades;
  seed: number;
}) {
  const blobs = [];
  const count = Math.round(height / 230);
  for (let i = 0; i < count; i += 1) {
    const n = seed * 61 + i * 13;
    blobs.push(
      <Ellipse
        key={i}
        cx={noise(n) * width}
        cy={(i + noise(n + 1)) * (height / count)}
        rx={90 + noise(n + 2) * 110}
        ry={60 + noise(n + 3) * 70}
        fill={i % 2 === 0 ? shades.groundSoft : shades.groundDeep}
        opacity={0.55}
      />,
    );
  }
  return <G>{blobs}</G>;
}

function CoverPiece({
  piece,
  cover,
  shades,
  theme,
  tropical,
}: {
  piece: Piece;
  cover: Cover;
  shades: Shades;
  theme: BiomeTheme;
  tropical: boolean;
}) {
  const { x, y, r, n, kind } = piece;

  if (cover === 'canopy') {
    if (tropical && kind < 30) return <PalmTop x={x} y={y} r={r} n={n} shades={shades} />;
    if (kind < 16) return <Bush x={x} y={y} r={r} n={n} shades={shades} />;
    if (kind < 30) return <BranchTree x={x} y={y} r={r} n={n} shades={shades} theme={theme} />;
    return <CanopyTree x={x} y={y} r={r} n={n} shades={shades} />;
  }

  if (cover === 'reef') {
    if (kind < 46) return <CoralHead x={x} y={y} r={r} n={n} shades={shades} accent={theme.accent} />;
    if (kind < 72) return <KelpPatch x={x} y={y} r={r} n={n} shades={shades} />;
    // Rounded, not the angular rock used on land — a hard-edged crag reads as
    // a mountain poking out of the water rather than something underwater.
    return <Mound x={x} y={y} r={r} n={n} shades={shades} />;
  }

  if (cover === 'arid') {
    if (kind < 26) return <CactusTop x={x} y={y} r={r} n={n} shades={shades} accent={theme.accent} />;
    if (kind < 44) return <Bush x={x} y={y} r={r} n={n} shades={shades} />;
    return <RockPatch x={x} y={y} r={r} n={n} shades={shades} />;
  }

  // Crystals are what say "caverns" rather than "grey rocks", so they get a
  // bigger share and are drawn larger than the piece that spawned them.
  if (kind < 40) return <CrystalCluster x={x} y={y} r={r * 1.35} n={n} shades={shades} accent={theme.accent} />;
  return <RockPatch x={x} y={y} r={r} n={n} shades={shades} />;
}

type ArtProps = { x: number; y: number; r: number; n: number; shades: Shades };

/** The lobe ring a crown's silhouette is built from. */
function lobeRing(x: number, y: number, r: number, n: number, count: number) {
  const ring = r * 0.62;
  const lobe = r * 0.45;
  const out: { cx: number; cy: number; r: number; a: number }[] = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + noise(n + i) * 0.34;
    out.push({
      cx: x + Math.cos(a) * ring,
      cy: y + Math.sin(a) * ring,
      r: lobe * (0.86 + noise(n + i + 11) * 0.28),
      a,
    });
  }
  return out;
}

/**
 * A broadleaf crown from above.
 *
 * The whole silhouette is one colour so it reads as a single clean shape; the
 * only modelling is a shadow crescent on the lower-right and two lit lobes on
 * the upper-left. That is the entire trick — anything more and the tree turns
 * to noise at map scale.
 */
function CanopyTree({ x, y, r, n, shades }: ArtProps) {
  const lobes = lobeRing(x, y, r, n, 7 + Math.floor(noise(n + 5) * 2));

  return (
    <G>
      <Ellipse cx={x + r * 0.14} cy={y + r * 0.2} rx={r * 0.98} ry={r * 0.86} fill={shades.cast} opacity={0.22} />

      {/* Silhouette — one flat colour. */}
      <Circle cx={x} cy={y} r={r * 0.72} fill={shades.base} />
      {lobes.map((l, i) => (
        <Circle key={i} cx={l.cx} cy={l.cy} r={l.r} fill={shades.base} />
      ))}

      {/* Self-shadow, low-right. */}
      {lobes
        .filter((l) => Math.cos(l.a - 0.9) > 0.45)
        .map((l, i) => (
          <Circle key={`s${i}`} cx={l.cx} cy={l.cy} r={l.r * 0.94} fill={shades.shade} />
        ))}

      {/* Light, upper-left. */}
      {lobes
        .filter((l) => Math.cos(l.a - 3.9) > 0.55)
        .map((l, i) => (
          <Circle key={`l${i}`} cx={l.cx * 0.995} cy={l.cy - r * 0.05} r={l.r * 0.8} fill={shades.light} />
        ))}
      <Circle cx={x - r * 0.26} cy={y - r * 0.3} r={r * 0.2} fill={shades.lift} opacity={0.9} />
    </G>
  );
}

/**
 * An open crown with the branch structure showing through. Used sparingly —
 * it is what stops a canopy being nothing but round blobs.
 */
function BranchTree({ x, y, r, n, shades, theme }: ArtProps & { theme: BiomeTheme }) {
  const arms = 5;
  const branches = [];
  const clumps = [];

  for (let i = 0; i < arms; i += 1) {
    const a = (i / arms) * Math.PI * 2 + noise(n + i) * 0.5;
    const ex = x + Math.cos(a) * r * 0.86;
    const ey = y + Math.sin(a) * r * 0.86;
    branches.push(
      <Path
        key={i}
        d={`M${x} ${y} Q${x + Math.cos(a + 0.28) * r * 0.5} ${y + Math.sin(a + 0.28) * r * 0.5} ${ex} ${ey}`}
        stroke={theme.trunk}
        strokeWidth={Math.max(2, r * 0.1)}
        fill="none"
        strokeLinecap="round"
      />,
    );
    clumps.push(<Circle key={`c${i}`} cx={ex} cy={ey} r={r * 0.34} fill={shades.base} />);
  }

  return (
    <G>
      <Ellipse cx={x + r * 0.12} cy={y + r * 0.18} rx={r * 0.9} ry={r * 0.78} fill={shades.cast} opacity={0.18} />
      {branches}
      {clumps}
      <Circle cx={x - r * 0.3} cy={y - r * 0.34} r={r * 0.26} fill={shades.light} />
      <Circle cx={x} cy={y} r={r * 0.14} fill={theme.trunk} />
    </G>
  );
}

/** A palm from above — fronds radiating from a bright crown. */
function PalmTop({ x, y, r, n, shades }: ArtProps) {
  const fronds = 8;
  const out = [];
  for (let i = 0; i < fronds; i += 1) {
    const a = (i / fronds) * Math.PI * 2 + noise(n) * 0.7;
    out.push(
      <Path
        key={i}
        d={`M${x} ${y} Q${x + Math.cos(a + 0.4) * r * 0.62} ${y + Math.sin(a + 0.4) * r * 0.62} ${x + Math.cos(a) * r} ${y + Math.sin(a) * r}`}
        stroke={i % 3 === 0 ? shades.light : shades.base}
        strokeWidth={Math.max(3, r * 0.26)}
        fill="none"
        strokeLinecap="round"
      />,
    );
  }
  return (
    <G>
      <Ellipse cx={x + r * 0.12} cy={y + r * 0.18} rx={r * 0.86} ry={r * 0.74} fill={shades.cast} opacity={0.18} />
      {out}
      <Circle cx={x} cy={y} r={r * 0.17} fill={shades.lift} />
    </G>
  );
}

/** Low scrub. Fills the middle ground between crowns and bare earth. */
function Bush({ x, y, r, n, shades }: ArtProps) {
  const lobes = lobeRing(x, y, r * 0.68, n, 5);
  return (
    <G>
      <Ellipse cx={x + r * 0.08} cy={y + r * 0.14} rx={r * 0.62} ry={r * 0.5} fill={shades.cast} opacity={0.16} />
      {lobes.map((l, i) => (
        <Circle key={i} cx={l.cx} cy={l.cy} r={l.r} fill={shades.base} />
      ))}
      <Circle cx={x - r * 0.16} cy={y - r * 0.18} r={r * 0.22} fill={shades.light} />
    </G>
  );
}

/** A coral head — the one place a biome's accent runs hot. */
function CoralHead({ x, y, r, n, shades, accent }: ArtProps & { accent: string }) {
  const lobes = lobeRing(x, y, r, n, 6);
  return (
    <G>
      <Ellipse cx={x + r * 0.1} cy={y + r * 0.14} rx={r * 0.9} ry={r * 0.78} fill={shades.cast} opacity={0.18} />
      <Circle cx={x} cy={y} r={r * 0.66} fill={shades.base} />
      {lobes.map((l, i) => (
        <Circle key={i} cx={l.cx} cy={l.cy} r={l.r} fill={i === 1 ? accent : shades.base} opacity={i === 1 ? 0.9 : 1} />
      ))}
      <Circle cx={x - r * 0.2} cy={y - r * 0.24} r={r * 0.24} fill={shades.light} />
    </G>
  );
}

/** A weed-covered reef mound, seen from above. */
function Mound({ x, y, r, n, shades }: ArtProps) {
  return (
    <G>
      <Ellipse cx={x + r * 0.1} cy={y + r * 0.14} rx={r * 0.88} ry={r * 0.7} fill={shades.cast} opacity={0.16} />
      <Ellipse cx={x} cy={y} rx={r * 0.84} ry={r * 0.66} fill={shades.base} />
      <Ellipse cx={x - r * 0.2} cy={y - r * 0.16} rx={r * 0.44} ry={r * 0.32} fill={shades.light} opacity={0.85} />
      {noise(n + 5) > 0.5 ? (
        <Ellipse cx={x + r * 0.38} cy={y + r * 0.22} rx={r * 0.26} ry={r * 0.19} fill={shades.shade} />
      ) : null}
    </G>
  );
}

/** A swaying bed of kelp seen from the surface. */
function KelpPatch({ x, y, r, n, shades }: ArtProps) {
  const strands = 3;
  const out = [];
  for (let i = 0; i < strands; i += 1) {
    const ox = x + (i - 1) * r * 0.44;
    out.push(
      <Path
        key={i}
        d={`M${ox} ${y + r * 0.7} Q${ox + r * 0.44 * (noise(n + i) - 0.5)} ${y} ${ox + r * 0.3 * (noise(n + i + 1) - 0.5)} ${y - r * 0.8}`}
        stroke={i === 1 ? shades.light : shades.base}
        strokeWidth={Math.max(3, r * 0.19)}
        fill="none"
        strokeLinecap="round"
      />,
    );
  }
  return <G>{out}</G>;
}

/** A cactus from above: a rosette of arms. */
function CactusTop({ x, y, r, n, shades, accent }: ArtProps & { accent: string }) {
  const arms = 3 + Math.floor(noise(n + 1) * 2);
  const out = [];
  for (let i = 0; i < arms; i += 1) {
    const a = (i / arms) * Math.PI * 2 + noise(n) * 1.2;
    const cx = x + Math.cos(a) * r * 0.4;
    const cy = y + Math.sin(a) * r * 0.4;
    out.push(
      <Ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx={r * 0.22}
        ry={r * 0.4}
        fill={shades.base}
        transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`}
      />,
    );
  }
  return (
    <G>
      <Ellipse cx={x + r * 0.16} cy={y + r * 0.18} rx={r * 0.72} ry={r * 0.6} fill={shades.cast} opacity={0.18} />
      {out}
      <Circle cx={x} cy={y} r={r * 0.28} fill={shades.light} />
      <Circle cx={x} cy={y} r={r * 0.09} fill={accent} />
    </G>
  );
}

/** Scattered stone, used by every non-growing cover system. */
function RockPatch({ x, y, r, n, shades }: ArtProps) {
  const s = r * 0.8;
  return (
    <G>
      <Ellipse cx={x + r * 0.12} cy={y + r * 0.16} rx={s * 0.9} ry={s * 0.68} fill={shades.cast} opacity={0.2} />
      <Path
        d={`M${x - s} ${y + s * 0.44} L${x - s * 0.54} ${y - s * 0.62} L${x + s * 0.5} ${y - s * 0.72} L${x + s} ${y + s * 0.3} Z`}
        fill={shades.base}
      />
      <Path
        d={`M${x - s * 0.54} ${y - s * 0.62} L${x + s * 0.5} ${y - s * 0.72} L${x + s * 0.1} ${y} Z`}
        fill={shades.light}
        opacity={0.85}
      />
      {noise(n + 6) > 0.6 ? (
        <Path
          d={`M${x + s * 0.5} ${y + s * 0.5} L${x + s * 0.8} ${y - s * 0.1} L${x + s * 1.2} ${y + s * 0.42} Z`}
          fill={shades.shade}
        />
      ) : null}
    </G>
  );
}

/** A cluster of shards, lit from the biome's accent. */
function CrystalCluster({ x, y, r, n, shades, accent }: ArtProps & { accent: string }) {
  const shards = 3;
  const out = [];
  for (let i = 0; i < shards; i += 1) {
    const a = (i / shards) * Math.PI * 2 + noise(n) * 1.4;
    const cx = x + Math.cos(a) * r * 0.26;
    const cy = y + Math.sin(a) * r * 0.26;
    const s = r * (0.78 + noise(n + i) * 0.44);
    out.push(
      <G key={i}>
        <Path d={`M${cx} ${cy - s} L${cx + s * 0.42} ${cy} L${cx} ${cy + s * 0.56} L${cx - s * 0.42} ${cy} Z`} fill={accent} opacity={0.9} />
        <Path d={`M${cx} ${cy - s} L${cx + s * 0.42} ${cy} L${cx} ${cy} Z`} fill="#FFFFFF" opacity={0.4} />
      </G>,
    );
  }
  return (
    <G>
      <Ellipse cx={x} cy={y + r * 0.2} rx={r * 0.8} ry={r * 0.46} fill={shades.cast} opacity={0.24} />
      {out}
    </G>
  );
}

/** The area's own landmark, dropped into the roomiest spot near the top. */
function Landmark({
  width,
  height,
  theme,
  trailXAt,
  clearance,
}: {
  width: number;
  height: number;
  theme: BiomeTheme;
  trailXAt: (y: number) => number;
  clearance: number;
}) {
  let best: { x: number; y: number } | null = null;
  let bestRoom = 0;
  for (let i = 0; i < 6; i += 1) {
    const y = height * (0.22 + i * 0.1);
    const tx = trailXAt(y);
    const left = tx - clearance - 8;
    const right = width - 8 - (tx + clearance);
    const room = Math.max(left, right);
    if (room > bestRoom) {
      bestRoom = room;
      best = { x: left > right ? 8 + left / 2 : tx + clearance + right / 2, y };
    }
  }
  if (!best || bestRoom < 62) return null;

  const scale = Math.min(1, bestRoom / 96);
  return (
    <G transform={`translate(${best.x} ${best.y}) scale(${scale})`}>
      <LandmarkArt kind={theme.landmark} theme={theme} />
    </G>
  );
}

/**
 * The sixteen landmarks — one per biome, and the clearest signal of which area
 * you are standing in. They keep a slight three-quarter tilt on purpose: they
 * are the one built thing in an overhead scene, and flat-on they stop being
 * recognisable.
 */
function LandmarkArt({ kind, theme }: { kind: LandmarkKind; theme: BiomeTheme }) {
  const [leaf, leafDeep] = theme.flora;
  const [stone, stoneDeep] = theme.stone;
  const [gateLight, gateDeep] = theme.gate;

  switch (kind) {
    case 'windmill':
      return (
        <G>
          <Ellipse cx={0} cy={44} rx={30} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-16 44 L-10 -18 H10 L16 44 Z" fill={gateLight} />
          <Path d="M4 -18 L10 -18 L16 44 H8 Z" fill={gateDeep} opacity={0.5} />
          <Rect x={-6} y={20} width={12} height={24} rx={2} fill={gateDeep} />
          <Path d="M-18 -22 L0 -18 L18 -22 L0 -26 Z" fill={gateDeep} />
          <Path d="M0 -22 L-2 -56 H2 Z" fill="#FFF6E8" stroke={gateDeep} strokeWidth={1.5} />
          <Path d="M0 -22 L34 -24 V-20 Z" fill="#FFF6E8" stroke={gateDeep} strokeWidth={1.5} />
          <Path d="M0 -22 L2 12 H-2 Z" fill="#FFF6E8" stroke={gateDeep} strokeWidth={1.5} />
          <Path d="M0 -22 L-34 -20 V-24 Z" fill="#FFF6E8" stroke={gateDeep} strokeWidth={1.5} />
          <Circle cx={0} cy={-22} r={4} fill={gateDeep} />
        </G>
      );
    case 'lighthouse':
      return (
        <G>
          <Ellipse cx={0} cy={46} rx={28} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-15 46 L-9 -30 H9 L15 46 Z" fill="#FFFFFF" />
          <Path d="M-12.6 16 H12.6 L13.8 30 H-13.8 Z" fill={theme.accent} opacity={0.85} />
          <Path d="M-10.2 -12 H10.2 L11.4 2 H-11.4 Z" fill={theme.accent} opacity={0.85} />
          <Rect x={-12} y={-38} width={24} height={9} rx={3} fill={stoneDeep} />
          <Rect x={-8} y={-50} width={16} height={13} rx={2} fill="#FFF3C4" />
          <Path d="M-8 -56 L0 -64 L8 -56 Z" fill={stoneDeep} />
          <Path d="M8 -46 L44 -54 L44 -38 Z" fill="#FFF3C4" opacity={0.35} />
        </G>
      );
    case 'cabin':
      return (
        <G>
          <Ellipse cx={0} cy={30} rx={34} ry={6} fill={stoneDeep} opacity={0.18} />
          <Rect x={-26} y={-6} width={52} height={36} rx={3} fill={theme.trunk} />
          <Path d="M-32 -6 L0 -32 L32 -6 Z" fill={gateDeep} />
          <Path d="M-24 -8 L0 -27 L24 -8 Z" fill={gateLight} />
          <Rect x={-7} y={8} width={14} height={22} rx={2} fill={gateDeep} />
          <Rect x={-22} y={2} width={11} height={11} rx={2} fill="#FFF3C4" />
          <Rect x={12} y={2} width={11} height={11} rx={2} fill="#FFF3C4" />
          <Rect x={12} y={-30} width={8} height={14} rx={2} fill={stoneDeep} />
          <Circle cx={16} cy={-38} r={5} fill="#FFFFFF" opacity={0.5} />
          <Circle cx={22} cy={-46} r={4} fill="#FFFFFF" opacity={0.35} />
        </G>
      );
    case 'stiltHut':
      return (
        <G>
          <Ellipse cx={0} cy={44} rx={32} ry={5} fill={stoneDeep} opacity={0.16} />
          <Rect x={-18} y={4} width={5} height={40} fill={theme.trunk} />
          <Rect x={13} y={4} width={5} height={40} fill={theme.trunk} />
          <Rect x={-3} y={4} width={5} height={40} fill={theme.trunk} opacity={0.8} />
          <Rect x={-24} y={-10} width={48} height={16} rx={2} fill={gateLight} />
          <Path d="M-30 -10 L0 -34 L30 -10 Z" fill={leafDeep} />
          <Path d="M-22 -12 L0 -29 L22 -12 Z" fill={leaf} opacity={0.6} />
          <Rect x={-5} y={-6} width={10} height={12} rx={2} fill={gateDeep} />
        </G>
      );
    case 'acacia':
      return (
        <G>
          <Ellipse cx={4} cy={6} rx={44} ry={38} fill={stoneDeep} opacity={0.16} />
          <Ellipse cx={0} cy={0} rx={44} ry={38} fill={leafDeep} />
          <Ellipse cx={-10} cy={-10} rx={28} ry={22} fill={leaf} />
          <Circle cx={0} cy={0} r={6} fill={theme.trunk} />
        </G>
      );
    case 'ruin':
      return (
        <G>
          <Ellipse cx={0} cy={40} rx={40} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-38 40 L-30 10 H30 L38 40 Z" fill={stone} />
          <Path d="M-26 10 L-20 -14 H20 L26 10 Z" fill={stone} />
          <Path d="M-14 -14 L-10 -32 H10 L14 -14 Z" fill={stoneDeep} opacity={0.85} />
          <Rect x={-6} y={16} width={12} height={24} fill={stoneDeep} />
          <Path d="M-30 10 H30" stroke={stoneDeep} strokeWidth={3} opacity={0.4} />
          <Path d="M-34 34 Q-24 24 -18 34" stroke={leaf} strokeWidth={4} fill="none" strokeLinecap="round" />
        </G>
      );
    case 'wreck':
      return (
        <G>
          <Ellipse cx={0} cy={34} rx={44} ry={6} fill={stoneDeep} opacity={0.16} />
          <G transform="rotate(-12)">
            <Path d="M-38 20 Q0 40 38 16 L30 2 Q0 20 -32 6 Z" fill={theme.trunk} />
            <Path d="M-30 8 Q0 22 30 4" stroke={gateDeep} strokeWidth={3} fill="none" opacity={0.6} />
            <Rect x={-3} y={-42} width={6} height={48} rx={2} fill={gateDeep} />
            <Path d="M3 -38 Q22 -26 3 -14 Z" fill="#FFF3E2" opacity={0.55} />
          </G>
        </G>
      );
    case 'pyramid':
      return (
        <G>
          <Ellipse cx={0} cy={40} rx={44} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-44 40 L0 -40 L44 40 Z" fill={stone} />
          <Path d="M0 -40 L44 40 H0 Z" fill={stoneDeep} opacity={0.4} />
          <Path d="M-22 0 H22" stroke={stoneDeep} strokeWidth={2} opacity={0.3} />
          <Path d="M-33 20 H33" stroke={stoneDeep} strokeWidth={2} opacity={0.3} />
          <Path d="M-8 -26 L0 -40 L8 -26 Z" fill={theme.accent} opacity={0.5} />
        </G>
      );
    case 'rockArch':
      return (
        <G>
          <Ellipse cx={0} cy={40} rx={42} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-40 40 L-40 -6 Q0 -46 40 -6 L40 40 L20 40 L20 2 Q0 -22 -20 2 L-20 40 Z" fill={stone} />
          <Path d="M20 40 L20 2 Q0 -22 -20 2" stroke={stoneDeep} strokeWidth={3} fill="none" opacity={0.4} />
        </G>
      );
    case 'watchtower':
      return (
        <G>
          <Ellipse cx={0} cy={44} rx={26} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-16 44 L-13 -26 H13 L16 44 Z" fill={stone} />
          <Path d="M4 -26 H13 L16 44 H8 Z" fill={stoneDeep} opacity={0.4} />
          <Rect x={-19} y={-36} width={38} height={11} rx={2} fill={stoneDeep} />
          <Rect x={-19} y={-44} width={7} height={9} fill={stoneDeep} />
          <Rect x={-4} y={-44} width={7} height={9} fill={stoneDeep} />
          <Rect x={11} y={-44} width={7} height={9} fill={stoneDeep} />
          <Rect x={-5} y={-16} width={10} height={13} rx={4} fill="#FFF3C4" />
        </G>
      );
    case 'crystalCluster':
      return (
        <G>
          <Ellipse cx={0} cy={36} rx={34} ry={6} fill="#000000" opacity={0.18} />
          <Path d="M-4 36 L-20 -6 L-8 -46 L4 -40 L10 -2 Z" fill={theme.accent} opacity={0.9} />
          <Path d="M-8 -46 L4 -40 L-2 34 Z" fill="#FFFFFF" opacity={0.32} />
          <Path d="M12 36 L4 4 L22 -22 L32 6 Z" fill={theme.accent} opacity={0.62} />
          <Path d="M-26 36 L-32 12 L-20 -4 L-14 20 Z" fill={theme.accent} opacity={0.5} />
        </G>
      );
    case 'cairn':
      return (
        <G>
          <Ellipse cx={0} cy={34} rx={26} ry={5} fill={stoneDeep} opacity={0.18} />
          <Ellipse cx={0} cy={26} rx={22} ry={9} fill={stone} />
          <Ellipse cx={2} cy={9} rx={17} ry={8} fill={stoneDeep} />
          <Ellipse cx={-2} cy={-5} rx={13} ry={7} fill={stone} />
          <Ellipse cx={1} cy={-17} rx={9} ry={6} fill={stoneDeep} />
          <Ellipse cx={0} cy={-26} rx={5.5} ry={4} fill={stone} />
        </G>
      );
    case 'iceArch':
      return (
        <G>
          <Ellipse cx={0} cy={38} rx={40} ry={6} fill={stoneDeep} opacity={0.14} />
          <Path d="M-36 38 L-36 -2 Q0 -44 36 -2 L36 38 L18 38 L18 6 Q0 -20 -18 6 L-18 38 Z" fill={theme.accent} opacity={0.6} />
          <Path d="M-36 -2 Q0 -44 36 -2" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.75} />
        </G>
      );
    case 'standingStones':
      return (
        <G>
          <Ellipse cx={0} cy={38} rx={38} ry={6} fill="#000000" opacity={0.2} />
          <Path d="M-30 38 L-27 -18 L-14 -22 L-12 38 Z" fill={stone} />
          <Path d="M-4 38 L-2 -34 L11 -30 L10 38 Z" fill={stoneDeep} />
          <Path d="M18 38 L21 -10 L32 -6 L31 38 Z" fill={stone} />
          <Path d="M4 -34 L-2 -8 H6 L0 20" stroke={theme.accent} strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      );
    case 'volcanoCone':
      return (
        <G>
          <Ellipse cx={0} cy={42} rx={48} ry={7} fill="#000000" opacity={0.2} />
          <Path d="M-46 42 L-14 -26 H14 L46 42 Z" fill={stoneDeep} />
          <Path d="M14 -26 L46 42 H4 Z" fill="#000000" opacity={0.22} />
          <Path d="M-14 -26 H14 L10 -20 H-10 Z" fill={theme.accent} />
          <Path d="M-8 -22 Q-4 6 -12 42" stroke={theme.accent} strokeWidth={5} fill="none" opacity={0.8} strokeLinecap="round" />
          <Circle cx={-2} cy={-40} r={9} fill="#6E5A58" opacity={0.5} />
          <Circle cx={10} cy={-52} r={7} fill="#6E5A58" opacity={0.38} />
        </G>
      );
    case 'summitFlag':
      return (
        <G>
          <Ellipse cx={0} cy={40} rx={40} ry={6} fill={stoneDeep} opacity={0.18} />
          <Path d="M-40 40 L0 -34 L40 40 Z" fill={stone} />
          <Path d="M0 -34 L40 40 H2 Z" fill={stoneDeep} opacity={0.35} />
          <Path d="M-16 -4 L0 -34 L16 -4 Q0 -16 -16 -4 Z" fill="#FFFFFF" opacity={0.9} />
          <Rect x={-1.5} y={-72} width={3} height={40} rx={1.5} fill={stoneDeep} />
          <Path d="M1.5 -70 L28 -62 L1.5 -54 Z" fill={theme.accent} />
        </G>
      );
    default:
      return null;
  }
}
