import React, { useEffect, useId, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Path, Polygon, Rect } from 'react-native-svg';

/**
 * Animated AP course icons — detailed, multi-color illustrations (no tinted
 * tile behind them; they sit directly on the card). Each plays a
 * subject-specific looping animation: the DNA twists, the calculus curve draws
 * itself, the globe spins, the flag waves, the code cursor blinks, the flask
 * bubbles, the brain pulses, and the essay writes itself. Drawn on a 48×48 grid
 * with outlines strong enough to read on a white surface.
 */

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface CourseIconProps {
  courseId: string;
  /** Kept for API compatibility; detailed icons use their own palettes. */
  color?: string;
  size?: number;
  animate?: boolean;
}

function usePing(duration: number, native: boolean, enabled: boolean) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, duration, native, enabled]);
  return v;
}

function useSpin(duration: number, native: boolean, enabled: boolean) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: native }));
    loop.start();
    return () => loop.stop();
  }, [v, duration, native, enabled]);
  return v;
}

/** Write-on / erase loop for stroke-drawing (JS driver — animates SVG props). */
function useDraw(enabled: boolean, drawMs: number, holdMs: number) {
  const v = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 0, duration: drawMs, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.delay(holdMs),
        Animated.timing(v, { toValue: 1, duration: drawMs * 0.5, easing: Easing.in(Easing.quad), useNativeDriver: false }),
        Animated.delay(250),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, enabled, drawMs, holdMs]);
  return v;
}

function Canvas({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {children}
    </Svg>
  );
}

// --- Biology: twisting DNA with nucleotide beads -----------------------------
const BIO_RUNGS = [
  { y: 11, x1: 20, x2: 28, c: '#FFB02E' },
  { y: 17, x1: 21, x2: 27, c: '#3CA7FF' },
  { y: 23, x1: 19, x2: 29, c: '#FF6FB0' },
  { y: 29, x1: 21, x2: 27, c: '#8B7BFF' },
  { y: 35, x1: 20, x2: 28, c: '#FFB02E' },
];
function BiologyIcon({ size, animate }: { size: number; animate: boolean }) {
  const flip = usePing(1800, true, animate);
  const scaleX = flip.interpolate({ inputRange: [0, 1], outputRange: [1, -1] });
  return (
    <Animated.View style={{ width: size, height: size, transform: [{ scaleX }] }}>
      <Canvas size={size}>
        <G strokeLinecap="round">
          {BIO_RUNGS.map((r) => (
            <Path key={r.y} d={`M${r.x1} ${r.y} H${r.x2}`} stroke={r.c} strokeWidth={3.2} />
          ))}
          <Path d="M17 6 C33 15 17 33 33 42" stroke="#34B77C" strokeWidth={5} fill="none" />
          <Path d="M31 6 C15 15 31 33 15 42" stroke="#2A9D6E" strokeWidth={5} fill="none" />
          <Path d="M17 6 C33 15 17 33 33 42" stroke="#5FD3A0" strokeWidth={1.4} fill="none" opacity={0.8} />
        </G>
        {BIO_RUNGS.map((r) => (
          <G key={r.y}>
            <Circle cx={r.x1} cy={r.y} r={1.7} fill={r.c} />
            <Circle cx={r.x2} cy={r.y} r={1.7} fill={r.c} />
          </G>
        ))}
        <Circle cx={24} cy={8.5} r={1.2} fill="#fff" />
        <Circle cx={24} cy={39.5} r={1.2} fill="#fff" />
      </Canvas>
    </Animated.View>
  );
}

// --- Calculus: grid, shaded curve, pulsing point -----------------------------
function CalculusIcon({ size, animate }: { size: number; animate: boolean }) {
  const draw = useDraw(animate, 1400, 700);
  const pulse = usePing(1200, false, animate);
  const dashoffset = draw.interpolate({ inputRange: [0, 1], outputRange: [0, 42] });
  const r = pulse.interpolate({ inputRange: [0, 1], outputRange: [3.4, 4.6] });
  return (
    <Canvas size={size}>
      {/* grid */}
      <G stroke="#E3DEFF" strokeWidth={1}>
        <Path d="M18 9 V39 M26 9 V39 M34 9 V39" />
        <Path d="M11 16 H42 M11 24 H42 M11 32 H42" />
      </G>
      {/* area + axes */}
      <Path d="M11 37 C21 37 21 17 40 15 L40 37 Z" fill="#C9BEF7" opacity={0.5} />
      <Path d="M11 7 V39 H43" stroke="#5B4BD6" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Polygon points="11,5 8.6,9 13.4,9" fill="#5B4BD6" />
      <Polygon points="45,24 41,21.6 41,26.4" fill="#5B4BD6" />
      <AnimatedPath
        d="M11 37 C21 37 21 17 40 15"
        stroke="#7B68EE"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={42}
        strokeDashoffset={dashoffset}
      />
      <AnimatedCircle cx={40} cy={15} r={r} fill="#FF6FB0" stroke="#fff" strokeWidth={1.6} />
    </Canvas>
  );
}

// --- World History: spinning globe -------------------------------------------
function WorldIcon({ size, animate }: { size: number; animate: boolean }) {
  const spin = useSpin(7000, false, animate);
  const rotation = spin.interpolate({ inputRange: [0, 1], outputRange: [0, 360] });
  const clipId = `globe${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <Canvas size={size}>
      <Defs>
        <ClipPath id={clipId}>
          <Circle cx={24} cy={24} r={18} />
        </ClipPath>
      </Defs>
      <Circle cx={24} cy={24} r={18} fill="#37A0F0" />
      <G clipPath={`url(#${clipId})`}>
        <G stroke="#BFE2FF" strokeWidth={1} fill="none" opacity={0.7}>
          <Path d="M6 24 H42" />
          <Path d="M24 6 C15 12 15 36 24 42 M24 6 C33 12 33 36 24 42" />
        </G>
        <AnimatedG originX={24} originY={24} rotation={rotation}>
          <Path d="M8 15 q7 -4 13 1 q3 5 -2 8 q-8 3 -13 -1 z" fill="#43C58A" />
          <Path d="M28 26 q8 -2 11 4 q-1 6 -8 5 q-6 -1 -6 -5 z" fill="#43C58A" />
          <Path d="M13 31 q5 -1 7 2 q-1 4 -6 4 q-3 -1 -3 -4 z" fill="#3EB07C" />
          <Circle cx={32} cy={16} r={2.4} fill="#3EB07C" />
        </AnimatedG>
      </G>
      <Ellipse cx={18} cy={17} rx={6} ry={4} fill="#8CCBFF" opacity={0.55} />
      <Circle cx={24} cy={24} r={18} fill="none" stroke="#2E8BDD" strokeWidth={2} />
    </Canvas>
  );
}

// --- U.S. History: monument with a waving flag -------------------------------
function UsHistoryIcon({ size, animate }: { size: number; animate: boolean }) {
  const wave = usePing(1300, false, animate);
  const scaleX = wave.interpolate({ inputRange: [0, 1], outputRange: [1, 0.72] });
  const OUT = '#AEB6C2';
  return (
    <Canvas size={size}>
      {/* steps */}
      <Rect x={6} y={39} width={36} height={4} rx={1} fill="#C4CAD4" stroke={OUT} strokeWidth={0.8} />
      <Rect x={9} y={36} width={30} height={3} rx={1} fill="#D3D8E0" />
      <Rect x={11} y={33.5} width={26} height={2.6} rx={1} fill="#DDE1E8" />
      {/* columns with capitals + bases */}
      <G stroke={OUT} strokeWidth={0.9}>
        {[12.5, 19, 25.5, 32].map((x) => (
          <G key={x}>
            <Rect x={x - 0.6} y={20.5} width={4.4} height={1.6} fill="#EDEFF4" />
            <Rect x={x} y={22} width={3.2} height={10.5} fill="#F6F8FB" />
            <Rect x={x - 0.6} y={32} width={4.4} height={1.6} fill="#EDEFF4" />
          </G>
        ))}
      </G>
      {/* architrave + pediment */}
      <Rect x={8} y={17} width={32} height={3.6} fill="#E7EAF0" stroke={OUT} strokeWidth={0.9} />
      <Path d="M7 17 L24 7 L41 17 Z" fill="#EDEFF4" stroke={OUT} strokeWidth={0.9} />
      <Circle cx={24} cy={13.5} r={1.8} fill="#F2A03D" />
      {/* pole + waving flag */}
      <Path d="M24 7 V2.5" stroke="#8A6D4F" strokeWidth={1.6} strokeLinecap="round" />
      <AnimatedG originX={24} originY={4.5} scaleX={scaleX}>
        <Path d="M24 2.6 q4 1.7 7 0 q-1 2.1 0 4.2 q-3 1.7 -7 0 z" fill="#E23C4E" />
        <Path d="M24 4.7 q3.5 1.4 7 0" stroke="#fff" strokeWidth={0.9} fill="none" opacity={0.85} />
      </AnimatedG>
    </Canvas>
  );
}

// --- CS A: code editor with blinking cursor ----------------------------------
function CsaIcon({ size, animate }: { size: number; animate: boolean }) {
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!animate) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 60, delay: 480, useNativeDriver: false }),
        Animated.timing(blink, { toValue: 1, duration: 60, delay: 480, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [blink, animate]);
  return (
    <Canvas size={size}>
      {/* laptop base + trackpad */}
      <Path d="M8 37 H40 L44 43 H4 Z" fill="#C4CAD4" stroke="#AEB6C2" strokeWidth={1} />
      <Rect x={20} y={39.2} width={8} height={1.6} rx={0.8} fill="#AEB6C2" />
      {/* screen */}
      <Rect x={10} y={7} width={28} height={29} rx={3} fill="#322C4E" />
      <Rect x={12} y={9} width={24} height={25} rx={2} fill="#191627" />
      <Circle cx={15} cy={12.5} r={1} fill="#FF5A6A" />
      <Circle cx={18} cy={12.5} r={1} fill="#FFB02E" />
      <Circle cx={21} cy={12.5} r={1} fill="#37C98B" />
      <Rect x={14} y={17} width={10} height={2} rx={1} fill="#FF6FB0" />
      <Rect x={17} y={20.5} width={12} height={2} rx={1} fill="#5CC7EF" />
      <Rect x={17} y={24} width={7} height={2} rx={1} fill="#7DD47F" />
      <Rect x={14} y={27.5} width={9} height={2} rx={1} fill="#FFB02E" />
      <Rect x={17} y={31} width={6} height={2} rx={1} fill="#8B7BFF" />
      <AnimatedRect x={25.5} y={31} width={2} height={2} fill="#fff" opacity={blink} />
      {/* screen reflection */}
      <Path d="M13 10 L20 10 L14 32 L13 32 Z" fill="#fff" opacity={0.05} />
    </Canvas>
  );
}

// --- Chemistry: bubbling flask -----------------------------------------------
function Bubble({ v, cx, top }: { v: Animated.Value; cx: number; top: number }) {
  const cy = v.interpolate({ inputRange: [0, 1], outputRange: [37, top] });
  const opacity = v.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 1, 1, 0] });
  return <AnimatedCircle cx={cx} cy={cy} r={1.2} fill="#EAF9CF" opacity={opacity} />;
}
function ChemistryIcon({ size, animate }: { size: number; animate: boolean }) {
  const bubbles = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  useEffect(() => {
    if (!animate) return;
    const loops = bubbles.map((v) =>
      Animated.loop(Animated.timing(v, { toValue: 1, duration: 1700, easing: Easing.linear, useNativeDriver: false })),
    );
    const timers = loops.map((l, i) => setTimeout(() => l.start(), i * 430));
    return () => {
      timers.forEach(clearTimeout);
      loops.forEach((l) => l.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);
  return (
    <Canvas size={size}>
      <Path d="M20 8 H28 V19 L37 37 Q38.5 42 33 42 H15 Q9.5 42 11 37 L20 19 Z" fill="#EAF4F8" stroke="#8FAAB6" strokeWidth={2} />
      <Path d="M14.5 29 Q24 26 33.5 29 L36.5 37 Q38 42 33 42 H15 Q10 42 11.5 37 Z" fill="#83CE4B" />
      <Ellipse cx={24} cy={29} rx={9.5} ry={1.7} fill="#9BDC63" />
      <Ellipse cx={20} cy={28.8} rx={3} ry={0.7} fill="#C4EE97" />
      {/* measurement ticks */}
      <G stroke="#8FAAB6" strokeWidth={1} strokeLinecap="round">
        <Path d="M29 33 H32" />
        <Path d="M27.5 36 H31" />
      </G>
      <Rect x={19} y={6.4} width={10} height={2.8} rx={1.3} fill="#CBDDE4" stroke="#8FAAB6" strokeWidth={1} />
      <Path d="M22 12 L18.5 20" stroke="#fff" strokeWidth={2} opacity={0.75} strokeLinecap="round" />
      <Bubble v={bubbles[0]} cx={21} top={30} />
      <Bubble v={bubbles[1]} cx={25} top={30} />
      <Bubble v={bubbles[2]} cx={27} top={31} />
      <Bubble v={bubbles[3]} cx={23} top={30} />
    </Canvas>
  );
}

// --- Psychology: pulsing brain + sparkles ------------------------------------
function PsychIcon({ size, animate }: { size: number; animate: boolean }) {
  const pulse = usePing(1800, true, animate);
  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.07] });
  const s1 = usePing(1500, false, animate);
  const s2 = usePing(1700, false, animate);
  const o1 = s1.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
  const o2 = s2.interpolate({ inputRange: [0, 1], outputRange: [1, 0.3] });
  return (
    <View style={{ width: size, height: size }}>
      <Canvas size={size}>
        <AnimatedPath d="M39 8 l1.1 3.2 3.2 1.1 -3.2 1.1 -1.1 3.2 -1.1 -3.2 -3.2 -1.1 3.2 -1.1 z" fill="#FFB02E" opacity={o1} />
        <AnimatedPath d="M8 12 l.8 2.2 2.2 .8 -2.2 .8 -.8 2.2 -.8 -2.2 -2.2 -.8 2.2 -.8 z" fill="#FFB02E" opacity={o2} />
      </Canvas>
      <Animated.View style={{ position: 'absolute', width: size, height: size, transform: [{ scale }] }}>
        <Canvas size={size}>
          <Path
            d="M18 10 C12 10 9 15 11 19 C8 21 9 28 14 29 C15 34 22 34 24 31 C26 34 33 34 34 29 C39 28 40 21 37 19 C39 15 36 10 30 10 C27 7 21 7 18 10 Z"
            fill="#FF8FC0"
            stroke="#D8579A"
            strokeWidth={1.6}
          />
          <Path d="M24 10.5 V31.5" stroke="#D8579A" strokeWidth={1.4} fill="none" />
          <Path
            d="M15 15 q3 1 2.5 4 M13 21 q3 -0.5 4 2 M16 26 q2.5 1 2 3.5 M33 15 q-3 1 -2.5 4 M35 21 q-3 -0.5 -4 2 M32 26 q-2.5 1 -2 3.5"
            stroke="#D8579A"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
          />
          <Path d="M27 20 q4 1 3 6 q-1 4 -6 4.5" fill="#F06BA8" opacity={0.35} />
          <Ellipse cx={17} cy={15} rx={3} ry={2} fill="#FFC7E1" />
        </Canvas>
      </Animated.View>
    </View>
  );
}

// --- English: open book + quill that writes ----------------------------------
function EnglishIcon({ size, animate }: { size: number; animate: boolean }) {
  const draw = useDraw(animate, 1500, 800);
  const dashoffset = draw.interpolate({ inputRange: [0, 1], outputRange: [0, 22] });
  return (
    <Canvas size={size}>
      <Path d="M6 15 Q6 13 8 13 H40 Q42 13 42 15 V38 Q42 40 40 40 H8 Q6 40 6 38 Z" fill="#E0A800" />
      <Path d="M6 37 H42 V38 Q42 40 40 40 H8 Q6 40 6 38 Z" fill="#C68F00" />
      <Path d="M24 17 C20 14 13 13.5 9 15 V37 C13 35.5 20 36 24 38 Z" fill="#FFF7E6" stroke="#D9C48A" strokeWidth={1} />
      <Path d="M24 17 C28 14 35 13.5 39 15 V37 C35 35.5 28 36 24 38 Z" fill="#FFF7E6" stroke="#D9C48A" strokeWidth={1} />
      <Path d="M24 17 V38" stroke="#C68F00" strokeWidth={1.8} />
      {/* bookmark ribbon */}
      <Path d="M33 13 V24 L35 21.5 L37 24 V13 Z" fill="#E23C4E" />
      <Path d="M12 20 H20 M12 24 H20 M12 28 H18" stroke="#D9C79A" strokeWidth={1.3} fill="none" strokeLinecap="round" />
      <AnimatedPath
        d="M28 21 H36 M28 25 H31"
        stroke="#C9B98A"
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={22}
        strokeDashoffset={dashoffset}
      />
      {/* quill */}
      <Path d="M41 5 L30 19" stroke="#5CC7EF" strokeWidth={2.6} strokeLinecap="round" />
      <Path d="M41 5 q5 0 6 5 q-5 1 -7.5 -1.5 z" fill="#8FD9F2" />
      <Path d="M42.5 6.5 L39.5 10" stroke="#5CC7EF" strokeWidth={0.8} />
      <Circle cx={30} cy={19} r={1.3} fill="#2E2A45" />
      <Circle cx={31} cy={23} r={0.9} fill="#5CC7EF" />
    </Canvas>
  );
}

const ICONS: Record<string, React.ComponentType<{ size: number; animate: boolean }>> = {
  'ap-biology': BiologyIcon,
  'ap-calc-ab': CalculusIcon,
  'ap-world': WorldIcon,
  'ap-us-history': UsHistoryIcon,
  'ap-csa': CsaIcon,
  'ap-chem': ChemistryIcon,
  'ap-psych': PsychIcon,
  'ap-eng-lang': EnglishIcon,
};

/** Detailed, animated illustration for an AP course, keyed by course id. */
export function CourseIcon({ courseId, size = 28, animate = true }: CourseIconProps) {
  const Comp = ICONS[courseId] ?? BiologyIcon;
  return (
    <View style={{ width: size, height: size }}>
      <Comp size={size} animate={animate} />
    </View>
  );
}
