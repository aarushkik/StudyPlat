import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, palette } from '@/theme';

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
            <View style={[styles.tile, on && styles.tileOn]}>
              <TabIcon id={tab.id} on={on} />
              <Text style={[styles.label, { color: on ? ON : OFF }]}>{tab.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function TabIcon({ id, on }: { id: QuestTab; on: boolean }) {
  const c = on ? ON : OFF;

  if (id === 'map') {
    // A sharp diamond. A 22pt bounding box means a 15.6pt square turned 45°.
    return <View style={[styles.diamond, { backgroundColor: c }]} />;
  }
  if (id === 'practice') {
    return <View style={[styles.ring, { borderColor: c }]} />;
  }
  if (id === 'progress') {
    // Three steps climbing, drawn flush so they read as one staircase.
    return (
      <View style={styles.stairs}>
        <View style={{ width: 7, height: 8, backgroundColor: c }} />
        <View style={{ width: 8, height: 15, backgroundColor: c }} />
        <View style={{ width: 9, height: 22, backgroundColor: c }} />
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
    borderRadius: 15,
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
    borderRadius: 15,
    backgroundColor: colors.ink,
  },
  label: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 0.6 },

  diamond: { width: 15.6, height: 15.6, margin: 3.2, transform: [{ rotate: '45deg' }] },
  ring: { width: 22, height: 22, borderRadius: 11, borderWidth: 4 },
  stairs: { flexDirection: 'row', alignItems: 'flex-end', height: 22 },
  disc: { width: 22, height: 22, borderRadius: 11 },
});
