import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, radius, shadows, spacing, typography } from '@/theme';

export type QuestTab = 'map' | 'train' | 'battles' | 'you';

const TABS: { id: QuestTab; glyph: GlyphName; label: string }[] = [
  { id: 'map', glyph: 'map', label: 'Map' },
  { id: 'train', glyph: 'bolt', label: 'Train' },
  // A shield, not crossed swords: the swords glyph turns to mush at 23px.
  { id: 'battles', glyph: 'shield', label: 'Battles' },
  { id: 'you', glyph: 'avatar', label: 'You' },
];

interface QuestTabBarProps {
  active: QuestTab;
  onChange: (tab: QuestTab) => void;
}

/** Bottom navigation for the logged-in app. */
export function QuestTabBar({ active, onChange }: QuestTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, shadows.lg, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {TABS.map((tab) => {
        const on = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
            onPress={() => onChange(tab.id)}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            <View style={[styles.pill, on && styles.pillOn]}>
              <Glyph
                name={tab.glyph}
                size={23}
                color={on ? colors.primary : colors.textMuted}
                strokeWidth={on ? 2.4 : 2}
              />
            </View>
            <Text style={[styles.label, on && styles.labelOn]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  pressed: { opacity: 0.6 },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  pillOn: { backgroundColor: colors.primaryTint },
  label: { ...typography.label, fontSize: 11, color: colors.textMuted },
  labelOn: { color: colors.primary },
});
