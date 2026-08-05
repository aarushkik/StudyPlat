import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, glow, radius, spacing, typography } from '@/theme';

export type ButtonTone = 'primary' | 'secondary' | 'ghost' | 'gold' | 'success';
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
  /** Adds a colored halo — reserve it for the one action that matters most. */
  emphasis?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Depth of the chunky bottom "lip" that gives the button its 3D feel. */
const DEPTH = 5;

/**
 * The signature StudyPlat button: chunky, rounded, and tactile. A darker lip sits
 * behind the face; pressing springs the face down onto it. The travel is
 * transform-only, so nothing reflows and neighbouring layout can never jump.
 */
export function AppButton({
  label,
  onPress,
  tone = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  emphasis = false,
  style,
}: AppButtonProps) {
  const press = useRef(new Animated.Value(0)).current;
  const inactive = disabled || loading;
  const scheme = inactive ? SCHEMES.disabled : SCHEMES[tone];

  const to = (v: number) =>
    Animated.spring(press, { toValue: v, useNativeDriver: true, speed: 50, bounciness: 0 }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] });
  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, DEPTH - 2] });
  const pad = size === 'lg' ? spacing.lg : spacing.md;

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
      <View style={[styles.lip, { backgroundColor: scheme.edge }]} />
      <Animated.View
        style={[
          styles.face,
          { borderColor: scheme.border, paddingVertical: pad, transform: [{ scale }, { translateY }] },
          emphasis && !inactive ? glow(scheme.edge, 'soft') : null,
        ]}
      >
        <LinearGradient
          colors={scheme.fill}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* A thin top highlight reads as a lit bevel. */}
        <View style={styles.sheen} />
        {loading ? (
          <ActivityIndicator color={scheme.text} />
        ) : (
          <View style={styles.row}>
            {icon ? <Glyph name={icon} size={19} color={scheme.text} strokeWidth={2.4} /> : null}
            <Text style={[typography.button, styles.label, { color: scheme.text }]} numberOfLines={1}>
              {label}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

type Scheme = { fill: readonly [string, string]; edge: string; border: string; text: string };

const SCHEMES: Record<ButtonTone | 'disabled', Scheme> = {
  primary: { fill: ['#FF74AA', '#FF5E9C'], edge: colors.primaryDeep, border: 'transparent', text: colors.textOnPrimary },
  secondary: { fill: [colors.surface, '#FDF8FB'], edge: colors.disabledEdge, border: colors.border, text: colors.primary },
  ghost: { fill: ['transparent', 'transparent'], edge: 'transparent', border: 'transparent', text: colors.textSecondary },
  gold: { fill: ['#FFC155', '#FFAA22'], edge: '#C97F09', border: 'transparent', text: '#5A3A00' },
  success: { fill: ['#4BD79B', '#2FC189'], edge: colors.successDark, border: 'transparent', text: colors.white },
  disabled: { fill: [colors.disabledBg, colors.disabledBg], edge: colors.disabledEdge, border: 'transparent', text: colors.disabledText },
};

const styles = StyleSheet.create({
  lip: { position: 'absolute', left: 0, right: 0, top: DEPTH, bottom: 0, borderRadius: radius.lg },
  face: {
    width: '100%',
    borderRadius: radius.lg,
    borderWidth: 2,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sheen: {
    position: 'absolute',
    top: 2,
    left: 10,
    right: 10,
    height: 2,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { textTransform: 'uppercase' },
});
