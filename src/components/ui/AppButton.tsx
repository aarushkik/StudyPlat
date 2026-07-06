import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
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
 * lip makes it feel raised; pressing sinks the face down onto the lip. The
 * bounding-box height stays constant, so surrounding layout never jumps.
 */
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) {
  const [pressed, setPressed] = useState(false);
  const inactive = disabled || loading;
  const scheme = inactive ? SCHEMES.disabled : SCHEMES[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive }}
      disabled={inactive}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={style}
    >
      <View
        style={[
          styles.face,
          {
            backgroundColor: scheme.face,
            borderColor: scheme.border,
            borderBottomColor: scheme.edge,
          },
          // Sink the face onto the lip while pressed; keep total height constant.
          pressed && !inactive
            ? { borderBottomWidth: 2, marginTop: DEPTH - 2 }
            : { borderBottomWidth: DEPTH, marginTop: 0 },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={scheme.text} />
        ) : (
          <Text style={[typography.button, styles.label, { color: scheme.text }]}>{label}</Text>
        )}
      </View>
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
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { textTransform: 'uppercase' },
});
