import type { AccentName } from '@/theme';

/**
 * The quest map: the course laid out as a walkable trail of units.
 *
 * A unit is one region of the map; its nodes are the stops along the trail.
 * Node *kind* is purely about what the student does there (and drives the art),
 * while node *state* is derived from progress — see `deriveNodeState`.
 */

/** What happens at a stop on the trail. */
export type QuestNodeKindId = 'lesson' | 'practice' | 'reading' | 'treasure' | 'boss';

/** Where the student is relative to a node. Derived, never stored. */
export type QuestNodeState = 'locked' | 'current' | 'complete';

export interface QuestNode {
  id: string;
  kind: QuestNodeKindId;
  title: string;
  /** One line explaining what this stop covers, shown in the start sheet. */
  summary: string;
  /** Skills drilled here, shown as chips in the start sheet. */
  skills: string[];
  xp: number;
  minutes: number;
}

export interface QuestUnit {
  id: string;
  /** e.g. "Section 1". */
  section: string;
  /** e.g. "Unit 2". */
  unit: string;
  title: string;
  /** Short flavor line under the unit title on the banner. */
  blurb: string;
  accent: AccentName;
  /** Which landscape this region is drawn in. */
  biome: Biome;
  nodes: QuestNode[];
}

/** Landscapes the trail passes through, one per unit, so regions feel distinct. */
export type Biome = 'meadow' | 'forest' | 'highland' | 'summit';

export interface QuestMap {
  courseId: string;
  units: QuestUnit[];
  /** Flattened node ids in walking order — the map's spine. */
  order: string[];
}
