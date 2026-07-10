import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

type Variant = 'primary' | 'secondary';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Depth of the chunky bottom "lip" that gives the button its 3D feel.
const DEPTH = 6;

/**
 * The signature stuAP button: chunky, rounded, and tactile. A colored bottom
 * lip makes it feel raised; pressing gives a quick spring-down (scale + dip)
 * via transforms only — no layout/margin shifts, so nothing can clip.
 */
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) {
  const press = useRef(new Animated.Value(0)).current;
  const inactive = disabled || loading;
  const scheme = inactive ? SCHEMES.disabled : SCHEMES[variant];

  const to = (v: number) =>
    Animated.spring(press, { toValue: v, useNativeDriver: true, speed: 50, bounciness: 0 }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] });
  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive }}
      disabled={inactive}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      onPress={onPress}
      style={style}
    >
      <Animated.View
        style={[
          styles.face,
          {
            backgroundColor: scheme.face,
            borderColor: scheme.border,
            borderBottomColor: scheme.edge,
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={scheme.text} />
        ) : (
          <Text style={[typography.button, styles.label, { color: scheme.text }]}>{label}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const SCHEMES: Record<Variant | 'disabled', { face: string; edge: string; border: string; text: string }> = {
  primary: { face: colors.primary, edge: colors.primaryDark, border: colors.primary, text: colors.textOnPrimary },
  secondary: { face: colors.surface, edge: colors.disabledEdge, border: colors.border, text: colors.primary },
  disabled: { face: colors.disabledBg, edge: colors.disabledEdge, border: colors.disabledBg, text: colors.disabledText },
};

const styles = StyleSheet.create({
  face: {
    width: '100%',
    borderRadius: radius.lg,
    borderWidth: 2,
    borderBottomWidth: DEPTH,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { textTransform: 'uppercase' },
});
