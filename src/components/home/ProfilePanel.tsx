import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MASCOT_ART } from '@/components/Mascot';
import { ChunkyCard } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import { getCourse } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';

/**
 * Profile — who you are on the map.
 *
 * The header is a turquoise band rather than a card, so the tab reads as a
 * different place the moment it opens. Streak sits directly under it in the
 * loudest colour the palette has, because the streak is the thing a student
 * comes here to check.
 */

const COMPANIONS: { name: string; ability: string; tint: string; owned: boolean }[] = [
  { name: 'Mira', ability: 'Equipped', tint: colors.primary, owned: true },
  { name: 'Ember', ability: 'Owned', tint: palette.orange, owned: true },
  { name: 'Pilot', ability: 'Owned', tint: '#3E9E63', owned: true },
];

const ACHIEVEMENTS: { art: keyof typeof MASCOT_ART; name: string; note: string; tally: string }[] = [
  { art: 'trophy', name: 'Boss Hunter III', note: 'Beat 3 track bosses first try', tally: '3/3' },
  { art: 'sleepy', name: 'Night Owl', note: 'Ten sessions after 10pm', tally: '10/10' },
  { art: 'chest', name: 'Collector', note: 'Open every bonus cache on a track', tally: '4/6' },
];

export function ProfilePanel() {
  const { xp, streakDays, completed, map } = useQuest();
  // Levels are 500 XP apart; the quest state stores raw XP only.
  const level = Math.floor(xp / 500) + 1;
  const { courseId } = useOnboarding();
  const course = getCourse(courseId);

  const toNext = Math.max(0, level * 500 - xp);
  const levelPct = Math.min(100, Math.round(((xp % 500) / 500) * 100));

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.banner}>
        <View style={styles.bannerGlow} pointerEvents="none" />
        <View style={styles.bannerRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarLip} />
            <View style={styles.avatar}>
              <Image source={MASCOT_ART.proud} style={styles.avatarArt} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.bannerBody}>
            <Text style={styles.name}>Your quest</Text>
            <Text style={styles.meta}>
              {course?.name ?? 'Your course'} · Level {level} · {completed.length}/{map.order.length} stops
            </Text>
            <View style={styles.levelTrack}>
              <View style={[styles.levelFill, { width: `${levelPct}%` }]} />
            </View>
            <Text style={styles.levelNote}>{toNext} XP to Level {level + 1}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Pressable accessibilityRole="button" style={styles.streakWrap}>
          <View style={styles.streakLip} />
          <View style={styles.streak}>
            <Image source={MASCOT_ART.streakOn} style={styles.streakArt} resizeMode="contain" />
            <View style={styles.streakBody}>
              <Text style={styles.streakTitle}>{streakDays}-day streak</Text>
              <Text style={styles.streakNote}>Keep one stop a day to hold it</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </Pressable>

        <View style={styles.sectionRow}>
          <Text style={styles.section}>COMPANIONS</Text>
          <Text style={styles.sectionLink}>See all 16 ›</Text>
        </View>
        <View style={styles.companionRow}>
          {COMPANIONS.map((c) => (
            <ChunkyCard key={c.name} onPress={() => {}} style={styles.companion} contentStyle={styles.companionCard}>
              <View style={[styles.companionTile, { backgroundColor: c.tint }]} />
              <Text style={styles.companionName}>{c.name}</Text>
              <Text style={styles.companionMeta}>{c.ability}</Text>
            </ChunkyCard>
          ))}
        </View>

        <Text style={styles.section}>ACHIEVEMENTS</Text>
        <View style={styles.stack}>
          {ACHIEVEMENTS.map((a) => (
            <ChunkyCard key={a.name} contentStyle={styles.achieve}>
              <Image source={MASCOT_ART[a.art]} style={styles.achieveArt} resizeMode="contain" />
              <View style={styles.achieveBody}>
                <Text style={styles.achieveName}>{a.name}</Text>
                <Text style={styles.achieveNote}>{a.note}</Text>
              </View>
              <Text style={styles.achieveTally}>{a.tally}</Text>
            </ChunkyCard>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingBottom: 26 },

  banner: {
    backgroundColor: colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    overflow: 'hidden',
  },
  bannerGlow: {
    position: 'absolute',
    right: -96,
    top: -96,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarWrap: { position: 'relative', width: 82, marginBottom: 4 },
  avatarLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 4,
    height: 82,
    borderRadius: 30,
    backgroundColor: colors.ink,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 30,
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.ink,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatarArt: { width: 86, height: 86, marginBottom: -6 },
  bannerBody: { flex: 1, minWidth: 0 },
  name: { fontFamily: fonts.displayHeavy, fontSize: 25, lineHeight: 27, color: colors.white },
  meta: { fontFamily: fonts.bodyBold, fontSize: 12.5, color: '#D6F2F6', marginTop: 2 },
  levelTrack: {
    marginTop: 8,
    height: 11,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 2,
    borderColor: colors.ink,
    overflow: 'hidden',
  },
  levelFill: { height: '100%', backgroundColor: palette.orange },
  levelNote: { fontFamily: fonts.bodyBold, fontSize: 11, color: '#D6F2F6', marginTop: 4 },

  body: { paddingHorizontal: 18, paddingTop: 14 },

  streakWrap: { position: 'relative', marginBottom: 6 },
  streakLip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: -6,
    borderRadius: 24,
    backgroundColor: colors.ink,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: palette.orange,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 24,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  streakArt: { width: 96, height: 96, marginVertical: -6 },
  streakBody: { flex: 1, minWidth: 0 },
  streakTitle: { fontFamily: fonts.displayHeavy, fontSize: 22, lineHeight: 24, color: colors.ink },
  streakNote: { fontFamily: fonts.bodyBold, fontSize: 12.5, color: palette.orangeDark, marginTop: 2 },
  chevron: { fontFamily: fonts.displayHeavy, fontSize: 22, color: colors.ink },

  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  section: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.6, color: colors.textMuted, marginTop: 20 },
  sectionLink: { fontFamily: fonts.bodyHeavy, fontSize: 12, color: colors.primary, marginTop: 20 },

  companionRow: { marginTop: 9, flexDirection: 'row', gap: 9 },
  companion: { flex: 1 },
  companionCard: { padding: 11, alignItems: 'center' },
  companionTile: { width: 42, height: 42, borderRadius: 15, borderWidth: 3, borderColor: colors.ink },
  companionName: { fontFamily: fonts.bodyHeavy, fontSize: 13.5, color: colors.ink, marginTop: 8 },
  companionMeta: { fontFamily: fonts.bodySemibold, fontSize: 11, color: colors.textMuted },

  stack: { marginTop: 9, gap: 9 },
  achieve: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 6, paddingRight: 14, paddingVertical: 11 },
  achieveArt: { width: 64, height: 64 },
  achieveBody: { flex: 1, minWidth: 0 },
  achieveName: { fontFamily: fonts.bodyHeavy, fontSize: 14.5, color: colors.ink },
  achieveNote: { fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.textMuted },
  achieveTally: { fontFamily: fonts.displayHeavy, fontSize: 14, color: palette.violet },
});
