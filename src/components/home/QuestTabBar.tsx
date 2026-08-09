import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, palette, spring } from '@/theme';

export type QuestTab = 'map' | 'practice' | 'progress' | 'you';

const TABS: { id: QuestTab; label: string }[] = [
  { id: 'map', label: 'PATH' },
  { id: 'practice', label: 'PRACTICE' },
  { id: 'progress', label: 'PROGRESS' },
  { id: 'you', label: 'PROFILE' },
];

const ON = '#052F37';
const OFF = palette.mutedLight;
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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 18) }]}>
      {TABS.map((tab) => {
        const on = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
            onPress={() => onChange(tab.id)}
            style={styles.tab}
          >
            {on ? <View style={styles.tileLip} /> : null}
            <Tile on={on}>
              <TabIcon id={tab.id} on={on} />
              <Text style={[styles.label, { color: on ? ON : OFF }]}>{tab.label}</Text>
            </Tile>
          </Pressable>
        );
      })}
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
  const pop = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(pop, { toValue: on ? 1 : 0, useNativeDriver: true, ...spring.pop }).start();
  }, [on, pop]);

  return (
    <Animated.View
      style={[
        styles.tile,
        on && styles.tileOn,
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

function TabIcon({ id, on }: { id: QuestTab; on: boolean }) {
  const c = on ? ON : OFF;

  if (id === 'map') {
    // A 22pt bounding box means a 15.6pt square turned 45°. Its corners are
    // softened — a knife-edge diamond is the one hostile shape in the bar.
    return <View style={[styles.diamond, { backgroundColor: c }]} />;
  }
  if (id === 'practice') {
    return <View style={[styles.ring, { borderColor: c }]} />;
  }
  if (id === 'progress') {
    // Three steps climbing, drawn flush so they read as one staircase.
    return (
      <View style={styles.stairs}>
        <View style={{ width: 7, height: 8, backgroundColor: c, borderTopLeftRadius: 3, borderTopRightRadius: 3 }} />
        <View style={{ width: 8, height: 15, backgroundColor: c, borderTopRightRadius: 3 }} />
        <View style={{ width: 9, height: 22, backgroundColor: c, borderTopRightRadius: 3 }} />
      </View>
    );
  }
  return <View style={[styles.disc, { backgroundColor: c }]} />;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopWidth: 3,
    borderTopColor: colors.ink,
    paddingTop: 9,
    paddingHorizontal: 10,
  },
  tab: { position: 'relative' },
  tile: {
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  tileOn: { backgroundColor: TILE, borderColor: colors.ink },
  // The active tile's 3pt drop, behind the face.
  tileLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 3,
    bottom: -3,
    borderRadius: 19,
    backgroundColor: colors.ink,
  },
  label: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 0.6 },

  diamond: { width: 15.6, height: 15.6, borderRadius: 4, margin: 3.2, transform: [{ rotate: '45deg' }] },
  ring: { width: 22, height: 22, borderRadius: 11, borderWidth: 4 },
  stairs: { flexDirection: 'row', alignItems: 'flex-end', height: 22 },
  disc: { width: 22, height: 22, borderRadius: 11 },
});
