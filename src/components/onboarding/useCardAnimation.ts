import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Shared selectable-card motion: a subtle scale-up when selected and a
 * scale-down while pressed, combined into one transform value. Keeps the
 * onboarding cards feeling tactile and consistent.
 */
export function useCardAnimation(selected: boolean) {
  const press = useRef(new Animated.Value(0)).current;
  const sel = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(sel, { toValue: selected ? 1 : 0, useNativeDriver: true, speed: 40, bounciness: 12 }).start();
  }, [selected, sel]);

  const onPressIn = () =>
    Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  const onPressOut = () =>
    Animated.spring(press, { toValue: 0, useNativeDriver: true, speed: 50, bounciness: 6 }).start();

  const scale = Animated.add(
    1,
    Animated.add(
      sel.interpolate({ inputRange: [0, 1], outputRange: [0, 0.02] }),
      press.interpolate({ inputRange: [0, 1], outputRange: [0, -0.04] }),
    ),
  );

  return { scale, onPressIn, onPressOut };
}
