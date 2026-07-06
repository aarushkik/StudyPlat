import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

interface TopBackButtonProps {
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/** Circular back button for the top-left of onboarding screens. */
export function TopBackButton({ onPress, color = colors.textMuted, style }: TopBackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Ionicons name="chevron-back" size={26} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.5 },
});
