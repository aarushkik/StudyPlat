import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP Chemistry — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-chem');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Atomic Structure & Properties
out.push(
  q.mc('foundation', 'Subatomic particles', 'Which particle carries a negative charge?',
    ['Proton', 'Neutron', 'Electron', 'Nucleus'], 2,
    `Electrons are negative, protons positive, neutrons neutral.`),
  q.mc('foundation', 'Isotopes', 'Two isotopes of the same element differ in their number of:',
    ['Protons', 'Neutrons', 'Electrons', 'Orbitals'], 1,
    `Isotopes share the proton count — that is what makes them the same element — but differ in neutrons.`),
  q.mc('developing', 'Periodic trends', 'Moving left to right across a period, atomic radius generally:',
    ['Increases', 'Decreases', 'Stays constant', 'Doubles'], 1,
    `Nuclear charge rises while the shell stays the same, pulling electrons in tighter.`),
  q.mc('ap_ready', 'Ionisation energy', 'A large jump between successive ionisation energies indicates:',
    ['A measurement error', 'That an electron has been removed from a new, inner shell', 'A change of element', 'A neutral atom'], 1,
    `Core electrons are far harder to remove than valence ones, so the jump marks the shell boundary.`),
);

q.inUnit(1); // Compound Structure & Properties
out.push(
  q.mc('foundation', 'Bond types', 'A bond formed by transferring electrons between a metal and a nonmetal is:',
    ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], 1,
    `Transfer creates ions that attract each other — an ionic bond.`),
  q.mc('foundation', 'Molecular geometry', 'A molecule with four bonding pairs and no lone pairs has which shape?',
    ['Trigonal planar', 'Tetrahedral', 'Bent', 'Linear'], 1,
    `Four electron domains arrange themselves tetrahedrally, about 109.5°.`),
  q.mc('developing', 'Polarity', 'A molecule is nonpolar overall when:',
    ['It has no polar bonds', 'Its polar bonds cancel by symmetry', 'It contains carbon', 'It is a gas'], 1,
    `CO₂ has polar bonds but a linear shape, so the dipoles cancel.`),
  q.mc('ap_ready', 'Intermolecular forces', 'The unusually high boiling point of water is mainly due to:',
    ['London dispersion forces', 'Hydrogen bonding', 'Ionic bonding', 'Its low molar mass'], 1,
    `Hydrogen bonds between O and H are far stronger than the dispersion forces in similar-sized molecules.`),
);

q.inUnit(2); // Substances & Mixtures
out.push(
  q.mc('foundation', 'Mixtures', 'A homogeneous mixture is also called a:',
    ['Compound', 'Solution', 'Suspension', 'Element'], 1,
    `A solution has uniform composition throughout.`),
  q.mc('foundation', 'Moles', 'One mole of any substance contains how many particles?',
    ['6.02 × 10²³', '3.14 × 10⁸', '1000', '12'], 0,
    `Avogadro's number defines the mole.`),
  q.mc('developing', 'Molarity', 'Molarity is defined as:',
    ['Moles per kilogram of solvent', 'Moles of solute per litre of solution', 'Grams per litre', 'Particles per mole'], 1,
    `M = mol/L of solution — note "solution", not "solvent".`),
  q.mc('ap_ready', 'Dilution', 'Diluting a solution with water changes which quantity?',
    ['The moles of solute', 'The concentration', 'The identity of the solute', 'The mass of solute'], 1,
    `Adding solvent raises the volume, so concentration falls while moles of solute stay put.`),
);

q.inUnit(3); // Chemical Reactions
out.push(
  q.mc('foundation', 'Balancing', 'Balancing a chemical equation reflects the conservation of:',
    ['Energy', 'Mass', 'Charge only', 'Volume'], 1,
    `Atoms are neither created nor destroyed, so each element must balance.`),
  q.mc('foundation', 'Reaction types', 'AB + CD → AD + CB is which type of reaction?',
    ['Synthesis', 'Decomposition', 'Double replacement', 'Combustion'], 2,
    `Two compounds exchange partners — double replacement.`),
  q.mc('developing', 'Limiting reactant', 'The limiting reactant in a reaction is the one that:',
    ['Is present in the largest mass', 'Runs out first and caps the product', 'Has the highest molar mass', 'Is a catalyst'], 1,
    `Product yield is set by whichever reactant is exhausted first.`),
  q.sa('ap_ready', 'Redox', 'A species that loses electrons in a redox reaction is said to be ______. (one word)',
    ['oxidised', 'oxidized'], `Loss of electrons is oxidation; gain is reduction.`),
);

q.inUnit(4); // Kinetics
out.push(
  q.mc('foundation', 'Rate factors', 'Raising the temperature generally increases reaction rate because it:',
    ['Lowers activation energy', 'Increases the fraction of collisions with enough energy', 'Adds a catalyst', 'Changes the products'], 1,
    `More molecules exceed the activation energy at higher temperature.`),
  q.mc('foundation', 'Catalysts', 'A catalyst speeds a reaction by:',
    ['Being consumed', 'Providing a lower-activation-energy pathway', 'Raising the temperature', 'Shifting the equilibrium position'], 1,
    `It offers an alternative route and is regenerated, leaving equilibrium untouched.`),
  q.mc('developing', 'Rate law', 'For rate = k[A]², doubling [A] changes the rate by a factor of:',
    ['2', '4', '1/2', '8'], 1,
    `Second order in A means the rate scales with the square: 2² = 4.`),
  q.mc('ap_ready', 'Mechanism', 'The rate-determining step of a mechanism is the:',
    ['Fastest step', 'Slowest step', 'First step always', 'Last step always'], 1,
    `The slowest step is the bottleneck that sets the overall rate.`),
);

q.inUnit(5); // Thermodynamics
out.push(
  q.mc('foundation', 'Exothermic', 'A reaction that releases heat to its surroundings has ΔH that is:',
    ['Positive', 'Negative', 'Zero', 'Undefined'], 1,
    `Exothermic reactions lose enthalpy, so ΔH is negative.`),
  q.mc('foundation', 'Entropy', 'Entropy is best described as a measure of:',
    ['Heat content', 'Dispersal of energy and matter', 'Reaction rate', 'Bond strength'], 1,
    `Higher entropy means energy and particles are more spread out among available states.`),
  q.mc('developing', 'Phase changes', 'Which phase change has the largest positive entropy change?',
    ['Freezing', 'Condensation', 'Vaporisation', 'Deposition'], 2,
    `Liquid to gas produces the biggest increase in disorder.`),
  q.mc('ap_ready', 'Hess’s law', 'Hess’s law allows enthalpy changes to be added because enthalpy is:',
    ['A rate', 'A state function', 'Always negative', 'Independent of temperature'], 1,
    `A state function depends only on start and end points, so any path gives the same ΔH.`),
);

q.inUnit(6); // Equilibrium
out.push(
  q.mc('foundation', 'Dynamic equilibrium', 'At equilibrium, the forward and reverse reactions:',
    ['Have both stopped', 'Proceed at equal rates', 'Proceed at zero rate', 'Alternate'], 1,
    `Equilibrium is dynamic: both directions continue, but concentrations no longer change.`),
  q.mc('developing', 'Le Châtelier', 'Adding more reactant to a system at equilibrium shifts it:',
    ['Toward the reactants', 'Toward the products', 'Not at all', 'Toward whichever side is exothermic'], 1,
    `The system consumes the added stress by shifting away from it.`),
  q.mc('developing', 'K values', 'A very large equilibrium constant K indicates:',
    ['Reactants are favoured', 'Products are favoured', 'The reaction is fast', 'The reaction is exothermic'], 1,
    `K compares products to reactants; a large K means products dominate at equilibrium.`),
  q.mc('ap_ready', 'Q vs K', 'If the reaction quotient Q is less than K, the reaction will:',
    ['Shift toward products', 'Shift toward reactants', 'Stay at equilibrium', 'Stop entirely'], 0,
    `Q below K means too few products, so the system moves forward to reach equilibrium.`),
);

q.inUnit(7); // Acids & Bases
out.push(
  q.mc('foundation', 'pH scale', 'A solution with pH 3 is:',
    ['Basic', 'Acidic', 'Neutral', 'Impossible'], 1,
    `Below 7 is acidic; above 7 is basic.`),
  q.mc('foundation', 'Definitions', 'A Brønsted-Lowry acid is a substance that:',
    ['Accepts a proton', 'Donates a proton', 'Accepts an electron pair', 'Increases pH'], 1,
    `Brønsted-Lowry defines acids as proton donors and bases as proton acceptors.`),
  q.mc('developing', 'Strong vs weak', 'A strong acid differs from a weak acid in that it:',
    ['Is more concentrated', 'Dissociates essentially completely', 'Has a lower pH always', 'Contains more hydrogen'], 1,
    `Strength is about the extent of dissociation, not concentration.`),
  q.mc('ap_ready', 'Buffers', 'A buffer resists pH change because it contains:',
    ['Only a strong acid', 'A weak acid and its conjugate base', 'Pure water', 'Two strong bases'], 1,
    `The pair neutralises added acid or base without a large pH swing.`),
);

q.inUnit(8); // Applications of Thermodynamics
out.push(
  q.mc('foundation', 'Spontaneity', 'A reaction is spontaneous when ΔG is:',
    ['Positive', 'Negative', 'Zero', 'Equal to ΔH'], 1,
    `Negative Gibbs free energy change means the process proceeds without continuous input.`),
  q.mc('developing', 'Gibbs equation', 'In ΔG = ΔH − TΔS, an endothermic reaction can still be spontaneous if:',
    ['ΔS is negative', 'TΔS is large and positive', 'T is zero', 'ΔH is very large'], 1,
    `A big positive entropy term at sufficient temperature can outweigh a positive ΔH.`),
  q.mc('developing', 'Electrochemistry', 'In a galvanic cell, oxidation occurs at the:',
    ['Cathode', 'Anode', 'Salt bridge', 'Voltmeter'], 1,
    `Oxidation is always at the anode, in both galvanic and electrolytic cells.`),
  q.mc('ap_ready', 'Cell potential', 'A galvanic cell with a positive standard cell potential has ΔG that is:',
    ['Positive', 'Negative', 'Zero', 'Unrelated'], 1,
    `ΔG° = −nFE°, so a positive potential gives a negative, spontaneous ΔG.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Sig figs', 'Answers on free-response questions should be reported with:',
    ['As many digits as the calculator shows', 'Significant figures consistent with the data', 'Always two decimal places', 'Whole numbers only'], 1,
    `Carrying more digits than the data supports is a standard deduction.`),
  q.mc('developing', 'Units', 'A numerical answer given without units on an AP Chemistry FRQ usually:',
    ['Earns full credit', 'Loses the point', 'Is rounded up', 'Is ignored'], 1,
    `Units are part of the answer, not decoration.`),
  q.mc('developing', 'Explaining', 'When a question says "justify your answer", you must:',
    ['State the answer twice', 'Give the chemical reasoning behind it', 'Draw a diagram', 'Show the calculator keystrokes'], 1,
    `The reasoning is what is being scored; the answer alone rarely earns the point.`),
  q.mc('ap_ready', 'Particle diagrams', 'Particle-level diagrams are graded mainly on whether they show:',
    ['Artistic quality', 'Correct relative amounts and identities of species', 'Colour coding', 'Exact atomic sizes'], 1,
    `The rubric looks for the right particles in the right proportions.`),
);

export const apChemQuestions = out;
