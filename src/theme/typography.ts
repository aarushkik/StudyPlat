import { TextStyle } from 'react-native';
import { colors } from './colors';

/**
 * Typography scale. Uses the platform system font for now (fast + crisp); swap
 * `fontFamily` here once a custom brand font is added via expo-font.
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
} as const;

type Variant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subtitle'
  | 'body'
  | 'bodyStrong'
  | 'tagline'
  | 'caption'
  | 'label'
  | 'button';

export const typography: Record<Variant, TextStyle> = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: fontWeight.heavy, color: colors.textPrimary },
  title: { fontSize: 28, lineHeight: 34, fontWeight: fontWeight.heavy, color: colors.textPrimary },
  heading: { fontSize: 22, lineHeight: 28, fontWeight: fontWeight.bold, color: colors.textPrimary },
  subtitle: { fontSize: 18, lineHeight: 24, fontWeight: fontWeight.bold, color: colors.textPrimary },
  body: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.medium, color: colors.textSecondary },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.bold, color: colors.textPrimary },
  tagline: { fontSize: 18, lineHeight: 26, fontWeight: fontWeight.medium, color: colors.textSecondary },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: fontWeight.semibold, color: colors.textMuted },
  label: { fontSize: 12, lineHeight: 16, fontWeight: fontWeight.bold, color: colors.textSecondary },
  // Chunky, slightly spaced button label.
  button: { fontSize: 16, lineHeight: 20, fontWeight: fontWeight.heavy, letterSpacing: 0.5 },
};
