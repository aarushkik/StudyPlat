import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glyph } from '@/components/icons';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import type { QuestNode } from '@/types/quest';

interface BattlesPanelProps {
  onSelect: (node: QuestNode) => void;
}

/**
 * Every unit boss in one place.
 *
 * Bosses are the only stops that gate the map, so they get their own roster:
 * what you have beaten, what's next, and what's still sealed. Locked entries
 * say what stands between you and them rather than just greying out.
 */
export function BattlesPanel({ onSelect }: BattlesPanelProps) {
  const { map, stateOf, completed } = useQuest();
  const cleared = new Set(completed);

  const bosses = map.units.map((unit) => {
    const node = unit.nodes.find((n) => n.kind === 'boss')!;
    const remaining = unit.nodes.filter((n) => n.kind !== 'boss' && !cleared.has(n.id)).length;
    return { unit, node, state: stateOf(node.id), remaining };
  });

  const beaten = bosses.filter((b) => b.state === 'complete').length;

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={typography.title}>Boss battles</Text>
      <Text style={[typography.body, styles.intro]}>
        One timed exam guards each region. {beaten} of {bosses.length} beaten.
      </Text>

      {bosses.map(({ unit, node, state, remaining }) => {
        const locked = state === 'locked';
        const done = state === 'complete';
        return (
          <Pressable
            key={node.id}
            accessibilityRole="button"
            accessibilityState={{ disabled: locked }}
            disabled={locked}
            onPress={() => onSelect(node)}
            style={({ pressed }) => [
              styles.card,
              locked ? styles.cardLocked : shadows.md,
              pressed && styles.pressed,
            ]}
          >
            {/* Sealed bosses stay flat and pale; a live one is worth looking at. */}
            {locked ? null : (
              <LinearGradient
                colors={done ? ['#6E4A96', '#3B2258'] : ['#8A5FB5', '#2F1B45']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            )}
            <View style={[styles.crest, locked && styles.crestLocked]}>
              <Glyph
                name={locked ? 'lock' : done ? 'crown' : 'swords'}
                size={30}
                color={locked ? colors.textMuted : colors.gold}
                strokeWidth={2.2}
              />
            </View>

            <View style={styles.body}>
              <Text style={[styles.kicker, locked && styles.kickerLocked]}>{unit.unit}</Text>
              <Text style={[styles.title, locked && styles.titleLocked]} numberOfLines={1}>
                {unit.title}
              </Text>
              <Text style={[styles.status, locked && styles.statusLocked]}>
                {done
                  ? 'Beaten — rematch any time'
                  : locked
                    ? `${remaining} stop${remaining === 1 ? '' : 's'} left to unlock`
                    : `Ready · ${node.minutes} min · ${node.xp} XP`}
              </Text>
            </View>

            {!locked ? <Glyph name="chevron-right" size={20} color="rgba(255,255,255,0.8)" strokeWidth={2.4} /> : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing.xl, paddingBottom: spacing.huge },
  intro: { marginTop: spacing.xs, marginBottom: spacing.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardLocked: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  pressed: { transform: [{ scale: 0.985 }], opacity: 0.92 },
  crest: {
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crestLocked: { backgroundColor: colors.surfaceSunken },
  body: { flex: 1, gap: 1 },
  kicker: { ...typography.overline, color: 'rgba(255,255,255,0.7)' },
  kickerLocked: { color: colors.textMuted },
  title: { ...typography.subtitle, color: colors.white },
  titleLocked: { color: colors.textSecondary },
  status: { ...typography.caption, color: 'rgba(255,255,255,0.82)', marginTop: 2 },
  statusLocked: { color: colors.textMuted },
});
