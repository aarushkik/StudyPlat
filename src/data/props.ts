import type { ImageSourcePropType } from 'react-native';
import type { SkylineKind } from './tracks';

/**
 * The prop sprites, by name.
 *
 * These were drawn for the map — objects standing beside the trail — but they
 * are the only full-colour art the app has besides the mascot, and the flat
 * coloured squares used as emblems everywhere else were the blandest thing in
 * the build. So the set lives here, in data, rather than inside the map layer:
 * the trail places them in a landscape, and the panels use them as emblems.
 *
 * Metro needs a static string literal in every `require`, so each sprite is
 * one line — it cannot be built from a template. Anything absent is skipped by
 * every consumer, so this stays correct whether the set is empty, partial or
 * whole.
 *
 * Every file is a 512² canvas with the object trimmed to its own bounds,
 * centred, and sat on a common baseline six points off the bottom. That is
 * what lets one `size` drive all twenty: a bench keeps its width and a
 * lighthouse its height, and both stand on the same ground line.
 *
 * Generation prompts and filenames: `docs/sprite-prompts.md`.
 */

export type PropName =
  | 'signpost'
  | 'campfire'
  | 'tent'
  | 'chest'
  | 'milestone'
  | 'lantern'
  | 'bookstack'
  | 'bench'
  | 'banner'
  | 'backpack'
  | 'lighthouse'
  | 'watertower'
  | 'forge'
  | 'desertrock'
  | 'cogpillar'
  | 'stilthut'
  | 'cabin'
  | 'duckboard'
  | 'radiopylon'
  | 'cairn';

export const PROP_ART: Partial<Record<PropName, ImageSourcePropType>> = {
  signpost: require('../assets/props/prop-signpost.png'),
  campfire: require('../assets/props/prop-campfire.png'),
  tent: require('../assets/props/prop-tent.png'),
  chest: require('../assets/props/prop-chest.png'),
  milestone: require('../assets/props/prop-milestone.png'),
  lantern: require('../assets/props/prop-lantern.png'),
  bookstack: require('../assets/props/prop-bookstack.png'),
  bench: require('../assets/props/prop-bench.png'),
  banner: require('../assets/props/prop-banner.png'),
  backpack: require('../assets/props/prop-backpack.png'),
  lighthouse: require('../assets/props/prop-lighthouse.png'),
  watertower: require('../assets/props/prop-watertower.png'),
  forge: require('../assets/props/prop-forge.png'),
  desertrock: require('../assets/props/prop-desertrock.png'),
  cogpillar: require('../assets/props/prop-cogpillar.png'),
  stilthut: require('../assets/props/prop-stilthut.png'),
  cabin: require('../assets/props/prop-cabin.png'),
  duckboard: require('../assets/props/prop-duckboard.png'),
  radiopylon: require('../assets/props/prop-radiopylon.png'),
  cairn: require('../assets/props/prop-cairn.png'),
};

/**
 * The one prop that belongs to each landscape and nowhere else.
 *
 * A lighthouse only ever stands on the coast, so it is the coast's emblem
 * anywhere the app needs one — on the track itself, and in the Progress list,
 * where a row showing the object that actually stands there is a place rather
 * than a coloured dot.
 */
export const SIGNATURE_PROP: Record<SkylineKind, PropName> = {
  waves: 'lighthouse',
  towers: 'watertower',
  chimneys: 'forge',
  mesa: 'desertrock',
  gears: 'cogpillar',
  islands: 'stilthut',
  ridge: 'cabin',
  reeds: 'duckboard',
  pylons: 'radiopylon',
  peak: 'cairn',
};
