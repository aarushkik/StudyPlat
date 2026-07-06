import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';

type Tail = 'bottom' | 'left' | 'none';

interface SpeechBubbleProps {
  text?: string;
  children?: React.ReactNode;
  /** Which side the little pointer sticks out of. */
  tail?: Tail;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TAIL = 12;

/**
 * A rounded speech bubble the mascot "says". Supports a downward tail (bubble
 * above the mascot) or a left tail (mascot beside the bubble).
 */
export function SpeechBubble({ text, children, tail = 'bottom', style, textStyle }: SpeechBubbleProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.bubble, shadows.sm, style]}>
        {text ? <Text style={[typography.subtitle, styles.text, textStyle]}>{text}</Text> : children}
      </View>
      {tail === 'bottom' ? <View style={styles.tailBottom} /> : null}
      {tail === 'left' ? <View style={styles.tailLeft} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'stretch' },
  bubble: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  text: { color: colors.textPrimary },
  tailBottom: {
    position: 'absolute',
    bottom: -TAIL + 1,
    left: '50%',
    marginLeft: -TAIL,
    width: 0,
    height: 0,
    borderLeftWidth: TAIL,
    borderRightWidth: TAIL,
    borderTopWidth: TAIL,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.surface,
  },
  tailLeft: {
    position: 'absolute',
    left: -TAIL + 1,
    top: '50%',
    marginTop: -TAIL,
    width: 0,
    height: 0,
    borderTopWidth: TAIL,
    borderBottomWidth: TAIL,
    borderRightWidth: TAIL,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.surface,
  },
});
