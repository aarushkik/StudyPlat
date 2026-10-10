import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useAppTheme } from '@/theme/ThemeProvider';
import { CONTOURS } from '@/theme/contours';

/**
 * The page behind every screen: the ground colour with faint topographic
 * contour lines across it, like the paper of a trail map.
 *
 * It is what glass passes over. A translucent card on a flat page is only a
 * paler rectangle; with lines running underneath, the card visibly sits *on*
 * something. The lines are a texture rather than a transparency effect, so
 * they stay under Reduce Transparency too — only the surfaces above them
 * turn solid.
 *
 * Sliced rather than stretched, so the lines keep their shape on any screen.
 * `base` lets the night screens keep their own ground.
 */
export function Backdrop({ base }: { base?: string }) {
  const { colors, glass } = useAppTheme();

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: base ?? colors.background }]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${CONTOURS.width} ${CONTOURS.height}`} preserveAspectRatio="xMidYMid slice">
        <G fill="none" stroke={glass.contour} strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round">
          {CONTOURS.paths.map((d, i) => <Path key={i} d={d} />)}
        </G>
      </Svg>
    </View>
  );
}
