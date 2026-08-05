import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glyph } from '@/components/icons';
import { BOSS_TIERS } from '@/data/questMap';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import type { QuestNode, QuestNodeState, QuestUnit } from '@/types/quest';

interface BattlesPanelProps {
  onSelect: (node: QuestNode) => void;
}

interface BossRow {
  node: QuestNode;
  state: QuestNodeState;
  /** Stops still standing between here and this fight. */
  remaining: number;
}

interface BossSection {
  unit: QuestUnit;
  data: BossRow[];
}

/**
 * Every boss on the map in one place — six per area, sixty in all.
 *
 * Bosses are the only stops that gate the trail, so they get their own roster
 * grouped by area: what you have beaten, what's next, and what's still sealed.
 * Locked entries say exactly how far off they are rather than just greying out.
 */
export function BattlesPanel({ onSelect }: BattlesPanelProps) {
  const { map, stateOf, completed } = useQuest();

  const { sections, beaten, total } = useMemo(() => {
    const cleared = new Set(completed);
    // The map is walked in order, so "how far off" is just how many earlier
    // stops are still open.
    const position = new Map(map.order.map((id, i) => [id, i]));
    const openBefore = (nodeId: string) => {
      const index = position.get(nodeId) ?? 0;
      let count = 0;
      for (let i = 0; i < index; i += 1) if (!cleared.has(map.order[i])) count += 1;
      return count;
    };

    const built: BossSection[] = map.units.map((unit) => ({
      unit,
      data: unit.nodes
        .filter((n) => n.kind === 'boss')
        .map((node) => ({ node, state: stateOf(node.id), remaining: openBefore(node.id) })),
    }));

    const all = built.flatMap((s) => s.data);
    return {
      sections: built,
      beaten: all.filter((b) => b.state === 'complete').length,
      total: all.length,
    };
  }, [map, completed, stateOf]);

  return (
    <SectionList
      style={styles.flex}
      contentContainerStyle={styles.scroll}
      sections={sections}
      keyExtractor={(row) => row.node.id}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <View style={styles.intro}>
          <Text style={typography.title}>Boss battles</Text>
          <Text style={[typography.body, styles.introBody]}>
            Six fights guard every area. {beaten} of {total} beaten.
          </Text>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.areaHead}>
          <View style={[styles.areaDot, { backgroundColor: section.unit.track.deep }]} />
          <Text style={styles.areaTitle} numberOfLines={1}>
            {section.unit.section} · {section.unit.title}
          </Text>
        </View>
      )}
      renderItem={({ item, index }) => (
        <BossCard row={item} tier={BOSS_TIERS[index] ?? 'Boss'} onSelect={onSelect} />
      )}
    />
  );
}

function BossCard({ row, tier, onSelect }: { row: BossRow; tier: string; onSelect: (n: QuestNode) => void }) {
  const { node, state, remaining } = row;
  const locked = state === 'locked';
  const done = state === 'complete';
  const isFinal = node.tier === 6;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${node.title}, ${done ? 'beaten' : locked ? 'locked' : 'ready'}`}
      accessibilityState={{ disabled: locked }}
      disabled={locked}
      onPress={() => onSelect(node)}
      style={({ pressed }) => [styles.card, locked ? styles.cardLocked : shadows.md, pressed && styles.pressed]}
    >
      {/* Sealed bosses stay flat and pale; a live one is worth looking at. */}
      {locked ? null : (
        <LinearGradient
          colors={done ? ['#6E4A96', '#3B2258'] : isFinal ? ['#C4402E', '#5E1610'] : ['#8A5FB5', '#2F1B45']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[styles.crest, locked && styles.crestLocked]}>
        <Glyph
          name={locked ? 'lock' : done ? 'crown' : 'swords'}
          size={26}
          color={locked ? colors.textMuted : colors.gold}
          strokeWidth={2.2}
        />
      </View>

      <View style={styles.body}>
        <Text style={[styles.kicker, locked && styles.kickerLocked]}>
          {tier}
          {isFinal ? ' · area boss' : ''}
        </Text>
        <Text style={[styles.title, locked && styles.titleLocked]} numberOfLines={1}>
          {node.title}
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
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing.xl, paddingBottom: spacing.huge },
  intro: { marginBottom: spacing.lg },
  introBody: { marginTop: spacing.xs },

  areaHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  areaDot: { width: 10, height: 10, borderRadius: radius.pill },
  areaTitle: { ...typography.overline, color: colors.textSecondary, flex: 1 },

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
    width: 48,
    height: 48,
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
