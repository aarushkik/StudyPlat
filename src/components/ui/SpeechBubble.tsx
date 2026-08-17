import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

type Tail = 'bottom' | 'bottomLeft' | 'left' | 'none';

interface SpeechBubbleProps {
  text?: string;
  children?: React.ReactNode;
  /** Which side the little pointer sticks out of. */
  tail?: Tail;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TAIL = 16;

/**
 * A rounded speech bubble the mascot "says". The pointer is a rotated square
 * that reuses the bubble's own border on two edges, so the outline runs
 * unbroken around the tail instead of stopping at a seam.
 */
export function SpeechBubble({ text, children, tail = 'bottom', style, textStyle }: SpeechBubbleProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.bubble, style]}>
        {text ? <Text style={[typography.subtitle, styles.text, textStyle]}>{text}</Text> : children}
      </View>
      {tail !== 'none' ? <View style={[styles.tail, TAIL_POSITION[tail]]} /> : null}
    </View>
  );
}

// Rotating a square 45° puts one corner on each axis: the bottom-right corner
// points straight down, the top-left corner points straight left. Only the two
// edges meeting at the outward corner carry the border.
const POINT_DOWN: ViewStyle = { borderRightWidth: 2, borderBottomWidth: 2, borderBottomRightRadius: 4 };
const POINT_LEFT: ViewStyle = { borderLeftWidth: 2, borderTopWidth: 2, borderTopLeftRadius: 4 };

const TAIL_POSITION: Record<Exclude<Tail, 'none'>, ViewStyle> = {
  bottom: { ...POINT_DOWN, bottom: -TAIL / 2, left: '50%', marginLeft: -TAIL / 2 },
  bottomLeft: { ...POINT_DOWN, bottom: -TAIL / 2, left: spacing.xxxl },
  left: { ...POINT_LEFT, left: -TAIL / 2, top: '50%', marginTop: -TAIL / 2 },
};

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'stretch' },
  bubble: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 3,
    borderColor: colors.ink,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    zIndex: 2,
  },
  text: { color: colors.textPrimary },
  tail: {
    position: 'absolute',
    width: TAIL,
    height: TAIL,
    backgroundColor: colors.surface,
    borderColor: colors.ink,
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
});
