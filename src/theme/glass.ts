/**
 * Liquid Glass tokens.
 *
 * Glass is for the layer that floats *over* content — the HUD, the tab bar,
 * the track banner, the floating button, sheets and dialogs — never for the
 * content itself. Cards on the map stay chunky and opaque; glass is how the
 * controls above them get out of the way.
 *
 * On iOS 26 the system draws the real material and none of this is used
 * except `thickNative`. Everywhere else (the web, older iOS) the material is
 * built from four layers, each with a token here:
 *
 * 1. A backdrop blur with boosted saturation, so colour from the map bleeds
 *    through instead of going grey.
 * 2. A translucent `tint` in the page's own hue — cream in light, deep teal in
 *    dark — strong enough to keep text legible over a busy map.
 * 3. A `sheen`: light pooling along the top, fading out by the middle.
 * 4. A `rim`: a one-point edge that is brightest on top and nearly gone at the
 *    bottom, the specular highlight that makes the surface read as a solid
 *    object rather than a blurred rectangle.
 *
 * `regular` is for bars and controls; `thick` for sheets and dialogs that
 * carry sentences, where legibility beats see-through.
 */
export interface GlassTokens {
  tint: string;
  thick: string;
  /** Laid over the native material on sheets, which carry reading text. */
  thickNative: string;
  blur: number;
  blurThick: number;
  sheen: string;
  rim: { top: string; side: string; bottom: string };
  /** The selected item's lens inside a glass bar. */
  lens: string;
  lensRim: string;
  /**
   * The page fading out under the status bar, top to bottom. Three stops of
   * one colour rather than a colour and `transparent`: native gradients do
   * not premultiply, so fading to `transparent` (transparent *black*) puts a
   * grey band through the middle.
   */
  edgeFade: [string, string, string];
  /** Where the sheen fades to: the same white at zero, for the same reason. */
  sheenClear: string;
  scrim: string;
  shadow: string;
}

export const lightGlass: GlassTokens = {
  tint: 'rgba(255,253,247,0.58)',
  thick: 'rgba(255,253,247,0.86)',
  thickNative: 'rgba(255,253,247,0.45)',
  blur: 18,
  blurThick: 28,
  sheen: 'rgba(255,255,255,0.55)',
  rim: { top: 'rgba(255,255,255,0.95)', side: 'rgba(255,255,255,0.5)', bottom: 'rgba(18,48,60,0.10)' },
  lens: 'rgba(5,177,201,0.14)',
  lensRim: 'rgba(255,255,255,0.75)',
  edgeFade: ['rgba(245,246,240,0.94)', 'rgba(245,246,240,0.6)', 'rgba(245,246,240,0)'],
  sheenClear: 'rgba(255,255,255,0)',
  scrim: 'rgba(10,28,36,0.30)',
  shadow: '0 10px 30px rgba(18,48,60,0.12), 0 1px 3px rgba(18,48,60,0.08)',
};

export const darkGlass: GlassTokens = {
  tint: 'rgba(17,38,48,0.55)',
  thick: 'rgba(17,38,48,0.86)',
  thickNative: 'rgba(17,38,48,0.4)',
  blur: 20,
  blurThick: 30,
  sheen: 'rgba(255,255,255,0.09)',
  rim: { top: 'rgba(255,255,255,0.30)', side: 'rgba(255,255,255,0.10)', bottom: 'rgba(255,255,255,0.04)' },
  lens: 'rgba(124,224,235,0.2)',
  lensRim: 'rgba(255,255,255,0.16)',
  edgeFade: ['rgba(10,25,34,0.94)', 'rgba(10,25,34,0.6)', 'rgba(10,25,34,0)'],
  sheenClear: 'rgba(255,255,255,0)',
  scrim: 'rgba(0,0,0,0.48)',
  shadow: '0 12px 34px rgba(0,0,0,0.40), 0 1px 3px rgba(0,0,0,0.25)',
};

/** `#RRGGBB` → `rgba(r,g,b,a)`. Glass tints need a colour with an alpha. */
export function withAlpha(hex: string, alpha: number): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return hex;
  const n = parseInt(match[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
