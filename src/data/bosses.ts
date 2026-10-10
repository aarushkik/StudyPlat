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
    species: "Shore study club",
    color: "#16AFC0",
    light: "#B5F0EA",
    names: ["Scout", "Shelly", "Sandy", "Finn", "Pearl", "Coach Coral"],
    lore: "The shore study club collects good questions and checks what you remember before the next stretch of trail.",
  },
  towers: {
    kind: "towers",
    species: "Library study club",
    color: "#83A86C",
    light: "#DFEAC1",
    names: ["Ollie", "Penny", "Robin", "Winnie", "Hazel", "Professor Page"],
    lore: "These library owls collect facts, spot connections, and help every explorer leave with a clearer idea.",
  },
  chimneys: {
    kind: "chimneys",
    species: "Lab study club",
    color: "#ED8B4C",
    light: "#FFE2A8",
    names: ["Sunny", "Pip", "Rusty", "Ginger", "Ruby", "Professor Spark"],
    lore: "The lab team likes asking why. Bring your best explanations to their next experiment.",
  },
  mesa: {
    kind: "mesa",
    species: "Field study club",
    color: "#C69B65",
    light: "#FBE1AC",
    names: ["Dusty", "Daisy", "Cliff", "Olive", "Jasper", "Ranger Rose"],
    lore: "The canyon field team turns careful observations into useful clues. Check your notes before you move on.",
  },
  gears: {
    kind: "gears",
    species: "Workshop study club",
    color: "#6D9DBF",
    light: "#D9E7EE",
    names: ["Chip", "Dot", "Teddy", "Archie", "Eddie", "Coach Build"],
    lore: "The workshop team breaks big problems into small steps, then checks whether each solution works.",
  },
  islands: {
    kind: "islands",
    species: "Ocean study club",
    color: "#BB82B3",
    light: "#F4D8EE",
    names: ["Bubbles", "Coco", "Skippy", "Marina", "Nori", "Captain Notes"],
    lore: "The island team has plenty of questions and enough helping hands to work through every answer.",
  },
  ridge: {
    kind: "ridge",
    species: "Discovery study club",
    color: "#B1A085",
    light: "#F3E5C8",
    names: ["Rocky", "Poppy", "Miles", "Amber", "Mason", "Professor Stone"],
    lore: "The discovery team pieces together evidence. Every clue helps make the next answer stronger.",
  },
  reeds: {
    kind: "reeds",
    species: "Garden study club",
    color: "#73B59A",
    light: "#DFF1BD",
    names: ["Hoppy", "Lily", "Basil", "Fern", "Clover", "Coach Green"],
    lore: "The garden team grows understanding a little each day. Their checkpoints reward steady practice.",
  },
  pylons: {
    kind: "pylons",
    species: "Ideas study club",
    color: "#AE85C8",
    light: "#ECDFFC",
    names: ["Buzz", "Bea", "Ziggy", "June", "Stella", "Professor Bright"],
    lore: "The ideas team loves a clear explanation. Show how the pieces connect to light the way forward.",
  },
  peak: {
    kind: "peak",
    species: "Summit study club",
    color: "#83AFC6",
    light: "#E0F3F4",
    names: ["Snowy", "Alfie", "Aspen", "Hugo", "Everest", "Coach Summit"],
    lore: "The summit team brings everything together. Take your time, trust your practice, and finish the climb.",
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
