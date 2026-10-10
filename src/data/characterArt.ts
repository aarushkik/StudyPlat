import type { ImageSourcePropType } from "react-native";
import type { SkylineKind } from "./tracks";

/** Static local imports keep the whole field guide available offline. */
export const BOSS_ART: Record<SkylineKind, ImageSourcePropType> = {
  waves: require("../assets/characters/bosses/waves.png"),
  towers: require("../assets/characters/bosses/towers.png"),
  chimneys: require("../assets/characters/bosses/chimneys.png"),
  mesa: require("../assets/characters/bosses/mesa.png"),
  gears: require("../assets/characters/bosses/gears.png"),
  islands: require("../assets/characters/bosses/islands.png"),
  ridge: require("../assets/characters/bosses/ridge.png"),
  reeds: require("../assets/characters/bosses/reeds.png"),
  pylons: require("../assets/characters/bosses/pylons.png"),
  peak: require("../assets/characters/bosses/peak.png"),
};
export const COMPANION_ART: Record<string, ImageSourcePropType> = {
  mira: require("../assets/characters/companions/mira.png"),
  ember: require("../assets/characters/companions/ember.png"),
  pilot: require("../assets/characters/companions/pilot.png"),
  quill: require("../assets/characters/companions/quill.png"),
  cobalt: require("../assets/characters/companions/cobalt.png"),
  marrow: require("../assets/characters/companions/marrow.png"),
  tessel: require("../assets/characters/companions/tessel.png"),
  nix: require("../assets/characters/companions/nix.png"),
  fen: require("../assets/characters/companions/fen.png"),
  slate: require("../assets/characters/companions/slate.png"),
  vesper: require("../assets/characters/companions/vesper.png"),
  orrin: require("../assets/characters/companions/orrin.png"),
};
