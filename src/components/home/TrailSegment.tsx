import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Mascot } from '@/components/Mascot';
import { colors } from '@/theme';
import type { QuestNode, QuestNodeState, QuestUnit } from '@/types/quest';
import { CURRENT_SIZE, QuestNodeButton, STOP_SIZE, nodeSizeFor } from './QuestNodeButton';
import { Skyline } from './Skyline';

/**
 * One track of the path — its sky, its skyline, and the stops running through
 * it.
 *
 * Stops sit on a fixed cycle of horizontal offsets rather than a sine. That is
 * the design's choice and it is the better one: a sine gives an even, faintly
 * mechanical weave, while a hand-picked cycle reads as a route someone walked.
 * Three dots interpolate between consecutive stops so the eye follows the way
 * forward without a drawn road.
 *
 * The current stop is taller than the rest — it carries a flag above and a
 * label below — so the run-in above it is padded to keep the flag clear of the
 * stop before it.
 */

/** The design's offset cycle, in points from centre. */
const OFF = [0, -62, -92, -46, 26, 66, 34, -34, -70, -22, 34, 4, -40];

/** Vertical run for a normal stop and for the current one. */
const STEP = 118;
const CURRENT_STEP = 156;
/** Extra room above the current stop for its flag. */
const CURRENT_PAD = 58;
/**
 * Height of the skyline band at the top of each track. Deep enough for the
 * tallest silhouette (the summit peaks at 226) with room to breathe, and it is
 * also the run-in before the first stop so the two do not collide.
 */
const SKYLINE_BAND = 250;
/**
 * The first stop has to clear the skyline band, or the silhouette cuts through
 * it and reads as a stray horizontal bar rather than a horizon.
 */
const TOP_PAD = SKYLINE_BAND + 30;
const BOTTOM_PAD = 64;

interface TrailSegmentProps {
  unit: QuestUnit;
  width: number;
  index: number;
  stateOf: (nodeId: string) => QuestNodeState;
  onSelect: (node: QuestNode) => void;
}

/** Where each stop sits, and how tall the track is in total. */
function layout(unit: QuestUnit, stateOf: (id: string) => QuestNodeState) {
  let y = TOP_PAD;
  const stops = unit.nodes.map((node, i) => {
    const state = stateOf(node.id);
    const current = state === 'current';
    const off = OFF[i % OFF.length];
    const nextOff = i + 1 < unit.nodes.length ? OFF[(i + 1) % OFF.length] : off + 20;
    const pad = current ? CURRENT_PAD : 0;
    const top = y + pad;
    y += (current ? CURRENT_STEP : STEP) + pad;
    return { node, state, off, nextOff, top, current, last: i === unit.nodes.length - 1 };
  });
  return { stops, height: y + BOTTOM_PAD };
}

/**
 * How tall a track renders.
 *
 * Not a constant: the current stop is taller than the rest and carries padding
 * above it for its flag, so the one track holding it is ~96pt taller than the
 * others. The list needs the exact number to lay out offsets, and guessing a
 * single height makes every track after the current one land in the wrong
 * place.
 */
export function trackHeight(unit: QuestUnit, stateOf: (id: string) => QuestNodeState): number {
  return layout(unit, stateOf).height;
}

export const TrailSegment = React.memo(TrailSegmentImpl);

function TrailSegmentImpl({ unit, width, stateOf, onSelect }: TrailSegmentProps) {
  const { track } = unit;
  const { stops, height } = useMemo(() => layout(unit, stateOf), [unit, stateOf]);
  const half = width / 2;

  return (
    <View style={{ width, height, backgroundColor: track.sky }}>
      <Skyline kind={track.kind} color={track.dark} width={width} height={SKYLINE_BAND} />

      {stops.map(({ node, state, off, nextOff, top, current, last }) => {
        const size = nodeSizeFor(state);
        const done = state === 'complete';

        return (
          <View key={node.id}>
            {/* Three dots stepping toward the next stop. They stop at the last
                stop of a track — the next dot would land on the boundary. */}
            {last
              ? null
              : [0, 1, 2].map((k) => {
                  const f = (k + 1) / 4;
                  const x = off + (nextOff - off) * f;
                  return (
                    <View
                      key={k}
                      style={[
                        styles.dot,
                        {
                          left: half + x - 4.5,
                          top: top + size + 30 + k * 15,
                          backgroundColor: done || current ? track.dark : colors.disabledEdge,
                        },
                      ]}
                    />
                  );
                })}

            <View style={[styles.slot, { left: half + off - size / 2, top, width: size }]}>
              <QuestNodeButton node={node} state={state} track={track} onPress={() => onSelect(node)} />
            </View>

            {/* Stu waits beside the stop you are on, on the roomier side. */}
            {current ? (
              <View
                pointerEvents="none"
                style={[
                  styles.mascot,
                  { left: off > 0 ? half + off - 132 - 26 : half + off + size / 2 + 14, top: top - 8 },
                ]}
              >
                <Mascot pose="neutral" size={118} shadow={false} />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: { position: 'absolute', alignItems: 'center' },
  dot: { position: 'absolute', width: 9, height: 9, borderRadius: 5, opacity: 0.65 },
  mascot: { position: 'absolute' },
});
