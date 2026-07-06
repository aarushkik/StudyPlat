import type {
  PlacementLevel,
  PlacementQuestion,
  PlacementQuiz,
  QuestionDifficulty,
  Stimulus,
} from '@/types';

/**
 * Original placeholder placement questions for the "Find Your Level" quiz.
 *
 * NOT real exam content — all questions are simple, original stand-ins written
 * to exercise the quiz engine (every difficulty + question type). Each subject
 * has its own intro and ~8 questions spanning its key skills. Add or refine per
 * subject freely; the engine just reads whatever this file exports.
 */

const CHOICE_IDS = ['a', 'b', 'c', 'd', 'e'];

/** Per-subject question builders that auto-number ids and set the courseId. */
function subject(courseId: string) {
  let n = 0;
  const mc = (
    difficulty: QuestionDifficulty,
    skillTag: string,
    prompt: string,
    choices: string[],
    correctIndex: number,
    explanation: string,
    stimulus?: Stimulus,
  ): PlacementQuestion => {
    n += 1;
    return {
      id: `${courseId}-q${n}`,
      courseId,
      difficulty,
      type: stimulus ? 'stimulus' : 'multiple_choice',
      prompt,
      stimulus,
      choices: choices.map((text, i) => ({ id: CHOICE_IDS[i], text })),
      correctAnswerId: CHOICE_IDS[correctIndex],
      explanation,
      skillTag,
    };
  };
  const sa = (
    difficulty: QuestionDifficulty,
    skillTag: string,
    prompt: string,
    acceptedAnswers: string[],
    explanation: string,
  ): PlacementQuestion => {
    n += 1;
    return {
      id: `${courseId}-q${n}`,
      courseId,
      difficulty,
      type: 'short_answer',
      prompt,
      acceptedAnswers,
      explanation,
      skillTag,
    };
  };
  return { mc, sa };
}

// --- AP Biology --------------------------------------------------------------
const bio = subject('ap-biology');
const apBiology: PlacementQuestion[] = [
  bio.mc('foundation', 'Cell structure', `Which organelle produces most of a cell's ATP?`,
    ['Ribosome', 'Mitochondrion', 'Golgi apparatus', 'Nucleus'], 1,
    `Mitochondria run cellular respiration, generating most of the cell's ATP.`),
  bio.sa('foundation', 'DNA and genetics', `In DNA, adenine (A) pairs with which base? (one word)`,
    ['thymine', 't'], `A pairs with T; G pairs with C.`),
  bio.mc('developing', 'Energy and enzymes', `An enzyme speeds up a reaction mainly by:`,
    ['Raising activation energy', 'Lowering activation energy', 'Adding heat', 'Changing the products'], 1,
    `Enzymes lower the activation energy needed for a reaction to proceed.`),
  bio.mc('developing', 'Evolution', `Two populations separated by a canyon slowly can no longer interbreed. This best shows:`,
    ['Genetic drift only', 'Allopatric speciation', 'Artificial selection', 'Convergent evolution'], 1,
    `Geographic separation leading to new species is allopatric speciation.`),
  bio.mc('ap_ready', 'Experimental reasoning', `Which conclusion is best supported by the data?`,
    ['Activity rises without limit', 'The enzyme denatures above its optimal temperature', 'Temperature has no effect', 'The enzyme works best at 0°C'], 1,
    `Activity peaks near 37°C then drops as heat denatures the enzyme.`,
    { kind: 'chart', content: 'line-chart', caption: 'Enzyme activity vs temperature: rises to a peak near 37°C, then falls sharply.' }),
  bio.mc('ap_ready', 'DNA and genetics', `A heterozygous plant (Tt) self-pollinates. What fraction of offspring are short (tt)?`,
    ['0', '1/4', '1/2', '3/4'], 1,
    `A Tt × Tt cross gives a 1:2:1 ratio, so 1/4 are tt.`),
  bio.mc('advanced', 'Experimental reasoning', `A student tests plant growth under different light colors but uses a different plant species in each pot. The biggest flaw is:`,
    ['Too many trials', 'An uncontrolled variable (species differs)', 'Measuring height', 'Using sunlight'], 1,
    `Changing species alongside light means growth differences can't be attributed to light alone.`,
    { kind: 'paragraph', content: 'A student places a different plant species in each pot, gives each a different light color, and compares growth after two weeks.' }),
  bio.mc('advanced', 'Energy and enzymes', `In aerobic respiration, most ATP is produced by:`,
    ['Glycolysis', 'Substrate-level phosphorylation in the Krebs cycle', 'Oxidative phosphorylation at the electron transport chain', 'Fermentation'], 2,
    `The electron transport chain drives oxidative phosphorylation, the largest ATP source.`),
];

// --- AP Calculus AB ----------------------------------------------------------
const calc = subject('ap-calc-ab');
const apCalcAB: PlacementQuestion[] = [
  calc.mc('foundation', 'Limits', `Evaluate lim(x→2) of (3x + 1).`,
    ['5', '7', '6', 'Does not exist'], 1, `Substitute x = 2: 3(2) + 1 = 7.`),
  calc.sa('foundation', 'Derivatives', `What is d/dx of x³? (write like 3x^2)`,
    ['3x^2', '3x²'], `Power rule: bring down the exponent → 3x².`),
  calc.mc('developing', 'Derivatives', `The derivative of sin(x) is:`,
    ['cos(x)', '−cos(x)', '−sin(x)', 'sec²(x)'], 0, `d/dx sin(x) = cos(x).`),
  calc.mc('developing', 'Integrals', `Evaluate ∫ 2x dx.`,
    ['x² + C', '2 + C', 'x²', '2x² + C'], 0, `The antiderivative of 2x is x², plus a constant C.`),
  calc.mc('ap_ready', 'Applications of derivatives', `For f(x) = x² − 4x + 3, where is the local minimum?`,
    ['x = 1', 'x = 2', 'x = 3', 'x = 0'], 1,
    `f'(x) = 2x − 4 = 0 gives x = 2 (the vertex).`,
    { kind: 'formula', content: 'f(x) = x² − 4x + 3' }),
  calc.mc('ap_ready', 'Graph interpretation', `If f'(x) > 0 on an interval, then on that interval f is:`,
    ['Increasing', 'Decreasing', 'Constant', 'Concave down'], 0, `A positive derivative means the function is increasing.`),
  calc.mc('advanced', 'Applications of derivatives', `A particle's position is s(t) = t². Its velocity at t = 3 is:`,
    ['3', '6', '9', '2'], 1, `v(t) = s'(t) = 2t, so v(3) = 6.`),
  calc.mc('advanced', 'Integrals', `Evaluate the definite integral shown.`,
    ['8', '6', '4', '12'], 0, `∫₀² 3x² dx = [x³]₀² = 8 − 0 = 8.`,
    { kind: 'formula', content: '∫₀² 3x² dx' }),
];

// --- AP World History --------------------------------------------------------
const world = subject('ap-world');
const apWorld: PlacementQuestion[] = [
  world.mc('foundation', 'Periodization', `Which of these happened earliest?`,
    ['Industrial Revolution', 'Neolithic Revolution', 'Cold War', 'Renaissance'], 1,
    `The Neolithic (agricultural) Revolution came thousands of years before the others.`),
  world.sa('foundation', 'Historical causation', `Long-distance buying and selling of goods along routes like the Silk Roads is called ____. (one word)`,
    ['trade', 'commerce'], `Trade networks moved goods, ideas, and disease across regions.`),
  world.mc('developing', 'Continuity and change', `Which is an example of continuity across 1450–1750?`,
    ['All empires became democracies', 'Agriculture remained the basis of most economies', 'Writing was first invented', 'Everyone stopped trading'], 1,
    `Despite big changes, most economies still rested on agriculture.`),
  world.mc('developing', 'Comparison', `Both the Inca and Roman empires strengthened control by building extensive:`,
    ['Railroads', 'Road networks', 'Printing presses', 'Gunpowder armies'], 1,
    `Both used road systems to move armies, officials, and goods.`),
  world.mc('ap_ready', 'Source interpretation', `The author's point of view is best described as:`,
    ['Critical of the ruler', 'Supportive of the ruler', 'Neutral and statistical', 'Focused on geography'], 1,
    `The praise-filled language signals a supportive, favorable point of view.`,
    { kind: 'paragraph', content: '“Under our glorious sovereign the harvests are bountiful, the roads are safe, and every subject sleeps in peace. May the heavens grant this wise ruler ten thousand years.”' }),
  world.mc('ap_ready', 'Historical causation', `A major cause of European maritime exploration (15th–16th c.) was:`,
    ['The invention of the airplane', 'Desire for new trade routes to Asia', 'The fall of the Berlin Wall', 'The spread of the internet'], 1,
    `Europeans sought direct sea routes to Asian markets and goods.`),
  world.mc('advanced', 'Comparison', `Compared with land-based empires, maritime empires of 1450–1750 relied more on:`,
    ['Cavalry charges', 'Control of sea routes and ports', 'Nomadic migration', 'Feudal manors'], 1,
    `Maritime empires projected power through navies, ports, and sea lanes.`),
  world.mc('advanced', 'Continuity and change', `Which reasoning best explains why gunpowder spread widely in this era?`,
    ['It was kept secret by one empire', 'Expanding trade and warfare spread the technology across regions', 'It was never actually used', 'Only Europe had it'], 1,
    `Interconnected trade and conflict diffused gunpowder technology broadly.`),
];

// --- AP U.S. History ---------------------------------------------------------
const ush = subject('ap-us-history');
const apUSH: PlacementQuestion[] = [
  ush.mc('foundation', 'Founding era', `Which 1776 document declared the colonies independent from Britain?`,
    ['The Constitution', 'The Declaration of Independence', 'The Bill of Rights', 'The Emancipation Proclamation'], 1,
    `The Declaration of Independence (1776) announced separation from Britain.`),
  ush.sa('foundation', 'Civil War and Reconstruction', `The U.S. president during the Civil War was Abraham ____. (last name)`,
    ['lincoln'], `Abraham Lincoln led the Union through the Civil War.`),
  ush.mc('developing', 'Civil War and Reconstruction', `The 13th Amendment (1865) is best known for:`,
    ['Granting women the vote', 'Abolishing slavery', 'Creating the income tax', 'Ending Prohibition'], 1,
    `The 13th Amendment abolished slavery in the United States.`),
  ush.mc('developing', 'Industrialization', `Late-1800s industrial growth was driven largely by:`,
    ['Expansion of railroads and factories', 'The internet boom', 'The space race', 'Overseas colonies in Asia'], 0,
    `Railroads and factory production powered rapid industrialization.`),
  ush.mc('ap_ready', 'Progressive Era', `Progressive Era reformers most commonly sought to:`,
    ['Remove all government regulation', 'Address problems of industrialization and corruption', 'Restore monarchy', 'End public schooling'], 1,
    `Progressives pushed reforms targeting industrial abuses and political corruption.`),
  ush.mc('ap_ready', 'Document interpretation', `The main purpose of this pamphlet excerpt is to:`,
    ['Report neutral statistics', 'Persuade readers to support factory-safety reform', 'Tell a bedtime story', 'Advertise a product'], 1,
    `The urgent, reform-minded language aims to persuade readers to act.`,
    { kind: 'paragraph', content: '“How long will we let our children toil twelve hours a day in unsafe mills? The time for reform is now — demand safe conditions and fair hours!”' }),
  ush.mc('advanced', 'Civil rights', `The 1954 case Brown v. Board of Education addressed:`,
    ['Freedom of speech', 'Segregation in public schools', 'The voting age', 'Interstate commerce'], 1,
    `Brown v. Board ruled segregated public schools unconstitutional.`),
  ush.mc('advanced', 'Founding era', `Which reasoning best supports why the Constitution created three branches of government?`,
    ['To make laws faster', 'To separate powers and provide checks and balances', 'To copy Britain exactly', 'To eliminate elections'], 1,
    `Separation of powers checks any one branch from dominating.`),
];

// --- AP Computer Science A ---------------------------------------------------
const csa = subject('ap-csa');
const apCSA: PlacementQuestion[] = [
  csa.mc('foundation', 'Java basics', `In Java, what is the value of 7 / 2 (both ints)?`,
    ['3.5', '3', '4', 'Error'], 1, `Integer division truncates toward zero, so 7 / 2 is 3.`),
  csa.sa('foundation', 'Java basics', `Which Java keyword declares a value that cannot change? (one word)`,
    ['final'], `A variable marked final cannot be reassigned.`),
  csa.mc('developing', 'Loops', `After this loop runs, what is s?`,
    ['3', '6', '4', '7'], 1, `The loop adds 1 + 2 + 3 = 6.`,
    { kind: 'code', content: 'int s = 0;\nfor (int i = 1; i <= 3; i++) {\n  s += i;\n}' }),
  csa.mc('developing', 'Arrays', `In Java, the index of the first element of an array is:`,
    ['1', '0', '-1', 'It varies'], 1, `Java arrays are zero-indexed; the first element is index 0.`),
  csa.mc('ap_ready', 'Logic tracing', `What is the value of x after this code?`,
    ['5', '10', '15', 'Error'], 1, `x is 5; 5 > 3 && 5 < 10 is true, so x becomes 5 * 2 = 10.`,
    { kind: 'code', content: 'int x = 5;\nif (x > 3 && x < 10) {\n  x = x * 2;\n}' }),
  csa.mc('ap_ready', 'Classes and objects', `A constructor in Java:`,
    ['Must return void', 'Shares the class name and initializes new objects', 'Must be static', 'Cannot take parameters'], 1,
    `A constructor has the same name as its class and sets up new instances.`),
  csa.mc('advanced', 'Arrays', `What is the value of m after this code?`,
    ['5', '4', '3', '1'], 0, `The loop tracks the maximum; the largest element is 5.`,
    { kind: 'code', content: 'int[] a = {3, 1, 4, 1, 5};\nint m = a[0];\nfor (int i = 1; i < a.length; i++) {\n  if (a[i] > m) m = a[i];\n}' }),
  csa.mc('advanced', 'Logic tracing', `Which expression is equivalent to !(a && b)?`,
    ['!a && !b', '!a || !b', 'a || b', '!a && b'], 1, `By De Morgan's law, !(a && b) equals !a || !b.`),
];

// --- AP Chemistry ------------------------------------------------------------
const chem = subject('ap-chem');
const apChem: PlacementQuestion[] = [
  chem.mc('foundation', 'Atomic structure', `An element's atomic number equals its number of:`,
    ['Protons', 'Neutrons', 'Protons + neutrons', 'Isotopes'], 0, `Atomic number is defined by the proton count.`),
  chem.sa('foundation', 'Acids and bases', `A solution with pH 3 is acidic, basic, or neutral? (one word)`,
    ['acidic'], `pH below 7 is acidic; 7 is neutral; above 7 is basic.`),
  chem.mc('developing', 'Bonding', `A bond formed by transferring electrons between a metal and a nonmetal is:`,
    ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], 1, `Electron transfer between a metal and nonmetal forms an ionic bond.`),
  chem.mc('developing', 'Stoichiometry', `For 2 H₂ + O₂ → 2 H₂O, how many moles of water form from 2 mol H₂ (excess O₂)?`,
    ['1', '2', '3', '4'], 1, `The 2:2 ratio of H₂ to H₂O gives 2 mol of water.`),
  chem.mc('ap_ready', 'Equilibrium', `For the reaction shown, adding more N₂ shifts equilibrium toward:`,
    ['Reactants', 'Products', 'No change', 'It stops'], 1,
    `By Le Châtelier's principle, adding a reactant shifts equilibrium toward products.`,
    { kind: 'formula', content: 'N₂ + 3 H₂ ⇌ 2 NH₃   (exothermic)' }),
  chem.mc('ap_ready', 'Acids and bases', `The conjugate base of HCl is:`,
    ['Cl⁻', 'H⁺', 'OH⁻', 'H₂O'], 0, `Removing a proton (H⁺) from HCl leaves Cl⁻.`),
  chem.mc('advanced', 'Stoichiometry', `Given 3 mol H₂ and 1 mol O₂ for 2 H₂ + O₂ → 2 H₂O, the limiting reactant is:`,
    ['H₂', 'O₂', 'Neither', 'Water'], 1, `1 mol O₂ needs 2 mol H₂; H₂ is in excess, so O₂ limits the reaction.`),
  chem.mc('advanced', 'Equilibrium', `A very large equilibrium constant (K ≫ 1) means the reaction favors:`,
    ['Reactants', 'Products', 'Neither', 'Only solids'], 1, `Large K means product concentrations dominate at equilibrium.`,
    { kind: 'formula', content: 'K = [products] / [reactants] ≫ 1' }),
];

// --- AP Psychology -----------------------------------------------------------
const psych = subject('ap-psych');
const apPsych: PlacementQuestion[] = [
  psych.mc('foundation', 'Biological bases of behavior', `The gap between two neurons where neurotransmitters cross is the:`,
    ['Axon', 'Synapse', 'Dendrite', 'Myelin'], 1, `The synapse is the junction where neurotransmitters are released.`),
  psych.sa('foundation', 'Learning', `Pavlov's dogs salivating to a bell is an example of ____ conditioning. (one word)`,
    ['classical', 'pavlovian'], `Pairing a neutral stimulus with a reflex is classical conditioning.`),
  psych.mc('developing', 'Research methods', `Which method can best establish cause and effect?`,
    ['A correlational study', 'A case study', 'A controlled experiment', 'A survey'], 2,
    `Only a controlled experiment with manipulation and random assignment shows causation.`),
  psych.mc('developing', 'Learning', `Reinforcement in operant conditioning:`,
    ['Always uses punishment', 'Increases the behavior it follows', 'Is the same as a reflex', 'Only works on animals'], 1,
    `Reinforcement makes the preceding behavior more likely to recur.`),
  psych.mc('ap_ready', 'Research methods', `The scatterplot suggests:`,
    ['Sleep causes higher scores', 'A positive correlation between sleep and scores', 'No relationship', 'A negative correlation'], 1,
    `A rising trend shows positive correlation — but correlation isn't causation.`,
    { kind: 'chart', content: 'scatter-plot', caption: 'Scatterplot: hours of sleep vs test score, showing an upward trend.' }),
  psych.mc('ap_ready', 'Cognition', `Chunking is a strategy that improves:`,
    ['Reaction time', 'Short-term memory capacity', 'Visual acuity', 'Reflexes'], 1,
    `Grouping items into chunks lets short-term memory hold more.`),
  psych.mc('advanced', 'Disorders', `A defining feature of major depressive disorder is:`,
    ['Persistent low mood and loss of interest', 'Sudden bursts of joy', 'Improved memory', 'Weeks of boundless energy'], 0,
    `Persistent low mood and loss of interest/pleasure are core features.`),
  psych.mc('advanced', 'Research methods', `A placebo control group is used mainly to:`,
    ['Increase sample size', 'Account for expectation (placebo) effects', 'Reduce cost', 'Replace random assignment'], 1,
    `Placebos isolate the treatment effect from participants' expectations.`),
];

// --- AP English Language -----------------------------------------------------
const eng = subject('ap-eng-lang');
const apEngLang: PlacementQuestion[] = [
  eng.mc('foundation', 'Rhetorical situation', `In rhetoric, the "audience" refers to:`,
    ['The writer', 'The intended readers or listeners', 'The topic', 'The publisher'], 1,
    `Audience is who the text is trying to reach and affect.`),
  eng.sa('foundation', 'Rhetorical situation', `An appeal to the audience's emotions is called ____. (one Greek term)`,
    ['pathos'], `Pathos persuades through emotion; ethos = credibility, logos = logic.`),
  eng.mc('developing', 'Claims and evidence', `A strong thesis statement should:`,
    ['List every fact', 'Make an arguable claim', 'Avoid any position', 'Be phrased as a question'], 1,
    `A thesis states an arguable position the essay will defend.`),
  eng.mc('developing', 'Tone', `A writer's "tone" is best described as:`,
    ['The topic', 'The writer’s attitude toward the subject', 'The word count', 'The font'], 1,
    `Tone is the attitude a writer conveys toward the subject or audience.`),
  eng.mc('ap_ready', 'Passage analysis', `The primary purpose of the passage is to:`,
    ['Persuade readers to act', 'Neutrally describe a process', 'Tell a personal anecdote', 'Define one term'], 0,
    `The urgent, call-to-action language marks a persuasive purpose.`,
    { kind: 'paragraph', content: '“We cannot wait any longer. Every day we delay, the problem grows. It is time to act — and to act together, now.”' }),
  eng.mc('ap_ready', 'Argument', `A counterargument is included in an essay to:`,
    ['Ignore other views', 'Acknowledge and respond to opposing views', 'Restate the thesis', 'Add length'], 1,
    `Addressing counterarguments strengthens an argument's credibility.`),
  eng.mc('advanced', 'Passage analysis', `Which rhetorical device is most evident in the passage?`,
    ['Metaphor', 'Anaphora (repetition at the start of clauses)', 'Hyperbole', 'Alliteration'], 1,
    `Repeating "We must" at the start of clauses is anaphora.`,
    { kind: 'paragraph', content: '“We must protect our rivers. We must defend our forests. We must leave this world better than we found it.”' }),
  eng.mc('advanced', 'Claims and evidence', `Which is the most credible evidence for a claim about climate trends?`,
    ['A personal opinion', 'Peer-reviewed data from scientists', 'An anonymous social post', 'A single anecdote'], 1,
    `Peer-reviewed scientific data is the most reliable support.`),
];

/** Friendly, subject-flavored quiz intros. */
const quizIntros: Record<string, string> = {
  'ap-biology': `Let's see how much AP Biology already lives in your DNA. Answer honestly — this just finds your best starting point.`,
  'ap-calc-ab': `Time to find your limit! A few AP Calculus questions to place you at the right level.`,
  'ap-world': `Let's map your AP World History knowledge across time and place. No pressure — just finding where to start.`,
  'ap-us-history': `A quick tour through American history to place your AP U.S. History journey.`,
  'ap-csa': `Let's trace some code together. A few AP CS A questions to find your starting level.`,
  'ap-chem': `Let's find the right formula for you. A short AP Chemistry check to place your level.`,
  'ap-psych': `Let's explore what you already know about the mind. A quick AP Psychology placement check.`,
  'ap-eng-lang': `Let's read your rhetorical instincts. A short AP English Language placement check.`,
};

const questionsByCourse: Record<string, PlacementQuestion[]> = {
  'ap-biology': apBiology,
  'ap-calc-ab': apCalcAB,
  'ap-world': apWorld,
  'ap-us-history': apUSH,
  'ap-csa': apCSA,
  'ap-chem': apChem,
  'ap-psych': apPsych,
  'ap-eng-lang': apEngLang,
};

/** The starting levels a student can be placed into. */
export const PLACEMENT_LEVELS: Record<string, PlacementLevel> = {
  beginner: {
    id: 'beginner',
    title: 'Beginner',
    headline: 'Start at Unit 1 foundations',
    description: 'For students who are new or want a fresh start.',
    emoji: '🌱',
  },
  builder: {
    id: 'builder',
    title: 'Builder',
    headline: 'Start with early unit lessons and guided practice',
    description: 'For students who know some ideas but need structure.',
    emoji: '🧱',
  },
  ap_ready: {
    id: 'ap_ready',
    title: 'AP Ready',
    headline: 'Start with AP-style practice and targeted review',
    description: 'For students who understand the course and need exam practice.',
    emoji: '🎯',
  },
  advanced_review: {
    id: 'advanced_review',
    title: 'Advanced Review',
    headline: 'Start with challenge questions, weak-area review, and boss battles',
    description: 'For students who are close to exam-ready.',
    emoji: '🏆',
  },
};

/**
 * Get the placement quiz for a course. Falls back to AP Biology so the flow
 * always has questions during development.
 */
export function getPlacementQuiz(courseId: string | null): PlacementQuiz {
  const id = courseId && questionsByCourse[courseId] ? courseId : 'ap-biology';
  return { courseId: id, intro: quizIntros[id], questions: questionsByCourse[id] };
}
