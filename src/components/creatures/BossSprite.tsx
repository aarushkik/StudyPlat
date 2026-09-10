import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { bossForNode } from "@/data/bosses";
import { BOSS_ART } from "@/data/characterArt";
import frames from "@/data/characterFrames.json";
import type { SkylineKind } from "@/data/tracks";

interface Props {
  nodeId?: string;
  kind?: SkylineKind;
  tier?: number;
  size?: number;
  dim?: boolean;
}

/** Each guardian is a separate painted illustration in its family's local atlas. */
export const BossSprite = memo(function BossSprite({
  nodeId,
  kind = "waves",
  tier = 1,
  size = 140,
  dim = false,
}: Props) {
  const boss = nodeId ? bossForNode(nodeId) : null;
  const family = boss?.kind ?? kind;
  const rank = Math.max(1, Math.min(6, Math.trunc(boss?.tier ?? tier) || 1));
  const atlas = frames[family];
  const frame = atlas.frames[rank - 1];
  const scale = size / frame.size;
  return (
    <View
      testID={`boss-art-${family}-${rank}`}
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.window,
        {
          width: size,
          height: size,
          borderRadius: size * 0.18,
          opacity: dim ? 0.68 : 1,
        },
      ]}
    >
      <Image
        source={BOSS_ART[family]}
        resizeMode="stretch"
        fadeDuration={0}
        accessible={false}
        style={{
          position: "absolute",
          width: atlas.width * scale,
          height: atlas.height * scale,
          left: -frame.x * scale,
          top: -frame.y * scale,
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  window: { overflow: "hidden", flexShrink: 0, backgroundColor: "#FFF8ED" },
});
