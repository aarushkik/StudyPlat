import React, { useState, useRef, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useQuest } from "@/state/QuestContext";
import { bossForNode } from "@/data/bosses";
import { BossSprite } from "./BossSprite";
import { colors, fonts } from "@/theme";

export function BossFieldGuide() {
  const { fontScale, width } = useWindowDimensions();
  const { map, earned, stateOf } = useQuest();
  const [area, setArea] = useState(0);
  const areaStrip = useRef<ScrollView>(null);
  useEffect(() => {
    areaStrip.current?.scrollTo({
      x: Math.max(0, area * 52 - (Math.min(width, 620) - 36) / 2 + 22),
      animated: false,
    });
  }, [area, width]);
  const unit = map.units[area] ?? map.units[0];
  const bosses = unit.nodes.filter((n) => n.kind === "boss");
  const family = bossForNode(bosses[0].id)!;
  return (
    <View style={styles.root}>
      <Text style={styles.intro}>
        Every place has its guardians. Meet all six before you reach the gate.
      </Text>
      <ScrollView
        ref={areaStrip}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.areas}
      >
        {map.units.map((u, index) => (
          <Pressable
            key={u.id}
            accessibilityRole="button"
            accessibilityLabel={`Show bosses in ${u.areaName}`}
            accessibilityState={{ selected: area === index }}
            onPress={() => setArea(index)}
            style={[styles.area, area === index && styles.activeArea]}
          >
            <Text
              style={[styles.areaText, area === index && styles.activeText]}
            >
              {index + 1}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={[styles.chapter, { backgroundColor: unit.track.sky }]}>
        <View style={styles.chapterCopy}>
          <Text style={styles.eyebrow}>FIELD GUIDE · AREA {area + 1}</Text>
          <Text style={styles.title}>{unit.areaName}</Text>
          <Text style={styles.lore}>{family.lore}</Text>
        </View>
        <BossSprite nodeId={bosses[5].id} size={120} />
      </View>
      <View style={styles.grid}>
        {bosses.map((node) => {
          const defeated = earned.includes(node.id);
          const ready = stateOf(node.id) === "current";
          return (
            <View
              key={node.id}
              style={[
                styles.card,
                fontScale > 1.3 && { flexBasis: "100%" },
                defeated && { borderColor: colors.success },
              ]}
              accessible
              accessibilityLabel={`${node.title}. Rank ${node.tier}. ${defeated ? "Defeated" : ready ? "Ready on your path" : "Ahead on your path"}`}
            >
              <View style={styles.rank}>
                <Text style={styles.rankText}>
                  {node.tier === 6 ? "AREA GUARDIAN" : `RANK ${node.tier}`}
                </Text>
              </View>
              <BossSprite nodeId={node.id} size={112} />
              <Text style={styles.name}>{node.title}</Text>
              <Text style={styles.status}>
                {defeated
                  ? "✓ Defeated"
                  : ready
                    ? "Ready on your path"
                    : "Ahead on your path"}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.foot}>
        Meet each guardian on the Path tab. Finish its question set with at
        least 60% correct to move forward.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { gap: 16 },
  intro: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  areas: { gap: 8, paddingVertical: 3 },
  area: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.ink,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  activeArea: { backgroundColor: colors.ink },
  areaText: { fontFamily: fonts.displayBold, fontSize: 18, color: colors.ink },
  activeText: { color: colors.surface },
  chapter: {
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  chapterCopy: { flex: 1, minWidth: 165 },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 25,
    lineHeight: 29,
    color: colors.ink,
    marginVertical: 5,
  },
  lore: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    flexGrow: 1,
    flexBasis: "45%",
    minWidth: 128,
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.ink,
    borderRadius: 23,
    backgroundColor: colors.surface,
  },
  rank: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#F2E8D2",
  },
  rankText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 0.7,
    color: colors.ink,
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 17,
    lineHeight: 21,
    textAlign: "center",
    color: colors.ink,
  },
  status: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
  },
  foot: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    padding: 8,
  },
});
