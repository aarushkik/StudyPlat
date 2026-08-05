import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { MASCOT_ART, MASCOT_ASPECT, MASCOT_SIZES, type MascotProps } from './Mascot.types';

/**
 * Stu — the StudyPlat mascot. A turquoise platypus scholar.
 *
 * The artwork is a set of drawn poses rather than an assembled figure, so this
 * component owns only motion: a slow bob with a slight sway, matching the
 * design's `spBob` keyframe. The two periods deliberately do not divide into
 * each other, which keeps the idle from looking metronomic.
 *
 * The contact shadow tightens as Stu rises. That is what sells the bob as
 * weight rather than the whole image sliding up the screen.
 */
export function Mascot({ pose = 'neutral', size = 'medium', animated = true, shadow = true }: MascotProps) {
  const width = typeof size === 'number' ? size : MASCOT_SIZES[size];
  const height = width * MASCOT_ASPECT;

  const bob = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    const pingPong = (v: Animated.Value, ms: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      );
    const loops = [pingPong(bob, 1700), pingPong(sway, 2400)];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [animated, bob, sway]);

  const figureStyle = useMemo(
    () => ({
      transform: [
        { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -width * 0.045] }) },
        { rotate: sway.interpolate({ inputRange: [0, 1], outputRange: ['-1.4deg', '1.4deg'] }) },
      ],
    }),
    [bob, sway, width],
  );

  // Kept deliberately faint. A wider or darker ellipse stops reading as a
  // contact shadow and starts reading as a grey bar under Stu's feet — which
  // is exactly what the old drawn mascot's shadow did.
  const shadowStyle = useMemo(
    () => ({
      opacity: bob.interpolate({ inputRange: [0, 1], outputRange: [0.09, 0.04] }),
      transform: [{ scaleX: bob.interpolate({ inputRange: [0, 1], outputRange: [1, 0.84] }) }],
    }),
    [bob],
  );

  return (
    <View style={{ width, height }}>
      {shadow ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shadow,
            {
              width: width * 0.3,
              height: width * 0.035,
              borderRadius: width,
              marginLeft: -width * 0.15,
              bottom: height * 0.035,
            },
            shadowStyle,
          ]}
        />
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, figureStyle]}>
        <Image source={MASCOT_ART[pose]} style={{ width, height }} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { position: 'absolute', left: '50%', backgroundColor: colors.ink },
});
