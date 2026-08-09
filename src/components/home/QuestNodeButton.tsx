import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, glossRound, spring, typography } from '@/theme';
import type { TrackTheme } from '@/data/tracks';
import type { QuestNode, QuestNodeState } from '@/types/quest';

/**
 * One stop on the path.
 *
 * State is carried by the *fill*, kind by the *emblem inside it*. That split
 * is what lets a student scan a whole track at once: cleared stops are the
 * track's own colour, the one to play next is orange and half again as big,
 * sealed ones are sand. What each stop actually is comes second, read from the
 * shape in the middle.
 *
 * There is exactly one current stop on the map, and it is the only thing that
 * animates — a pulsing ring and a floating flag. Everything else is still, so
 * the eye goes straight to it.
 */

export const STOP_SIZE = 70;
export const CURRENT_SIZE = 96;
const LIP = 7;
const CURRENT_LIP = 8;

/** Diameter a stop occupies, so the path can place it before rendering. */
export function nodeSizeFor(state: QuestNodeState): number {
  return state === 'current' ? CURRENT_SIZE : STOP_SIZE;
}

interface QuestNodeButtonProps {
  node: QuestNode;
  state: QuestNodeState;
  track: TrackTheme;
  onPress: () => void;
}

export function QuestNodeButton({ node, state, track, onPress }: QuestNodeButtonProps) {
  const current = state === 'current';
  const done = state === 'complete';
  const locked = state === 'locked';

  const size = current ? CURRENT_SIZE : STOP_SIZE;
  const lip = current ? CURRENT_LIP : LIP;

  const fill = done ? track.deep : current ? colors.current : locked ? colors.locked : colors.surface;
  const shadow = done ? track.dark : current ? colors.currentDeep : colors.ink;

  const press = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const flag = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!current) return;
    const ring = Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    );
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(flag, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(flag, { toValue: 0, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    ring.start();
    bob.start();
    return () => {
      ring.stop();
      bob.stop();
    };
  }, [current, pulse, flag]);

  const to = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();
  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, lip - 2] });

  return (
    <View style={styles.slot} pointerEvents="box-none">
      {current ? (
        <>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.ring,
              {
                width: size + 32,
                height: size + 32,
                borderRadius: (size + 32) / 2,
                marginLeft: -(size + 32) / 2,
                opacity: pulse.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.85, 0] }),
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1.5] }) }],
              },
            ]}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.flag,
              {
                transform: [
                  { rotate: flag.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] }) },
                ],
              },
            ]}
          >
            <Text style={styles.flagText}>START</Text>
          </Animated.View>
        </>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${node.title}, ${STATE_LABEL[state]}`}
        accessibilityState={{ disabled: locked }}
        disabled={locked}
        onPressIn={() => to(1)}
        onPressOut={() => to(0)}
        onPress={onPress}
        style={{ width: size, height: size + lip }}
      >
        <View style={[styles.lip, { top: lip, borderRadius: size, backgroundColor: shadow }]} />
        <Animated.View
          style={[
            styles.face,
            {
              width: size,
              height: size,
              borderRadius: size,
              backgroundColor: fill,
              transform: [{ translateY }],
            },
          ]}
        >
          <View pointerEvents="none" style={glossRound(size, locked ? 0.16 : current ? 0.2 : 0.28)} />
          <Emblem node={node} state={state} track={track} size={size} />
        </Animated.View>
      </Pressable>

      <Text
        style={[styles.label, current && styles.labelCurrent, locked && styles.labelLocked]}
        numberOfLines={1}
      >
        {node.title.toUpperCase()}
      </Text>
    </View>
  );
}

const STATE_LABEL: Record<QuestNodeState, string> = {
  locked: 'locked',
  current: 'ready to start',
  complete: 'completed',
};

/**
 * What sits inside a stop.
 *
 * Cleared stops always show a tick regardless of kind — once it is done, what
 * it was matters less than that it is behind you. Sealed stops show nothing:
 * a lock icon on every sealed stop turns most of the track into padlocks.
 */
function Emblem({
  node,
  state,
  track,
  size,
}: {
  node: QuestNode;
  state: QuestNodeState;
  track: TrackTheme;
  size: number;
}) {
  const s = size / 70;

  if (state === 'locked') {
    return (
      <View style={styles.lock}>
        <View style={styles.lockShackle} />
        <View style={styles.lockBody} />
      </View>
    );
  }

  const ink = state === 'complete' ? colors.white : colors.ink;

  if (state === 'complete') {
    return <View style={[styles.tick, { width: 26 * s, height: 26 * s, borderColor: colors.white }]} />;
  }

  switch (node.kind) {
    // A play triangle — the thing you actually sit and learn. White, because
    // the only unfinished stop on the map is the current one and its face is
    // orange. The other emblems stay ink for the same reason: the design draws
    // them in the track colour, which on the amber track is the fill itself.
    case 'lesson':
      return (
        <View
          style={{
            width: 0,
            height: 0,
            marginLeft: 6 * s,
            borderLeftWidth: 22 * s,
            borderLeftColor: colors.white,
            borderTopWidth: 15 * s,
            borderBottomWidth: 15 * s,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
          }}
        />
      );
    // Stacked bars, rising — a drill is repetition that builds.
    case 'drill':
      return (
        <View style={styles.bars}>
          {[10, 17, 24].map((h) => (
            <View key={h} style={{ width: 6 * s, height: h * s, borderRadius: 2, backgroundColor: ink }} />
          ))}
        </View>
      );
    // An open book.
    case 'study':
      return <View style={[styles.book, { width: 28 * s, height: 22 * s, borderColor: ink }]} />;
    // A star — the optional extra.
    case 'bonus':
      return <View style={[styles.star, { borderBottomColor: ink, borderLeftWidth: 13 * s, borderRightWidth: 13 * s, borderBottomWidth: 9 * s }]} />;
    // Crossed bars for a fight, in the track's own dark.
    case 'boss':
      return (
        <View style={{ width: 30 * s, height: 30 * s, alignItems: 'center', justifyContent: 'center' }}>
          <View style={[styles.blade, { backgroundColor: ink, transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.blade, { backgroundColor: ink, transform: [{ rotate: '-45deg' }] }]} />
        </View>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  slot: { alignItems: 'center' },
  lip: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  face: {
    borderWidth: 3,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    // Clips the highlight into a crescent. See `glossRound`.
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    top: -16,
    left: '50%',
    borderWidth: 4,
    borderColor: colors.current,
  },
  flag: {
    position: 'absolute',
    top: -34,
    backgroundColor: colors.ink,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  flagText: { ...typography.overline, fontSize: 11, letterSpacing: 1.4, color: colors.textOnInk },

  label: {
    ...typography.overline,
    fontSize: 10.5,
    letterSpacing: 0.8,
    color: colors.textSecondary,
    marginTop: 8,
  },
  labelCurrent: { fontSize: 12, color: colors.ink },
  labelLocked: { color: colors.lockedText },

  // A tick drawn as two borders of a rotated box — no icon font needed.
  tick: {
    borderRightWidth: 4,
    borderBottomWidth: 4,
    transform: [{ rotate: '45deg' }, { translateY: -3 }],
  },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  book: { borderWidth: 3, borderRadius: 4 },
  star: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  blade: { position: 'absolute', width: 30, height: 6, borderRadius: 3 },

  // A padlock: a rounded body with a shackle standing on top of it.
  lock: { alignItems: 'center', justifyContent: 'center' },
  lockShackle: {
    width: 14,
    height: 9,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderColor: colors.ink,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: 0.45,
    marginBottom: -1,
  },
  lockBody: { width: 22, height: 16, borderRadius: 4, backgroundColor: colors.ink, opacity: 0.45 },
});
