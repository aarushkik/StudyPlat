import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Shared selectable-card motion.
 *
 * Selection *lifts* the card — it never scales it. These cards are full-bleed
 * inside the screen's horizontal padding, so even a 2% scale pushed the
 * selected one a few pixels past its neighbours and visibly broke the margin
 * down the side of the list. Depth is carried by the lift, the accent border,
 * the tint, and the tick instead; only the press scales, and only inwards,
 * which can never overflow.
 */
export function useCardAnimation(selected: boolean) {
  const press = useRef(new Animated.Value(0)).current;
  const sel = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(sel, { toValue: selected ? 1 : 0, useNativeDriver: true, speed: 20, bounciness: 8 }).start();
  }, [selected, sel]);

  const onPressIn = () =>
    Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  const onPressOut = () =>
    Animated.spring(press, { toValue: 0, useNativeDriver: true, speed: 50, bounciness: 6 }).start();

  // Press shrinks slightly — inward only, never wider than the resting card.
  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] });
  // Selection lifts the card off the page; pressing pushes it back down.
  const translateY = Animated.add(
    sel.interpolate({ inputRange: [0, 1], outputRange: [0, -3] }),
    press.interpolate({ inputRange: [0, 1], outputRange: [0, 3] }),
  );

  return { scale, translateY, onPressIn, onPressOut };
}
