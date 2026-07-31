import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { scenery } from '@/theme';
import type { Biome } from '@/types/quest';

/**
 * The landscape a region of the trail is drawn on.
 *
 * Each unit gets its own biome, so climbing the map reads as travelling
 * somewhere rather than scrolling a list: meadow, then forest, then highland,
 * then the summit. Everything is placed on fractions of the segment's real
 * pixel size, so a unit with more stops simply gets more scenery rather than a
 * stretched copy of the same picture.
 */

interface SceneryProps {
  width: number;
  height: number;
  biome: Biome;
  /** Keeps decoration placement stable but different between segments. */
  seed: number;
}

/** Deterministic 0–1 noise; no randomness so the map never reshuffles on re-render. */
function noise(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function Scenery({ width, height, biome, seed }: SceneryProps) {
  const id = `sky-${biome}-${seed}`;
  const tone = TONES[biome];

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute' }}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={tone.top} />
          <Stop offset="1" stopColor={tone.bottom} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />

      <Hills width={width} height={height} biome={biome} />
      <Decorations width={width} height={height} biome={biome} seed={seed} />
    </Svg>
  );
}

const TONES: Record<Biome, { top: string; bottom: string }> = {
  meadow: { top: scenery.skyHigh, bottom: '#F2F8E9' },
  forest: { top: '#F0F7E6', bottom: '#E4F0D6' },
  highland: { top: '#F6EDF6', bottom: '#EFE6F3' },
  summit: { top: '#F1F4FB', bottom: '#E7EEF8' },
};

/** Soft overlapping bands that read as land receding into the distance. */
function Hills({ width, height, biome }: { width: number; height: number; biome: Biome }) {
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

  if (biome === 'summit') {
    return (
      <G>
        {band(0.28, 46, scenery.ridge, 0.55)}
        <Peaks width={width} y={height * 0.34} />
        {band(0.6, 40, '#E3EAF6')}
        {band(0.82, 28, '#D9E3F3')}
      </G>
    );
  }
  if (biome === 'highland') {
    return (
      <G>
        {band(0.24, 52, scenery.ridge, 0.5)}
        {band(0.5, 44, scenery.hillFar)}
        {band(0.78, 30, '#E7DEEF')}
      </G>
    );
  }
  return (
    <G>
      {band(0.26, 44, scenery.hillMid, 0.75)}
      {band(0.56, 40, scenery.hillNear, 0.85)}
      {band(0.84, 26, biome === 'forest' ? '#CFE4B8' : '#D6E9C2')}
    </G>
  );
}

/** Distant snow-capped peaks for the summit region. */
function Peaks({ width, y }: { width: number; y: number }) {
  const peak = (cx: number, w: number, h: number) => (
    <G key={cx}>
      <Path d={`M${cx - w} ${y} L${cx} ${y - h} L${cx + w} ${y} Z`} fill={scenery.ridgeDeep} />
      <Path d={`M${cx - w * 0.34} ${y - h * 0.66} L${cx} ${y - h} L${cx + w * 0.34} ${y - h * 0.66} Q${cx + w * 0.12} ${y - h * 0.58} ${cx} ${y - h * 0.72} Q${cx - w * 0.14} ${y - h * 0.56} ${cx - w * 0.34} ${y - h * 0.66} Z`} fill={scenery.snow} />
    </G>
  );
  return (
    <G>
      {peak(width * 0.24, 62, 88)}
      {peak(width * 0.66, 78, 118)}
      {peak(width * 0.94, 52, 70)}
    </G>
  );
}

function Decorations({ width, height, biome, seed }: SceneryProps) {
  const count = Math.max(6, Math.round(height / 130));
  const items: React.ReactNode[] = [];

  for (let i = 0; i < count; i += 1) {
    const n = seed * 31 + i * 7;
    // Scenery lives only in the margins the trail can never reach, so a tree
    // never lands on top of a node.
    const left = noise(n) < 0.5;
    const edge = left ? 0.04 + noise(n + 1) * 0.08 : 0.88 + noise(n + 1) * 0.08;
    const x = width * edge;
    const y = height * ((i + 0.6) / count) + noise(n + 2) * 30;
    const scale = 0.75 + noise(n + 3) * 0.5;
    items.push(<Decoration key={i} x={x} y={y} scale={scale} biome={biome} variant={Math.floor(noise(n + 4) * 3)} />);
  }

  return (
    <G>
      <Cloud x={width * 0.18} y={height * 0.07} scale={1} />
      <Cloud x={width * 0.8} y={height * 0.19} scale={0.72} />
      {items}
    </G>
  );
}

function Decoration({ x, y, scale, biome, variant }: { x: number; y: number; scale: number; biome: Biome; variant: number }) {
  const t = `translate(${x} ${y}) scale(${scale})`;
  if (biome === 'summit') {
    return <G transform={t}>{variant === 0 ? <Rock /> : <Pine snowy />}</G>;
  }
  if (biome === 'highland') {
    return <G transform={t}>{variant === 0 ? <Rock /> : variant === 1 ? <Pine /> : <Shrub />}</G>;
  }
  if (biome === 'forest') {
    return <G transform={t}>{variant === 2 ? <Shrub /> : <Pine />}</G>;
  }
  return <G transform={t}>{variant === 0 ? <Shrub /> : variant === 1 ? <Bloom /> : <RoundTree />}</G>;
}

function Cloud({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.85}>
      <Ellipse cx={0} cy={0} rx={30} ry={15} fill={scenery.cloud} />
      <Ellipse cx={-20} cy={5} rx={20} ry={11} fill={scenery.cloud} />
      <Ellipse cx={22} cy={6} rx={17} ry={10} fill={scenery.cloud} />
    </G>
  );
}

function RoundTree() {
  return (
    <G>
      <Rect x={-4} y={-8} width={8} height={24} rx={3} fill={scenery.trunk} />
      <Circle cx={0} cy={-20} r={20} fill={scenery.canopy} />
      <Circle cx={-8} cy={-14} r={13} fill={scenery.canopyDeep} opacity={0.55} />
      <Circle cx={6} cy={-28} r={7} fill="#A9DC8A" opacity={0.7} />
    </G>
  );
}

function Pine({ snowy = false }: { snowy?: boolean }) {
  return (
    <G>
      <Rect x={-3.5} y={-6} width={7} height={20} rx={2.5} fill={scenery.trunkDeep} />
      <Path d="M0 -46 L15 -18 H-15 Z" fill={scenery.canopyDeep} />
      <Path d="M0 -34 L19 -4 H-19 Z" fill={scenery.canopy} />
      {snowy ? <Path d="M0 -46 L7 -33 H-7 Z" fill={scenery.snow} /> : null}
    </G>
  );
}

function Shrub() {
  return (
    <G>
      <Circle cx={-9} cy={0} r={9} fill={scenery.canopy} />
      <Circle cx={9} cy={1} r={8} fill={scenery.canopy} />
      <Circle cx={0} cy={-6} r={11} fill={scenery.canopy} />
      <Circle cx={-6} cy={-2} r={6} fill={scenery.canopyDeep} opacity={0.4} />
      <Ellipse cx={0} cy={8} rx={16} ry={3} fill={scenery.canopyDeep} opacity={0.3} />
    </G>
  );
}

function Rock() {
  return (
    <G>
      <Path d="M-18 6 L-9 -12 L4 -16 L17 -3 L14 6 Z" fill={scenery.stone} />
      <Path d="M-9 -12 L4 -16 L2 -4 Z" fill={scenery.stoneDeep} opacity={0.45} />
    </G>
  );
}

function Bloom() {
  return (
    <G>
      <Path d="M0 4 V-6" stroke={scenery.canopyDeep} strokeWidth={2.4} strokeLinecap="round" />
      <Circle cx={0} cy={-10} r={5} fill="#FFB6D2" />
      <Circle cx={-7} cy={-6} r={4} fill="#FFC9DF" />
      <Circle cx={7} cy={-6} r={4} fill="#FFC9DF" />
      <Circle cx={0} cy={-8} r={2.4} fill="#FFD98A" />
    </G>
  );
}
