import type { ImageSourcePropType } from "react-native";
import type { SkylineKind } from "./tracks";

/** Static local imports keep the whole field guide available offline. */
export const BOSS_ART: Record<SkylineKind, ImageSourcePropType> = {
  waves: require("../assets/characters/bosses/waves.jpg"),
  towers: require("../assets/characters/bosses/towers.jpg"),
  chimneys: require("../assets/characters/bosses/chimneys.jpg"),
  mesa: require("../assets/characters/bosses/mesa.jpg"),
  gears: require("../assets/characters/bosses/gears.jpg"),
  islands: require("../assets/characters/bosses/islands.jpg"),
  ridge: require("../assets/characters/bosses/ridge.jpg"),
  reeds: require("../assets/characters/bosses/reeds.jpg"),
  pylons: require("../assets/characters/bosses/pylons.jpg"),
  peak: require("../assets/characters/bosses/peak.jpg"),
};
export const COMPANION_ART: Record<string, ImageSourcePropType> = {
  mira: require("../assets/characters/companions/mira.jpg"),
  ember: require("../assets/characters/companions/ember.jpg"),
  pilot: require("../assets/characters/companions/pilot.jpg"),
  quill: require("../assets/characters/companions/quill.jpg"),
  cobalt: require("../assets/characters/companions/cobalt.jpg"),
  marrow: require("../assets/characters/companions/marrow.jpg"),
  tessel: require("../assets/characters/companions/tessel.jpg"),
  nix: require("../assets/characters/companions/nix.jpg"),
  fen: require("../assets/characters/companions/fen.jpg"),
  slate: require("../assets/characters/companions/slate.jpg"),
  vesper: require("../assets/characters/companions/vesper.jpg"),
  orrin: require("../assets/characters/companions/orrin.jpg"),
};
