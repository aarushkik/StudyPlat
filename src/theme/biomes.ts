/**
 * Biome themes — the look of one area of the quest map.
 *
 * Every unit in a course is an *area*, and every area is drawn in its own
 * biome. To keep sixteen landscapes from turning into sixteen bespoke
 * illustrations, each biome is the same recipe with a different palette: a sky
 * gradient, three hill bands, a trail material, and three decoration shapes
 * picked from one shared set (see `Scenery`). Swap the palette and the same
 * drawing code produces a desert instead of a meadow.
 *
 * `ramp` is roughly how harsh the place feels, 1–10. Courses order their areas
 * by it so scrolling the map reads as a climb into rougher country.
 */

export type BiomeId =
  | 'meadow'
  | 'coast'
  | 'forest'
  | 'wetland'
  | 'savanna'
  | 'jungle'
  | 'reef'
  | 'desert'
  | 'canyon'
  | 'highland'
  | 'caverns'
  | 'tundra'
  | 'glacier'
  | 'storm'
  | 'volcano'
  | 'summit';

/** Decoration shapes available to a biome. Drawn in `Scenery`. */
export type DecorKind =
  | 'roundTree'
  | 'pine'
  | 'snowPine'
  | 'palm'
  | 'shrub'
  | 'bloom'
  | 'mushroom'
  | 'reed'
  | 'kelp'
  | 'coral'
  | 'cactus'
  | 'dune'
  | 'rock'
  | 'boulder'
  | 'crystal'
  | 'iceSpire'
  | 'emberRock'
  | 'obelisk';

/** Small ground clutter scattered thickly along the verges. */
export type GroundKind =
  | 'grass'
  | 'flower'
  | 'pebble'
  | 'shell'
  | 'moss'
  | 'crack'
  | 'bone'
  | 'iceChip'
  | 'emberBit'
  | 'reedTuft';

/**
 * The one landmark that belongs to this biome and nowhere else. Every area
 * gets exactly one, large and off to the side, so an area is recognisable at a
 * glance instead of reading as recoloured hills.
 */
export type LandmarkKind =
  | 'windmill'
  | 'lighthouse'
  | 'cabin'
  | 'stiltHut'
  | 'acacia'
  | 'ruin'
  | 'wreck'
  | 'pyramid'
  | 'rockArch'
  | 'watchtower'
  | 'crystalCluster'
  | 'cairn'
  | 'iceArch'
  | 'standingStones'
  | 'volcanoCone'
  | 'summitFlag';

/** What drifts through the air in this biome. Drawn in `AreaAmbience`. */
export type AmbienceKind =
  | 'petal'
  | 'leaf'
  | 'firefly'
  | 'bubble'
  | 'sand'
  | 'snow'
  | 'ember'
  | 'rain'
  | 'pollen'
  | 'sparkle';

export interface BiomeTheme {
  /** Display name of the landscape, e.g. "Sunlit Meadow". */
  name: string;
  /** How the area is referred to in boss titles, e.g. "the Meadow". */
  area: string;
  /** Vertical sky gradient, top to bottom. */
  sky: readonly [string, string];
  /** Three land bands, far to near. */
  hills: readonly [string, string, string];
  /** The road surface and its darker lip. */
  trail: { face: string; edge: string };
  /** Canopy light + deep, for anything growing. */
  flora: readonly [string, string];
  trunk: string;
  /** Stone light + deep, for anything mineral. */
  stone: readonly [string, string];
  /** The one saturated note: blooms, crystals, embers. */
  accent: string;
  /** Unit banner gradient. */
  banner: readonly [string, string];
  /** The area gate posts — light and deep. */
  gate: readonly [string, string];
  /** Three decoration shapes this biome is built from. */
  decor: readonly [DecorKind, DecorKind, DecorKind];
  /** Two kinds of small clutter scattered along the verges. */
  ground: readonly [GroundKind, GroundKind];
  /** The single large feature unique to this biome. */
  landmark: LandmarkKind;
  /** What drifts through the air here, and how much of it. */
  ambience: { kind: AmbienceKind; color: string; count: number };
  /** Harshness, 1–10. Courses sequence their areas by this. */
  ramp: number;
}

export const biomes: Record<BiomeId, BiomeTheme> = {
  meadow: {
    name: 'Sunlit Meadow',
    area: 'the Meadow',
    sky: ['#FFF8EC', '#F4F8E2'],
    hills: ['#E2EFCC', '#CFE7B2', '#BADD95'],
    trail: { face: '#F7E9D2', edge: '#DFC8A2' },
    flora: ['#8FCB6E', '#5FA349'],
    trunk: '#B98457',
    stone: ['#D8CFD6', '#B3A7B2'],
    accent: '#FF9EC4',
    banner: ['#8FC94F', '#57972A'],
    gate: ['#C9A87A', '#9A7648'],
    decor: ['roundTree', 'bloom', 'shrub'],
    ground: ['grass', 'flower'],
    landmark: 'windmill',
    ambience: { kind: 'petal', color: '#FFB8D4', count: 12 },
    ramp: 1,
  },
  coast: {
    name: 'Shell Coast',
    area: 'the Coast',
    sky: ['#F2FBFF', '#E4F4FB'],
    hills: ['#D9EEF6', '#F2E4C4', '#E8D4A8'],
    trail: { face: '#FBEFD6', edge: '#E2CCA4' },
    flora: ['#7FC79A', '#4E9B6E'],
    trunk: '#C08F5C',
    stone: ['#DAD2CC', '#B5AAA2'],
    accent: '#4FC3E8',
    banner: ['#43B7D8', '#1A7FA3'],
    gate: ['#D6C7A6', '#A99372'],
    decor: ['palm', 'dune', 'rock'],
    ground: ['shell', 'pebble'],
    landmark: 'lighthouse',
    ambience: { kind: 'sparkle', color: '#FFFFFF', count: 10 },
    ramp: 2,
  },
  forest: {
    name: 'Deepwood',
    area: 'the Deepwood',
    sky: ['#EEF6E4', '#E0EFD2'],
    hills: ['#CFE3B8', '#B4D398', '#96C078'],
    trail: { face: '#EFDCC0', edge: '#D2B891' },
    flora: ['#6FB558', '#3F7F38'],
    trunk: '#8E6440',
    stone: ['#CFC8C4', '#A79E9A'],
    accent: '#E4736B',
    banner: ['#4E9C42', '#2C6A2C'],
    gate: ['#A2764A', '#74512F'],
    decor: ['pine', 'roundTree', 'mushroom'],
    ground: ['grass', 'moss'],
    landmark: 'cabin',
    ambience: { kind: 'leaf', color: '#7FBF62', count: 12 },
    ramp: 3,
  },
  wetland: {
    name: 'Mistmarsh',
    area: 'the Mistmarsh',
    sky: ['#EDF5F0', '#DFEDE4'],
    hills: ['#C9DDCE', '#AECBB6', '#93B79C'],
    trail: { face: '#DCCDA8', edge: '#BBAA83' },
    flora: ['#7FB582', '#4C8058'],
    trunk: '#7C6446',
    stone: ['#C4C4BC', '#9C9C93'],
    accent: '#9BD46A',
    banner: ['#4E9070', '#2C6350'],
    gate: ['#8E7B54', '#645436'],
    decor: ['reed', 'shrub', 'mushroom'],
    ground: ['reedTuft', 'moss'],
    landmark: 'stiltHut',
    ambience: { kind: 'firefly', color: '#C8F06E', count: 11 },
    ramp: 4,
  },
  savanna: {
    name: 'Amber Savanna',
    area: 'the Savanna',
    sky: ['#FFF6E0', '#FBEBC8'],
    hills: ['#F0DDA8', '#E4C983', '#D4B265'],
    trail: { face: '#F5E2BC', edge: '#D8BE8E'  },
    flora: ['#A8C05A', '#7A9038'],
    trunk: '#A87A4A',
    stone: ['#D6C6A8', '#AE9C7E'],
    accent: '#F2913C',
    banner: ['#DFA63A', '#A87215'],
    gate: ['#C2A06A', '#907240'],
    decor: ['palm', 'shrub', 'boulder'],
    ground: ['grass', 'pebble'],
    landmark: 'acacia',
    ambience: { kind: 'pollen', color: '#FFD98A', count: 12 },
    ramp: 4,
  },
  jungle: {
    name: 'Verdant Canopy',
    area: 'the Canopy',
    sky: ['#E9F7E6', '#D8EFD4'],
    hills: ['#B9DFB0', '#96CE90', '#6FB86F'],
    trail: { face: '#E4D2AE', edge: '#C2AD84' },
    flora: ['#4FBF6A', '#238545'],
    trunk: '#7E5A38',
    stone: ['#C2C6BA', '#989E92'],
    accent: '#FF7BA8',
    banner: ['#2FA95E', '#137038'],
    gate: ['#8C6A40', '#5F4726'],
    decor: ['palm', 'roundTree', 'bloom'],
    ground: ['moss', 'flower'],
    landmark: 'ruin',
    ambience: { kind: 'leaf', color: '#4FBF6A', count: 13 },
    ramp: 5,
  },
  reef: {
    name: 'Coral Shallows',
    area: 'the Shallows',
    sky: ['#E4F7FB', '#CFEFF7'],
    hills: ['#AEE2EF', '#8DD4E6', '#69C2DA'],
    trail: { face: '#F3E6C8', edge: '#D4C29C' },
    flora: ['#59C9B4', '#2A9587'],
    trunk: '#9A8C6E',
    stone: ['#C8D6DA', '#9EAFB4'],
    accent: '#FF8FA8',
    banner: ['#2CB6C4', '#0E7C90'],
    gate: ['#C4B48E', '#948462'],
    decor: ['coral', 'kelp', 'rock'],
    ground: ['shell', 'pebble'],
    landmark: 'wreck',
    ambience: { kind: 'bubble', color: '#FFFFFF', count: 14 },
    ramp: 5,
  },
  desert: {
    name: 'Ochre Dunes',
    area: 'the Dunes',
    sky: ['#FFF3DE', '#FCE4BE'],
    hills: ['#F3DCB0', '#E8C68A', '#D9AE66'],
    trail: { face: '#F7E6C4', edge: '#D9C096' },
    flora: ['#8FB05E', '#66853C'],
    trunk: '#A47A4C',
    stone: ['#DCC4A2', '#B49A78'],
    accent: '#F27A3C',
    banner: ['#E2963A', '#AC6417'],
    gate: ['#CBA97A', '#9A7A4E'],
    decor: ['cactus', 'dune', 'rock'],
    ground: ['crack', 'bone'],
    landmark: 'pyramid',
    ambience: { kind: 'sand', color: '#E8C68A', count: 13 },
    ramp: 6,
  },
  canyon: {
    name: 'Rust Canyon',
    area: 'the Canyon',
    sky: ['#FFEFE2', '#FBDCC8'],
    hills: ['#E8BE9E', '#D69C78', '#BE7A56'],
    trail: { face: '#EFD6B2', edge: '#CDB088' },
    flora: ['#8AA452', '#617A34'],
    trunk: '#8E5E38',
    stone: ['#C98E68', '#9E6642'],
    accent: '#E85A3C',
    banner: ['#C86A3C', '#8E4020'],
    gate: ['#B07850', '#7E502E'],
    decor: ['obelisk', 'cactus', 'boulder'],
    ground: ['crack', 'pebble'],
    landmark: 'rockArch',
    ambience: { kind: 'sand', color: '#D69C78', count: 12 },
    ramp: 6,
  },
  highland: {
    name: 'Windswept Moor',
    area: 'the Moor',
    sky: ['#F4EEF8', '#E8E0F0'],
    hills: ['#D8CCE6', '#C2B2D6', '#A896C2'],
    trail: { face: '#E6DAC4', edge: '#C6B69C' },
    flora: ['#7FA46E', '#547048'],
    trunk: '#7C6250',
    stone: ['#C4B8CC', '#9C8EA8'],
    accent: '#B87ADC',
    banner: ['#8A6ABE', '#583E8C'],
    gate: ['#9C8AAE', '#6E5E80'],
    decor: ['pine', 'boulder', 'shrub'],
    ground: ['grass', 'pebble'],
    landmark: 'watchtower',
    ambience: { kind: 'pollen', color: '#D8C4EE', count: 11 },
    ramp: 7,
  },
  caverns: {
    name: 'Glimmer Caverns',
    area: 'the Caverns',
    sky: ['#332748', '#241B36'],
    hills: ['#3E3057', '#332648', '#281D3A'],
    trail: { face: '#5E4C7A', edge: '#3E3054' },
    flora: ['#6E8ACC', '#465EA0'],
    trunk: '#4E3E62',
    stone: ['#584870', '#3C2E52'],
    accent: '#7ADCE8',
    banner: ['#6A4EA8', '#3A2470'],
    gate: ['#6E5A90', '#453660'],
    decor: ['crystal', 'rock', 'mushroom'],
    ground: ['pebble', 'moss'],
    landmark: 'crystalCluster',
    ambience: { kind: 'firefly', color: '#7ADCE8', count: 14 },
    ramp: 8,
  },
  tundra: {
    name: 'Pale Tundra',
    area: 'the Tundra',
    sky: ['#F2F6FA', '#E4ECF4'],
    hills: ['#D8E4EE', '#C4D4E2', '#AEC2D4'],
    trail: { face: '#E8E2D6', edge: '#C8C0B2' },
    flora: ['#7E9E86', '#567058'],
    trunk: '#6E6258',
    stone: ['#C8CED6', '#A0A8B2'],
    accent: '#6EB8D8',
    banner: ['#6E96B8', '#3E6688'],
    gate: ['#A8B2BE', '#78848E'],
    decor: ['snowPine', 'rock', 'shrub'],
    ground: ['iceChip', 'pebble'],
    landmark: 'cairn',
    ambience: { kind: 'snow', color: '#FFFFFF', count: 13 },
    ramp: 8,
  },
  glacier: {
    name: 'Blue Glacier',
    area: 'the Glacier',
    sky: ['#EAF6FC', '#D6EDF8'],
    hills: ['#C2E2F2', '#A4D2EA', '#82BEDE'],
    trail: { face: '#E4EEF4', edge: '#BCCED8' },
    flora: ['#8ABCC4', '#5A8E98'],
    trunk: '#6E7C84',
    stone: ['#BAD6E6', '#8EAEC4'],
    accent: '#4EC8F0',
    banner: ['#40A4D8', '#1C6E9E'],
    gate: ['#A8CEE2', '#749CB4'],
    decor: ['iceSpire', 'snowPine', 'rock'],
    ground: ['iceChip', 'pebble'],
    landmark: 'iceArch',
    ambience: { kind: 'snow', color: '#FFFFFF', count: 15 },
    ramp: 9,
  },
  storm: {
    name: 'Thunder Reach',
    area: 'the Reach',
    sky: ['#3E4462', '#2C3048'],
    hills: ['#454C6E', '#383E5C', '#2C3149'],
    trail: { face: '#5E5A70', edge: '#3E3C4E' },
    flora: ['#4E7A6E', '#325248'],
    trunk: '#453E4A',
    stone: ['#4E5470', '#363C52'],
    accent: '#FFD24E',
    banner: ['#4A5280', '#252A48'],
    gate: ['#5A6084', '#383C58'],
    decor: ['pine', 'obelisk', 'boulder'],
    ground: ['grass', 'pebble'],
    landmark: 'standingStones',
    ambience: { kind: 'rain', color: '#AEC0E8', count: 16 },
    ramp: 9,
  },
  volcano: {
    name: 'Ember Wastes',
    area: 'the Wastes',
    sky: ['#4A2A2E', '#331C22'],
    hills: ['#4E2C30', '#3E2226', '#2E181C'],
    trail: { face: '#6A4038', edge: '#452622' },
    flora: ['#7A5A3A', '#4E3822'],
    trunk: '#452C22',
    stone: ['#5A3A38', '#3A2222'],
    accent: '#FF7A2E',
    banner: ['#C4442C', '#7A1E14'],
    gate: ['#6E4438', '#442622'],
    decor: ['emberRock', 'obelisk', 'rock'],
    ground: ['emberBit', 'crack'],
    landmark: 'volcanoCone',
    ambience: { kind: 'ember', color: '#FF8A3C', count: 14 },
    ramp: 10,
  },
  summit: {
    name: 'Crown Summit',
    area: 'the Summit',
    sky: ['#F0F2FC', '#E2E8F8'],
    hills: ['#D8DEF2', '#C4CCE8', '#AEB8DC'],
    trail: { face: '#EEEAE2', edge: '#CCC6BA' },
    flora: ['#8A9EB4', '#5E7288'],
    trunk: '#6E6870',
    stone: ['#C6CCE0', '#9CA4BE'],
    // Pale ice, not the crown gold — the summit's spires are frozen, and gold
    // here reads as shards of glass rather than ice.
    accent: '#C2D8F4',
    banner: ['#7E86C8', '#4A5290'],
    gate: ['#B4BAD6', '#8288A8'],
    decor: ['snowPine', 'iceSpire', 'rock'],
    ground: ['iceChip', 'pebble'],
    landmark: 'summitFlag',
    ambience: { kind: 'snow', color: '#FFFFFF', count: 14 },
    ramp: 10,
  },
};

/** Biomes whose sky is dark, so labels and trail dust need to flip to light. */
export const DARK_BIOMES: ReadonlySet<BiomeId> = new Set<BiomeId>(['caverns', 'storm', 'volcano']);

export function isDarkBiome(id: BiomeId): boolean {
  return DARK_BIOMES.has(id);
}
