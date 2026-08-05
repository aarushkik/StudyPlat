import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { Mascot } from '@/components/Mascot';
import { biomes, isDarkBiome, type BiomeId, type BiomeTheme } from '@/theme/biomes';
import type { QuestNode, QuestNodeState, QuestUnit } from '@/types/quest';
import { NODE_SIZE, QuestNodeButton, nodeSizeFor } from './QuestNodeButton';
import { AreaAmbience } from './AreaAmbience';
import { Scenery } from './Scenery';

/**
 * One area of the map: its landscape, the trail winding through it, and the
 * eighteen stops along the way.
 *
 * Stops are laid out on a sine so the trail serpentines instead of zig-zagging
 * on a fixed diagonal, and the path is drawn as one continuous curve *through*
 * those same points — so the road always meets the nodes exactly, whatever the
 * screen width. The road is made of whatever the biome is made of: packed sand
 * in the dunes, pale stone on the glacier.
 */

const SPACING = 118;
/** Room for the area gate to stand clear above the first stop. */
const TOP_PAD = 220;
const BOTTOM_PAD = 78;
const MASCOT = 78;
/**
 * Radians between stops along the sine. Tuned by eye: much lower and the first
 * few stops drift the same way and the trail reads as one long diagonal.
 */
const WEAVE = 1.15;

interface TrailSegmentProps {
  unit: QuestUnit;
  width: number;
  index: number;
  /** Neighbouring landscapes, so this area's ends can dissolve into them. */
  biomeAbove?: BiomeId;
  biomeBelow?: BiomeId;
  stateOf: (nodeId: string) => QuestNodeState;
  onSelect: (node: QuestNode) => void;
}

/** Height of one area, so the list can measure it without rendering it. */
export function segmentHeight(nodeCount: number): number {
  return TOP_PAD + (nodeCount - 1) * SPACING + BOTTOM_PAD;
}

/**
 * Memoised: an area is a few hundred SVG shapes plus its ambience, and the map
 * re-renders on every scroll tick to move the pinned banner. Without this the
 * list warns that it is slow to update, because each tick rebuilds every
 * mounted landscape. The props are all stable between progress changes, so the
 * mounted areas now only re-render when progress actually moves.
 */
export const TrailSegment = React.memo(TrailSegmentImpl);

function TrailSegmentImpl({ unit, width, index, biomeAbove, biomeBelow, stateOf, onSelect }: TrailSegmentProps) {
  const theme = biomes[unit.biome];
  const dark = isDarkBiome(unit.biome);

  // A tighter weave than the road strictly needs. The trail used to swing wide
  // enough that scenery was squeezed into two ~50px strips at the screen edges,
  // which is why areas read as empty; pulling it in gives the landscape most of
  // the width back without making the route feel straight.
  const amplitude = Math.min(width * 0.155, 58);
  const phase = index * 1.3;

  const points = useMemo(
    () =>
      unit.nodes.map((_, i) => ({
        x: width / 2 + amplitude * Math.sin(i * WEAVE + phase),
        y: TOP_PAD + i * SPACING,
      })),
    [unit.nodes, width, amplitude, phase],
  );

  const height = segmentHeight(unit.nodes.length);

  // Where the road is at any height — the scenery uses this to fill every gap
  // beside the path instead of hugging the screen edges.
  const trailXAt = useMemo(
    () => (y: number) => width / 2 + amplitude * Math.sin(((y - TOP_PAD) / SPACING) * WEAVE + phase),
    [width, amplitude, phase],
  );
  // Half the widest stop, plus breathing room.
  const clearance = 68;

  // Run the road off both edges of the segment so it reads as one continuous
  // route passing behind the area banners rather than restarting each area.
  const trail = useMemo(() => {
    const first = points[0];
    const last = points[points.length - 1];
    return smoothPath([{ x: first.x, y: -20 }, ...points, { x: last.x, y: height + 20 }]);
  }, [points, height]);

  const currentIndex = unit.nodes.findIndex((n) => stateOf(n.id) === 'current');

  return (
    <View style={{ width, height }}>
      <Scenery
        width={width}
        height={height}
        biome={unit.biome}
        seed={index + 1}
        trailXAt={trailXAt}
        clearance={clearance}
        groundAbove={biomeAbove ? biomes[biomeAbove].hills[0] : undefined}
        groundBelow={biomeBelow ? biomes[biomeBelow].hills[0] : undefined}
      />

      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* A soft dark verge where the cover meets the road, so the path looks
            cut through the canopy rather than laid on top of it. */}
        <Path d={trail} stroke="#000000" strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.13} />
        <Path d={trail} stroke={theme.trail.edge} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path d={trail} stroke={theme.trail.face} strokeWidth={19} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <TrailBank trail={trail} theme={theme} />
        <Path
          d={trail}
          stroke={dark ? '#FFFFFF' : '#FFFFFF'}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1 16"
          opacity={dark ? 0.5 : 0.85}
        />
      </Svg>

      <AreaAmbience width={width} height={height} biome={unit.biome} seed={index + 1} />

      <AreaGate unit={unit} width={width} x={points[0].x} />

      {currentIndex >= 0 ? <TrailMascot point={points[currentIndex]} width={width} /> : null}

      {unit.nodes.map((node, i) => {
        const size = nodeSizeFor(node);
        return (
          <View
            key={node.id}
            style={[styles.slot, { left: points[i].x - size / 2, top: points[i].y - size / 2, width: size }]}
          >
            <QuestNodeButton node={node} state={stateOf(node.id)} dark={dark} onPress={() => onSelect(node)} />
          </View>
        );
      })}
    </View>
  );
}

/**
 * The gate into an area — the one moment of ceremony on the map.
 *
 * The trail runs under it, so entering a new area is something you pass
 * through rather than scroll past, and the posts are built from that biome's
 * own material: timber in the meadow, basalt in the wastes, ice on the glacier.
 */
function AreaGate({ unit, width, x }: { unit: QuestUnit; width: number; x: number }) {
  const theme = biomes[unit.biome];
  const [light, deep] = theme.gate;
  const w = Math.min(width * 0.56, 214);
  const h = 128;
  const pad = 17;
  // Two legs joined by a round-topped span: one stroked path, so the arch
  // always closes cleanly whatever the screen width.
  const arch = `M${pad} ${h} L${pad} 58 Q${w / 2} 2 ${w - pad} 58 L${w - pad} ${h}`;
  const foot = 26;

  return (
    <View pointerEvents="none" style={[styles.gate, { left: x - w / 2, width: w }]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Path d={arch} stroke={deep} strokeWidth={22} fill="none" strokeLinecap="butt" />
        <Path d={arch} stroke={light} strokeWidth={11} fill="none" strokeLinecap="butt" />
        {/* Footings, so the posts sit on the ground rather than float */}
        <Rect x={pad - foot / 2} y={h - 12} width={foot} height={12} rx={4} fill={deep} />
        <Rect x={w - pad - foot / 2} y={h - 12} width={foot} height={12} rx={4} fill={deep} />
        {/* Keystone */}
        <Rect x={w / 2 - 9} y={6} width={18} height={15} rx={4} fill={deep} />
      </Svg>
    </View>
  );
}

/**
 * Loose stones along both banks.
 *
 * Drawn as a single dashed stroke rather than dozens of placed circles: one
 * dashed path offset either side of the road gives the same broken gravel edge
 * for two SVG nodes instead of sixty, which matters when three areas are
 * mounted at once.
 */
function TrailBank({ trail, theme }: { trail: string; theme: BiomeTheme }) {
  return (
    <G opacity={0.55}>
      <Path
        d={trail}
        stroke={theme.trail.edge}
        strokeWidth={30}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="7 13"
        opacity={0.75}
      />
      <Path
        d={trail}
        stroke={theme.stone[0]}
        strokeWidth={27}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 17"
        opacity={0.6}
      />
    </G>
  );
}

/** Stu waits beside the live node, always on the roomier side of the trail. */
function TrailMascot({ point, width }: { point: { x: number; y: number }; width: number }) {
  const onLeft = point.x > width / 2;
  const left = onLeft ? point.x - NODE_SIZE / 2 - MASCOT - 14 : point.x + NODE_SIZE / 2 + 14;
  return (
    <View pointerEvents="none" style={[styles.mascot, { left, top: point.y - MASCOT * 0.62 }]}>
      <Mascot size={MASCOT} pose="neutral" />
    </View>
  );
}

/**
 * A continuous curve through every point. Control points sit directly above and
 * below the midpoint of each pair, which gives an even S-bend between stops and
 * keeps the road perfectly vertical as it enters and leaves each node.
 */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const mid = (from.y + to.y) / 2;
    d += ` C${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
  }
  return d;
}

const styles = StyleSheet.create({
  slot: { position: 'absolute', alignItems: 'center' },
  mascot: { position: 'absolute' },
  gate: { position: 'absolute', top: 30, alignItems: 'center' },
});
