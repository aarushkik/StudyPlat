import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import type { MascotAccessory, MascotExpression } from './Mascot.types';
import { MASCOT_VIEWBOX } from './Mascot.types';

/**
 * Stu, drawn. A single soft blob silhouette (head and body merged) so the
 * character stays readable at 44px and still holds up at 232px: gradient shell,
 * a lighter belly, glossy eyes with twin catchlights, a broad amber bill, and a
 * plum scholar's cap with a gold band. Every feature is parameterized by
 * expression so the same art can react instead of being redrawn per mood.
 *
 * Pure and stateless — <Mascot> owns the motion.
 */

const EYE = '#2E2333';
const BILL_DARK = '#D9860E';
const MOUTH = '#8E2E55';
const TONGUE = '#FF9CC2';
const CHEEK = '#FF7DAE';
const BROW = '#C72E6E';
const BODY_EDGE = '#F0518C';
const BAND = '#FFB02E';
const BAND_DARK = '#E0912A';
const CAP_TRIM = '#FFF3E6';

/** Eye geometry. */
const EYE_Y = 126;
const EYE_L = 92;
const EYE_R = 148;
const EYE_RX = 26;

type EyeShape = 'open' | 'arc' | 'closed';
type BillMode = 'smile' | 'flat' | 'frown' | 'open' | 'wide';

interface Mood {
  eyeShape: EyeShape;
  /** Vertical radius of the eye white — smaller reads as a squint. */
  eyeRy: number;
  pupil: { dx: number; dy: number; r: number };
  /**
   * Brows only appear on the moods that need them. On a face this round they
   * read as a scowl if they're always on, so happy/proud go without.
   */
  brows: false | { tilt: number; dy: number };
  bill: BillMode;
  /** Flippers thrown up in the air. */
  raised: boolean;
  sparkles: boolean;
}

const MOODS: Record<MascotExpression, Mood> = {
  happy: { eyeShape: 'open', eyeRy: 26, pupil: { dx: 0, dy: 2, r: 13 }, brows: false, bill: 'smile', raised: false, sparkles: false },
  thinking: { eyeShape: 'open', eyeRy: 25, pupil: { dx: 7, dy: -6, r: 11 }, brows: { tilt: 10, dy: -3 }, bill: 'flat', raised: false, sparkles: false },
  excited: { eyeShape: 'open', eyeRy: 27, pupil: { dx: 0, dy: 0, r: 14 }, brows: false, bill: 'open', raised: false, sparkles: true },
  celebrating: { eyeShape: 'arc', eyeRy: 26, pupil: { dx: 0, dy: 0, r: 13 }, brows: false, bill: 'wide', raised: true, sparkles: true },
  worried: { eyeShape: 'open', eyeRy: 23, pupil: { dx: 0, dy: 4, r: 9 }, brows: { tilt: -15, dy: 2 }, bill: 'frown', raised: false, sparkles: false },
  focused: { eyeShape: 'open', eyeRy: 18, pupil: { dx: 0, dy: 1, r: 12 }, brows: { tilt: 7, dy: 1 }, bill: 'flat', raised: false, sparkles: false },
  proud: { eyeShape: 'arc', eyeRy: 26, pupil: { dx: 0, dy: 0, r: 13 }, brows: false, bill: 'smile', raised: false, sparkles: false },
  sleepy: { eyeShape: 'closed', eyeRy: 24, pupil: { dx: 0, dy: 0, r: 10 }, brows: { tilt: 6, dy: 4 }, bill: 'flat', raised: false, sparkles: false },
};

interface StuArtProps {
  expression: MascotExpression;
  accessory: MascotAccessory;
  blinking: boolean;
  /** Unique suffix so gradient ids never collide between instances. */
  uid: string;
  width: number;
  height: number;
}

export function StuArt({ expression, accessory, blinking, uid, width, height }: StuArtProps) {
  const mood = MOODS[expression];
  const body = `body-${uid}`;
  const belly = `belly-${uid}`;
  const bill = `bill-${uid}`;
  const cap = `cap-${uid}`;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${MASCOT_VIEWBOX.width} ${MASCOT_VIEWBOX.height}`}>
      <Defs>
        <LinearGradient id={body} x1="0.15" y1="0" x2="0.85" y2="1">
          <Stop offset="0" stopColor="#FFA9CC" />
          <Stop offset="0.55" stopColor="#FF7DAE" />
          <Stop offset="1" stopColor="#F2568F" />
        </LinearGradient>
        <LinearGradient id={belly} x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0" stopColor="#FFF2F7" />
          <Stop offset="1" stopColor="#FFDCEA" />
        </LinearGradient>
        <LinearGradient id={bill} x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0" stopColor="#FFD583" />
          <Stop offset="1" stopColor="#F59B22" />
        </LinearGradient>
        <LinearGradient id={cap} x1="0.2" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#D8407D" />
          <Stop offset="1" stopColor="#8E1E4F" />
        </LinearGradient>
      </Defs>

      <PaddleTail />
      <WebbedFoot cx={97} fill={bill} />
      <WebbedFoot cx={143} fill={bill} />

      {/* Shell */}
      <Path
        d="M120 44 C174 44 210 86 210 142 C210 200 172 240 120 240 C68 240 30 200 30 142 C30 86 66 44 120 44 Z"
        fill={`url(#${body})`}
      />
      <Ellipse cx={120} cy={208} rx={54} ry={26} fill={`url(#${belly})`} />
      {/* Rim light along the upper-left edge gives the blob its volume. */}
      <Path
        d="M50 132 C54 88 82 56 116 51"
        stroke="#FFFFFF"
        strokeWidth={8}
        strokeLinecap="round"
        fill="none"
        opacity={0.3}
      />

      <Flipper side="left" raised={mood.raised} />
      <Flipper side="right" raised={mood.raised} />

      <Ellipse cx={62} cy={164} rx={14} ry={9} fill={CHEEK} opacity={0.55} />
      <Ellipse cx={178} cy={164} rx={14} ry={9} fill={CHEEK} opacity={0.55} />

      {mood.brows && !blinking ? <Brows tilt={mood.brows.tilt} dy={mood.brows.dy} /> : null}
      <Eyes mood={mood} blinking={blinking} />
      <Bill mode={mood.bill} fill={bill} />

      <Cap gradient={cap} />

      <Accessory kind={accessory} billFill={bill} />
      {mood.sparkles ? <Sparkles /> : null}
    </Svg>
  );
}

/** Broad, flat platypus tail peeking out behind the lower-right of the shell. */
function PaddleTail() {
  return (
    <G transform="rotate(24 198 212)">
      <Ellipse cx={198} cy={212} rx={34} ry={19} fill={BODY_EDGE} />
      <Ellipse cx={202} cy={212} rx={24} ry={12} fill="#FF7DAE" opacity={0.55} />
      <Path d="M188 202 H214 M186 212 H216 M188 222 H214" stroke={BODY_EDGE} strokeWidth={2} strokeLinecap="round" />
    </G>
  );
}

/** A webbed foot: a flat amber paddle with two toe grooves. */
function WebbedFoot({ cx, fill }: { cx: number; fill: string }) {
  return (
    <G>
      <Ellipse cx={cx} cy={246} rx={21} ry={11} fill={`url(#${fill})`} />
      <Path d={`M${cx - 7} 241 V253`} stroke={BILL_DARK} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
      <Path d={`M${cx + 7} 241 V253`} stroke={BILL_DARK} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
    </G>
  );
}

function Flipper({ side, raised }: { side: 'left' | 'right'; raised: boolean }) {
  const left = side === 'left';
  const p = raised
    ? { cx: left ? 40 : 200, cy: 116, rot: left ? -64 : 64 }
    : { cx: left ? 34 : 206, cy: 174, rot: left ? -20 : 20 };
  return (
    <G transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}>
      <Ellipse cx={p.cx} cy={p.cy} rx={15} ry={28} fill={BODY_EDGE} />
      <Ellipse cx={p.cx} cy={p.cy - 4} rx={8} ry={16} fill="#FF8FBB" opacity={0.5} />
    </G>
  );
}

function Brows({ tilt, dy }: { tilt: number; dy: number }) {
  const brow = (cx: number, angle: number, flip: boolean) => (
    <G transform={`translate(0 ${dy}) rotate(${angle} ${cx} 95)`}>
      <Path
        d={flip ? `M${cx + 15} 97 Q${cx} 90 ${cx - 15} 97` : `M${cx - 15} 97 Q${cx} 90 ${cx + 15} 97`}
        stroke={BROW}
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
    </G>
  );
  return (
    <G>
      {brow(EYE_L, tilt, false)}
      {brow(EYE_R, -tilt, true)}
    </G>
  );
}

function Eyes({ mood, blinking }: { mood: Mood; blinking: boolean }) {
  if (blinking || mood.eyeShape === 'closed') {
    return (
      <G stroke={EYE} strokeWidth={6} strokeLinecap="round" fill="none">
        <Path d={`M${EYE_L - 17} ${EYE_Y} Q${EYE_L} ${EYE_Y + 11} ${EYE_L + 17} ${EYE_Y}`} />
        <Path d={`M${EYE_R - 17} ${EYE_Y} Q${EYE_R} ${EYE_Y + 11} ${EYE_R + 17} ${EYE_Y}`} />
      </G>
    );
  }

  if (mood.eyeShape === 'arc') {
    return (
      <G stroke={EYE} strokeWidth={7} strokeLinecap="round" fill="none">
        <Path d={`M${EYE_L - 18} ${EYE_Y + 6} Q${EYE_L} ${EYE_Y - 14} ${EYE_L + 18} ${EYE_Y + 6}`} />
        <Path d={`M${EYE_R - 18} ${EYE_Y + 6} Q${EYE_R} ${EYE_Y - 14} ${EYE_R + 18} ${EYE_Y + 6}`} />
      </G>
    );
  }

  const { pupil, eyeRy } = mood;
  const eye = (cx: number) => (
    <G>
      <Ellipse cx={cx} cy={EYE_Y} rx={EYE_RX} ry={eyeRy} fill="#FFFFFF" />
      <Circle cx={cx + pupil.dx} cy={EYE_Y + pupil.dy} r={pupil.r} fill={EYE} />
      <Circle cx={cx + pupil.dx - pupil.r * 0.34} cy={EYE_Y + pupil.dy - pupil.r * 0.38} r={pupil.r * 0.33} fill="#FFFFFF" />
      <Circle cx={cx + pupil.dx + pupil.r * 0.34} cy={EYE_Y + pupil.dy + pupil.r * 0.4} r={pupil.r * 0.16} fill="#FFFFFF" opacity={0.8} />
    </G>
  );
  return (
    <G>
      {eye(EYE_L)}
      {eye(EYE_R)}
    </G>
  );
}

function Bill({ mode, fill }: { mode: BillMode; fill: string }) {
  const nostrils = (
    <G opacity={0.75}>
      <Ellipse cx={108} cy={160} rx={3.2} ry={2.2} fill={BILL_DARK} />
      <Ellipse cx={132} cy={160} rx={3.2} ry={2.2} fill={BILL_DARK} />
    </G>
  );

  if (mode === 'open' || mode === 'wide') {
    const drop = mode === 'wide' ? 8 : 0;
    return (
      <G>
        <Ellipse cx={120} cy={180 + drop} rx={38} ry={13} fill={BILL_DARK} />
        <Ellipse cx={120} cy={174 + drop} rx={27} ry={mode === 'wide' ? 13 : 9} fill={MOUTH} />
        <Ellipse cx={120} cy={180 + drop} rx={14} ry={5} fill={TONGUE} />
        <Ellipse cx={120} cy={156} rx={45} ry={15} fill={`url(#${fill})`} />
        <Ellipse cx={118} cy={150} rx={28} ry={5} fill="#FFFFFF" opacity={0.32} />
        {nostrils}
      </G>
    );
  }

  const curve =
    mode === 'frown'
      ? 'M105 176 Q120 167 135 176'
      : mode === 'flat'
        ? 'M106 174 H134'
        : 'M104 172 Q120 182 136 172';

  return (
    <G>
      <Ellipse cx={120} cy={174} rx={42} ry={13} fill={BILL_DARK} />
      <Ellipse cx={120} cy={167} rx={45} ry={16} fill={`url(#${fill})`} />
      <Ellipse cx={118} cy={160} rx={29} ry={5.5} fill="#FFFFFF" opacity={0.32} />
      {nostrils}
      <Path d={curve} stroke={BILL_DARK} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.85} />
    </G>
  );
}

/**
 * Plum graduation cap: a rounded crown with a gold band and star pin, capped by
 * a mortarboard drawn in perspective with a visible edge so it reads as a board
 * rather than a beanie. Tilted a few degrees so Stu never looks stiff.
 */
function Cap({ gradient }: { gradient: string }) {
  return (
    <G transform="rotate(-7 120 62)">
      {/* crown */}
      <Path d="M76 80 C76 50 164 50 164 80 Z" fill={`url(#${gradient})`} />
      <Ellipse cx={120} cy={80} rx={46} ry={9} fill={BAND} />
      <Ellipse cx={120} cy={83} rx={46} ry={6} fill={BAND_DARK} opacity={0.55} />
      {/* mortarboard, with a thin underside for thickness */}
      <Path d="M46 52 L120 74 L194 52 L194 58 L120 80 L46 58 Z" fill="#7A1743" />
      <Path d="M120 28 L194 52 L120 74 L46 52 Z" fill={`url(#${gradient})`} />
      <Path d="M120 28 L194 52 L120 74 L46 52 Z" fill="none" stroke="#7A1743" strokeWidth={2} strokeLinejoin="round" />
      <Path d="M120 32 L182 52 L120 43 Z" fill="#FFFFFF" opacity={0.16} />
      {/* button + tassel */}
      <Circle cx={120} cy={51} r={6} fill={BAND} />
      <Circle cx={120} cy={51} r={2.6} fill={BAND_DARK} />
      <Path d="M120 51 Q166 50 178 60 T182 88" stroke={BAND} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <Circle cx={182} cy={90} r={5} fill={BAND_DARK} />
      <Path d="M178 94 v9 M182 95 v10 M186 94 v9" stroke={BAND} strokeWidth={2.8} strokeLinecap="round" />
    </G>
  );
}

function Accessory({ kind, billFill }: { kind: MascotAccessory; billFill: string }) {
  if (kind === 'book') {
    const line = (x: number, y: number, w: number) => (
      <Rect key={`${x}-${y}`} x={x} y={y} width={w} height={4} rx={2} fill="#FFFFFF" opacity={0.85} />
    );
    return (
      <G>
        <Rect x={66} y={190} width={108} height={54} rx={9} fill="#8B7BFF" />
        <Rect x={66} y={190} width={108} height={54} rx={9} fill="none" stroke="#5E4BD6" strokeWidth={3.5} />
        <Rect x={115} y={190} width={10} height={54} rx={2} fill="#5E4BD6" />
        {[line(80, 203, 26), line(80, 213, 20), line(80, 223, 24)]}
        {[line(133, 203, 24), line(133, 213, 27), line(133, 223, 18)]}
      </G>
    );
  }
  if (kind === 'pencil') {
    return (
      <G transform="rotate(-38 160 190)">
        <Rect x={116} y={183} width={9} height={15} rx={3.5} fill="#FF9CC2" />
        <Rect x={124} y={183} width={3.5} height={15} fill="#C9C9D3" />
        <Rect x={127} y={183} width={48} height={15} rx={2.5} fill="#FFB02E" />
        <Path d="M175 183 L189 190.5 L175 198 Z" fill="#F0D2A2" />
        <Path d="M184 186.5 L189 190.5 L184 194.5 Z" fill={EYE} />
      </G>
    );
  }
  if (kind === 'wand') {
    return (
      <G>
        {/* Held out to the left: the paddle tail already owns the right side. */}
        <Path d="M66 216 L28 148" stroke="#8A5F38" strokeWidth={8} strokeLinecap="round" />
        <Path d="M64 212 L30 152" stroke="#B98457" strokeWidth={3} strokeLinecap="round" />
        <Sparkle cx={24} cy={140} r={14} fill={BAND} />
        <Sparkle cx={46} cy={122} r={7} fill="#FF5E9C" />
        <Sparkle cx={14} cy={166} r={5} fill={CAP_TRIM} />
      </G>
    );
  }
  if (kind === 'lantern') {
    return (
      <G>
        {/* warm spill of light around the glass */}
        <Circle cx={198} cy={206} r={30} fill={BAND} opacity={0.16} />
        <Path d="M188 148 C188 136 208 136 208 148" stroke="#8A5F38" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        <Path d="M198 148 V158" stroke="#8A5F38" strokeWidth={4.5} strokeLinecap="round" />
        <Path d="M180 166 H216 L212 158 H184 Z" fill="#8A5F38" />
        <Path d="M182 168 H214 L211 222 H185 Z" fill={`url(#${billFill})`} opacity={0.55} />
        <Path d="M182 168 H214 L211 222 H185 Z" fill="none" stroke="#8A5F38" strokeWidth={3.5} strokeLinejoin="round" />
        <Path d="M198 168 V222" stroke="#8A5F38" strokeWidth={2} opacity={0.5} />
        {/* flame */}
        <Path d="M198 184 C204 190 206 194 206 199 A8 8 0 0 1 190 199 C190 195 193 191 198 184 Z" fill={BAND} />
        <Path d="M198 194 C201 197 202 199 202 201 A4 4 0 0 1 194 201 C194 199 195 197 198 194 Z" fill={CAP_TRIM} />
        <Path d="M178 226 H218 L214 234 H182 Z" fill="#8A5F38" />
      </G>
    );
  }
  return null;
}

/** A soft 4-point sparkle. */
function Sparkle({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const k = r * 0.24;
  return (
    <Path
      d={`M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r} Z`}
      fill={fill}
    />
  );
}

/** Celebration sparkles scattered around Stu. */
function Sparkles() {
  const spots = [
    { cx: 26, cy: 78, r: 8, c: '#FFB02E' },
    { cx: 216, cy: 92, r: 7, c: '#FF5E9C' },
    { cx: 18, cy: 158, r: 6, c: '#FF9CC2' },
    { cx: 226, cy: 176, r: 7, c: '#FFB02E' },
    { cx: 200, cy: 40, r: 6, c: '#FF7DAE' },
    { cx: 44, cy: 34, r: 5, c: '#FFB02E' },
  ];
  return (
    <G>
      {spots.map((s) => (
        <Sparkle key={`${s.cx}-${s.cy}`} cx={s.cx} cy={s.cy} r={s.r} fill={s.c} />
      ))}
    </G>
  );
}
