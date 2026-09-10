import { BossSprite } from '@/components/creatures/BossSprite';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '@/components/Mascot';
import { Glyph } from '@/components/icons';
import { colors, fonts, palette } from '@/theme';
import type { QuestNode } from '@/types/quest';

/** A student's next step stays within one tap, even after a placement head start. */
export function NextQuestCard({
  node,
  course,
  todayCount,
  dailyGoal,
  onContinue,
  active,
}: {
  node: QuestNode | null;
  course: string;
  todayCount: number;
  dailyGoal: number;
  onContinue: () => void;
  active: boolean;
}) {
  const goalMet = todayCount >= dailyGoal;

  return (
    <View style={styles.wrap}>
      <View style={styles.headingRow}>
        <View style={styles.headingBody}>
          <Text style={styles.eyebrow}>{course}</Text>
          <Text style={styles.heading}>A little further, every day.</Text>
        </View>
        <View style={styles.compass} aria-hidden>
          <Glyph name="compass" size={26} color={colors.ink} strokeWidth={2.2} />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={node ? `Continue quest: ${node.title}, about ${node.minutes} minutes` : 'Explore practice after completing your path'}
        onPress={onContinue}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <View style={styles.orbit} pointerEvents="none" />
        <View style={styles.cardBody}>
          <Text style={styles.kicker}>{node?.kind === 'boss' ? 'A GUARDIAN AWAITS' : node ? 'YOUR NEXT QUEST' : 'EVERY TRACK EXPLORED'}</Text>
          <Text style={styles.title}>{node?.title ?? 'Keep your knowledge growing'}</Text>
          <Text style={styles.meta}>
            {node ? `About ${node.minutes} min · up to ${node.xp} base XP` : 'Revisit a topic or try a practice set.'}
          </Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{node ? 'Continue quest' : 'Open practice'}</Text>
            <Glyph name="arrow-right" size={17} color={colors.ink} strokeWidth={2.8} />
          </View>
        </View>
        <View style={styles.mascot} pointerEvents="none" aria-hidden>
          {node?.kind === 'boss' ? <BossSprite nodeId={node.id} size={130}/> : <Mascot pose={node?.kind === 'drill' ? 'reading' : node ? 'map' : 'trophy'} size={122} animated={active} shadow={false} />}
        </View>
      </Pressable>

      <View style={styles.goal} accessible accessibilityLabel={`${todayCount} of ${dailyGoal} daily sessions completed${goalMet ? '. Daily goal reached.' : ''}`}>
        <Glyph name={goalMet ? 'check' : 'flame'} size={16} color={goalMet ? colors.successDeep : palette.ember} strokeWidth={3} />
        <Text style={styles.goalText}>{goalMet ? 'Daily goal reached' : 'Today’s small win'}</Text>
        <Text style={styles.goalCount}>{todayCount}/{dailyGoal} sessions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 20 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  headingBody: { flex: 1 },
  eyebrow: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.4, color: colors.textSecondary, textTransform: 'uppercase' },
  heading: { fontFamily: fonts.displayHeavy, fontSize: 25, lineHeight: 29, color: colors.ink, marginTop: 3, maxWidth: 280 },
  compass: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-12deg' }] },
  card: { backgroundColor: colors.ink, borderRadius: 25, borderWidth: 3, borderBottomWidth: 7, borderColor: colors.ink, padding: 17, overflow: 'hidden', minHeight: 178 },
  pressed: { opacity: 0.94 },
  orbit: { position: 'absolute', width: 186, height: 186, borderRadius: 93, borderWidth: 1, borderColor: '#34616A', right: -60, top: 13 },
  cardBody: { paddingRight: 90 },
  kicker: { fontFamily: fonts.bodyBlack, fontSize: 9.5, letterSpacing: 1.4, color: palette.turquoiseLight },
  title: { fontFamily: fonts.displayHeavy, fontSize: 22, lineHeight: 25, color: colors.surface, marginTop: 6 },
  meta: { fontFamily: fonts.bodySemibold, fontSize: 11.5, lineHeight: 17, color: '#BDD5D8', marginTop: 6 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start', backgroundColor: palette.turquoiseLight, borderRadius: 11, paddingVertical: 10, paddingHorizontal: 12, marginTop: 13 },
  ctaText: { fontFamily: fonts.bodyHeavy, fontSize: 12, color: colors.ink },
  mascot: { position: 'absolute', right: -2, bottom: 12 },
  goal: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingTop: 15 },
  goalText: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 12, color: colors.ink },
  goalCount: { fontFamily: fonts.bodySemibold, fontSize: 11, color: colors.textSecondary },
});
