import React, { useEffect, useRef, useState } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { duration, easing } from '@/theme';
import { useMotionPreference } from '@/hooks/useMotionPreference';

interface PresenceProps {
  visible: boolean;
  /** Which edge the control floats in from. */
  from?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Brings a floating control in on a spring and keeps it mounted long enough
 * to leave the same way.
 *
 * The track banner and the next-quest button used to be conditionally
 * rendered, so they blinked into existence mid-scroll. Glass that pops in
 * reads as a rendering glitch; glass that drifts down from the edge it lives
 * against reads as a control arriving.
 *
 * Only `translateY` is allowed to overshoot. Scale and opacity are clamped,
 * so the control never grows past its own size at the top of the bounce (see
 * `OVERSHOOT_SAFE_AXES`). With Reduce Motion on it simply appears and goes.
 */
export function Presence({ visible, from = 'top', style, children }: PresenceProps) {
  const { motionEnabled } = useMotionPreference();
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) setMounted(true);
    if (!motionEnabled) {
      progress.setValue(visible ? 1 : 0);
      if (!visible) setMounted(false);
      return;
    }
    const animation = visible
      ? Animated.spring(progress, { toValue: 1, useNativeDriver: true, damping: 17, stiffness: 230, mass: 0.9 })
      : Animated.timing(progress, { toValue: 0, duration: duration.fast, easing: easing.in, useNativeDriver: true });
    animation.start(({ finished }) => { if (finished && !visible) setMounted(false); });
    return () => animation.stop();
  }, [visible, motionEnabled, progress]);

  if (!mounted && !visible) return null;

  const offset = from === 'top' ? -14 : 18;
  return (
    <Animated.View
      pointerEvents={visible ? 'box-none' : 'none'}
      style={[
        style,
        {
          opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
          transform: [
            { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) },
            { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1], extrapolate: 'clamp' }) },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
