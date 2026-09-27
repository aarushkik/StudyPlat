import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, palette, spring } from '@/theme';
import { Glyph, type GlyphName } from '@/components/icons';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useHaptics } from '@/hooks/useHaptics';
import { GlassSurface } from '@/components/ui/GlassSurface';

export type QuestTab = 'map' | 'practice' | 'progress' | 'you';

const TABS: { id: QuestTab; label: string; glyph: GlyphName }[] = [
  { id: 'map', label: 'Path', glyph: 'map' },
  { id: 'practice', label: 'Practice', glyph: 'bolt' },
  { id: 'progress', label: 'Progress', glyph: 'chart' },
  { id: 'you', label: 'Profile', glyph: 'avatar' },
];

const ON = '#052F37';
const OFF = palette.mutedDark;
/** The active tile is a pale turquoise, not the brand fill — ink still reads. */
const TILE = '#7FE0EC';

/**
 * Bottom navigation.
 *
 * The icons are geometry, not outline glyphs: a diamond, a ring, a staircase,
 * a disc. At 22px an outline icon needs a 2px stroke to read, thinner than
 * every border in the app, and the bar stops looking like it belongs. Solid
 * shapes carry the same weight as everything else.
 *
 * The active tab takes icon *and* label into one chunky tile, so which tab you
 * are on is legible from the shape of the bar, not only from colour.
 */
export function QuestTabBar({ active, onChange }: { active: QuestTab; onChange: (t: QuestTab) => void }) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const insets = useSafeAreaInsets();
  const haptic = useHaptics();
  const { motionEnabled } = useMotionPreference();
  const [barWidth, setBarWidth] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  const step = Math.max(0, (barWidth - 10) / TABS.length);
  const target = TABS.findIndex(tab => tab.id === active) * step;
  useEffect(() => {
    if (!motionEnabled) { slide.setValue(target); return; }
    const movement = Animated.spring(slide, { toValue: target, useNativeDriver: true, damping: 24, stiffness: 250, mass: 0.8 });
    movement.start();
    return () => movement.stop();
  }, [target, slide, motionEnabled]);

  return (
    <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
    <GlassSurface style={styles.bar} onLayout={event => setBarWidth(event.nativeEvent.layout.width)}>
      {barWidth > 0 ? <Animated.View pointerEvents="none" style={[styles.activePill, { width: step - 6, transform: [{ translateX: slide }] }]} /> : null}
      {TABS.map((tab) => {
        const on = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            aria-selected={on}
            accessibilityLabel={tab.label}
            onPress={() => { if (!on) { haptic(); onChange(tab.id); } }}
            style={styles.tab}
          >
            <Tile on={on}>
              <Glyph name={tab.glyph} size={22} color={on ? colors.textOnPrimary : colors.textSecondary} strokeWidth={2.2} />
              <Text style={[styles.label, { color: on ? colors.textOnPrimary : colors.textSecondary }]}>{tab.label}</Text>
            </Tile>
          </Pressable>
        );
      })}
    </GlassSurface>
    </View>
  );
}

/**
 * The active tile lands rather than appears — it drops in and overshoots once.
 * Switching tabs is the most repeated gesture in the app, so it is worth the
 * one spring; a hard swap makes the whole bar feel like a set of radio
 * buttons.
 */
function Tile({ on, children }: { on: boolean; children: React.ReactNode }) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const { motionEnabled } = useMotionPreference();
  const pop = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    if (!motionEnabled) { pop.setValue(on ? 1 : 0); return; }
    const animation = Animated.spring(pop, { toValue: on ? 1 : 0, useNativeDriver: true, ...spring.pop });
    animation.start();
    return () => animation.stop();
  }, [on, pop, motionEnabled]);

  return (
    <Animated.View
      style={[
        styles.tile,
        // Only the *inactive* state is scaled down, so the active tile rests at
        // exactly 1 and the spring's overshoot never pushes it wider than the
        // slot it sits in.
        { transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  activePill: { position: 'absolute', left: 8, top: 7, bottom: 7, borderRadius: 23, backgroundColor: TILE, borderWidth: 1, borderColor: 'rgba(255,255,255,0.65)', boxShadow: '0 2px 6px rgba(6,54,62,0.12)' },
  dock: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 14, paddingTop: 8 },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 30,
  },
  tab: { position: 'relative', flex: 1, minWidth: 0, marginHorizontal: 3 },
  tile: {
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 3,
    minHeight: 58,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tileOn: { backgroundColor: TILE, borderColor: 'rgba(255,255,255,0.6)' },
  // The active tile's 3pt drop, behind the face.
  tileLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 3,
    bottom: -3,
    borderRadius: 19,
    backgroundColor: colors.nightRaised,
  },
  label: { fontFamily: fonts.bodyBlack, fontSize: 11, letterSpacing: 0 },

  diamond: { width: 15.6, height: 15.6, borderRadius: 4, margin: 3.2, transform: [{ rotate: '45deg' }] },
  ring: { width: 22, height: 22, borderRadius: 11, borderWidth: 4 },
  stairs: { flexDirection: 'row', alignItems: 'flex-end', height: 22 },
  disc: { width: 22, height: 22, borderRadius: 11 },
});
