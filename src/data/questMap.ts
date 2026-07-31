import type { AccentName } from '@/theme';
import type { Biome, QuestMap, QuestNode, QuestNodeKindId, QuestUnit } from '@/types/quest';
import type { CourseCategory, PlacementLevelId } from '@/types';
import { apCourses } from './apCourses';

/**
 * The quest map for each AP course.
 *
 * Every course contributes three regions, each with four lesson topics. The
 * trail *shape* — where practice, a source study, a bonus cache, and the unit
 * boss fall — is identical everywhere, so it lives in one pattern below rather
 * than being retyped 24 times. Only the subject-specific titles are data.
 *
 * All content is original study scaffolding, not real exam material.
 */

interface UnitSpec {
  title: string;
  blurb: string;
  /** Four lesson topics, in teaching order. */
  lessons: string[];
}

const UNITS: Record<string, [UnitSpec, UnitSpec, UnitSpec]> = {
  'ap-biology': [
    {
      title: 'Cells & Energy',
      blurb: 'Where every living thing starts.',
      lessons: ['Cell structure basics', 'Membranes and transport', 'Enzymes at work', 'Photosynthesis and respiration'],
    },
    {
      title: 'Genetics & Heredity',
      blurb: 'How traits get handed down.',
      lessons: ['DNA and replication', 'Transcription and translation', 'Mendelian crosses', 'Gene regulation'],
    },
    {
      title: 'Evolution & Ecology',
      blurb: 'Life at the scale of populations.',
      lessons: ['Natural selection', 'Speciation', 'Population dynamics', 'Energy in ecosystems'],
    },
  ],
  'ap-calc-ab': [
    {
      title: 'Limits & Continuity',
      blurb: 'The idea the whole course rests on.',
      lessons: ['Limits from graphs', 'Algebraic limits', 'One-sided limits', 'Continuity and the IVT'],
    },
    {
      title: 'Derivatives',
      blurb: 'Measuring change, precisely.',
      lessons: ['Defining the derivative', 'Power and product rules', 'The chain rule', 'Implicit differentiation'],
    },
    {
      title: 'Integrals & Applications',
      blurb: 'Adding up infinitely many pieces.',
      lessons: ['Riemann sums', 'The fundamental theorem', 'U-substitution', 'Area between curves'],
    },
  ],
  'ap-world': [
    {
      title: 'The Global Tapestry',
      blurb: 'States and beliefs, 1200 to 1450.',
      lessons: ['Empires of Afro-Eurasia', 'Belief systems', 'State building in Africa', 'The Americas before 1500'],
    },
    {
      title: 'Networks of Exchange',
      blurb: 'The routes that rewired the world.',
      lessons: ['The Silk Roads', 'Indian Ocean trade', 'Trans-Saharan routes', 'Consequences of connection'],
    },
    {
      title: 'Land & Sea Empires',
      blurb: 'Gunpowder, ships, new hierarchies.',
      lessons: ['Gunpowder empires', 'Maritime exploration', 'The Columbian Exchange', 'Coerced labor systems'],
    },
  ],
  'ap-us-history': [
    {
      title: 'Colonies to Revolution',
      blurb: 'How thirteen colonies became a cause.',
      lessons: ['Contact and colonization', 'Colonial societies', 'The imperial crisis', 'Revolution and its limits'],
    },
    {
      title: 'A New Republic',
      blurb: 'Building — and straining — a nation.',
      lessons: ['Constitution and compromise', 'The market revolution', 'Reform movements', 'Sectional conflict'],
    },
    {
      title: 'Civil War & Reconstruction',
      blurb: 'Union, emancipation, unfinished work.',
      lessons: ['Secession', 'Turning points of the war', 'Emancipation', 'Reconstruction and retreat'],
    },
  ],
  'ap-csa': [
    {
      title: 'Java Foundations',
      blurb: 'Types, logic, and your first programs.',
      lessons: ['Primitive types', 'Expressions and operators', 'Conditionals', 'Iteration and loops'],
    },
    {
      title: 'Objects & Classes',
      blurb: 'Learning to think in objects.',
      lessons: ['Writing a class', 'Constructors and this', 'Inheritance', 'Polymorphism'],
    },
    {
      title: 'Data & Algorithms',
      blurb: 'Storing things, then finding them again.',
      lessons: ['Arrays', 'ArrayList', 'Two-dimensional arrays', 'Searching and sorting'],
    },
  ],
  'ap-chem': [
    {
      title: 'Atoms & Bonding',
      blurb: 'What matter is actually made of.',
      lessons: ['Atomic structure', 'Periodic trends', 'Ionic and covalent bonds', 'Molecular geometry'],
    },
    {
      title: 'Reactions & Stoichiometry',
      blurb: 'Counting atoms you can never see.',
      lessons: ['The mole', 'Balancing equations', 'Limiting reactants', 'Solution stoichiometry'],
    },
    {
      title: 'Equilibrium & Energy',
      blurb: 'Which way a reaction goes, and why.',
      lessons: ['Reaction rates', 'Equilibrium constants', 'Acids and bases', 'Enthalpy and entropy'],
    },
  ],
  'ap-psych': [
    {
      title: 'Brain & Behavior',
      blurb: 'The biology under every thought.',
      lessons: ['Neurons and signals', 'Brain structures', 'Sensation', 'Perception'],
    },
    {
      title: 'Learning & Cognition',
      blurb: 'How minds take in and hold on.',
      lessons: ['Classical conditioning', 'Operant conditioning', 'Memory systems', 'Thinking and bias'],
    },
    {
      title: 'Development & Disorders',
      blurb: 'People across a whole lifetime.',
      lessons: ['Developmental stages', 'Personality theories', 'Psychological disorders', 'Treatment approaches'],
    },
  ],
  'ap-eng-lang': [
    {
      title: 'Reading Rhetoric',
      blurb: 'Seeing the moves a writer makes.',
      lessons: ['The rhetorical situation', 'Audience and purpose', 'Rhetorical appeals', 'Tone and diction'],
    },
    {
      title: 'Building Arguments',
      blurb: 'Claims that actually hold weight.',
      lessons: ['Claims and thesis', 'Choosing evidence', 'Commentary and reasoning', 'Handling counterargument'],
    },
    {
      title: 'Synthesis & Style',
      blurb: 'Many sources, one clear voice.',
      lessons: ['Reading a source set', 'Synthesizing positions', 'Sentence style', 'Revision moves'],
    },
  ],
};

/** The trail shape every unit follows. `lesson` entries consume the next topic. */
const PATTERN: QuestNodeKindId[] = ['lesson', 'lesson', 'practice', 'lesson', 'reading', 'lesson', 'treasure', 'boss'];

const BIOMES: Biome[] = ['meadow', 'forest', 'highland', 'summit'];

/** The "study a source" stop is named for how the subject actually reads. */
const READING_BY_CATEGORY: Record<CourseCategory, { title: string; summary: string }> = {
  stem: { title: 'Data dive', summary: 'Read a figure and a short passage, then answer what they actually show.' },
  history: { title: 'Source study', summary: 'Work through a primary source and place it in its moment.' },
  english: { title: 'Close reading', summary: 'Take one passage apart line by line and name the moves in it.' },
};

const XP: Record<QuestNodeKindId, number> = { lesson: 20, practice: 25, reading: 25, treasure: 15, boss: 60 };
const MINUTES: Record<QuestNodeKindId, number> = { lesson: 5, practice: 7, reading: 8, treasure: 3, boss: 12 };

function buildUnit(courseId: string, category: CourseCategory, accent: AccentName, spec: UnitSpec, index: number): QuestUnit {
  let lessonCursor = 0;
  const reading = READING_BY_CATEGORY[category];

  const nodes: QuestNode[] = PATTERN.map((kind, i) => {
    const id = `${courseId}-u${index + 1}-n${i + 1}`;
    const base = { id, kind, xp: XP[kind], minutes: MINUTES[kind] };

    if (kind === 'lesson') {
      const topic = spec.lessons[lessonCursor++];
      return { ...base, title: topic, summary: `Learn ${topic.toLowerCase()} and practice it right away.`, skills: [topic] };
    }
    if (kind === 'practice') {
      return {
        ...base,
        title: 'Skill drill',
        summary: 'Mixed questions from everything you have unlocked in this region.',
        skills: spec.lessons.slice(0, lessonCursor),
      };
    }
    if (kind === 'reading') {
      return { ...base, title: reading.title, summary: reading.summary, skills: [spec.title] };
    }
    if (kind === 'treasure') {
      return {
        ...base,
        title: 'Bonus cache',
        summary: 'A short bonus round off the main trail. Clear it for extra XP.',
        skills: ['Bonus'],
      };
    }
    return {
      ...base,
      title: `${spec.title} boss`,
      summary: 'A timed unit exam. Beat it to open the next region of the map.',
      skills: spec.lessons,
    };
  });

  return {
    id: `${courseId}-u${index + 1}`,
    section: 'Section 1',
    unit: `Unit ${index + 1}`,
    title: spec.title,
    blurb: spec.blurb,
    accent,
    biome: BIOMES[index % BIOMES.length],
    nodes,
  };
}

/** Build the full quest map for a course. Falls back to AP Biology. */
export function getQuestMap(courseId: string | null): QuestMap {
  const course = apCourses.find((c) => c.id === courseId) ?? apCourses[0];
  const specs = UNITS[course.id] ?? UNITS['ap-biology'];
  const units = specs.map((spec, i) => buildUnit(course.id, course.category, course.accent, spec, i));
  return { courseId: course.id, units, order: units.flatMap((u) => u.nodes.map((n) => n.id)) };
}

/**
 * How far into the map a placement result drops the student. Passing the quiz
 * at a higher level should visibly skip ground, so the map opens on a trail
 * that already has history behind it.
 */
const HEAD_START: Record<PlacementLevelId, number> = {
  beginner: 0,
  builder: 3,
  ap_ready: 9,
  advanced_review: 15,
};

export function headStartFor(level: PlacementLevelId | null): number {
  return level ? HEAD_START[level] : 0;
}

/** Look up a node (and the unit it belongs to) anywhere in a map. */
export function findNode(map: QuestMap, nodeId: string): { unit: QuestUnit; node: QuestNode } | undefined {
  for (const unit of map.units) {
    const node = unit.nodes.find((n) => n.id === nodeId);
    if (node) return { unit, node };
  }
  return undefined;
}
