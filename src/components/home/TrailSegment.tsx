import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Mascot } from '@/components/Mascot';
import { scenery } from '@/theme';
import type { QuestNode, QuestNodeState, QuestUnit } from '@/types/quest';
import { BOSS_SIZE, NODE_SIZE, QuestNodeButton } from './QuestNodeButton';
import { Scenery } from './Scenery';

/**
 * One region of the map: its landscape, the trail winding through it, and the
 * stops along the way.
 *
 * Stops are laid out on a sine so the trail serpentines instead of zig-zagging
 * on a fixed diagonal, and the path is drawn as one continuous curve *through*
 * those same points — so the road always meets the nodes exactly, whatever the
 * screen width.
 */

const SPACING = 118;
const TOP_PAD = 96;
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
  stateOf: (nodeId: string) => QuestNodeState;
  onSelect: (node: QuestNode) => void;
}

export function TrailSegment({ unit, width, index, stateOf, onSelect }: TrailSegmentProps) {
  // Sized so the widest node (the boss) still clears the margins where the
  // scenery lives — see TRAIL_MARGIN in Scenery.
  const amplitude = Math.min(width * 0.21, 82);
  const points = useMemo(
    () =>
      unit.nodes.map((_, i) => ({
        x: width / 2 + amplitude * Math.sin(i * WEAVE + index * 1.3),
        y: TOP_PAD + i * SPACING,
      })),
    [unit.nodes, width, amplitude, index],
  );

  const height = TOP_PAD + (unit.nodes.length - 1) * SPACING + BOTTOM_PAD;

  // Run the road off both edges of the segment so it reads as one continuous
  // route passing behind the unit banners rather than restarting each region.
  const trail = useMemo(() => {
    const first = points[0];
    const last = points[points.length - 1];
    return smoothPath([{ x: first.x, y: -20 }, ...points, { x: last.x, y: height + 20 }]);
  }, [points, height]);

  const currentIndex = unit.nodes.findIndex((n) => stateOf(n.id) === 'current');

  return (
    <View style={{ width, height }}>
      <Scenery width={width} height={height} biome={unit.biome} seed={index + 1} />

      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Path d={trail} stroke={scenery.trailEdge} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path d={trail} stroke={scenery.trail} strokeWidth={19} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path
          d={trail}
          stroke="#FFFFFF"
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1 16"
          opacity={0.85}
        />
      </Svg>

      {currentIndex >= 0 ? <TrailMascot point={points[currentIndex]} width={width} /> : null}

      {unit.nodes.map((node, i) => {
        const size = node.kind === 'boss' ? BOSS_SIZE : NODE_SIZE;
        return (
          <View
            key={node.id}
            style={[styles.slot, { left: points[i].x - size / 2, top: points[i].y - size / 2, width: size }]}
          >
            <QuestNodeButton node={node} state={stateOf(node.id)} onPress={() => onSelect(node)} />
          </View>
        );
      })}
    </View>
  );
}

/** Stu waits beside the live node, always on the roomier side of the trail. */
function TrailMascot({ point, width }: { point: { x: number; y: number }; width: number }) {
  const onLeft = point.x > width / 2;
  const left = onLeft ? point.x - NODE_SIZE / 2 - MASCOT - 14 : point.x + NODE_SIZE / 2 + 14;
  return (
    <View pointerEvents="none" style={[styles.mascot, { left, top: point.y - MASCOT * 0.62 }]}>
      <Mascot size={MASCOT} expression="happy" />
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
});
