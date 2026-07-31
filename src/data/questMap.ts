import type { AccentName } from '@/theme';
import { biomes, type BiomeId } from '@/theme/biomes';
import type { BossTier, QuestMap, QuestNode, QuestNodeKindId, QuestUnit } from '@/types/quest';
import type { CourseCategory, PlacementLevelId } from '@/types';
import { apCourses } from './apCourses';
import { BIOME_ROUTES, COURSE_UNITS, DEFAULT_ROUTE, DEFAULT_UNITS, type UnitSpec } from './courseUnits';

/**
 * Builds the quest map for a course.
 *
 * Every course is ten *areas*, and every area is six stages. A stage is always
 * the same three beats — learn it, work it, then fight for it — so a unit ends
 * up with six lessons, six support stops, and six bosses. The trail *shape* is
 * identical everywhere; only the subject topics and the landscape change, which
 * is why the map can cover eight courses without eight hand-built layouts.
 *
 * Difficulty ramps on two axes at once: across the ten areas, and again across
 * the six stages inside each one. The last boss of area 10 is the hardest thing
 * on the map by a wide margin.
 */

const STAGES_PER_UNIT = 6;

/** The support stop that sits between each lesson and its boss. */
const SUPPORT_CYCLE: QuestNodeKindId[] = ['practice', 'reading', 'practice', 'treasure', 'reading', 'practice'];

/** Boss ranks within an area. The sixth opens the next area. */
export const BOSS_TIERS = ['Sentry', 'Warden', 'Enforcer', 'Champion', 'Vanguard', 'Overlord'] as const;

/** The "study a source" stop is named for how the subject actually reads. */
const READING_BY_CATEGORY: Record<CourseCategory, { title: string; summary: string }> = {
  stem: { title: 'Data dive', summary: 'Read a figure and a short passage, then answer what they actually show.' },
  history: { title: 'Source study', summary: 'Work through a primary source and place it in its moment.' },
  english: { title: 'Close reading', summary: 'Take one passage apart line by line and name the moves in it.' },
};

const BASE_XP: Record<QuestNodeKindId, number> = { lesson: 20, practice: 25, reading: 25, treasure: 15, boss: 60 };
const BASE_MINUTES: Record<QuestNodeKindId, number> = { lesson: 5, practice: 7, reading: 8, treasure: 3, boss: 12 };

/** Rounds to the nearest 5 so reward numbers stay readable. */
const round5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);

const clampDifficulty = (n: number) => Math.min(10, Math.max(1, Math.round(n)));

/**
 * How hard a stop should feel, 1–10, from its position on the whole map.
 * Both the area index and the stage inside it push it up.
 */
function difficultyFor(unitIndex: number, stage: number, kind: QuestNodeKindId): number {
  const base = 1 + unitIndex * 0.85 + (stage - 1) * 0.3;
  return clampDifficulty(kind === 'boss' ? base + 0.8 : base);
}

/** How many questions a stop is worth. Bosses grow with their rank. */
export function questionCountFor(node: QuestNode): number {
  if (node.kind === 'boss') return 6 + (node.tier ?? 1);
  if (node.kind === 'treasure') return 4;
  if (node.kind === 'practice') return 6;
  return 5;
}

function buildStage(
  courseId: string,
  category: CourseCategory,
  biome: BiomeId,
  unitIndex: number,
  spec: UnitSpec,
  stage: number,
): QuestNode[] {
  const topic = spec.topics[stage - 1];
  const area = biomes[biome].area;
  const tier = stage as BossTier;
  const idBase = `${courseId}-u${unitIndex + 1}-s${stage}`;
  const xpScale = 1 + unitIndex * 0.12;

  const lesson: QuestNode = {
    id: `${idBase}-lesson`,
    kind: 'lesson',
    title: topic,
    // Topics lead the sentence rather than being lowercased into it — half of
    // them are proper nouns ("Song China", "DNA structure", "Hess's law").
    summary: `${topic} — learn it, then practice it right away.`,
    skills: [topic],
    xp: round5(BASE_XP.lesson * xpScale),
    minutes: BASE_MINUTES.lesson,
    stage,
    difficulty: difficultyFor(unitIndex, stage, 'lesson'),
  };

  const supportKind = SUPPORT_CYCLE[(stage - 1) % SUPPORT_CYCLE.length];
  const reading = READING_BY_CATEGORY[category];
  const support: QuestNode = {
    id: `${idBase}-${supportKind}`,
    kind: supportKind,
    title:
      supportKind === 'practice' ? 'Skill drill' : supportKind === 'reading' ? reading.title : 'Bonus cache',
    summary:
      supportKind === 'practice'
        ? `Mixed questions: ${topic}, plus everything before it in this area.`
        : supportKind === 'reading'
          ? reading.summary
          : 'A short bonus round off the main trail. Clear it for extra XP.',
    skills: supportKind === 'treasure' ? ['Bonus'] : spec.topics.slice(0, stage),
    xp: round5(BASE_XP[supportKind] * xpScale),
    minutes: BASE_MINUTES[supportKind],
    stage,
    difficulty: difficultyFor(unitIndex, stage, supportKind),
  };

  const isFinal = stage === STAGES_PER_UNIT;
  const boss: QuestNode = {
    id: `${idBase}-boss`,
    kind: 'boss',
    tier,
    title: `${BOSS_TIERS[stage - 1]} of ${area}`,
    summary: isFinal
      ? `The area boss — all of ${spec.title} at once. Beat it to open the next area.`
      : `A timed fight: ${topic}, plus everything up to it. Clear it to move deeper into ${area}.`,
    skills: spec.topics.slice(0, stage),
    xp: round5((BASE_XP.boss + tier * 10 + unitIndex * 8) * (isFinal ? 1.25 : 1)),
    minutes: BASE_MINUTES.boss + tier,
    stage,
    difficulty: difficultyFor(unitIndex, stage, 'boss'),
  };

  return [lesson, support, boss];
}

function buildUnit(
  courseId: string,
  category: CourseCategory,
  accent: AccentName,
  spec: UnitSpec,
  biome: BiomeId,
  index: number,
): QuestUnit {
  const nodes = Array.from({ length: STAGES_PER_UNIT }, (_, i) =>
    buildStage(courseId, category, biome, index, spec, i + 1),
  ).flat();

  return {
    id: `${courseId}-u${index + 1}`,
    section: `Area ${index + 1}`,
    unit: `Unit ${index + 1}`,
    title: spec.title,
    blurb: spec.blurb,
    accent,
    biome,
    areaName: biomes[biome].name,
    index,
    nodes,
  };
}

/** Build the full quest map for a course. Falls back to AP Biology. */
export function getQuestMap(courseId: string | null): QuestMap {
  const course = apCourses.find((c) => c.id === courseId) ?? apCourses[0];
  const specs = COURSE_UNITS[course.id] ?? DEFAULT_UNITS;
  const route = BIOME_ROUTES[course.id] ?? DEFAULT_ROUTE;

  const units = specs.map((spec, i) =>
    buildUnit(course.id, course.category, course.accent, spec, route[i % route.length], i),
  );

  return { courseId: course.id, units, order: units.flatMap((u) => u.nodes.map((n) => n.id)) };
}

/** Nodes in one area — used to size the placement head start. */
const NODES_PER_UNIT = STAGES_PER_UNIT * 3;

/**
 * How far into the map a placement result drops the student. Passing at a
 * higher level should visibly skip ground, so the map opens on a trail that
 * already has areas behind it rather than a few stops.
 */
const HEAD_START: Record<PlacementLevelId, number> = {
  beginner: 0,
  builder: Math.round(NODES_PER_UNIT * 0.5),
  ap_ready: NODES_PER_UNIT * 2,
  advanced_review: NODES_PER_UNIT * 4,
};

export function headStartFor(level: PlacementLevelId | null): number {
  return level ? HEAD_START[level] : 0;
}

/** Look up a node (and the area it belongs to) anywhere in a map. */
export function findNode(map: QuestMap, nodeId: string): { unit: QuestUnit; node: QuestNode } | undefined {
  for (const unit of map.units) {
    const node = unit.nodes.find((n) => n.id === nodeId);
    if (node) return { unit, node };
  }
  return undefined;
}
