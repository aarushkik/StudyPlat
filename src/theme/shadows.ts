import { Platform, ViewStyle } from 'react-native';
import { palette } from './colors';

/**
 * Soft, layered shadows. Cross-platform: iOS uses shadow* props, Android uses
 * elevation. Kept subtle so the UI feels light and premium, not heavy.
 */
const make = (
  elevation: number,
  radius: number,
  opacity: number,
  offsetY: number,
  color: string = palette.ink,
): ViewStyle =>
  Platform.select<ViewStyle>({
    ios: {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: offsetY },
    },
    android: { elevation, shadowColor: color },
    default: {},
  }) as ViewStyle;

export const shadows = {
  none: {} as ViewStyle,
  xs: make(1, 4, 0.05, 2),
  sm: make(2, 8, 0.06, 3),
  md: make(6, 18, 0.1, 8),
  lg: make(12, 28, 0.14, 14),
  xl: make(20, 40, 0.18, 20),
} as const;

/**
 * A colored halo. Used where an element should read as lit from within — the
 * live quest node, a primary call to action — rather than merely raised.
 */
export const glow = (color: string, strength: 'soft' | 'strong' = 'soft'): ViewStyle =>
  strength === 'strong' ? make(14, 22, 0.5, 8, color) : make(8, 16, 0.32, 6, color);

export type ShadowToken = keyof typeof shadows;
