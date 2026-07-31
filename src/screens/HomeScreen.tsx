import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Glyph } from '@/components/icons';
import {
  BattlesPanel,
  LessonSheet,
  ProfilePanel,
  QuestHud,
  QuestTabBar,
  TrailSegment,
  TrainPanel,
  UnitBanner,
  type QuestTab,
} from '@/components/home';
import { colors, radius, spacing, typography } from '@/theme';
import { getCourse } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import { useQuest } from '@/state/QuestContext';
import type { QuestNode } from '@/types/quest';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

/**
 * Home — the quest map.
 *
 * The trail is the product: a scrolling illustrated route through the course
 * where every stop is a thing you can actually start, the next one is
 * unmistakable, and the unit boss looks like something you have to earn. The
 * other three tabs hang off the same progress state.
 */
export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const { courseId } = useOnboarding();
  const quest = useQuest();

  const [tab, setTab] = useState<QuestTab>('map');
  const [selected, setSelected] = useState<QuestNode | null>(null);

  const course = getCourse(courseId);
  const completedSet = useMemo(() => new Set(quest.completed), [quest.completed]);

  const unitOf = useCallback(
    (node: QuestNode | null) => quest.map.units.find((u) => u.nodes.some((n) => n.id === node?.id)),
    [quest.map],
  );

  const startSelected = () => {
    if (!selected) return;
    const node = selected;
    setSelected(null);
    navigation.navigate('Quiz', { nodeId: node.id, title: node.title, xp: node.xp, count: node.kind === 'boss' ? 8 : 5 });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <QuestHud
        course={course}
        streakDays={quest.streakDays}
        gems={quest.gems}
        today={quest.todayCount}
        goal={quest.dailyGoal}
      />

      {tab === 'map' ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={quest.map.units.map((_, i) => i * 2)}
        >
          {quest.map.units.flatMap((unit, i) => [
            <UnitBanner
              key={`${unit.id}-banner`}
              unit={unit}
              cleared={unit.nodes.filter((n) => completedSet.has(n.id)).length}
              onOpenGuide={() => setSelected(unit.nodes.find((n) => n.kind === 'boss') ?? unit.nodes[0])}
            />,
            <TrailSegment
              key={unit.id}
              unit={unit}
              index={i}
              width={width}
              stateOf={quest.stateOf}
              onSelect={setSelected}
            />,
          ])}
          <TrailEnd key="end" />
        </ScrollView>
      ) : null}

      {tab === 'train' ? <TrainPanel /> : null}
      {tab === 'battles' ? <BattlesPanel onSelect={setSelected} /> : null}
      {tab === 'you' ? <ProfilePanel /> : null}

      <QuestTabBar active={tab} onChange={setTab} />

      <LessonSheet
        node={selected}
        state={selected ? quest.stateOf(selected.id) : 'locked'}
        unitTitle={unitOf(selected)?.title ?? ''}
        onStart={startSelected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

/** Closes the trail so the last unit doesn't just stop mid-scroll. */
function TrailEnd() {
  return (
    <View style={styles.end}>
      <View style={styles.endIcon}>
        <Glyph name="compass" size={28} color={colors.primary} strokeWidth={2.2} />
      </View>
      <Text style={[typography.subtitle, styles.endTitle]}>The trail ends here — for now</Text>
      <Text style={[typography.body, styles.endBody]}>
        More regions are being charted. Clear what's behind you and they'll be waiting.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: { paddingTop: spacing.md, paddingBottom: spacing.xl },

  end: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
  endIcon: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  endTitle: { textAlign: 'center' },
  endBody: { textAlign: 'center', marginTop: spacing.xs },
});
