import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { duration, easing } from '@/theme';
import { StuArt } from './StuArt';
import { MASCOT_ASPECT, MASCOT_SIZES, type MascotProps } from './Mascot.types';

/**
 * Stu — the stuAP mascot. A soft pink platypus scholar drawn as a single
 * rounded blob so the silhouette stays legible from a 44px avatar up to a
 * full-screen hero.
 *
 * This wrapper owns motion only (the art lives in `StuArt`): a constant idle of
 * breathing, swaying, and bobbing on three deliberately mismatched periods so
 * it never looks metronomic; an occasional blink; a spring hop on joyful
 * expressions and a soft tilt on worried ones. A contact shadow sits under him
 * and tightens as he leaves the ground, which is what sells the hop.
 */
export function Mascot({
  expression = 'happy',
  accessory = 'none',
  size = 'medium',
  animated = true,
  shadow = true,
}: MascotProps) {
  const width = typeof size === 'number' ? size : MASCOT_SIZES[size];
  const height = width * MASCOT_ASPECT;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  const breathe = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const hop = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!animated) return;
    const pingPong = (v: Animated.Value, ms: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: ms, easing: easing.inOut, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: ms, easing: easing.inOut, useNativeDriver: true }),
        ]),
      );
    const loops = [pingPong(breathe, 1600), pingPong(sway, 2400), pingPong(bob, 2000)];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [animated, breathe, sway, bob]);

  // Blink on a randomized cadence so two mascots on screen never sync up.
  useEffect(() => {
    if (!animated) return;
    let openTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      nextTimer = setTimeout(
        () => {
          setBlinking(true);
          openTimer = setTimeout(() => {
            setBlinking(false);
            schedule();
          }, 130);
        },
        2600 + Math.random() * 2800,
      );
    };
    schedule();
    return () => {
      clearTimeout(openTimer);
      clearTimeout(nextTimer);
    };
  }, [animated]);

  // Expression-driven reaction: a hop for joy, a gentle sway for worry.
  useEffect(() => {
    const joyful = expression === 'excited' || expression === 'celebrating' || expression === 'proud';
    if (joyful) {
      hop.setValue(0);
      Animated.sequence([
        Animated.timing(hop, { toValue: 1, duration: duration.fast, easing: easing.out, useNativeDriver: true }),
        Animated.spring(hop, { toValue: 0, useNativeDriver: true, speed: 8, bounciness: 16 }),
      ]).start();
    } else if (expression === 'worried') {
      tilt.setValue(0);
      Animated.sequence([
        Animated.timing(tilt, { toValue: 1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(tilt, { toValue: -1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(tilt, { toValue: 0.55, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(tilt, { toValue: 0, duration: 90, easing: Easing.linear, useNativeDriver: true }),
      ]).start();
    }
  }, [expression, hop, tilt]);

  const figureStyle = useMemo(
    () => ({
      transform: [
        { translateY: hop.interpolate({ inputRange: [0, 1], outputRange: [0, -width * 0.11] }) },
        { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [width * 0.014, -width * 0.014] }) },
        { rotate: tilt.interpolate({ inputRange: [-1, 1], outputRange: ['-6deg', '6deg'] }) },
        { rotate: sway.interpolate({ inputRange: [0, 1], outputRange: ['-1.8deg', '1.8deg'] }) },
        { scale: breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.028] }) },
      ],
    }),
    [hop, bob, tilt, sway, breathe, width],
  );

  // The shadow tightens and fades as Stu leaves the ground.
  const shadowStyle = useMemo(
    () => ({
      opacity: hop.interpolate({ inputRange: [0, 1], outputRange: [0.11, 0.05] }),
      transform: [{ scaleX: hop.interpolate({ inputRange: [0, 1], outputRange: [1, 0.76] }) }],
    }),
    [hop],
  );

  return (
    <View style={{ width, height }}>
      {shadow ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shadow,
            {
              width: width * 0.42,
              height: width * 0.06,
              borderRadius: width,
              marginLeft: -width * 0.21,
              bottom: height * 0.02,
            },
            shadowStyle,
          ]}
        />
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, figureStyle]}>
        <StuArt
          expression={expression}
          accessory={accessory}
          blinking={blinking}
          uid={uid}
          width={width}
          height={height}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { position: 'absolute', left: '50%', backgroundColor: '#3B2E3A' },
});
