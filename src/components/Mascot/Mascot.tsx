import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect, Text as SvgText } from 'react-native-svg';
import { palette } from '@/theme';
import {
  MASCOT_SIZES,
  type MascotAccessory,
  type MascotExpression,
  type MascotProps,
} from './Mascot.types';

// Mascot-specific colors.
const BODY = palette.rose400;
const BODY_DARK = palette.rose500;
const BELLY = palette.rose200;
const CHEEK = palette.rose300;
const EYE = '#2E2633';
const BILL = palette.amber;
const BILL_DARK = '#E0912A';
const NOSTRIL = '#9C6416';
const FOOT = palette.amber;
const FOOT_DARK = '#E0912A';
const BOW = palette.rose600;
const BOW_DARK = palette.rose700;
const TAIL = '#B5835F';
const TAIL_DARK = '#8F6444';
const HAT = palette.hatTan;
const HAT_DARK = palette.hatBrown;
const HAT_TEXT = palette.hatCream;
const BOOK = '#8B7BFF';
const BOOK_DARK = '#6F5DF0';

/**
 * Stu — the stuAP mascot: a cute pink platypus student in a rounded "STU" cap.
 * Front-facing, drawn as a clean vector (no image assets, crisp at any size),
 * with a wide duck bill, a flat beaver-like tail, and webbed feet. Reacts via
 * `expression`, can hold an `accessory`, and — when `animated` — breathes and
 * blinks, bounces on happy expressions, and tilts on worried ones.
 */
export function Mascot({
  expression = 'happy',
  accessory = 'none',
  size = 'medium',
  animated = true,
}: MascotProps) {
  const px = typeof size === 'number' ? size : MASCOT_SIZES[size];

  const breathe = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const [blinking, setBlinking] = useState(false);

  // Constant idle motion: breathe (scale), sway (rotate), and bob (drift).
  // Slightly different periods keep it feeling alive rather than mechanical.
  useEffect(() => {
    if (!animated) return;
    const pingPong = (v: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      );
    const loops = [pingPong(breathe, 1600), pingPong(sway, 2400), pingPong(bob, 2000)];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [animated, breathe, sway, bob]);

  // Occasional blink on a randomized cadence.
  useEffect(() => {
    if (!animated) return;
    let openTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      nextTimer = setTimeout(() => {
        setBlinking(true);
        openTimer = setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 130);
      }, 2600 + Math.random() * 2600);
    };
    schedule();
    return () => {
      clearTimeout(openTimer);
      clearTimeout(nextTimer);
    };
  }, [animated]);

  // Expression-driven reaction: bounce on joy, gentle tilt/shake on worry.
  useEffect(() => {
    if (expression === 'excited' || expression === 'celebrating') {
      bounce.setValue(0);
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.spring(bounce, { toValue: 0, useNativeDriver: true, speed: 8, bounciness: 16 }),
      ]).start();
    } else if (expression === 'worried') {
      shake.setValue(0);
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 90, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 90, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0.6, duration: 90, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 90, useNativeDriver: true }),
      ]).start();
    }
  }, [expression, bounce, shake]);

  const scale = breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const translateY = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });
  const rotate = shake.interpolate({ inputRange: [-1, 1], outputRange: ['-6deg', '6deg'] });
  const idleBob = bob.interpolate({ inputRange: [0, 1], outputRange: [2.5, -2.5] });
  const idleSway = sway.interpolate({ inputRange: [0, 1], outputRange: ['-1.8deg', '1.8deg'] });

  const raised = expression === 'celebrating';

  return (
    <Animated.View
      style={{ transform: [{ translateY }, { translateY: idleBob }, { rotate }, { rotate: idleSway }, { scale }] }}
    >
      <Svg width={px} height={px} viewBox="0 0 240 252">
        {/* Flat tail (behind the body) */}
        <Tail />

        {/* Webbed feet */}
        <WebbedFoot cx={99} />
        <WebbedFoot cx={141} />

        {/* Body + belly */}
        <Ellipse cx={120} cy={142} rx={80} ry={84} fill={BODY} />
        <Ellipse cx={120} cy={162} rx={54} ry={58} fill={BELLY} />

        {/* Arms / flippers */}
        <Flipper side="left" raised={raised} />
        <Flipper side="right" raised={raised} />

        {/* Cheeks */}
        <Ellipse cx={68} cy={150} rx={11} ry={7} fill={CHEEK} opacity={0.75} />
        <Ellipse cx={172} cy={150} rx={11} ry={7} fill={CHEEK} opacity={0.75} />

        {/* Face */}
        <Eyes expression={expression} blinking={blinking} />
        <Bill expression={expression} />

        {/* Scholarly bowtie */}
        <Bowtie />

        {/* Hat (drawn last so the brim tidily overlaps the crown) */}
        <G>
          <Path d="M66 78 C66 40 174 40 174 78 Z" fill={HAT} />
          <Ellipse cx={120} cy={79} rx={68} ry={12} fill={HAT_DARK} />
          <SvgText x={120} y={66} fontSize={22} fontWeight="bold" fontStyle="italic" fill={HAT_TEXT} textAnchor="middle">
            STU
          </SvgText>
          {/* button + graduation tassel */}
          <Circle cx={120} cy={45} r={5} fill={BILL} />
          <Path d="M120 45 Q150 50 151 70" stroke={BILL} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Circle cx={151} cy={72} r={5} fill={BILL} />
          <Path d="M148 76 v6 M151 77 v7 M154 76 v6" stroke={BILL} strokeWidth={2} strokeLinecap="round" />
        </G>

        {/* Held accessory + celebration sparkles */}
        <Accessory kind={accessory} />
        {raised ? <Sparkles /> : null}
      </Svg>
    </Animated.View>
  );
}

/** Broad, flat platypus/beaver tail peeking out behind the lower body. */
function Tail() {
  return (
    <G>
      <Ellipse cx={120} cy={212} rx={64} ry={30} fill={TAIL} />
      {/* segmented texture on the visible lower part */}
      <Path d="M96 230 H144" stroke={TAIL_DARK} strokeWidth={2} strokeLinecap="round" />
      <Path d="M100 238 H140" stroke={TAIL_DARK} strokeWidth={2} strokeLinecap="round" />
      <Path d="M120 227 V241" stroke={TAIL_DARK} strokeWidth={2} strokeLinecap="round" />
    </G>
  );
}

/** A webbed foot: a flat amber paddle with two toe grooves. */
function WebbedFoot({ cx }: { cx: number }) {
  return (
    <G>
      <Ellipse cx={cx} cy={236} rx={20} ry={10} fill={FOOT} />
      <Path d={`M${cx - 7} 232 V244`} stroke={FOOT_DARK} strokeWidth={2} strokeLinecap="round" />
      <Path d={`M${cx + 7} 232 V244`} stroke={FOOT_DARK} strokeWidth={2} strokeLinecap="round" />
    </G>
  );
}

function Flipper({ side, raised }: { side: 'left' | 'right'; raised: boolean }) {
  const base = side === 'left' ? { cx: 46, cy: 156, rot: -14 } : { cx: 194, cy: 156, rot: 14 };
  const up = side === 'left' ? { cx: 48, cy: 116, rot: -58 } : { cx: 192, cy: 116, rot: 58 };
  const p = raised ? up : base;
  return <Ellipse cx={p.cx} cy={p.cy} rx={14} ry={26} fill={BODY_DARK} transform={`rotate(${p.rot} ${p.cx} ${p.cy})`} />;
}

function Eyes({ expression, blinking }: { expression: MascotExpression; blinking: boolean }) {
  const whites = (
    <>
      <Ellipse cx={92} cy={112} rx={24} ry={26} fill={palette.white} />
      <Ellipse cx={148} cy={112} rx={24} ry={26} fill={palette.white} />
    </>
  );

  if (blinking) {
    return (
      <G>
        {whites}
        <Rect x={72} y={110} width={32} height={5} rx={2.5} fill={EYE} />
        <Rect x={124} y={110} width={32} height={5} rx={2.5} fill={EYE} />
      </G>
    );
  }

  if (expression === 'excited' || expression === 'celebrating') {
    return (
      <G>
        {whites}
        <Circle cx={95} cy={113} r={13} fill={EYE} />
        <Circle cx={145} cy={113} r={13} fill={EYE} />
        <Sparkle cx={91} cy={108} r={5} fill={palette.white} />
        <Sparkle cx={141} cy={108} r={5} fill={palette.white} />
      </G>
    );
  }
  if (expression === 'thinking') {
    return (
      <G>
        {whites}
        <Circle cx={98} cy={104} r={11} fill={EYE} />
        <Circle cx={150} cy={104} r={11} fill={EYE} />
        <Circle cx={94} cy={100} r={3.5} fill={palette.white} />
        <Circle cx={146} cy={100} r={3.5} fill={palette.white} />
      </G>
    );
  }
  if (expression === 'worried') {
    return (
      <G>
        {whites}
        <Circle cx={94} cy={118} r={9} fill={EYE} />
        <Circle cx={146} cy={118} r={9} fill={EYE} />
        <Circle cx={91} cy={115} r={2.5} fill={palette.white} />
        <Circle cx={143} cy={115} r={2.5} fill={palette.white} />
      </G>
    );
  }
  // happy
  return (
    <G>
      {whites}
      <Circle cx={96} cy={116} r={12} fill={EYE} />
      <Circle cx={144} cy={116} r={12} fill={EYE} />
      <Circle cx={92} cy={111} r={4} fill={palette.white} />
      <Circle cx={140} cy={111} r={4} fill={palette.white} />
    </G>
  );
}

/** Wide, flat duck bill. Opens for excited/celebrating; gentle frown when worried. */
function Bill({ expression }: { expression: MascotExpression }) {
  const open = expression === 'excited' || expression === 'celebrating';

  if (open) {
    return (
      <G>
        <Ellipse cx={120} cy={158} rx={37} ry={13} fill={BILL_DARK} />
        <Ellipse cx={120} cy={154} rx={26} ry={7} fill="#7A2E4A" />
        <Ellipse cx={120} cy={146} rx={38} ry={13} fill={BILL} />
        <Ellipse cx={109} cy={141} rx={3} ry={2} fill={NOSTRIL} />
        <Ellipse cx={131} cy={141} rx={3} ry={2} fill={NOSTRIL} />
      </G>
    );
  }

  return (
    <G>
      <Ellipse cx={120} cy={155} rx={36} ry={13} fill={BILL_DARK} />
      <Ellipse cx={120} cy={150} rx={38} ry={15} fill={BILL} />
      <Ellipse cx={109} cy={146} rx={3} ry={2} fill={NOSTRIL} />
      <Ellipse cx={131} cy={146} rx={3} ry={2} fill={NOSTRIL} />
      {expression === 'worried' ? (
        <Path d="M108 158 Q120 152 132 158" stroke={BILL_DARK} strokeWidth={2.5} strokeLinecap="round" fill="none" />
      ) : (
        <Path d="M108 156 Q120 162 132 156" stroke={BILL_DARK} strokeWidth={2.5} strokeLinecap="round" fill="none" />
      )}
    </G>
  );
}

/** A little bowtie under the bill — Stu's studious flourish. */
function Bowtie() {
  return (
    <G>
      <Path d="M120 180 L103 171 L103 189 Z" fill={BOW} />
      <Path d="M120 180 L137 171 L137 189 Z" fill={BOW} />
      <Circle cx={120} cy={180} r={6} fill={BOW_DARK} />
    </G>
  );
}

function Accessory({ kind }: { kind: MascotAccessory }) {
  if (kind === 'book') {
    return (
      <G>
        <Rect x={78} y={166} width={84} height={44} rx={7} fill={BOOK} />
        <Rect x={78} y={166} width={84} height={44} rx={7} fill="none" stroke={BOOK_DARK} strokeWidth={3} />
        <Rect x={117} y={166} width={6} height={44} fill={BOOK_DARK} />
        <Rect x={90} y={177} width={20} height={4} rx={2} fill={palette.white} opacity={0.9} />
        <Rect x={90} y={188} width={16} height={4} rx={2} fill={palette.white} opacity={0.9} />
        <Rect x={132} y={177} width={20} height={4} rx={2} fill={palette.white} opacity={0.9} />
        <Rect x={132} y={188} width={16} height={4} rx={2} fill={palette.white} opacity={0.9} />
      </G>
    );
  }
  if (kind === 'pencil') {
    return (
      <G transform="rotate(-35 152 176)">
        <Rect x={119} y={169} width={8} height={14} rx={3} fill={CHEEK} />
        <Rect x={126} y={169} width={3} height={14} fill="#C9C9D3" />
        <Rect x={129} y={169} width={44} height={14} rx={2} fill={BILL} />
        <Path d="M173 169 L185 176 L173 183 Z" fill="#E8C08A" />
        <Path d="M181 172 L185 176 L181 180 Z" fill={EYE} />
      </G>
    );
  }
  if (kind === 'wand') {
    return (
      <G>
        <Path d="M150 196 L182 136" stroke={HAT_DARK} strokeWidth={7} strokeLinecap="round" />
        <Sparkle cx={186} cy={128} r={13} fill={BILL} />
        <Sparkle cx={170} cy={112} r={5} fill={palette.rose500} />
      </G>
    );
  }
  return null;
}

/** A 4-point sparkle. */
function Sparkle({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const d = `M${cx} ${cy - r} Q${cx + r * 0.22} ${cy - r * 0.22} ${cx + r} ${cy} Q${cx + r * 0.22} ${cy + r * 0.22} ${cx} ${cy + r} Q${cx - r * 0.22} ${cy + r * 0.22} ${cx - r} ${cy} Q${cx - r * 0.22} ${cy - r * 0.22} ${cx} ${cy - r} Z`;
  return <Path d={d} fill={fill} />;
}

/** Celebration sparkles around Stu's head. */
function Sparkles() {
  const spots = [
    { cx: 40, cy: 72, r: 7, c: BILL },
    { cx: 200, cy: 76, r: 6, c: palette.rose500 },
    { cx: 30, cy: 140, r: 5, c: palette.rose300 },
    { cx: 210, cy: 148, r: 6, c: BILL },
    { cx: 120, cy: 22, r: 6, c: palette.rose500 },
  ];
  return (
    <G>
      {spots.map((s, i) => (
        <Sparkle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.c} />
      ))}
    </G>
  );
}
