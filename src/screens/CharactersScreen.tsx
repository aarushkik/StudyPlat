import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard, PropBadge, TopBackButton } from '@/components/ui';
import { unlockLabel, type CompanionStatus } from '@/data/companions';
import { useQuest } from '@/state/QuestContext';
import { colors, fonts, palette } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Characters'>;

/**
 * The companion roster.
 *
 * Every locked companion names the exact condition that unlocks it, because a
 * locked slot that says nothing is just a reminder you do not have something.
 * Tapping an owned one equips it; tapping a locked one says how far along that
 * condition is rather than doing nothing.
 *
 * Both halves are real. Ownership is derived from progress, so the fifth boss
 * unlocks Marrow the moment it falls, and the equipped companion's ability is
 * read by the quiz and by `recordSession` — the ability line on a card is a
 * description of what the next session will actually do.
 */
export function CharactersScreen() {
  const navigation = useNavigation<Nav>();
  const { companions, equippedId, equip } = useQuest();
  const [note, setNote] = useState<string | null>(null);

  const owned = useMemo(() => companions.filter((c) => c.owned).length, [companions]);

  const tap = (c: CompanionStatus) => {
    if (!c.owned) {
      // The condition *and* the distance to it. "Beat 5 bosses" alone leaves a
      // student guessing whether they are one away or five.
      setNote(`${c.name} unlocks at ${c.unlock?.label.toLowerCase()} — ${c.have} of ${c.need}`);
      return;
    }
    equip(c.id);
    setNote(`${c.name} equipped — ${c.ability.toLowerCase()}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <View style={styles.head}>
        <TopBackButton onPress={() => navigation.goBack()} color={colors.ink} />
        <View style={styles.headText}>
          <Text style={styles.title}>Characters</Text>
          <Text style={styles.subtitle}>{owned} of {companions.length} unlocked</Text>
        </View>
        <Image source={MASCOT_ART.wave} style={styles.headArt} resizeMode="contain" />
      </View>

      {note ? (
        <View style={styles.note}>
          <Text style={styles.noteText} numberOfLines={2}>
            {note}
          </Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {companions.map((c) => {
            const isOn = c.owned && c.id === equippedId;
            return (
              <ChunkyCard
                key={c.id}
                onPress={() => tap(c)}
                selected={isOn}
                accent={c.tint}
                style={styles.cell}
                contentStyle={[styles.card, !c.owned && styles.cardLocked]}
                accessibilityLabel={`${c.name}, ${
                  c.owned ? (isOn ? 'equipped' : 'owned') : `locked, ${unlockLabel(c)}`
                }`}
              >
                {/* Locked companions show their emblem dimmed rather than
                    a padlock over it. The card is already sand-coloured and
                    the tag already names the condition, so a third lock
                    signal only hid the thing being withheld. */}
                <PropBadge name={c.emblem} tint={c.tint} size={44} dim={!c.owned} />
                <Text style={[styles.name, !c.owned && styles.dim]} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={[styles.ability, !c.owned && styles.dim]} numberOfLines={2}>
                  {c.ability}
                </Text>
                <View style={[styles.tag, isOn && styles.tagOn, !c.owned && styles.tagLocked]}>
                  <Text style={[styles.tagText, isOn && styles.tagTextOn, !c.owned && styles.tagTextLocked]} numberOfLines={1}>
                    {isOn ? 'EQUIPPED' : c.owned ? 'OWNED' : unlockLabel(c).toUpperCase()}
                  </Text>
                </View>
              </ChunkyCard>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  head: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 4 },
  headText: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 28, lineHeight: 30, letterSpacing: -0.5, color: colors.ink },
  subtitle: { fontFamily: fonts.bodySemibold, fontSize: 12.5, color: palette.mutedDeep, marginTop: 2 },
  headArt: { width: 74, height: 74, marginBottom: -6 },

  // Feedback for a tap lands here rather than in an alert: the roster is a
  // grid, and a dialog over it hides the thing you just chose.
  note: {
    marginHorizontal: 18,
    marginTop: 10,
    backgroundColor: colors.primaryTint,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  noteText: { fontFamily: fonts.bodyHeavy, fontSize: 13, color: palette.inkSoft },

  scroll: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: { width: '48%' },
  card: { padding: 13, minHeight: 154 },
  // Opaque, not a 4% ink tint. Every chunky card sits on a solid ink lip the
  // same size as its face, so a translucent face lets the lip through and the
  // card comes back nearly black — taking the ink-coloured name with it. This
  // is that 4% tint pre-composited over parchment.
  cardLocked: { backgroundColor: '#F1E9DB' },

  name: { fontFamily: fonts.displayHeavy, fontSize: 17, lineHeight: 19, color: colors.ink, marginTop: 9 },
  ability: { fontFamily: fonts.bodySemibold, fontSize: 11.5, lineHeight: 15, color: colors.textMuted, marginTop: 1 },
  dim: { opacity: 0.7 },

  tag: {
    alignSelf: 'flex-start',
    marginTop: 9,
    backgroundColor: colors.surfaceSunken,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagOn: { backgroundColor: colors.primary },
  tagLocked: { backgroundColor: 'transparent', borderColor: 'rgba(18,48,60,0.3)' },
  tagText: { fontFamily: fonts.bodyBlack, fontSize: 9, letterSpacing: 0.8, color: palette.inkSoft },
  tagTextOn: { color: colors.white },
  tagTextLocked: { color: colors.textMuted },
});
