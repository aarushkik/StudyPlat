import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { biomes, isDarkBiome, type BiomeId, type BiomeTheme, type DecorKind } from '@/theme/biomes';

/**
 * The landscape one area of the trail is drawn on.
 *
 * Every biome is the same construction — sky wash, a skyline, three land
 * bands, then decorations in the margins — rendered from that biome's palette.
 * That's what lets ten areas per course look like ten different places without
 * ten hand-drawn scenes. Everything is placed on fractions of the segment's
 * real pixel size, so a longer area gets more scenery rather than a stretched
 * copy of the same picture.
 */

interface SceneryProps {
  width: number;
  height: number;
  biome: BiomeId;
  /** Keeps decoration placement stable but different between areas. */
  seed: number;
}

/** What sits on the horizon behind the land bands. */
type Skyline = 'peaks' | 'mesas' | 'dunes' | 'stalactites' | 'none';

const SKYLINE: Record<BiomeId, Skyline> = {
  meadow: 'none',
  coast: 'dunes',
  forest: 'none',
  wetland: 'none',
  savanna: 'dunes',
  jungle: 'none',
  reef: 'none',
  desert: 'dunes',
  canyon: 'mesas',
  highland: 'peaks',
  caverns: 'stalactites',
  tundra: 'peaks',
  glacier: 'peaks',
  storm: 'peaks',
  volcano: 'mesas',
  summit: 'peaks',
};

/** Deterministic 0–1 noise; no randomness so the map never reshuffles on re-render. */
function noise(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function Scenery({ width, height, biome, seed }: SceneryProps) {
  const theme = biomes[biome];
  const id = `sky-${biome}-${seed}`;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute' }}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={theme.sky[0]} />
          <Stop offset="1" stopColor={theme.sky[1]} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />

      <Horizon width={width} height={height} biome={biome} theme={theme} />
      <Hills width={width} height={height} theme={theme} />
      <Decorations width={width} height={height} biome={biome} seed={seed} />
    </Svg>
  );
}

/** Soft overlapping bands that read as land receding into the distance. */
function Hills({ width, height, theme }: { width: number; height: number; theme: BiomeTheme }) {
  const band = (yFrac: number, rise: number, fill: string, opacity = 1) => {
    const y = height * yFrac;
    return (
      <Path
        d={`M0 ${y} C ${width * 0.25} ${y - rise}, ${width * 0.45} ${y + rise * 0.6}, ${width * 0.68} ${y - rise * 0.4} S ${width} ${y - rise * 0.2}, ${width} ${y} L${width} ${height} L0 ${height} Z`}
        fill={fill}
        opacity={opacity}
      />
    );
  };

  return (
    <G>
      {band(0.26, 44, theme.hills[0], 0.85)}
      {band(0.56, 40, theme.hills[1], 0.9)}
      {band(0.84, 26, theme.hills[2])}
    </G>
  );
}

/** The horizon feature — peaks, mesas, dunes, or a cave ceiling. */
function Horizon({ width, height, biome, theme }: { width: number; height: number; biome: BiomeId; theme: BiomeTheme }) {
  const kind = SKYLINE[biome];
  const y = height * 0.3;

  if (kind === 'peaks') {
    const peak = (cx: number, w: number, h: number) => (
      <G key={cx}>
        <Path d={`M${cx - w} ${y} L${cx} ${y - h} L${cx + w} ${y} Z`} fill={theme.stone[1]} />
        <Path
          d={`M${cx - w * 0.34} ${y - h * 0.66} L${cx} ${y - h} L${cx + w * 0.34} ${y - h * 0.66} Q${cx + w * 0.12} ${y - h * 0.58} ${cx} ${y - h * 0.72} Q${cx - w * 0.14} ${y - h * 0.56} ${cx - w * 0.34} ${y - h * 0.66} Z`}
          fill={theme.hills[0]}
        />
      </G>
    );
    return (
      <G opacity={0.9}>
        {peak(width * 0.22, 62, 88)}
        {peak(width * 0.64, 78, 118)}
        {peak(width * 0.95, 52, 70)}
      </G>
    );
  }

  if (kind === 'mesas') {
    const mesa = (x: number, w: number, h: number) => (
      <Path key={x} d={`M${x} ${y} V${y - h} H${x + w} V${y} Z`} fill={theme.stone[1]} opacity={0.75} />
    );
    return (
      <G>
        {mesa(width * 0.04, 96, 62)}
        {mesa(width * 0.52, 128, 88)}
        {mesa(width * 0.86, 74, 48)}
      </G>
    );
  }

  if (kind === 'dunes') {
    return (
      <G opacity={0.7}>
        <Path
          d={`M0 ${y} Q${width * 0.3} ${y - 46} ${width * 0.58} ${y} T${width} ${y - 14} L${width} ${y + 60} L0 ${y + 60} Z`}
          fill={theme.hills[0]}
        />
      </G>
    );
  }

  if (kind === 'stalactites') {
    const spike = (x: number, w: number, h: number) => (
      <Path key={x} d={`M${x - w} 0 L${x} ${h} L${x + w} 0 Z`} fill={theme.stone[1]} />
    );
    return (
      <G opacity={0.9}>
        <Rect x={0} y={0} width={width} height={18} fill={theme.stone[1]} />
        {spike(width * 0.12, 16, 66)}
        {spike(width * 0.38, 11, 40)}
        {spike(width * 0.62, 19, 84)}
        {spike(width * 0.88, 13, 52)}
      </G>
    );
  }

  return null;
}

function Decorations({ width, height, biome, seed }: SceneryProps) {
  const theme = biomes[biome];
  const count = Math.max(6, Math.round(height / 150));
  const items: React.ReactNode[] = [];

  for (let i = 0; i < count; i += 1) {
    const n = seed * 31 + i * 7;
    // Scenery lives only in the margins the trail can never reach, so nothing
    // ever lands on top of a node.
    const left = noise(n) < 0.5;
    const edge = left ? 0.04 + noise(n + 1) * 0.08 : 0.88 + noise(n + 1) * 0.08;
    const x = width * edge;
    const y = height * ((i + 0.6) / count) + noise(n + 2) * 30;
    const scale = 0.75 + noise(n + 3) * 0.5;
    const kind = theme.decor[Math.floor(noise(n + 4) * 3) % 3];
    items.push(
      <G key={i} transform={`translate(${x} ${y}) scale(${scale})`}>
        <Decor kind={kind} theme={theme} />
      </G>,
    );
  }

  return (
    <G>
      {isDarkBiome(biome) ? null : (
        <>
          <Cloud x={width * 0.18} y={height * 0.07} scale={1} fill={theme.sky[0]} />
          <Cloud x={width * 0.8} y={height * 0.19} scale={0.72} fill={theme.sky[0]} />
        </>
      )}
      {items}
    </G>
  );
}

/** Dispatch to one of the eighteen shapes, painted in the biome's palette. */
function Decor({ kind, theme }: { kind: DecorKind; theme: BiomeTheme }) {
  const [leaf, leafDeep] = theme.flora;
  const [stone, stoneDeep] = theme.stone;

  switch (kind) {
    case 'roundTree':
      return (
        <G>
          <Rect x={-4} y={-8} width={8} height={24} rx={3} fill={theme.trunk} />
          <Circle cx={0} cy={-20} r={20} fill={leaf} />
          <Circle cx={-8} cy={-14} r={13} fill={leafDeep} opacity={0.55} />
        </G>
      );
    case 'pine':
      return (
        <G>
          <Rect x={-3.5} y={-6} width={7} height={20} rx={2.5} fill={theme.trunk} />
          <Path d="M0 -46 L15 -18 H-15 Z" fill={leafDeep} />
          <Path d="M0 -34 L19 -4 H-19 Z" fill={leaf} />
        </G>
      );
    case 'snowPine':
      return (
        <G>
          <Rect x={-3.5} y={-6} width={7} height={20} rx={2.5} fill={theme.trunk} />
          <Path d="M0 -46 L15 -18 H-15 Z" fill={leafDeep} />
          <Path d="M0 -34 L19 -4 H-19 Z" fill={leaf} />
          <Path d="M0 -46 L7 -33 H-7 Z" fill="#FFFFFF" opacity={0.92} />
        </G>
      );
    case 'palm':
      return (
        <G>
          <Path d="M2 14 Q-2 -4 -6 -22" stroke={theme.trunk} strokeWidth={7} fill="none" strokeLinecap="round" />
          <Path d="M-6 -22 Q-24 -30 -30 -18" stroke={leaf} strokeWidth={6} fill="none" strokeLinecap="round" />
          <Path d="M-6 -22 Q10 -34 20 -24" stroke={leaf} strokeWidth={6} fill="none" strokeLinecap="round" />
          <Path d="M-6 -22 Q-14 -40 -2 -46" stroke={leafDeep} strokeWidth={6} fill="none" strokeLinecap="round" />
        </G>
      );
    case 'shrub':
      return (
        <G>
          <Circle cx={-9} cy={0} r={9} fill={leaf} />
          <Circle cx={9} cy={1} r={8} fill={leaf} />
          <Circle cx={0} cy={-6} r={11} fill={leaf} />
          <Circle cx={-6} cy={-2} r={6} fill={leafDeep} opacity={0.45} />
        </G>
      );
    case 'bloom':
      return (
        <G>
          <Path d="M0 4 V-6" stroke={leafDeep} strokeWidth={2.4} strokeLinecap="round" />
          <Circle cx={0} cy={-10} r={5} fill={theme.accent} />
          <Circle cx={-7} cy={-6} r={4} fill={theme.accent} opacity={0.75} />
          <Circle cx={7} cy={-6} r={4} fill={theme.accent} opacity={0.75} />
        </G>
      );
    case 'mushroom':
      return (
        <G>
          <Rect x={-3} y={-6} width={6} height={14} rx={2.5} fill="#F0E4D4" />
          <Path d="M-14 -6 Q0 -22 14 -6 Z" fill={theme.accent} />
          <Circle cx={-5} cy={-10} r={2.4} fill="#FFFFFF" opacity={0.7} />
        </G>
      );
    case 'reed':
      return (
        <G>
          <Path d="M-6 12 V-14" stroke={leafDeep} strokeWidth={3} strokeLinecap="round" />
          <Path d="M2 12 V-22" stroke={leaf} strokeWidth={3} strokeLinecap="round" />
          <Path d="M10 12 V-10" stroke={leafDeep} strokeWidth={3} strokeLinecap="round" />
          <Ellipse cx={2} cy={-24} rx={3} ry={7} fill={theme.trunk} />
        </G>
      );
    case 'kelp':
      return (
        <G>
          <Path d="M0 14 Q-10 0 0 -12 Q10 -24 0 -36" stroke={leaf} strokeWidth={5} fill="none" strokeLinecap="round" />
          <Path d="M10 14 Q2 2 10 -8" stroke={leafDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
        </G>
      );
    case 'coral':
      return (
        <G>
          <Path d="M0 12 V-6" stroke={theme.accent} strokeWidth={6} strokeLinecap="round" />
          <Path d="M0 -2 L-12 -16" stroke={theme.accent} strokeWidth={5} strokeLinecap="round" />
          <Path d="M0 -4 L12 -20" stroke={theme.accent} strokeWidth={5} strokeLinecap="round" />
          <Circle cx={-13} cy={-18} r={4} fill={leaf} />
          <Circle cx={13} cy={-22} r={4} fill={leaf} />
        </G>
      );
    case 'cactus':
      return (
        <G>
          <Rect x={-6} y={-30} width={12} height={44} rx={6} fill={leaf} />
          <Rect x={-20} y={-18} width={10} height={20} rx={5} fill={leaf} />
          <Rect x={10} y={-24} width={10} height={26} rx={5} fill={leafDeep} />
        </G>
      );
    case 'dune':
      return (
        <G>
          <Path d="M-30 8 Q-10 -12 8 0 Q22 8 30 8 Z" fill={stone} />
          <Path d="M-30 8 Q-14 -4 0 4 Z" fill={stoneDeep} opacity={0.4} />
        </G>
      );
    case 'rock':
      return (
        <G>
          <Path d="M-18 6 L-9 -12 L4 -16 L17 -3 L14 6 Z" fill={stone} />
          <Path d="M-9 -12 L4 -16 L2 -4 Z" fill={stoneDeep} opacity={0.5} />
        </G>
      );
    case 'boulder':
      return (
        <G>
          <Path d="M-26 10 L-16 -16 L6 -24 L26 -6 L22 10 Z" fill={stone} />
          <Path d="M-16 -16 L6 -24 L2 -6 Z" fill={stoneDeep} opacity={0.5} />
        </G>
      );
    case 'crystal':
      return (
        <G>
          <Path d="M0 12 L-10 -8 L-4 -30 L6 -26 L11 -6 Z" fill={theme.accent} opacity={0.85} />
          <Path d="M-4 -30 L6 -26 L2 8 Z" fill="#FFFFFF" opacity={0.35} />
          <Path d="M14 12 L8 -2 L16 -14 L21 0 Z" fill={theme.accent} opacity={0.6} />
        </G>
      );
    case 'iceSpire':
      return (
        <G>
          <Path d="M0 14 L-11 -6 L0 -40 L11 -6 Z" fill={theme.accent} opacity={0.55} />
          <Path d="M0 -40 L11 -6 L2 -2 Z" fill="#FFFFFF" opacity={0.6} />
        </G>
      );
    case 'emberRock':
      return (
        <G>
          <Path d="M-20 8 L-10 -14 L6 -20 L20 -4 L16 8 Z" fill={stoneDeep} />
          <Path d="M-6 8 Q-2 -4 4 -10" stroke={theme.accent} strokeWidth={4} fill="none" strokeLinecap="round" />
          <Circle cx={8} cy={-14} r={3} fill={theme.accent} />
        </G>
      );
    case 'obelisk':
      return (
        <G>
          <Path d="M-9 14 L-7 -30 L0 -40 L7 -30 L9 14 Z" fill={stone} />
          <Path d="M0 -40 L7 -30 L5 14 L0 14 Z" fill={stoneDeep} opacity={0.45} />
        </G>
      );
    default:
      return null;
  }
}

function Cloud({ x, y, scale, fill }: { x: number; y: number; scale: number; fill: string }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.75}>
      <Ellipse cx={0} cy={0} rx={30} ry={15} fill="#FFFFFF" />
      <Ellipse cx={-20} cy={5} rx={20} ry={11} fill="#FFFFFF" />
      <Ellipse cx={22} cy={6} rx={17} ry={10} fill="#FFFFFF" />
      <Ellipse cx={0} cy={-3} rx={18} ry={9} fill={fill} opacity={0.25} />
    </G>
  );
}
