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
): ViewStyle =>
  Platform.select<ViewStyle>({
    ios: {
      shadowColor: palette.ink,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: offsetY },
    },
    android: { elevation },
    default: {},
  }) as ViewStyle;

export const shadows = {
  none: {} as ViewStyle,
  sm: make(2, 8, 0.06, 3),
  md: make(6, 18, 0.1, 8),
  lg: make(12, 28, 0.14, 14),
} as const;

export type ShadowToken = keyof typeof shadows;
