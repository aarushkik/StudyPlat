import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Glyph } from '@/components/icons';
import { colors, radius } from '@/theme';

interface TopBackButtonProps {
  onPress: () => void;
  color?: string;
  /** Renders an ✕ instead of a chevron, for flows you exit rather than reverse. */
  variant?: 'back' | 'close';
  style?: StyleProp<ViewStyle>;
}

/** Circular back/close control for the top-left of a screen. */
export function TopBackButton({ onPress, color, variant = 'back', style }: TopBackButtonProps) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={variant === 'back' ? 'Go back' : 'Close'}
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Glyph name={variant === 'back' ? 'chevron-left' : 'close'} size={24} color={color ?? colors.textMuted} strokeWidth={2.6} />
    </Pressable>
  );
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.45, transform: [{ scale: 0.92 }] },
});
