import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MASCOT_ART } from '@/components/Mascot';
import { colors, fonts, palette } from '@/theme';

interface QuestHudProps {
  streakDays: number;
  gems: number;
  xp: number;
  onOpenCharacters?: () => void;
}

/**
 * The status row above the map: streak, gems, XP, and Stu as the way in to
 * your characters.
 *
 * Three chunky chips rather than bare glyphs and numbers. Each carries the
 * same 3px ink border and hard lip as everything else, so the HUD reads as
 * part of the same physical set of objects as the buttons and cards rather
 * than as a floating toolbar.
 *
 * The streak chip uses the streak-on artwork itself, cropped to Stu's face —
 * a flame icon would say the same thing with less character, and this is the
 * first thing a student sees each day.
 */
export function QuestHud({ streakDays, gems, xp, onOpenCharacters }: QuestHudProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 2 }]}>
      <Chip>
        <Image source={MASCOT_ART.streakOn} style={styles.streakArt} resizeMode="cover" />
        <Text style={styles.value}>{streakDays}</Text>
      </Chip>

      <Chip>
        <View style={styles.gem} />
        <Text style={styles.value}>{gems}</Text>
      </Chip>

      <Chip>
        <View style={styles.ring} />
        <Text style={styles.value}>{xp.toLocaleString()}</Text>
      </Chip>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Your characters"
        onPress={onOpenCharacters}
        style={({ pressed }) => [styles.avatar, pressed && styles.avatarPressed]}
      >
        <Image source={MASCOT_ART.neutral} style={styles.avatarArt} resizeMode="contain" />
      </Pressable>
    </View>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <View style={styles.chip}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 16,
    paddingHorizontal: 9,
    paddingVertical: 4,
    // The chips are small enough that a real lip would crowd them, so the
    // depth is a bottom border — same colour, same read, no extra layer.
    borderBottomWidth: 6,
  },
  value: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.ink },

  streakArt: { width: 26, height: 26, borderRadius: 9 },
  gem: {
    width: 15,
    height: 15,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  ring: { width: 15, height: 15, borderRadius: 8, borderWidth: 4, borderColor: palette.violet },

  avatar: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    borderRadius: 17,
    backgroundColor: palette.turquoiseSky,
    borderWidth: 3,
    borderColor: colors.ink,
    borderBottomWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPressed: { borderBottomWidth: 3, transform: [{ translateY: 3 }] },
  avatarArt: { width: 40, height: 40, marginTop: 8 },
});
