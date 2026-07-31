import React from 'react';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '@/theme';

/**
 * Custom stuAP icon set — original, cohesive line-art glyphs drawn in the
 * course/step accent color. Replaces stock emoji so every surface feels
 * designed. All icons share a 24×24 grid, rounded strokes, and a transparent
 * background (screens supply the tinted tile behind them).
 */

interface IconProps {
  color?: string;
  size?: number;
}

const STROKE = 2.1;

/** Shared frame + inherited stroke styling. */
function Frame({ size = 28, children }: { size?: number; children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {children}
    </Svg>
  );
}

function Stroked({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <G stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </G>
  );
}

// (Animated course icons live in ./CourseIcon.)

// --- Score-goal glyphs -------------------------------------------------------

export function ScoreGoalIcon({ id, color = colors.primary, size = 28 }: IconProps & { id: string }) {
  return (
    <Frame size={size}>
      {id === 'score5' ? (
        <G>
          <Stroked color={color}>
            <Circle cx={12} cy={12} r={9} />
            <Circle cx={12} cy={12} r={5} />
          </Stroked>
          <Circle cx={12} cy={12} r={2} fill={color} />
        </G>
      ) : null}
      {id === 'score4' ? (
        <Stroked color={color}>
          <Circle cx={12} cy={9} r={5} />
          <Path d="M9 13 L8 21 L12 18 L16 21 L15 13" />
        </Stroked>
      ) : null}
      {id === 'score3' ? (
        <Stroked color={color}>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M8 12 L11 15 L16 9" />
        </Stroked>
      ) : null}
      {id === 'grade' ? (
        <Stroked color={color}>
          <Path d="M4 20 H20" />
          <Path d="M7 20 V15 M12 20 V11 M17 20 V7" />
          <Path d="M14.5 7 H17 V9.5" />
        </Stroked>
      ) : null}
      {id === 'unsure' ? (
        <G>
          <Stroked color={color}>
            <Circle cx={12} cy={12} r={9} />
          </Stroked>
          <SvgText x={12} y={16.5} fontSize={12} fontWeight="bold" fill={color} textAnchor="middle">
            ?
          </SvgText>
        </G>
      ) : null}
    </Frame>
  );
}

// --- Exam-timeframe glyphs ---------------------------------------------------

function CalendarBase({ color }: { color: string }) {
  return (
    <Stroked color={color}>
      <Rect x={4} y={6} width={16} height={15} rx={2.5} />
      <Path d="M4 10 H20" />
      <Path d="M8 4 V7 M16 4 V7" />
    </Stroked>
  );
}

export function ExamIcon({ id, color = colors.primary, size = 28 }: IconProps & { id: string }) {
  return (
    <Frame size={size}>
      {id === 'this_spring' ? (
        <G>
          <CalendarBase color={color} />
          <Rect x={8} y={13} width={4.5} height={4.5} rx={1} fill={color} />
        </G>
      ) : null}
      {id === 'next_year' ? (
        <G>
          <CalendarBase color={color} />
          <Stroked color={color}>
            <Path d="M8.5 15.5 H15 M12.5 12.5 L15.5 15.5 L12.5 18.5" />
          </Stroked>
        </G>
      ) : null}
      {id === 'for_class' ? (
        <Stroked color={color}>
          <Path d="M12 6 C10 5 6 5 4 6 V18.5 C6 17.5 10 17.5 12 18.5 C14 17.5 18 17.5 20 18.5 V6 C18 5 14 5 12 6 Z" />
          <Path d="M12 6 V18.5" />
        </Stroked>
      ) : null}
      {id === 'unsure' ? (
        <G>
          <CalendarBase color={color} />
          <SvgText x={12} y={19} fontSize={9} fontWeight="bold" fill={color} textAnchor="middle">
            ?
          </SvgText>
        </G>
      ) : null}
    </Frame>
  );
}

// --- Placement-level glyphs --------------------------------------------------

export function PlacementIcon({ id, color = colors.primary, size = 28 }: IconProps & { id: string }) {
  return (
    <Frame size={size}>
      {id === 'beginner' ? (
        <Stroked color={color}>
          <Path d="M12 21 V11" />
          <Path d="M12 13 C8 13 6 10 6 8 C10 8 12 10 12 13 Z" />
          <Path d="M12 12 C16 12 18 9 18 7 C14 7 12 9 12 12 Z" />
        </Stroked>
      ) : null}
      {id === 'builder' ? (
        <Stroked color={color}>
          <Rect x={4.5} y={13} width={6.5} height={6.5} rx={1} />
          <Rect x={13} y={13} width={6.5} height={6.5} rx={1} />
          <Rect x={8.75} y={5} width={6.5} height={6.5} rx={1} />
        </Stroked>
      ) : null}
      {id === 'ap_ready' ? (
        <Stroked color={color}>
          <Path d="M8 3 V21" />
          <Path d="M8 4 H18 L15 7.5 L18 11 H8" />
        </Stroked>
      ) : null}
      {id === 'advanced_review' ? (
        <Stroked color={color}>
          <Path d="M7 4 H17 V8 A5 5 0 0 1 7 8 Z" />
          <Path d="M7 5 H4.5 V6.5 A2.5 2.5 0 0 0 7.4 8.9" />
          <Path d="M17 5 H19.5 V6.5 A2.5 2.5 0 0 1 16.6 8.9" />
          <Path d="M12 13 V16 M9 20 H15 M10 16 H14 L15 20 H9 Z" />
        </Stroked>
      ) : null}
    </Frame>
  );
}

