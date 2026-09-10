import React, { memo } from "react";
import { Image, View, type StyleProp, type ViewStyle } from "react-native";
import { COMPANION_ART } from "@/data/characterArt";

interface Props {
  id: string;
  size?: number;
  dim?: boolean;
  tint?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/** Original generated character portraits, bundled with the app for offline use. */
export const CompanionSprite = memo(function CompanionSprite({
  id,
  size = 64,
  dim = false,
  radius,
  style,
}: Props) {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width: size,
          height: size,
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: radius ?? size * 0.2,
          backgroundColor: "#FFF8ED",
          opacity: dim ? 0.66 : 1,
        },
        style,
      ]}
    >
      <Image
        testID={`companion-art-${id}`}
        source={COMPANION_ART[id] ?? COMPANION_ART.mira}
        resizeMode="contain"
        fadeDuration={0}
        accessible={false}
        style={{ width: size, height: size }}
      />
    </View>
  );
});
