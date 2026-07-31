import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, duration, easing, questNode, radius, shadows, spacing, typography } from '@/theme';
import { BOSS_TIERS } from '@/data/questMap';
import type { QuestNode, QuestNodeKindId, QuestNodeState } from '@/types/quest';

interface LessonSheetProps {
  node: QuestNode | null;
  state: QuestNodeState;
  /** Which region the stop belongs to, shown as the sheet's kicker. */
  unitTitle: string;
  onStart: () => void;
  onClose: () => void;
}

/** Per-kind framing: what to call it, and what the button should promise. */
const KIND: Record<QuestNodeKindId, { label: string; glyph: GlyphName; cta: string; again: string }> = {
  lesson: { label: 'Lesson', glyph: 'book', cta: 'Start lesson', again: 'Practice again' },
  practice: { label: 'Drill', glyph: 'bolt', cta: 'Start drill', again: 'Run it again' },
  reading: { label: 'Study', glyph: 'page', cta: 'Open study', again: 'Read it again' },
  treasure: { label: 'Bonus', glyph: 'chest', cta: 'Open the cache', again: 'Open again' },
  boss: { label: 'Boss battle', glyph: 'swords', cta: 'Enter the battle', again: 'Rematch' },
};

/**
 * The sheet that opens when a stop is tapped: what you're about to do, what
 * it's worth, and one obvious button to begin. This is the last thing between
 * a student and a lesson, so it stays short — title, stakes, go.
 */
export function LessonSheet({ node, state, unitTitle, onStart, onClose }: LessonSheetProps) {
  const insets = useSafeAreaInsets();
  const rise = useRef(new Animated.Value(0)).current;
  const visible = node !== null;

  useEffect(() => {
    Animated.timing(rise, {
      toValue: visible ? 1 : 0,
      duration: visible ? duration.base : duration.fast,
      easing: visible ? easing.out : easing.in,
      useNativeDriver: true,
    }).start();
  }, [visible, rise]);

  if (!node) return null;

  const kind = KIND[node.kind];
  const scheme = questNode[node.kind];
  const cleared = state === 'complete';
  const isBoss = node.kind === 'boss';
  const isAreaBoss = isBoss && node.tier === 6;
  // Bosses are named by rank, so the sheet's kicker says which fight this is.
  const label = isBoss ? `${BOSS_TIERS[Math.min(5, Math.max(0, (node.tier ?? 1) - 1))]} battle` : kind.label;

  const translateY = rise.interpolate({ inputRange: [0, 1], outputRange: [420, 0] });

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View style={[StyleSheet.absoluteFill, styles.scrim, { opacity: rise }]}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityLabel="Dismiss" onPress={onClose} />
      </Animated.View>

      <View style={styles.dock} pointerEvents="box-none">
        <Animated.View
          style={[styles.sheet, shadows.xl, { paddingBottom: insets.bottom + spacing.lg, transform: [{ translateY }] }]}
        >
          <View style={styles.grabber} />

          <View style={styles.head}>
            <View style={[styles.crest, { backgroundColor: scheme.face, borderColor: scheme.edge }]}>
              <Glyph name={kind.glyph} size={30} color={colors.white} strokeWidth={2.4} />
            </View>
            <View style={styles.headText}>
              <Text style={styles.kicker} numberOfLines={1}>
                {unitTitle} · {label}
              </Text>
              <Text style={typography.heading} numberOfLines={2}>
                {node.title}
              </Text>
            </View>
            {cleared ? (
              <View style={styles.clearedBadge}>
                <Glyph name="check" size={14} color={colors.white} strokeWidth={3.2} />
              </View>
            ) : null}
          </View>

          <Text style={[typography.body, styles.summary]}>{node.summary}</Text>

          {isBoss ? (
            <View style={styles.bossNote}>
              <LinearGradient
                colors={isAreaBoss ? ['#8E2418', '#4A100C'] : ['#4B2C70', '#2F1B45']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Glyph name="shield" size={22} color={colors.gold} strokeWidth={2.2} />
              <Text style={styles.bossText}>
                {isAreaBoss
                  ? 'The last fight in this area. Clearing it opens the next one.'
                  : `Fight ${node.tier} of 6 in this area. Clearing it opens the next stretch of trail.`}
              </Text>
            </View>
          ) : null}

          <View style={styles.chips}>
            {node.skills.slice(0, 3).map((skill) => (
              <View key={skill} style={styles.chip}>
                <Text style={styles.chipText} numberOfLines={1}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.rewards}>
            <Reward glyph="star" color={colors.gold} value={`${node.xp} XP`} />
            <View style={styles.rewardDivider} />
            <Reward glyph="clock" color={colors.textSecondary} value={`${node.minutes} min`} />
          </View>

          <AppButton
            label={cleared ? kind.again : kind.cta}
            tone={isBoss ? 'gold' : cleared ? 'secondary' : 'primary'}
            icon={cleared ? 'refresh' : 'play'}
            emphasis={!cleared}
            onPress={onStart}
          />
          <Pressable onPress={onClose} hitSlop={8} style={styles.dismiss}>
            <Text style={styles.dismissText}>Not right now</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function Reward({ glyph, color, value }: { glyph: GlyphName; color: string; value: string }) {
  return (
    <View style={styles.reward}>
      <Glyph name={glyph} size={19} color={color} strokeWidth={2.2} />
      <Text style={styles.rewardText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { backgroundColor: 'rgba(36,27,34,0.42)' },
  dock: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xxxl,
    borderTopRightRadius: radius.xxxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  crest: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: { flex: 1 },
  kicker: { ...typography.overline, color: colors.textMuted, marginBottom: 2 },
  clearedBadge: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: { marginTop: spacing.lg },

  bossNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  bossText: { ...typography.caption, color: '#F3E7FA', flex: 1 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  chip: {
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    maxWidth: '100%',
  },
  chipText: { ...typography.caption, color: colors.textSecondary },

  rewards: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  reward: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rewardText: { ...typography.bodyStrong },
  rewardDivider: { width: 1, height: 18, backgroundColor: colors.border },

  dismiss: { alignSelf: 'center', paddingVertical: spacing.md, marginTop: spacing.xs },
  dismissText: { ...typography.bodyStrong, color: colors.textSecondary },
});
