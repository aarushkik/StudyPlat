import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
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
  trackHeight,
  type TrackMode,
  type QuestTab,
} from '@/components/home';
import { colors, radius, spacing, typography } from '@/theme';
import { questionCountFor } from '@/data/questMap';
import { useQuest } from '@/state/QuestContext';
import type { QuestNode, QuestUnit } from '@/types/quest';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

/**
 * Home — the quest map.
 *
 * The trail is the product: a scrolling illustrated route through ten areas of
 * the course where every stop is a thing you can actually start, the next one
 * is unmistakable, and each area's six bosses look like something you have to
 * earn. The other three tabs hang off the same progress state.
 *
 * Ten areas of eighteen stops is ~180 nodes of SVG, so the map is a FlatList of
 * whole areas rather than a ScrollView. Every area is exactly the same height,
 * which lets `getItemLayout` hand the list all ten offsets up front — without
 * it the list can only measure as far as you have already scrolled and the map
 * dead-ends a few areas in. The area banner is a pinned overlay that re-labels
 * itself as you cross into the next landscape.
 */
export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const quest = useQuest();

  const [tab, setTab] = useState<QuestTab>('map');
  const [selected, setSelected] = useState<QuestNode | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(96);

  const units = quest.map.units;
  const completedSet = useMemo(() => new Set(quest.completed), [quest.completed]);

  /**
   * Track heights are not uniform — the one holding the current stop is taller,
   * because that stop is bigger and carries a flag above it. So offsets are
   * accumulated exactly rather than multiplied out from a single height.
   */
  /**
   * How each track draws. Everything behind you collapses to a pip strip,
   * everything ahead to a locked stub; only the track you are on and the one
   * after it lay out their stops. Ten fully-expanded tracks is ~23,000 points
   * of scrolling that buries the one stop you can actually play.
   */
  const modes = useMemo<TrackMode[]>(() => {
    const openIndex = units.findIndex((u) => u.nodes.some((n) => quest.stateOf(n.id) === 'current'));
    return units.map((u, i) => {
      if (openIndex === -1) return i === 0 ? 'open' : 'locked';
      if (i < openIndex) return 'cleared';
      if (i === openIndex) return 'open';
      if (i === openIndex + 1) return 'next';
      return 'locked';
    });
  }, [units, quest.stateOf]);

  const metrics = useMemo(() => {
    const heights = units.map((u, i) => trackHeight(u, modes[i], quest.stateOf, width));
    const offsets: number[] = [];
    let run = 0;
    for (const h of heights) {
      offsets.push(run);
      run += h;
    }
    return { heights, offsets, total: run };
  }, [units, modes, quest.stateOf, width]);

  const unitOf = useCallback(
    (node: QuestNode | null) => units.find((u) => u.nodes.some((n) => n.id === node?.id)),
    [units],
  );

  const startSelected = () => {
    if (!selected) return;
    const node = selected;
    setSelected(null);
    navigation.navigate('Quiz', {
      nodeId: node.id,
      title: node.title,
      xp: node.xp,
      count: questionCountFor(node),
    });
  };

  // Which area the viewport is sitting in. Only commits when it actually
  // changes, so scrolling doesn't re-render the map on every frame.
  const areaRef = useRef(0);
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      // Which track the viewport is in: the last one whose top has passed
      // under the pinned banner. Collapsed tracks are only ~124pt tall, so a
      // fold line further down the screen would name a track you cannot see.
      const line = y + bannerHeight + 8;
      let next = 0;
      for (let i = 0; i < metrics.offsets.length; i += 1) {
        if (metrics.offsets[i] <= line) next = i;
      }
      if (next !== areaRef.current) {
        areaRef.current = next;
        setActiveIndex(next);
      }
    },
    [metrics, bannerHeight],
  );

  const renderSegment = useCallback(
    ({ item, index }: { item: QuestUnit; index: number }) => (
      <TrailSegment
        unit={item}
        width={width}
        mode={modes[index]}
        nextPlace={units[index + 1]?.track.place}
        stateOf={quest.stateOf}
        onSelect={setSelected}
      />
    ),
    [width, quest.stateOf, modes, units],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<QuestUnit> | null | undefined, index: number) => ({
      length: metrics.heights[index] ?? 0,
      offset: metrics.offsets[index] ?? 0,
      index,
    }),
    [metrics],
  );

  const activeUnit = units[activeIndex] ?? units[0];

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <QuestHud streakDays={quest.streakDays} gems={quest.gems} xp={quest.xp} />

      {tab === 'map' ? (
        <View style={styles.mapArea}>
          <FlatList
            data={units}
            keyExtractor={(unit) => unit.id}
            renderItem={renderSegment}
            getItemLayout={getItemLayout}
            onScroll={onScroll}
            scrollEventThrottle={32}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: bannerHeight, paddingBottom: spacing.xl }}
            ListFooterComponent={TrailEnd}
            // Areas are tall and SVG-heavy, so keep few mounted.
            // removeClippedSubviews stays off: the stops are absolutely
            // positioned inside their segment and Android clips them otherwise.
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={5}
            removeClippedSubviews={false}
          />

          <View
            style={styles.bannerDock}
            pointerEvents="box-none"
            onLayout={(e) => setBannerHeight(e.nativeEvent.layout.height)}
          >
            {activeUnit ? (
              <UnitBanner
                unit={activeUnit}
                cleared={activeUnit.nodes.filter((n) => completedSet.has(n.id)).length}
              />
            ) : null}
          </View>
        </View>
      ) : null}

      {tab === 'practice' ? <TrainPanel /> : null}
      {tab === 'progress' ? <BattlesPanel onSelect={setSelected} /> : null}
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

/** Closes the trail so the last area doesn't just stop mid-scroll. */
function TrailEnd() {
  return (
    <View style={styles.end}>
      <View style={styles.endIcon}>
        <Glyph name="crown" size={28} color={colors.gold} strokeWidth={2.2} />
      </View>
      <Text style={[typography.subtitle, styles.endTitle]}>You've crossed the whole map</Text>
      <Text style={[typography.body, styles.endBody]}>
        Ten areas, sixty bosses. Go back and clear anything you walked past.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  mapArea: { flex: 1 },
  // Opaque, so the trail never shows through the strip above the banner.
  bannerDock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },

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
