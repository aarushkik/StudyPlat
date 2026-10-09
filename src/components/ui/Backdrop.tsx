import React, { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useAppTheme } from '@/theme/ThemeProvider';

/**
 * The page behind every screen: the base colour with three soft fields of
 * colour drifting through it — turquoise high on one side, orange low on the
 * other, a little violet between.
 *
 * This is what makes the glass read as glass. A translucent card over a flat
 * page is just a paler rectangle; over a page with colour moving through it,
 * the colour shows through the card and changes across it, which is the whole
 * effect. The fields are radial gradients, not blurred shapes, so there is no
 * blur to pay for on any platform, and they cost the same on a phone as on
 * the web.
 *
 * Under Reduce Transparency the theme's aurora colours are fully transparent,
 * so this draws the plain page and nothing else.
 *
 * `base` lets the night screens keep their own ground.
 *
 * Gradient ids are per instance. On the web every screen in the stack stays
 * in the document, and `url(#id)` resolves to the *first* element with that
 * id — which was the backdrop of a screen already hidden behind this one, and
 * a gradient inside a hidden subtree paints nothing. Every screen after the
 * first lost its colour.
 */
export function Backdrop({ base }: { base?: string }) {
  const { colors, glass, solid } = useAppTheme();
  const [a, b, c] = glass.aurora;
  const id = `aurora${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: base ?? colors.background }]}>
      {solid ? null : (
        <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Defs>
            <RadialGradient id={`${id}-a`} cx="88%" cy="6%" r="62%" fx="88%" fy="6%">
              <Stop offset="0" stopColor={a} />
              <Stop offset="1" stopColor={a} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`${id}-b`} cx="6%" cy="78%" r="60%" fx="6%" fy="78%">
              <Stop offset="0" stopColor={b} />
              <Stop offset="1" stopColor={b} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`${id}-c`} cx="92%" cy="58%" r="46%" fx="92%" fy="58%">
              <Stop offset="0" stopColor={c} />
              <Stop offset="1" stopColor={c} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill={`url(#${id}-a)`} />
          <Rect x="0" y="0" width="100" height="100" fill={`url(#${id}-b)`} />
          <Rect x="0" y="0" width="100" height="100" fill={`url(#${id}-c)`} />
        </Svg>
      )}
    </View>
  );
}
