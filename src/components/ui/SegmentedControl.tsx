import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import { fonts } from '@/theme';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useHaptics } from '@/hooks/useHaptics';

interface SegmentedControlProps<T extends string> {
  items: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}

const HEIGHT = 48;
const INSET = 4;

/**
 * A glass capsule of options with a lens that slides to the chosen one —
 * the same lens as the tab bar, so choosing between two views feels like the
 * same gesture as choosing between tabs.
 *
 * Replaces pairs of separate bordered boxes, one filled solid ink when
 * chosen. Two boxes read as two buttons; one capsule with a lens reads as one
 * control with a position, which is what it is.
 */
export function SegmentedControl<T extends string>({ items, value, onChange }: SegmentedControlProps<T>) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const haptic = useHaptics();
  const { motionEnabled } = useMotionPreference();
  const [width, setWidth] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  const segment = width > 0 ? (width - INSET * 2) / items.length : 0;
  const target = Math.max(0, items.findIndex((item) => item.id === value)) * segment;

  useEffect(() => {
    if (!motionEnabled) { slide.setValue(target); return; }
    const movement = Animated.spring(slide, { toValue: target, useNativeDriver: true, damping: 22, stiffness: 260, mass: 0.8 });
    movement.start();
    return () => movement.stop();
  }, [target, slide, motionEnabled]);

  return (
    <View style={styles.bar} accessibilityRole="tablist" onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {segment > 0 ? (
        <Animated.View pointerEvents="none" style={[styles.lens, { width: segment, transform: [{ translateX: slide }] }]} />
      ) : null}
      {items.map((item) => {
        const on = item.id === value;
        return (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            aria-selected={on}
            onPress={() => { if (!on) { haptic(); onChange(item.id); } }}
            style={({ pressed }) => [styles.item, pressed && !on && styles.pressed]}
          >
            <Text style={[styles.label, { color: on ? colors.primaryDeep : colors.textSecondary }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = ({ card, glass }: AppTheme) => StyleSheet.create({
  bar: {
    ...card,
    flexDirection: 'row',
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    padding: INSET - 1,
  },
  lens: {
    position: 'absolute',
    top: INSET - 1,
    bottom: INSET - 1,
    left: INSET - 1,
    borderRadius: (HEIGHT - INSET * 2) / 2,
    borderCurve: 'continuous',
    backgroundColor: glass.lens,
    borderWidth: 1,
    borderColor: glass.lensRim,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: (HEIGHT - INSET * 2) / 2 },
  pressed: { opacity: 0.6 },
  label: { fontFamily: fonts.displayBold, fontSize: 16 },
});
