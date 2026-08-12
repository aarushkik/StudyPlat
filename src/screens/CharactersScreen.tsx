import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard, TopBackButton } from '@/components/ui';
import { COMPANIONS, type Companion } from '@/data/companions';
import { colors, fonts, palette } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Characters'>;

/**
 * The companion roster.
 *
 * Every locked companion names the exact condition that unlocks it, because a
 * locked slot that says nothing is just a reminder you do not have something.
 * Tapping an owned one equips it; tapping a locked one says what it wants
 * rather than doing nothing.
 *
 * Equipping is local to this screen for now — nothing downstream reads it yet,
 * and a control that visibly responds is more honest than one that silently
 * writes to state no session consults.
 */
export function CharactersScreen() {
  const navigation = useNavigation<Nav>();
  const [equipped, setEquipped] = useState(() => COMPANIONS.find((c) => c.equipped)?.id ?? 'mira');
  const [note, setNote] = useState<string | null>(null);

  const owned = useMemo(() => COMPANIONS.filter((c) => c.owned).length, []);

  const tap = (c: Companion) => {
    if (!c.owned) {
      setNote(`${c.name} unlocks at: ${c.tag.toLowerCase()}`);
      return;
    }
    setEquipped(c.id);
    setNote(`${c.name} equipped — ${c.ability.toLowerCase()}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <View style={styles.head}>
        <TopBackButton onPress={() => navigation.goBack()} color={colors.ink} />
        <View style={styles.headText}>
          <Text style={styles.title}>Characters</Text>
          <Text style={styles.subtitle}>{owned} of {COMPANIONS.length} unlocked</Text>
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
          {COMPANIONS.map((c) => {
            const isOn = c.owned && c.id === equipped;
            return (
              <ChunkyCard
                key={c.id}
                onPress={() => tap(c)}
                selected={isOn}
                accent={c.tint}
                style={styles.cell}
                contentStyle={[styles.card, !c.owned && styles.cardLocked]}
                accessibilityLabel={`${c.name}, ${c.owned ? (isOn ? 'equipped' : 'owned') : `locked, ${c.tag}`}`}
              >
                <View style={[styles.tile, { backgroundColor: c.tint }, !c.owned && styles.tileLocked]}>
                  {c.owned ? null : <View style={styles.lockBar} />}
                </View>
                <Text style={[styles.name, !c.owned && styles.dim]} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={[styles.ability, !c.owned && styles.dim]} numberOfLines={2}>
                  {c.ability}
                </Text>
                <View style={[styles.tag, isOn && styles.tagOn, !c.owned && styles.tagLocked]}>
                  <Text style={[styles.tagText, isOn && styles.tagTextOn, !c.owned && styles.tagTextLocked]} numberOfLines={1}>
                    {isOn ? 'EQUIPPED' : c.owned ? 'OWNED' : c.tag.toUpperCase()}
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

  tile: { width: 44, height: 44, borderRadius: 16, borderWidth: 3, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  tileLocked: { opacity: 0.55 },
  lockBar: { width: 18, height: 13, borderRadius: 4, backgroundColor: colors.ink, opacity: 0.5 },

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
