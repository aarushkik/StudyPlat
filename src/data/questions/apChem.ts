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

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Atomic Structure & Properties
out.push(
  q.mc('foundation', 'Subatomic particles', 'The mass number of an atom counts:',
    ['Protons only', 'Protons and neutrons', 'Protons and electrons', 'Neutrons only'], 1,
    `Electrons are too light to contribute meaningfully to mass.`),
  q.mc('foundation', 'Periodic trends', 'Atomic radius generally increases as you move:',
    ['Left to right across a period', 'Down a group', 'Up a group', 'Toward the noble gases'], 1,
    `Each new period adds a shell, so atoms get larger down a group.`),
  q.mc('developing', 'Isotopes', 'Two isotopes of the same element always differ in:',
    ['Proton count', 'Neutron count', 'Electron count', 'Charge'], 1,
    `Same element means same protons; isotopes differ only in neutrons.`),
  q.mc('developing', 'Ionisation energy', 'Ionisation energy generally increases:',
    ['Down a group', 'Left to right across a period', 'With atomic radius', 'With shielding'], 1,
    `Greater nuclear charge with the same shielding holds electrons more tightly.`),
  q.mc('developing', 'Periodic trends', 'Electronegativity is highest for:',
    ['Fluorine', 'Caesium', 'Sodium', 'Neon'], 0,
    `Fluorine is the most electronegative element on the scale.`),
  q.mc('ap_ready', 'Ionisation energy', 'Effective nuclear charge increases across a period because:',
    ['Shielding rises faster than charge', 'Protons are added with little added shielding', 'Atoms get larger', 'Electrons are removed'], 1,
    `Each added electron enters the same shell, so shielding barely changes.`),
  q.mc('ap_ready', 'Subatomic particles', 'A photoelectron spectrum peak height is proportional to:',
    ['Binding energy', 'Number of electrons in that subshell', 'Atomic number', 'Ionisation energy'], 1,
    `Height counts electrons; position along the axis gives binding energy.`),
  q.sa('developing', 'Isotopes', `The weighted mean of an element's isotope masses is its average atomic ______. (one word)`,
    ['mass', 'weight'], `Weighting is by natural abundance, which is why values are rarely whole numbers.`),
);

q.inUnit(1); // Compound Structure & Properties
out.push(
  q.mc('foundation', 'Bond types', 'A bond between a metal and a nonmetal is usually:',
    ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], 0,
    `The large electronegativity difference transfers electrons rather than sharing them.`),
  q.mc('foundation', 'Molecular geometry', 'A molecule with four bonding pairs and no lone pairs is:',
    ['Linear', 'Trigonal planar', 'Tetrahedral', 'Bent'], 2,
    `Four regions of electron density spread to about 109.5 degrees apart.`),
  q.mc('developing', 'Polarity', 'CO₂ is nonpolar despite polar bonds because:',
    ['The bonds are weak', 'It is linear and the dipoles cancel', 'Carbon has no lone pairs', 'Oxygen is not electronegative'], 1,
    `Symmetry cancels the two equal and opposite bond dipoles.`),
  q.mc('developing', 'Molecular geometry', 'Water is bent rather than linear because oxygen has:',
    ['Two lone pairs', 'No lone pairs', 'A double bond', 'A positive charge'], 0,
    `Lone pairs repel more strongly than bonding pairs, compressing the angle.`),
  q.mc('developing', 'Bond types', 'Metallic bonding is best described as:',
    ['Shared pairs between two atoms', 'Cations in a sea of delocalised electrons', 'Complete electron transfer', 'Dipole attraction'], 1,
    `The mobile electron sea explains conductivity and malleability.`),
  q.mc('ap_ready', 'Polarity', 'A larger electronegativity difference between bonded atoms produces:',
    ['A more nonpolar bond', 'A more polar bond', 'A weaker bond', 'A metallic bond'], 1,
    `Greater difference means greater charge separation across the bond.`),
  q.mc('ap_ready', 'Molecular geometry', 'Resonance structures differ only in the placement of:',
    ['Atoms', 'Electrons', 'Protons', 'Charges on the nucleus'], 1,
    `The nuclear framework is fixed; only electron distribution is redrawn.`),
  q.sa('developing', 'Bond types', `A bond formed by sharing electrons between two nonmetals is called ______. (one word)`,
    ['covalent'], `Sharing rather than transfer is the defining feature.`),
);

q.inUnit(2); // Substances & Mixtures
out.push(
  q.mc('foundation', 'Intermolecular forces', 'The strongest intermolecular force among these is:',
    ['London dispersion', 'Dipole-dipole', 'Hydrogen bonding', 'Ion-induced dipole'], 2,
    `Hydrogen bonding is the strongest of the ordinary intermolecular forces.`),
  q.mc('foundation', 'Mixtures', 'A solution is best described as a:',
    ['Heterogeneous mixture', 'Homogeneous mixture', 'Pure substance', 'Compound'], 1,
    `Uniform composition throughout is what makes it homogeneous.`),
  q.mc('developing', 'Intermolecular forces', 'London dispersion forces are strongest in molecules that are:',
    ['Small and polar', 'Large with many electrons', 'Ionic', 'Charged'], 1,
    `More electrons means a more polarisable cloud and stronger temporary dipoles.`),
  q.mc('developing', 'Mixtures', 'Chromatography separates components based on differences in:',
    ['Boiling point', 'Affinity for the stationary and mobile phases', 'Density', 'Charge only'], 1,
    `Components that cling to the paper move slowly; those that prefer the solvent move fast.`),
  q.mc('developing', 'Intermolecular forces', 'Boiling point rises with intermolecular force strength because boiling requires:',
    ['Breaking covalent bonds', 'Overcoming attractions between molecules', 'Ionising the substance', 'Changing the molar mass'], 1,
    `Boiling separates molecules; it does not break the bonds inside them.`),
  q.mc('ap_ready', 'Mixtures', 'Distillation separates liquids that differ in:',
    ['Colour', 'Boiling point', 'Density only', 'Molar mass only'], 1,
    `The more volatile component vaporises first and is condensed separately.`),
  q.mc('ap_ready', 'Intermolecular forces', 'Water has an unusually high boiling point for its mass because of:',
    ['Its ionic character', 'Extensive hydrogen bonding', 'Its low polarity', 'Metallic bonding'], 1,
    `Each molecule can form several hydrogen bonds, which takes energy to break.`),
  q.sa('developing', 'Mixtures', `A mixture with visibly distinct regions is described as ______. (one word)`,
    ['heterogeneous'], `Sand in water is heterogeneous; salt in water is homogeneous.`),
);

q.inUnit(3); // Chemical Reactions
out.push(
  q.mc('foundation', 'Moles', 'Converting grams to moles requires dividing by the:',
    ['Avogadro constant', 'Molar mass', 'Molarity', 'Density'], 1,
    `Molar mass in grams per mole is the bridge between mass and moles.`),
  q.mc('foundation', 'Balancing', 'Balancing an equation preserves:',
    ['The number of molecules', 'The number of atoms of each element', 'The volume', 'The temperature'], 1,
    `Conservation of mass means atoms are neither created nor destroyed.`),
  q.mc('developing', 'Molarity', 'Molarity is defined as moles of solute per:',
    ['Litre of solvent', 'Litre of solution', 'Kilogram of solvent', 'Mole of solution'], 1,
    `Per litre of the final solution, not of the solvent added.`),
  q.mc('developing', 'Limiting reactant', 'The limiting reactant is the one that:',
    ['Is present in the largest mass', 'Runs out first', 'Has the highest molar mass', 'Is a catalyst'], 1,
    `It caps how much product can form regardless of the excess.`),
  q.mc('developing', 'Redox', 'In a redox reaction, oxidation is:',
    ['Gain of electrons', 'Loss of electrons', 'Gain of protons', 'Loss of mass'], 1,
    `OIL RIG — oxidation is loss, reduction is gain.`),
  q.mc('ap_ready', 'Dilution', 'Diluting a solution changes:',
    ['Moles of solute', 'Concentration only', 'Both moles and concentration', 'Neither'], 1,
    `Adding solvent spreads the same moles over a larger volume.`),
  q.mc('ap_ready', 'Reaction types', 'A precipitation reaction is identified by the formation of:',
    ['A gas', 'An insoluble solid', 'Heat only', 'A colour change alone'], 1,
    `An insoluble product dropping out of solution is the definition.`),
  q.sa('developing', 'Moles', `Percent yield is actual yield divided by ______ yield, times one hundred. (one word)`,
    ['theoretical'], `Theoretical yield comes from the limiting reactant calculation.`),
);

q.inUnit(4); // Kinetics
out.push(
  q.mc('foundation', 'Rate factors', 'Raising the temperature increases reaction rate mainly because:',
    ['Activation energy falls', 'More collisions exceed the activation energy', 'The equilibrium shifts', 'Molar mass changes'], 1,
    `Higher temperature widens the fraction of collisions with enough energy.`),
  q.mc('foundation', 'Catalysts', 'A catalyst increases rate by:',
    ['Raising activation energy', 'Providing a lower-energy pathway', 'Shifting the equilibrium', 'Increasing concentration'], 1,
    `It changes the route, not the endpoints.`),
  q.mc('developing', 'Rate law', 'A reaction that is first order in A doubles in rate when [A]:',
    ['Doubles', 'Quadruples', 'Halves', 'Stays constant'], 0,
    `First order means rate is directly proportional to concentration.`),
  q.mc('developing', 'Mechanism', 'A valid mechanism must add up to the:',
    ['Rate law only', 'Overall balanced equation', 'Activation energy', 'Equilibrium constant'], 1,
    `Summing the elementary steps must reproduce the overall reaction.`),
  q.mc('developing', 'Rate factors', 'Increasing surface area of a solid reactant increases rate because it:',
    ['Lowers activation energy', 'Exposes more particles to collision', 'Changes the mechanism', 'Adds a catalyst'], 1,
    `More exposed particles means more effective collisions per second.`),
  q.mc('ap_ready', 'Rate law', 'For a second-order reaction, a plot that gives a straight line is:',
    ['[A] against time', 'ln[A] against time', '1/[A] against time', '[A]² against time'], 2,
    `First order linearises with ln[A]; second order with the reciprocal.`),
  q.mc('ap_ready', 'Catalysts', 'A catalyst appears in a mechanism as a species that is:',
    ['Consumed then regenerated', 'Only produced', 'Only consumed', 'Never involved'], 0,
    `It is used in an early step and returned in a later one.`),
  q.sa('developing', 'Mechanism', `A species produced in one step and consumed in a later one is called an ______. (one word)`,
    ['intermediate'], `Intermediates do not appear in the overall balanced equation.`),
);

q.inUnit(5); // Thermodynamics
out.push(
  q.mc('foundation', 'Exothermic', 'An exothermic reaction has an enthalpy change that is:',
    ['Positive', 'Negative', 'Zero', 'Undefined'], 1,
    `Energy leaves the system, so the sign is negative.`),
  q.mc('foundation', 'Phase changes', 'Energy is absorbed during:',
    ['Freezing', 'Condensation', 'Melting', 'Deposition'], 2,
    `Melting breaks intermolecular attractions and requires energy input.`),
  q.mc('developing', 'Entropy', 'Entropy generally increases when a substance goes from:',
    ['Gas to liquid', 'Liquid to solid', 'Solid to gas', 'Gas to solid'], 2,
    `More freedom of motion means more accessible microstates.`),
  q.mc('developing', 'Hess’s law', 'Hess\'s law works because enthalpy is a:',
    ['Rate', 'State function', 'Catalyst', 'Kinetic quantity'], 1,
    `A state function depends only on start and end, not on the route taken.`),
  q.mc('developing', 'Exothermic', 'In a calorimetry experiment, a temperature rise in the water means the reaction was:',
    ['Endothermic', 'Exothermic', 'At equilibrium', 'Catalysed'], 1,
    `Heat flowed out of the reaction and into the water.`),
  q.mc('ap_ready', 'Phase changes', 'During a phase change at constant pressure, temperature:',
    ['Rises steadily', 'Stays constant', 'Falls', 'Oscillates'], 1,
    `Energy goes into rearranging particles rather than raising kinetic energy.`),
  q.mc('ap_ready', 'Entropy', 'A reaction producing more moles of gas than it consumes has an entropy change that is:',
    ['Negative', 'Positive', 'Zero', 'Unpredictable'], 1,
    `More gas particles means more disorder.`),
  q.sa('developing', 'Hess’s law', `Reversing a reaction reverses the ______ of its enthalpy change. (one word)`,
    ['sign'], `Reverse the reaction, flip the sign; multiply the reaction, multiply the value.`),
);

q.inUnit(6); // Equilibrium
out.push(
  q.mc('foundation', 'Dynamic equilibrium', 'At equilibrium, forward and reverse reaction rates are:',
    ['Both zero', 'Equal', 'Increasing', 'Unrelated'], 1,
    `Equal rates, not stopped rates — the reaction continues in both directions.`),
  q.mc('foundation', 'K values', 'A very large equilibrium constant indicates that at equilibrium:',
    ['Reactants dominate', 'Products dominate', 'Nothing has reacted', 'The reaction is fast'], 1,
    `K is a ratio of products to reactants; large K means the numerator dominates.`),
  q.mc('developing', 'Le Châtelier', 'Removing a product from a system at equilibrium shifts it:',
    ['Toward reactants', 'Toward products', 'Not at all', 'To a new K'], 1,
    `The system replaces what was taken by making more of it.`),
  q.mc('developing', 'Q vs K', 'If the reaction quotient Q is greater than K, the reaction will:',
    ['Shift toward products', 'Shift toward reactants', 'Already be at equilibrium', 'Stop'], 1,
    `Too many products relative to equilibrium, so the reverse reaction proceeds.`),
  q.mc('developing', 'Le Châtelier', 'Increasing pressure on a gaseous equilibrium shifts it toward the side with:',
    ['More moles of gas', 'Fewer moles of gas', 'Higher molar mass', 'More solids'], 1,
    `Reducing the number of gas particles relieves the pressure.`),
  q.mc('ap_ready', 'K values', 'Adding a catalyst to an equilibrium system:',
    ['Increases K', 'Decreases K', 'Does not change K', 'Reverses the reaction'], 2,
    `A catalyst speeds both directions equally, reaching the same equilibrium sooner.`),
  q.mc('ap_ready', 'Q vs K', 'Only a change in which variable changes the value of K?',
    ['Concentration', 'Pressure', 'Temperature', 'Catalyst'], 2,
    `Everything else shifts the position; only temperature changes the constant itself.`),
  q.sa('developing', 'Dynamic equilibrium', `Pure solids and pure liquids are ______ from the equilibrium expression. (one word)`,
    ['omitted', 'excluded'], `Their activities are constant, so they are folded into K.`),
);

q.inUnit(7); // Acids & Bases
out.push(
  q.mc('foundation', 'pH scale', 'A solution with pOH 2 has a pH of:',
    ['2', '7', '12', '14'], 2,
    `pH plus pOH equals 14 at 25 degrees Celsius.`),
  q.mc('foundation', 'Definitions', 'A Bronsted-Lowry acid is defined as a:',
    ['Proton donor', 'Proton acceptor', 'Electron pair donor', 'Electron pair acceptor'], 0,
    `Bronsted-Lowry is about protons; Lewis is about electron pairs.`),
  q.mc('developing', 'Strong vs weak', 'A strong acid is one that:',
    ['Is concentrated', 'Dissociates completely in water', 'Has a low pH only', 'Contains hydrogen'], 1,
    `Strength is about the extent of dissociation, not the concentration.`),
  q.mc('developing', 'Buffers', 'A buffer solution typically contains:',
    ['A strong acid and a strong base', 'A weak acid and its conjugate base', 'Only water', 'Two strong acids'], 1,
    `The pair absorbs added acid or base with only a small pH change.`),
  q.mc('developing', 'pH scale', 'A solution changing from pH 5 to pH 3 has a hydrogen ion concentration that is:',
    ['2 times greater', '10 times greater', '100 times greater', 'Half as large'], 2,
    `Two pH units is two powers of ten.`),
  q.mc('ap_ready', 'Buffers', 'A buffer is most effective when the pH is close to the weak acid\'s:',
    ['pKa', 'Boiling point', 'Molar mass', 'Concentration'], 0,
    `At pH equal to pKa the acid and conjugate base concentrations are equal.`),
  q.mc('ap_ready', 'Strong vs weak', 'The conjugate base of a very weak acid is:',
    ['Very weak', 'Relatively strong', 'Neutral', 'A catalyst'], 1,
    `Weak acid, strong conjugate base — the relationship is inverse.`),
  q.sa('developing', 'Definitions', `At the equivalence point of a titration, moles of acid equal moles of ______. (one word)`,
    ['base'], `Equivalence is stoichiometric equality, which is not always pH 7.`),
);

q.inUnit(8); // Applications of Thermodynamics
out.push(
  q.mc('foundation', 'Spontaneity', 'A reaction is spontaneous when the Gibbs free energy change is:',
    ['Positive', 'Negative', 'Zero', 'Equal to enthalpy'], 1,
    `Negative delta G means the process can proceed without continuous input.`),
  q.mc('foundation', 'Electrochemistry', 'In a galvanic cell, electrons flow through the external wire from the:',
    ['Cathode to the anode', 'Anode to the cathode', 'Salt bridge outward', 'Solution to the wire'], 1,
    `Oxidation at the anode releases the electrons that reduction consumes.`),
  q.mc('developing', 'Gibbs equation', 'In the equation for Gibbs free energy, the entropy term is multiplied by:',
    ['Pressure', 'Temperature', 'Volume', 'Concentration'], 1,
    `Delta G equals delta H minus T times delta S, so entropy matters more when hot.`),
  q.mc('developing', 'Cell potential', 'A positive standard cell potential indicates a reaction that is:',
    ['Nonspontaneous', 'Spontaneous', 'At equilibrium', 'Endothermic'], 1,
    `Positive potential and negative Gibbs energy describe the same thing.`),
  q.mc('developing', 'Electrochemistry', 'The salt bridge in a galvanic cell exists to:',
    ['Carry electrons', 'Maintain charge balance', 'Increase voltage', 'Slow the reaction'], 1,
    `Ions migrate through it to keep both half-cells electrically neutral.`),
  q.mc('ap_ready', 'Spontaneity', 'A reaction with positive enthalpy and positive entropy change is spontaneous:',
    ['At all temperatures', 'At high temperature', 'At low temperature', 'Never'], 1,
    `The favourable entropy term wins once T is large enough.`),
  q.mc('ap_ready', 'Gibbs equation', 'At equilibrium, the Gibbs free energy change is:',
    ['Large and positive', 'Large and negative', 'Zero', 'Undefined'], 2,
    `No net driving force in either direction.`),
  q.sa('developing', 'Electrochemistry', `A cell that requires an external voltage to run is called an ______ cell. (one word)`,
    ['electrolytic'], `Electrolytic cells drive nonspontaneous reactions; galvanic cells release energy.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Sig figs', 'The result of a multiplication carries the number of significant figures of the:',
    ['First value', 'Largest value', 'Least precise value', 'Answer before rounding'], 2,
    `Precision is limited by your worst measurement.`),
  q.mc('foundation', 'Units', 'Dimensional analysis is used mainly to:',
    ['Guess an answer', 'Convert between units and check setup', 'Balance equations', 'Find the limiting reactant'], 1,
    `Cancelling units confirms the setup before you touch the arithmetic.`),
  q.mc('developing', 'Explaining', 'A question asking you to "justify" a claim expects:',
    ['The claim restated', 'Reasoning linking evidence to the claim', 'A diagram only', 'A longer answer'], 1,
    `Justify wants the connective reasoning, not just the assertion or the data.`),
  q.mc('developing', 'Particle diagrams', 'When drawing a particle diagram, you must respect:',
    ['Colour conventions', 'The correct relative numbers of particles', 'Artistic quality', 'The page size'], 1,
    `Ratios in the diagram must match the stoichiometry.`),
  q.mc('developing', 'Sig figs', 'A value written as 0.00450 has how many significant figures?',
    ['Two', 'Three', 'Five', 'Six'], 1,
    `Leading zeros do not count; the trailing zero after a decimal does.`),
  q.mc('ap_ready', 'Explaining', 'An answer that says "because of intermolecular forces" without naming which one earns:',
    ['Full credit', 'Partial or no credit', 'Extra credit', 'Credit with a diagram'], 1,
    `Naming the specific force is what the point is for.`),
  q.mc('ap_ready', 'Particle diagrams', 'In a diagram of a solution, the solvent should be shown as:',
    ['Absent', 'The most numerous particle', 'The largest particle', 'A single molecule'], 1,
    `Solvent is in vast excess, and diagrams that omit it lose the point.`),
  q.sa('foundation', 'Units', `Because there is no penalty for a wrong answer, you should never leave a question ______. (one word)`,
    ['blank', 'unanswered'], `An educated guess is strictly better than nothing.`),
);

export const apChemQuestions = out;
