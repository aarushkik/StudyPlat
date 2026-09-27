import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useMemo, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BossSprite } from "@/components/creatures/BossSprite";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { MASCOT_ART } from "@/components/Mascot";
import { ChunkyCard, PropBadge } from "@/components/ui";
import { chunky, colors, fonts, palette } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuest } from "@/state/QuestContext";
import { useOnboarding } from "@/state/OnboardingContext";
import { drillSize, countForSkills } from "@/data";
import { questionCountFor } from "@/data/questMap";
import type { PropName } from "@/data/props";
import { weakSpots, weakSpotMeta } from "@/data/weakSpots";
import type { RootStackParamList } from "@/navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

/**
 * Practice — everything off the trail.
 *
 * The point of this tab is that nothing on it can hurt you: no stop is spent,
 * no streak is at risk. So it leads with one dark recommendation card that
 * already knows what you are worst at, and only then offers the menu. A grid
 * of four equal options with no recommendation is a decision, and a decision
 * is what stops people practising.
 */

/**
 * The four modes, and the object each one carries.
 *
 * The emblems were flat colour swatches — four rounded squares that said
 * nothing and looked like art that had not arrived. They carry props now,
 * chosen for the mode: a lantern lights a quick set and a chest holds
 * missed topics. Rematches use the actual guardian portrait.
 */
const MODES: {
  name: string;
  emblem: PropName;
  tile: string;
  count: number;
  xp: number;
}[] = [
  {
    name: "Quick practice",
    emblem: "lantern",
    tile: "#FBE6C7",
    count: 8,
    xp: 40,
  },
  { name: "Mistakes", emblem: "chest", tile: "#D6F2F6", count: 6, xp: 30 },
  { name: "Boss rematch", emblem: "banner", tile: "#E8DFF7", count: 8, xp: 45 },
  {
    name: "Mixed review",
    emblem: "bookstack",
    tile: "#DEEFE1",
    count: 5,
    xp: 35,
  },
];

export function TrainPanel() {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const { xp, skills, map, earned } = useQuest();
  const { courseId } = useOnboarding();
  const navigation = useNavigation<Nav>();

  // Clamped to what the course's bank can actually serve, so a card never
  // offers more questions than the quiz behind it will run.
  const sized = (wanted: number) => drillSize(courseId, wanted);
  // Real accuracy, from what this student has actually answered.
  const weak = weakSpots(skills, courseId);

  /** Every topic with at least one wrong answer against it. */
  const missed = useMemo(
    () =>
      Object.entries(skills)
        .filter(([, s]) => s.correct < s.seen)
        .map(([tag]) => tag),
    [skills],
  );

  /** Bosses already beaten — the only ones there is anything to rematch. */
  const rematches = useMemo(() => {
    const cleared = new Set(earned);
    return map.units
      .flatMap((u) => u.nodes.filter((n) => n.kind === "boss"))
      .filter((b) => cleared.has(b.id));
  }, [map, earned]);

  /**
   * The line under each mode name.
   *
   * Two of these used to be invented counts — "38 saved", "2 available" — on a
   * screen that had never seen the student answer anything. Both are now read
   * from the run; the two that are descriptions rather than numbers stay as
   * they were, because they were never claims.
   */
  const modeMeta = (name: string): string => {
    if (name === "Mistakes") {
      if (missed.length === 0) return "Nothing missed yet";
      return `${missed.length} topic${missed.length === 1 ? "" : "s"} missed`;
    }
    if (name === "Boss rematch") {
      if (rematches.length === 0) return "Beat a boss first";
      return `${rematches.length} beaten`;
    }
    return name === "Quick practice"
      ? "A short practice set"
      : "A mix of course topics";
  };

  /**
   * Start a drill.
   *
   * No `nodeId`, which is what makes it practice: the quiz engine treats a
   * session without one as off-map, so it pays XP and holds the streak but
   * clears nothing and costs nothing if it goes badly.
   */
  const drill = (
    title: string,
    count: number,
    drillXp: number,
    focus?: string[],
  ) =>
    navigation.navigate("Quiz", {
      title,
      count: focus?.length
        ? Math.min(count, countForSkills(courseId, focus))
        : sized(count),
      xp: drillXp,
      focus,
    });

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Practice</Text>
          <Text style={styles.subtitle}>
            Off the trail. Nothing here can hurt your streak.
          </Text>
        </View>
        <Image
          source={MASCOT_ART.point}
          style={styles.headArt}
          resizeMode="contain"
        />
      </View>

      <Recommended
        xp={xp}
        count={Math.min(
          12,
          countForSkills(
            courseId,
            weak.map((w) => w.name),
          ),
        )}
        focus={weak
          .filter((w) => w.pct >= 0)
          .slice(0, 2)
          .map((w) => w.name)
          .join(" and ")}
        onStart={() =>
          drill(
            "Weak-spot drill",
            12,
            60,
            weak.map((w) => w.name),
          )
        }
      />

      <Text style={styles.section}>WEAKEST CATEGORIES</Text>
      <View style={styles.stack}>
        {weak.map((w) => (
          <ChunkyCard
            key={w.name}
            onPress={() => drill(w.name, w.count, w.count * 5, [w.name])}
            accessibilityLabel={`Drill ${w.name}, ${w.count} questions`}
            contentStyle={styles.weakCard}
          >
            <View style={styles.weakBody}>
              <Text style={styles.weakName}>{w.name}</Text>
              <Text style={styles.weakMeta}>{weakSpotMeta(w)}</Text>
              {w.pct >= 0 ? (
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${w.pct}%` }]} />
                </View>
              ) : null}
            </View>
            <Text style={styles.weakPct}>{w.pct >= 0 ? `${w.pct}%` : "—"}</Text>
          </ChunkyCard>
        ))}
      </View>

      <Text style={styles.section}>OTHER WAYS IN</Text>
      <View style={styles.grid}>
        {MODES.map((m) => {
          // A rematch needs something to rematch. Rather than run a generic
          // set under a name that promises otherwise, the card goes quiet
          // until the first boss is down.
          const off =
            (m.name === "Boss rematch" && rematches.length === 0) ||
            (m.name === "Mistakes" && missed.length === 0);
          const lastBoss = rematches[rematches.length - 1];
          const focus =
            m.name === "Mistakes" && missed.length > 0 ? missed : undefined;
          return (
            <ChunkyCard
              key={m.name}
              onPress={
                off
                  ? undefined
                  : () => {
                      if (m.name === "Boss rematch" && lastBoss) {
                        const unit = map.units.find((item) =>
                          item.nodes.some((node) => node.id === lastBoss.id),
                        );
                        navigation.navigate("Quiz", {
                          nodeId: lastBoss.id,
                          title: lastBoss.title,
                          unit: unit?.index,
                          boss: true,
                          count: questionCountFor(lastBoss),
                          xp: lastBoss.xp,
                        });
                      } else drill(m.name, m.count, m.xp, focus);
                    }
              }
              accessibilityLabel={off ? undefined : `Start ${m.name}`}
              style={styles.gridItem}
              contentStyle={[styles.modeCard, off && styles.modeCardOff]}
            >
              {m.name === "Boss rematch" ? (
                <BossSprite
                  nodeId={
                    lastBoss?.id ??
                    map.units[0]?.nodes.find((node) => node.kind === "boss")?.id
                  }
                  size={54}
                  dim={off}
                />
              ) : (
                <PropBadge name={m.emblem} tint={m.tile} size={44} dim={off} />
              )}
              <Text style={[styles.modeName, off && styles.modeDim]}>
                {m.name}
              </Text>
              <Text style={[styles.modeMeta, off && styles.modeDim]}>
                {modeMeta(m.name)}
                {off
                  ? ""
                  : ` · ${m.name === "Boss rematch" && lastBoss ? questionCountFor(lastBoss) : focus?.length ? Math.min(m.count, countForSkills(courseId, focus)) : sized(m.count)}Q`}
              </Text>
            </ChunkyCard>
          );
        })}
      </View>
    </ScrollView>
  );
}

/**
 * The one card that decides for you. Ink ground with a turquoise lip — the
 * only place in the light half of the app that inverts, so it cannot be
 * mistaken for one more option in the list.
 */
function Recommended({
  xp,
  count,
  focus,
  onStart,
}: {
  xp: number;
  count: number;
  /** The topics the drill will actually pull from, if any are known yet. */
  focus: string;
  onStart: () => void;
}) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const press = useRef(new Animated.Value(0)).current;
  const { reduceMotion } = useMotionPreference();
  const c = chunky({
    depth: 6,
    radius: 26,
    shadow: "#05707F",
    background: colors.ink,
    border: colors.ink,
  });
  const to = (v: number) => {
    if (reduceMotion) {
      press.setValue(v);
      return;
    }
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Start the weak-spot drill"
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      onPress={onStart}
      style={[c.wrap, styles.heroWrap]}
    >
      <View style={c.lip} />
      <Animated.View
        style={[
          c.face,
          styles.hero,
          {
            transform: [
              {
                translateY: press.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, c.press],
                }),
              },
            ],
          },
        ]}
      >
        {/* A turquoise wash bleeding off the top-right corner. */}
        <View style={styles.heroGlow} pointerEvents="none" />
        <Text style={styles.heroKicker}>RECOMMENDED TODAY</Text>
        <Text style={styles.heroTitle}>Weak-spot drill</Text>
        <Text style={styles.heroBody}>
          {count} questions
          {focus ? ` on ${focus}` : " across a few topics to find your focus"}.
        </Text>
        <View style={styles.heroCta}>
          <Text style={styles.heroCtaText}>START · 4 MIN</Text>
        </View>
        <Text style={styles.heroXp}>{xp} XP earned so far</Text>
      </Animated.View>
    </Pressable>
  );
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 18, paddingTop: 4, paddingBottom: 130 },

  head: { flexDirection: "row", alignItems: "flex-end", gap: 4, marginTop: 6 },
  headText: { flex: 1 },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13.5,
    color: colors.textSecondary,
    marginTop: 3,
  },
  headArt: { width: 104, height: 104, marginBottom: -8 },

  heroWrap: { marginTop: 12 },
  hero: { padding: 18, overflow: "hidden" },
  heroGlow: {
    position: "absolute",
    right: -78,
    top: -74,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(5,177,201,0.18)",
  },
  heroKicker: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.8,
    color: "#7FE0EC",
  },
  heroTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 26,
    color: colors.white,
    marginTop: 4,
  },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 19,
    color: "#A9C3C9",
    marginTop: 5,
    maxWidth: 250,
  },
  heroCta: {
    alignSelf: "flex-start",
    marginTop: 14,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  heroCtaText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    letterSpacing: 1,
    color: "#052F37",
  },
  heroXp: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11.5,
    color: "#7C9199",
    marginTop: 12,
  },

  section: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.textMuted,
    marginTop: 20,
  },
  stack: { marginTop: 9, gap: 9 },

  weakCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  weakBody: { flex: 1 },
  weakName: { fontFamily: fonts.bodyHeavy, fontSize: 15, color: colors.ink },
  weakMeta: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  barTrack: {
    marginTop: 8,
    height: 10,
    borderRadius: 7,
    backgroundColor: palette.sand,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: palette.ember },
  weakPct: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    color: palette.ember,
  },

  grid: { marginTop: 9, flexDirection: "row", flexWrap: "wrap", gap: 10 },
  // Two per row: half the 375-wide gutter box, less half the 10pt gap.
  gridItem: { width: "48%" },
  modeCard: { padding: 14 },
  modeCardOff: { backgroundColor: colors.surfaceSunken },
  modeDim: { opacity: 0.55 },
  modeName: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14.5,
    color: colors.ink,
    marginTop: 10,
  },
  modeMeta: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textMuted,
  },
});
