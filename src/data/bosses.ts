import type { SkylineKind } from "./tracks";
import { tracksFor } from "./tracks";

export interface BossFamily {
  kind: SkylineKind;
  species: string;
  color: string;
  light: string;
  names: readonly string[];
  lore: string;
}
/** Original inhabitants of StudyPlat. IDs are visual metadata; saved stop IDs stay stable. */
export const BOSS_FAMILIES: Record<SkylineKind, BossFamily> = {
  waves: {
    kind: "waves",
    species: "Tideclaw",
    color: "#16AFC0",
    light: "#B5F0EA",
    names: [
      "Pebbleclaw",
      "Captain Kelp",
      "Shellbreaker",
      "Coralkeeper",
      "Admiral Foam",
      "The Brine Baron",
    ],
    lore: "Collects sea-glass treasures and guards the shore with a pair of enormous, polished claws.",
  },
  towers: {
    kind: "towers",
    species: "Archive golem",
    color: "#83A86C",
    light: "#DFEAC1",
    names: [
      "Mossbrick",
      "Pagekeeper",
      "Vaultwatch",
      "Ivory Bastion",
      "The Archivist",
      "Citadel Sage",
    ],
    lore: "An ancient walking library. Every stone in its armor protects a story worth remembering.",
  },
  chimneys: {
    kind: "chimneys",
    species: "Furnace salamander",
    color: "#ED8B4C",
    light: "#FFE2A8",
    names: [
      "Cinderpip",
      "Coalwhisker",
      "Kilnkeeper",
      "Embermaw",
      "The Bellows",
      "Furnace Regent",
    ],
    lore: "Forges little stars in its belly and warms the foundry with a bright, stubborn flame.",
  },
  mesa: {
    kind: "mesa",
    species: "Dune scarab",
    color: "#C69B65",
    light: "#FBE1AC",
    names: [
      "Sandbutton",
      "Duneshield",
      "Amberwing",
      "Obsidian Scout",
      "The Sunwarden",
      "Scarab Sovereign",
    ],
    lore: "Carries a sunstone through the canyon. Its mosaic shell is a map of forgotten trails.",
  },
  gears: {
    kind: "gears",
    species: "Clockwork owl",
    color: "#6D9DBF",
    light: "#D9E7EE",
    names: [
      "Ticktock",
      "Rivetwing",
      "Cogwatch",
      "Copper Oracle",
      "The Timekeeper",
      "Grand Gearwing",
    ],
    lore: "A feathered inventor with a winding key. It tests every idea before adding it to its collection.",
  },
  islands: {
    kind: "islands",
    species: "Coral kraken",
    color: "#BB82B3",
    light: "#F4D8EE",
    names: [
      "Inkleaf",
      "Reefcurl",
      "Pearlgrip",
      "Atoll Oracle",
      "The Deepkeeper",
      "Coral Empress",
    ],
    lore: "Tends a floating garden with six curling arms. A pearl glows where its oldest secrets live.",
  },
  ridge: {
    kind: "ridge",
    species: "Fossil ram",
    color: "#B1A085",
    light: "#F3E5C8",
    names: [
      "Flintfoot",
      "Pebblehorn",
      "Ridgeguard",
      "Quartzbreaker",
      "The Cairnkeeper",
      "Granite Monarch",
    ],
    lore: "Its spiral horns record the passing seasons. It watches the ridge from a bed of blue crystals.",
  },
  reeds: {
    kind: "reeds",
    species: "Lotus frog",
    color: "#73B59A",
    light: "#DFF1BD",
    names: [
      "Dewdrop",
      "Reedranger",
      "Lilypad Sage",
      "Bogbloom",
      "The Raincaller",
      "Lotus Guardian",
    ],
    lore: "Keeps the wetlands in balance, sheltering small travelers beneath its wide lotus-leaf hat.",
  },
  pylons: {
    kind: "pylons",
    species: "Storm moth",
    color: "#AE85C8",
    light: "#ECDFFC",
    names: [
      "Staticwing",
      "Sparkveil",
      "Voltwatch",
      "Thunderquill",
      "The Signalkeeper",
      "Tempest Emissary",
    ],
    lore: "Reads the sky through its branching antennae. Its wings glow softly before a storm arrives.",
  },
  peak: {
    kind: "peak",
    species: "Summit dragon",
    color: "#83AFC6",
    light: "#E0F3F4",
    names: [
      "Frostbit",
      "Snowcrest",
      "Icewhisper",
      "Aurora Fang",
      "The Starwarden",
      "Summit Sovereign",
    ],
    lore: "The last guardian of the mountain. It saves a place beside the stars for every persistent explorer.",
  },
};
export function bossForNode(nodeId: string) {
  const match = nodeId.match(/^(.*)-u(\d+)-s([1-6])-boss$/);
  if (!match) return null;
  const track = tracksFor(match[1])[Number(match[2]) - 1];
  if (!track) return null;
  const tier = Number(match[3]);
  const family = BOSS_FAMILIES[track.kind];
  return {
    ...family,
    tier,
    name: family.names[tier - 1],
    place: track.place,
    key: `${track.kind}-${tier}`,
  };
}
