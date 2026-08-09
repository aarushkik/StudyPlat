import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Glyph, type GlyphName } from '@/components/icons';
import { chunky, chunkyRadius, colors, depth, gloss, spacing, spring, typography } from '@/theme';

export type ButtonTone = 'primary' | 'secondary' | 'ghost' | 'gold' | 'success' | 'danger';
type Size = 'md' | 'lg';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  tone?: ButtonTone;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  /** Optional glyph shown before the label. */
  icon?: GlyphName;
  /**
   * Accepted for call-site compatibility. The chunky treatment already gives
   * every button the same weight, so there is no separate emphasis state.
   */
  emphasis?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The StudyPlat button: a 3px ink border over a hard offset shadow.
 *
 * The depth is a *lip* — a second view of the same shape pushed down behind
 * the face — because React Native cannot draw a hard, coloured, unblurred
 * shadow. Pressing sinks the face onto the lip, which is the whole tactile
 * idea: the button visibly has somewhere to go.
 *
 * Every tone keeps the ink border; only the fill and lip colour change, so a
 * row of mixed-tone buttons still reads as one family.
 */
export function AppButton({
  label,
  onPress,
  tone = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  style,
}: AppButtonProps) {
  const press = useRef(new Animated.Value(0)).current;
  const inactive = disabled || loading;
  const scheme = inactive ? SCHEMES.disabled : SCHEMES[tone];

  const c = chunky({ depth: depth.button, radius: chunkyRadius.button, shadow: scheme.lip });

  const to = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] });
  const pad = size === 'lg' ? 15 : 11;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive }}
      disabled={inactive}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      onPress={onPress}
      style={[c.wrap, style]}
    >
      <View style={[c.lip, tone === 'ghost' && styles.hidden]} />
      <Animated.View
        style={[
          c.face,
          styles.face,
          {
            backgroundColor: scheme.fill,
            borderColor: tone === 'ghost' ? 'transparent' : colors.ink,
            paddingVertical: pad,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Only the coloured tones get the highlight. On the cream secondary
            button white-on-white is invisible, and on ghost there is no face. */}
        {tone === 'primary' || tone === 'gold' || tone === 'danger' ? (
          <View pointerEvents="none" style={gloss(chunkyRadius.button)} />
        ) : null}

        {loading ? (
          <ActivityIndicator color={scheme.text} />
        ) : (
          <View style={styles.row}>
            {icon ? <Glyph name={icon} size={18} color={scheme.text} strokeWidth={2.6} /> : null}
            <Text style={[typography.button, { color: scheme.text }]} numberOfLines={1}>
              {label}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

type Scheme = { fill: string; lip: string; text: string };

const SCHEMES: Record<ButtonTone | 'disabled', Scheme> = {
  primary: { fill: colors.primary, lip: colors.ink, text: colors.textOnPrimary },
  secondary: { fill: colors.surface, lip: colors.ink, text: colors.ink },
  gold: { fill: colors.gold, lip: colors.currentDeep, text: colors.ink },
  success: { fill: colors.success, lip: colors.successDeep, text: colors.white },
  danger: { fill: colors.danger, lip: colors.dangerDark, text: colors.white },
  ghost: { fill: 'transparent', lip: 'transparent', text: colors.textSecondary },
  disabled: { fill: colors.disabledBg, lip: colors.disabledEdge, text: colors.disabledText },
};

const styles = StyleSheet.create({
  // Clips the highlight. React Native clamps a corner radius to half the
  // shorter side, so on a short button the gloss's own corners would be
  // rounder than the face can show and would bulge past the ink.
  face: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  hidden: { opacity: 0 },
});
