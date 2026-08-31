import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Glyph, type GlyphName } from '@/components/icons';
import { MASCOT_ART } from '@/components/Mascot';
import { PropBadge } from '@/components/ui';
import { companionById } from '@/data/companions';
import { colors, fonts, palette } from '@/theme';

interface QuestHudProps {
  streakDays: number;
  gems: number;
  xp: number;
  /** Who is equipped, so the way in to the roster shows what is in it. */
  equippedId?: string;
  onOpenCharacters?: () => void;
}

/**
 * The status row above the map: streak, gems, XP, and the way in to your
 * characters.
 *
 * **Every chip says what it is.** It used to be three numbers behind three
 * abstract shapes — a cropped face, a rotated square and an open ring — and on
 * a new account all three read `0`. Three zeroes next to three shapes is not a
 * status bar, it is decoration, and there was nothing on the screen that
 * explained any of it. Each now carries its own unit in small caps, which is
 * the whole difference between "0" and "0 DAY".
 *
 * The units are singular or plural against the actual number, because "1 DAYS"
 * on the day a streak starts is exactly the moment the app should look like it
 * is paying attention.
 *
 * The last chip is the equipped companion rather than Stu. Equipping one had
 * no visible consequence anywhere you actually play — you chose Ember, went
 * back to the map, and nothing on screen had changed — so the companion now
 * rides in the HUD, which is both the reminder of what is active and the way
 * back to swap it.
 */
export function QuestHud({ streakDays, gems, xp, equippedId, onOpenCharacters }: QuestHudProps) {
  const insets = useSafeAreaInsets();
  const companion = companionById(equippedId ?? null);

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 2 }]}>
      <Chip
        icon="flame"
        tint={palette.ember}
        value={streakDays}
        unit={streakDays === 1 ? 'DAY' : 'DAYS'}
        label={`${streakDays} day streak`}
      />
      <Chip
        icon="gem"
        tint={colors.primary}
        value={gems}
        unit={gems === 1 ? 'GEM' : 'GEMS'}
        label={`${gems} gems`}
      />
      <Chip
        icon="star"
        tint={palette.violet}
        value={xp}
        unit="XP"
        label={`${xp} experience points`}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          companion ? `${companion.name} equipped. Open your characters.` : 'Your characters'
        }
        onPress={onOpenCharacters}
        style={({ pressed }) => [styles.avatar, pressed && styles.avatarPressed]}
      >
        {companion ? (
          <PropBadge name={companion.emblem} tint={companion.tint} size={38} radius={14} />
        ) : (
          <Image source={MASCOT_ART.neutral} style={styles.avatarArt} resizeMode="contain" />
        )}
      </Pressable>
    </View>
  );
}

function Chip({
  icon,
  tint,
  value,
  unit,
  label,
}: {
  icon: GlyphName;
  tint: string;
  value: number;
  unit: string;
  label: string;
}) {
  return (
    <View style={styles.chip} accessible accessibilityLabel={label}>
      <Glyph name={icon} size={15} color={tint} strokeWidth={2.6} />
      <Text style={styles.value}>{value.toLocaleString()}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    // The chips are small enough that a real lip would crowd them, so the
    // depth is a bottom border — same colour, same read, no extra layer.
    borderBottomWidth: 6,
  },
  value: { fontFamily: fonts.displayHeavy, fontSize: 15, color: colors.ink },
  // Small, muted and set apart from the number, so it names the number without
  // competing with it.
  unit: { fontFamily: fonts.bodyBlack, fontSize: 8.5, letterSpacing: 0.6, color: colors.textMuted },

  avatar: {
    marginLeft: 'auto',
    borderRadius: 14,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
  },
  avatarPressed: { borderBottomWidth: 0, transform: [{ translateY: 3 }] },
  avatarArt: { width: 38, height: 38, borderRadius: 14 },
});
