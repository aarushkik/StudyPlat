import React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { colors } from '@/theme';

/**
 * The StudyPlat glyph set — one original, cohesive icon family drawn on a shared
 * 24×24 grid with rounded joins. Outline glyphs inherit `strokeWidth`; a few
 * (flame, gem, heart, star, crown) are solid because they read better as small
 * badges in the map HUD. Nothing here comes from a stock icon font, so every
 * surface in the app stays on-brand.
 */

export type GlyphName =
  // interface
  | 'check'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-right'
  | 'plus'
  | 'lock'
  | 'info'
  | 'refresh'
  | 'play'
  // status / rewards
  | 'flame'
  | 'gem'
  | 'heart'
  | 'star'
  | 'crown'
  | 'trophy'
  | 'medal'
  | 'sparkle'
  | 'target'
  // quest nodes
  | 'book'
  | 'bolt'
  | 'page'
  | 'chest'
  | 'flag'
  | 'swords'
  | 'shield'
  // navigation
  | 'map'
  | 'compass'
  | 'chart'
  | 'avatar'
  // subject / milestone flavor
  | 'layers'
  | 'rocket'
  | 'quill'
  | 'brain'
  | 'clock'
  | 'calendar'
  | 'bulb';

interface GlyphProps {
  name: GlyphName;
  size?: number;
  color?: string;
  /** Outline weight. Ignored by the solid glyphs. */
  strokeWidth?: number;
}

/** Glyphs drawn as filled shapes rather than outlines. */
const SOLID = new Set<GlyphName>(['flame', 'gem', 'heart', 'star', 'crown', 'sparkle', 'play', 'bolt']);

export function Glyph({ name, size = 24, color = colors.textPrimary, strokeWidth = 2 }: GlyphProps) {
  const solid = SOLID.has(name);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        stroke={solid ? 'none' : color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {render(name, color)}
      </G>
    </Svg>
  );
}

function render(name: GlyphName, c: string): React.ReactNode {
  switch (name) {
    // --- interface ---------------------------------------------------------
    case 'check':
      return <Path d="M4.8 12.6 L9.6 17.4 L19.2 6.8" />;
    case 'close':
      return <Path d="M6.4 6.4 L17.6 17.6 M17.6 6.4 L6.4 17.6" />;
    case 'chevron-left':
      return <Path d="M15 4.8 L7.8 12 L15 19.2" />;
    case 'chevron-right':
      return <Path d="M9 4.8 L16.2 12 L9 19.2" />;
    case 'chevron-down':
      return <Path d="M4.8 8.8 L12 16 L19.2 8.8" />;
    case 'arrow-right':
      return <Path d="M4 12 H18.6 M12.8 6.2 L18.6 12 L12.8 17.8" />;
    case 'plus':
      return <Path d="M12 5.5 V18.5 M5.5 12 H18.5" />;
    case 'lock':
      return (
        <G>
          <Path d="M8.2 10.6 V7.9 a3.8 3.8 0 0 1 7.6 0 v2.7" />
          <Rect x={4.6} y={10.6} width={14.8} height={9.4} rx={2.8} fill={c} stroke="none" />
          <Path d="M12 14 v2.6" stroke={colors.white} strokeWidth={2.2} />
        </G>
      );
    case 'info':
      return (
        <G>
          <Circle cx={12} cy={12} r={8.8} />
          <Path d="M12 11 v5.6" />
          <Circle cx={12} cy={7.6} r={1.15} fill={c} stroke="none" />
        </G>
      );
    case 'refresh':
      return (
        <G>
          <Path d="M19.4 12a7.4 7.4 0 1 1-2.6-5.6" />
          <Path d="M19.6 4.4 v4.4 h-4.4" />
        </G>
      );
    case 'play':
      return <Path d="M7.6 5.2 L19 12 L7.6 18.8 Z" fill={c} />;

    // --- status / rewards --------------------------------------------------
    case 'flame':
      return (
        <G>
          <Path
            d="M12 1.9 C15.7 6 18.6 8.7 18.6 12.7 A6.6 6.6 0 0 1 5.4 12.7 C5.4 9.8 6.9 7.6 9 5.9 C9 8.4 10 9.7 11.3 10.1 C10.6 7.2 11 4.3 12 1.9 Z"
            fill={c}
          />
          <Path
            d="M12 11.8 C13.7 13.3 14.7 14.6 14.7 16.1 A2.7 2.7 0 0 1 9.3 16.1 C9.3 14.6 10.3 13.3 12 11.8 Z"
            fill={colors.white}
            opacity={0.42}
          />
        </G>
      );
    case 'gem':
      return (
        <G>
          <Path d="M7.4 3.4 H16.6 L21 9.1 L12 20.8 L3 9.1 Z" fill={c} />
          <Path
            d="M3 9.1 H21 M7.4 3.4 L9.6 9.1 L12 20.8 M16.6 3.4 L14.4 9.1 L12 20.8"
            stroke={colors.white}
            strokeWidth={1.1}
            opacity={0.5}
          />
        </G>
      );
    case 'heart':
      return (
        <Path
          d="M12 20.7 C4.2 15.4 2.6 11.7 2.6 9 A5.4 5.4 0 0 1 12 6.2 A5.4 5.4 0 0 1 21.4 9 C21.4 11.7 19.8 15.4 12 20.7 Z"
          fill={c}
        />
      );
    case 'star':
      return (
        <Path
          d="M12 2.4 L14.9 8.5 L21.6 9.4 L16.8 14.1 L18 20.8 L12 17.6 L6 20.8 L7.2 14.1 L2.4 9.4 L9.1 8.5 Z"
          fill={c}
        />
      );
    case 'crown':
      return (
        <G>
          <Path d="M3.6 17.4 L2 6.6 L7.6 10.4 L12 3.8 L16.4 10.4 L22 6.6 L20.4 17.4 Z" fill={c} />
          <Rect x={3.6} y={18.6} width={16.8} height={2.6} rx={1.3} fill={c} />
        </G>
      );
    case 'trophy':
      return (
        <G>
          <Path d="M7.6 3.8 H16.4 V9.6 a4.4 4.4 0 0 1 -8.8 0 Z" />
          <Path d="M7.6 5.4 H4.4 v1.8 a3.4 3.4 0 0 0 3.4 3.4" />
          <Path d="M16.4 5.4 h3.2 v1.8 a3.4 3.4 0 0 1 -3.4 3.4" />
          <Path d="M12 14 v3.2 M8.6 20.4 H15.4 L14.6 17.2 H9.4 Z" />
        </G>
      );
    case 'medal':
      return (
        <G>
          <Path d="M8.4 2.8 L11 8.6 M15.6 2.8 L13 8.6" />
          <Circle cx={12} cy={14.6} r={6.4} />
          <Path d="M12 11.4 L13 13.5 L15.3 13.8 L13.6 15.4 L14 17.7 L12 16.6 L10 17.7 L10.4 15.4 L8.7 13.8 L11 13.5 Z" />
        </G>
      );
    case 'sparkle':
      return (
        <G>
          <Path
            d="M12 2.2 C12.9 7.4 14.6 9.1 19.8 10 C14.6 10.9 12.9 12.6 12 17.8 C11.1 12.6 9.4 10.9 4.2 10 C9.4 9.1 11.1 7.4 12 2.2 Z"
            fill={c}
          />
          <Path
            d="M18.4 15 C18.8 17.2 19.4 17.8 21.6 18.2 C19.4 18.6 18.8 19.2 18.4 21.4 C18 19.2 17.4 18.6 15.2 18.2 C17.4 17.8 18 17.2 18.4 15 Z"
            fill={c}
            opacity={0.7}
          />
        </G>
      );
    case 'target':
      return (
        <G>
          <Circle cx={12} cy={12} r={8.6} />
          <Circle cx={12} cy={12} r={4.6} />
          <Circle cx={12} cy={12} r={1.3} fill={c} stroke="none" />
        </G>
      );

    // --- quest nodes -------------------------------------------------------
    case 'book':
      return (
        <G>
          <Path d="M12 6.6 C9.6 4.9 6.5 4.5 3.6 5.3 V17.9 C6.5 17.1 9.6 17.5 12 19.2 C14.4 17.5 17.5 17.1 20.4 17.9 V5.3 C17.5 4.5 14.4 4.9 12 6.6 Z" />
          <Path d="M12 6.6 V19.2" />
        </G>
      );
    case 'bolt':
      return <Path d="M13.8 1.8 L4.8 13.6 H10.6 L10.2 22.2 L19.2 10 H13.2 Z" fill={c} />;
    case 'page':
      return (
        <G>
          <Path d="M5.4 4.6 a2 2 0 0 1 2 -2 H14 L18.6 7.2 V19.4 a2 2 0 0 1 -2 2 H7.4 a2 2 0 0 1 -2 -2 Z" />
          <Path d="M13.6 2.8 V7.4 H18.4" />
          <Path d="M8.8 12.4 H15.2 M8.8 16.2 H13" />
        </G>
      );
    case 'chest':
      return (
        <G>
          <Path d="M3.4 11.2 a8.6 5.8 0 0 1 17.2 0 Z" fill={c} stroke="none" />
          <Path d="M3.4 11.2 a8.6 5.8 0 0 1 17.2 0" />
          <Path d="M3.4 11.2 H20.6 V18.4 a2 2 0 0 1 -2 2 H5.4 a2 2 0 0 1 -2 -2 Z" />
          <Path d="M10.4 9 h3.2 v6 h-3.2 z" fill={c} stroke="none" />
          <Circle cx={12} cy={12.2} r={1.1} fill={colors.white} stroke="none" />
        </G>
      );
    case 'flag':
      return (
        <G>
          <Path d="M6 21.2 V3" />
          <Path d="M6 4.4 H18.2 L15.4 8.8 L18.2 13.2 H6" />
        </G>
      );
    case 'swords':
      return (
        <G>
          <Path d="M20.4 3.4 L10.6 13.2 M20.4 3.4 H17.2 M20.4 3.4 V6.6" />
          <Path d="M3.6 3.4 L13.4 13.2 M3.6 3.4 H6.8 M3.6 3.4 V6.6" />
          <Path d="M6.6 14.4 L9.8 17.6 L5.4 21.2 L3 18.8 Z" />
          <Path d="M17.4 14.4 L14.2 17.6 L18.6 21.2 L21 18.8 Z" />
        </G>
      );
    case 'shield':
      return (
        <G>
          <Path d="M12 2.6 L20 5.6 V11.6 C20 16.5 16.6 19.9 12 21.4 C7.4 19.9 4 16.5 4 11.6 V5.6 Z" />
          <Path d="M9.2 12 L11.4 14.2 L15.2 10.2" />
        </G>
      );

    // --- navigation --------------------------------------------------------
    case 'map':
      return (
        <G>
          <Path d="M9 4.4 L3.4 6.8 V20 L9 17.6 L15 20 L20.6 17.6 V4.4 L15 6.8 Z" />
          <Path d="M9 4.4 V17.6 M15 6.8 V20" />
        </G>
      );
    case 'compass':
      return (
        <G>
          <Circle cx={12} cy={12} r={8.8} />
          <Path d="M15.6 8.4 L13.3 13.3 L8.4 15.6 L10.7 10.7 Z" />
        </G>
      );
    case 'chart':
      return (
        <G>
          <Path d="M4 20.2 H20" />
          <Path d="M7.6 20.2 V13.4 M12 20.2 V7.6 M16.4 20.2 V11" />
        </G>
      );
    case 'avatar':
      return (
        <G>
          <Circle cx={12} cy={8.4} r={4} />
          <Path d="M4.8 20.4 a7.2 7.2 0 0 1 14.4 0" />
        </G>
      );

    // --- subject / milestone flavor ---------------------------------------
    case 'layers':
      return (
        <G>
          <Path d="M12 2.8 L20.8 7.6 L12 12.4 L3.2 7.6 Z" />
          <Path d="M3.2 12 L12 16.8 L20.8 12" />
          <Path d="M3.2 16.4 L12 21.2 L20.8 16.4" />
        </G>
      );
    case 'rocket':
      return (
        <G>
          <Path d="M12 2.4 C15.4 5 17.2 8.8 17.2 13 L14.4 16.6 H9.6 L6.8 13 C6.8 8.8 8.6 5 12 2.4 Z" />
          <Circle cx={12} cy={10} r={2.2} />
          <Path d="M9.6 16.6 L8 21 L11 19.4 M14.4 16.6 L16 21 L13 19.4" />
        </G>
      );
    case 'quill':
      return (
        <G>
          <Path d="M20.6 3.2 C13.6 3.8 9 7.2 7.2 12.4 C6.4 14.8 6.8 16.8 7.6 18 C10.4 14.4 13.6 12.2 17.2 11.2" />
          <Path d="M7.6 18 L3.6 21.2" />
          <Path d="M9.4 15.6 C12.4 15.8 14.8 14.6 16.2 12.4" />
        </G>
      );
    case 'brain':
      return (
        <G>
          <Path d="M12 5.2 a3.4 3.4 0 0 0 -6.2 1.9 a3.2 3.2 0 0 0 -1.4 5.3 a3.4 3.4 0 0 0 2.2 5.3 a3.2 3.2 0 0 0 5.4 1.4 Z" />
          <Path d="M12 5.2 a3.4 3.4 0 0 1 6.2 1.9 a3.2 3.2 0 0 1 1.4 5.3 a3.4 3.4 0 0 1 -2.2 5.3 a3.2 3.2 0 0 1 -5.4 1.4 Z" />
          <Path d="M12 5.2 V19.1" />
        </G>
      );
    case 'clock':
      return (
        <G>
          <Circle cx={12} cy={12} r={8.8} />
          <Path d="M12 6.8 V12 L15.6 14.2" />
        </G>
      );
    case 'calendar':
      return (
        <G>
          <Rect x={3.6} y={5.4} width={16.8} height={15.2} rx={3} />
          <Path d="M3.6 10 H20.4" />
          <Path d="M8.2 3.2 V7 M15.8 3.2 V7" />
        </G>
      );
    case 'bulb':
      return (
        <G>
          <Path d="M12 2.8 a6.4 6.4 0 0 1 3.8 11.5 V16.4 H8.2 V14.3 A6.4 6.4 0 0 1 12 2.8 Z" />
          <Path d="M9.4 19 H14.6 M10.4 21.4 H13.6" />
        </G>
      );
    default:
      return null;
  }
}
