import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Glyph, type GlyphName } from '@/components/icons';
import { chunky, chunkyRadius, colors, depth, gloss, spacing, spring, typography } from '@/theme';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useHaptics } from '@/hooks/useHaptics';

export type ButtonTone = 'primary' | 'secondary' | 'ghost' | 'gold' | 'success' | 'danger';
type Size = 'md' | 'lg';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  tone?: ButtonTone;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  hapticFeedback?: boolean;
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
  hapticFeedback = true,
  icon,
  style,
}: AppButtonProps) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);
  const SCHEMES = makeSCHEMES(appTheme);

  const press = useRef(new Animated.Value(0)).current;
  const haptic = useHaptics();
  const { reduceMotion } = useMotionPreference();
  const inactive = disabled || loading;
  const scheme = inactive ? SCHEMES.disabled : SCHEMES[tone];
  useEffect(() => () => press.stopAnimation(), [press]);

  const c = chunky({ depth: depth.button, radius: chunkyRadius.button, shadow: scheme.lip });

  const to = (v: number) => {
    if (reduceMotion) { press.setValue(v); return; }
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();
  };

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] });
  const pad = size === 'lg' ? 15 : 11;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      onPress={() => { if (hapticFeedback) haptic(); onPress?.(); }}
      style={[c.wrap, style]}
    >
      <View style={[c.lip, tone === 'ghost' && styles.hidden]} />
      <Animated.View
        style={[
          c.face,
          styles.face,
          {
            backgroundColor: scheme.fill,
            borderColor: tone === 'ghost' ? 'transparent' : colors.border,
            paddingVertical: pad,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Only the coloured tones get the highlight. On the cream secondary
            button white-on-white is invisible, and on ghost there is no face. */}
        {!inactive && (tone === 'primary' || tone === 'gold' || tone === 'danger') ? (
          <View pointerEvents="none" style={gloss(chunkyRadius.button)} />
        ) : null}

        {loading ? (
          <ActivityIndicator color={scheme.text} />
        ) : (
          <View style={styles.row}>
            {icon ? <Glyph name={icon} size={18} color={scheme.text} strokeWidth={2.6} /> : null}
            <Text style={[typography.button, { color: scheme.text, textAlign: 'center', flexShrink: 1, textTransform: 'none', letterSpacing: 0.2 }]}>
              {label}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

type Scheme = { fill: string; lip: string; text: string };

const makeSCHEMES = ({ colors }: AppTheme): Record<ButtonTone | 'disabled', Scheme> => ({
  primary: { fill: colors.primary, lip: colors.lip, text: colors.textOnPrimary },
  secondary: { fill: colors.surface, lip: colors.lip, text: colors.ink },
  gold: { fill: colors.gold, lip: colors.currentDeep, text: colors.textOnPrimary },
  success: { fill: '#2A6E45', lip: colors.border, text: colors.white },
  danger: { fill: '#A93B1C', lip: colors.border, text: colors.white },
  ghost: { fill: 'transparent', lip: 'transparent', text: colors.textSecondary },
  disabled: { fill: colors.disabledBg, lip: colors.disabledEdge, text: colors.disabledText },
});

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  // Clips the highlight. React Native clamps a corner radius to half the
  // shorter side, so on a short button the gloss's own corners would be
  // rounder than the face can show and would bulge past the ink.
  face: {
    minHeight: 48,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  hidden: { opacity: 0 },
});
