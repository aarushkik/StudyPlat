import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/**
 * AP Biology — four questions per unit, ten units.
 *
 * Original study scaffolding written against the published unit outline, not
 * real exam material. Each block is tagged with its unit so a stop on the map
 * draws questions about the topic on its own plaque.
 */

const q = subject('ap-biology');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Chemistry of Life
out.push(
  q.mc('foundation', 'Water and bonding', 'Water molecules stick to each other mainly through:',
    ['Hydrogen bonds', 'Ionic bonds', 'Covalent bonds between molecules', 'Van der Waals forces alone'], 0,
    `Each water molecule is polar, so the partial positive hydrogen of one is attracted to the partial negative oxygen of another.`),
  q.mc('foundation', 'Macromolecules', 'Which macromolecule class is built from amino acids?',
    ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'], 2,
    `Amino acids join by peptide bonds to form polypeptides, which fold into proteins.`),
  q.sa('developing', 'Water and bonding', `Water's ability to pull itself up a narrow tube against gravity is called capillary ______. (one word)`,
    ['action'], `Capillary action combines cohesion between water molecules and adhesion to the tube wall.`),
  q.mc('ap_ready', 'Protein structure', 'A mutation that changes one amino acid in a protein most directly alters its:',
    ['Primary structure', 'Secondary structure only', 'Quaternary structure only', 'Tertiary structure only'], 0,
    `Primary structure is the amino-acid sequence itself; every higher level of folding follows from it.`),
);

q.inUnit(1); // Cell Structure & Function
out.push(
  q.mc('foundation', 'Organelles', `Which organelle produces most of a cell's ATP?`,
    ['Ribosome', 'Mitochondrion', 'Golgi apparatus', 'Nucleus'], 1,
    `Mitochondria run cellular respiration, generating most of the cell's ATP.`),
  q.mc('foundation', 'Membranes', 'The cell membrane is best described as a:',
    ['Rigid protein wall', 'Fluid mosaic of lipids and proteins', 'Solid lipid sheet', 'Single layer of carbohydrate'], 1,
    `Phospholipids form a fluid bilayer with proteins drifting through it — hence "fluid mosaic".`),
  q.mc('developing', 'Surface area', 'As a cell grows larger, its surface-area-to-volume ratio:',
    ['Increases', 'Decreases', 'Stays the same', 'Doubles'], 1,
    `Volume grows with the cube of radius while surface area grows with the square, so the ratio falls — which limits how large a cell can get.`),
  q.mc('ap_ready', 'Transport', 'A cell is placed in a solution with a lower solute concentration than its cytoplasm. Water will:',
    ['Move out of the cell', 'Move into the cell', 'Not move', 'Move out only if ATP is spent'], 1,
    `Water moves toward the higher solute concentration — into the cell. The outside solution is hypotonic.`),
);

q.inUnit(2); // Cellular Energetics
out.push(
  q.mc('foundation', 'Enzymes', 'An enzyme speeds up a reaction mainly by:',
    ['Raising activation energy', 'Lowering activation energy', 'Adding heat', 'Changing the products'], 1,
    `Enzymes lower the activation energy barrier; the reactants and products are unchanged.`),
  q.mc('developing', 'Photosynthesis', 'In photosynthesis, the oxygen released comes from:',
    ['Carbon dioxide', 'Water', 'Glucose', 'ATP'], 1,
    `Photolysis splits water in the light reactions, releasing O₂ as a by-product.`),
  q.mc('developing', 'Respiration', 'Which stage of cellular respiration produces the most ATP?',
    ['Glycolysis', 'The Krebs cycle', 'Oxidative phosphorylation', 'Fermentation'], 2,
    `The electron transport chain and chemiosmosis together yield most of the ATP made in aerobic cellular respiration.`),
  q.sa('ap_ready', 'Respiration', 'In the absence of oxygen, human muscle cells convert pyruvate into lactic ______. (one word)',
    ['acid'], `Lactic acid fermentation regenerates NAD⁺ so glycolysis can continue without oxygen.`),
);

q.inUnit(3); // Cell Communication & Cycle
out.push(
  q.mc('foundation', 'Cell cycle', 'During which phase of mitosis do chromosomes line up along the cell equator?',
    ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], 1,
    `Metaphase is the alignment step; anaphase then pulls the sister chromatids apart.`),
  q.mc('developing', 'Signal transduction', 'A signal molecule that cannot cross the membrane must bind to:',
    ['A receptor inside the nucleus', 'A surface receptor protein', 'A ribosome', 'The phospholipid bilayer itself'], 1,
    `Hydrophilic signals bind membrane-spanning receptors, which relay the message inward.`),
  q.mc('developing', 'Feedback', 'Negative feedback in a cell most often acts to:',
    ['Amplify the original signal', 'Restore a set point', 'Trigger cell death', 'Duplicate the DNA'], 1,
    `Negative feedback opposes change, pulling the system back toward its set point.`),
  q.mc('ap_ready', 'Checkpoints', 'A cell with damaged DNA that divides anyway has most likely lost function at:',
    ['The G1 checkpoint', 'The start of prophase', 'Cytokinesis', 'The nuclear envelope'], 0,
    `The G1 checkpoint verifies DNA integrity before replication; losing it is a common step toward cancer.`),
);

q.inUnit(4); // Heredity
out.push(
  q.mc('foundation', 'Mendelian genetics', 'A heterozygous plant (Tt) self-pollinates. What fraction of offspring are short (tt)?',
    ['1/2', '3/4', '0', '1/4'], 3,
    `A Tt × Tt cross gives a 1:2:1 ratio, so 1/4 are tt.`),
  q.mc('foundation', 'Meiosis', 'Meiosis produces gametes that are:',
    ['Diploid and identical', 'Haploid and genetically varied', 'Diploid and varied', 'Haploid and identical'], 1,
    `Meiosis halves the chromosome number and shuffles alleles through crossing over and independent assortment.`),
  q.sa('developing', 'Genetics vocabulary', 'An organism carrying two different alleles for a trait is called ______. (one word)',
    ['heterozygous'], `Two different alleles is heterozygous; two of the same is homozygous.`),
  q.mc('ap_ready', 'Non-Mendelian patterns', 'A red flower crossed with a white flower gives all pink offspring. This is:',
    ['Complete dominance', 'Incomplete dominance', 'Codominance', 'Sex linkage'], 1,
    `In incomplete dominance the heterozygote is a blend; in codominance both phenotypes appear separately.`),
);

q.inUnit(5); // Gene Expression & Regulation
out.push(
  q.sa('foundation', 'DNA structure', 'In DNA, adenine (A) pairs with which base? (one word)',
    ['thymine', 't'], `A pairs with T; G pairs with C.`),
  q.mc('foundation', 'Transcription', 'Transcription produces which molecule from a DNA template?',
    ['Protein', 'mRNA', 'A second DNA strand', 'ATP'], 1,
    `RNA polymerase reads DNA and builds a complementary mRNA strand.`),
  q.mc('developing', 'Translation', 'Translation of mRNA into protein takes place at the:',
    ['Nucleus', 'Ribosome', 'Golgi apparatus', 'Lysosome'], 1,
    `Ribosomes read codons and join the matching amino acids delivered by tRNA.`),
  q.mc('ap_ready', 'Mutations', 'A single base insertion early in a coding sequence is especially damaging because it:',
    ['Changes one amino acid', 'Shifts the reading frame', 'Deletes the promoter', 'Prevents transcription entirely'], 1,
    `An insertion that is not a multiple of three shifts every downstream codon — a frameshift.`),
);

q.inUnit(6); // Natural Selection
out.push(
  q.mc('foundation', 'Natural selection', 'Natural selection acts most directly on an organism’s:',
    ['Genotype', 'Phenotype', 'Individual alleles', 'Mutation rate'], 1,
    `Selection can only "see" traits that are expressed; allele frequencies change as a consequence.`),
  q.mc('developing', 'Evidence for evolution', 'Homologous structures in different species are evidence of:',
    ['Convergent evolution', 'Common ancestry', 'Genetic drift', 'Random mating'], 1,
    `Homologous structures share an underlying plan inherited from a common ancestor, whatever their current use.`),
  q.mc('developing', 'Hardy-Weinberg', 'A population in Hardy-Weinberg equilibrium must have:',
    ['Strong selection', 'No migration and random mating', 'A small population size', 'A high mutation rate'], 1,
    `Equilibrium assumes no selection, no migration, no mutation, random mating and a large population.`),
  q.mc('ap_ready', 'Speciation', 'A canyon forms and splits one population in two, which later cannot interbreed. This is:',
    ['Sympatric speciation', 'Allopatric speciation', 'Artificial selection', 'Genetic drift'], 1,
    `A physical barrier separating populations is allopatric speciation.`),
);

q.inUnit(7); // Ecology
out.push(
  q.mc('foundation', 'Energy flow', 'Roughly what fraction of energy passes from one trophic level to the next?',
    ['1%', '10%', '50%', '90%'], 1,
    `About 10% transfers; the rest is lost mostly as heat, which is why food chains are short.`),
  q.mc('foundation', 'Community interactions', 'A relationship where one species benefits and the other is unaffected is:',
    ['Mutualism', 'Commensalism', 'Parasitism', 'Competition'], 1,
    `Commensalism is +/0. Mutualism is +/+ and parasitism +/−.`),
  q.mc('developing', 'Population ecology', 'A population growing without resource limits shows which growth curve?',
    ['Logistic (S-shaped)', 'Exponential (J-shaped)', 'Linear', 'Flat'], 1,
    `Unlimited resources give exponential J-shaped growth; carrying capacity bends it into a logistic S.`),
  q.mc('ap_ready', 'Ecosystem dynamics', 'Removing a keystone predator from a community most likely causes:',
    ['No measurable change', 'A large drop in overall diversity', 'An immediate rise in diversity', 'A rise in the predator’s prey only'], 1,
    `Keystone predators hold competitive dominants in check; removing one usually collapses diversity.`),
);

q.inUnit(8); // Lab & Data Analysis
out.push(
  q.mc('foundation', 'Experimental design', 'In an experiment, the variable the researcher deliberately changes is the:',
    ['Dependent variable', 'Independent variable', 'Control', 'Constant'], 1,
    `The independent variable is manipulated; the dependent variable is measured in response.`),
  q.mc('foundation', 'Controls', 'The purpose of a control group is to:',
    ['Increase the sample size', 'Provide a baseline for comparison', 'Guarantee the hypothesis', 'Remove all variables'], 1,
    `Without a baseline there is nothing to attribute a difference to.`),
  q.mc('developing', 'Error bars', 'Two treatments have error bars that overlap substantially. The most reasonable conclusion is:',
    ['The treatments clearly differ', 'The difference may not be significant', 'The experiment failed', 'The sample size was too large'], 1,
    `Heavily overlapping error bars mean the observed difference could plausibly come from variation alone.`),
  q.mc('ap_ready', 'Interpreting results', 'A chi-square test returns a p-value of 0.60. You should:',
    ['Reject the null hypothesis', 'Fail to reject the null hypothesis', 'Repeat until p is small', 'Conclude the null is proven true'], 1,
    `A large p-value means the data are consistent with the null — you fail to reject it, which is not the same as proving it.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Exam strategy', 'On a multiple-choice question with two clearly wrong options, the best move is to:',
    ['Skip the question', 'Eliminate them and choose between the rest', 'Always pick the longest answer', 'Pick at random immediately'], 1,
    `Elimination raises the odds on every guess and costs almost no time.`),
  q.mc('developing', 'Free response', 'An FRQ asks you to "justify" a claim. A full-credit answer must include:',
    ['A restatement of the claim', 'Reasoning that links evidence to the claim', 'A labelled diagram only', 'A longer answer than the others'], 1,
    `"Justify" asks for the connective reasoning, not just the assertion or the data.`),
  q.mc('developing', 'Data questions', 'A stimulus question shows a graph you have never seen. Your first step should be:',
    ['Guess from memory of similar graphs', 'Read the axes and units', 'Answer from the choices alone', 'Skip to the next question'], 1,
    `The axes tell you what is actually being plotted; most stimulus errors come from skipping them.`),
  q.mc('ap_ready', 'Timing', 'You have five minutes left and three questions unanswered. The best approach is:',
    ['Answer the hardest one carefully', 'Give a quick reasoned answer to all three', 'Leave them blank', 'Re-check your earlier answers'], 1,
    `There is no penalty for a wrong answer, so a partial attempt on all three beats a perfect attempt on one.`),
);

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over, and a student who cleared one saw nothing new in the next.
// Unit tags are re-declared rather than the blocks above being edited, because
// selection filters by tag and never by position; keeping the passes separate
// makes it obvious what was added and keeps the first pass reviewable.
// ---------------------------------------------------------------------------

q.inUnit(0); // Chemistry of Life
out.push(
  q.mc('foundation', 'Water and bonding', 'Water is an excellent solvent for salts mainly because it is:',
    ['Nonpolar', 'Polar', 'Acidic', 'A gas at room temperature'], 1,
    `Polar water molecules surround and separate charged ions, pulling the crystal apart.`),
  q.mc('foundation', 'Macromolecules', 'The monomer of a nucleic acid is a:',
    ['Nucleotide', 'Amino acid', 'Monosaccharide', 'Fatty acid'], 0,
    `Nucleotides — a sugar, a phosphate and a base — link into DNA and RNA strands.`),
  q.mc('developing', 'Water and bonding', `Water's high specific heat helps organisms because it:`,
    ['Speeds up all reactions', 'Resists sudden temperature change', 'Lowers the freezing point of blood', 'Makes cells more acidic'], 1,
    `Breaking hydrogen bonds absorbs a lot of energy, so water warms and cools slowly.`),
  q.mc('developing', 'Macromolecules', 'Dehydration synthesis builds polymers by:',
    ['Adding a water molecule per bond', 'Removing a water molecule per bond', 'Adding phosphate groups', 'Breaking hydrogen bonds'], 1,
    `A hydroxyl and a hydrogen leave as water each time a covalent bond forms between monomers.`),
  q.mc('ap_ready', 'Protein structure', 'A protein placed in high heat loses function mainly because:',
    ['Its primary sequence is cut', 'Its folded shape unravels', 'Its genes are deleted', 'It becomes a lipid'], 1,
    `Heat disrupts the weak interactions holding the fold; the sequence survives but the active shape does not.`),
  q.mc('ap_ready', 'Macromolecules', 'A saturated fatty acid is solid at room temperature because its chains:',
    ['Contain double bonds that kink them', 'Are straight and pack tightly', 'Are charged and repel', 'Are shorter than unsaturated ones'], 1,
    `No double bonds means no kinks, so the chains stack closely and the substance stays solid.`),
  q.sa('developing', 'Water and bonding', `Water molecules sticking to *other* substances is called ______. (one word)`,
    ['adhesion'], `Adhesion is water to another surface; cohesion is water to itself.`),
  q.sa('ap_ready', 'Protein structure', `The level of protein structure formed by alpha helices and beta sheets is called ______ structure. (one word)`,
    ['secondary'], `Secondary structure comes from hydrogen bonding along the backbone, independent of the side chains.`),
);

q.inUnit(1); // Cell Structure & Function
out.push(
  q.mc('foundation', 'Organelles', 'Which structure is found in plant cells but not animal cells?',
    ['Cell wall', 'Mitochondrion', 'Nucleus', 'Ribosome'], 0,
    `A rigid cellulose cell wall sits outside the membrane in plants and is absent in animals.`),
  q.mc('foundation', 'Organelles', 'Ribosomes are responsible for:',
    ['Protein synthesis', 'Lipid storage', 'DNA replication', 'Waste digestion'], 0,
    `Ribosomes read mRNA and assemble the corresponding chain of amino acids.`),
  q.mc('developing', 'Membranes', 'Which molecule crosses a phospholipid bilayer most easily without help?',
    ['Sodium ion', 'Glucose', 'Oxygen', 'A protein'], 2,
    `Small nonpolar molecules like oxygen slip through the hydrophobic core unaided.`),
  q.mc('developing', 'Organelles', 'The rough endoplasmic reticulum is "rough" because it is studded with:',
    ['Ribosomes', 'Lysosomes', 'Mitochondria', 'Vacuoles'], 0,
    `Bound ribosomes give it its texture and feed newly made proteins into the ER lumen.`),
  q.mc('developing', 'Surface area', 'Root hair cells have long thin projections in order to:',
    ['Store more starch', 'Increase surface area for absorption', 'Reduce water loss', 'Photosynthesise faster'], 1,
    `More surface per unit volume means more area across which water and minerals can enter.`),
  q.mc('ap_ready', 'Membranes', 'A cell placed in a hypertonic solution will:',
    ['Swell and possibly burst', 'Shrink as water leaves', 'Stay exactly the same', 'Actively pump in solute'], 1,
    `Water moves toward the higher solute concentration, which is outside the cell.`),
  q.mc('ap_ready', 'Organelles', 'The endosymbiotic origin of mitochondria is supported by their:',
    ['Own circular DNA and double membrane', 'Ability to make ATP', 'Position near the nucleus', 'Large size'], 0,
    `Circular DNA, their own ribosomes and a double membrane are the hallmarks of an engulfed bacterium.`),
  q.sa('developing', 'Membranes', `Movement of water across a membrane down its own concentration gradient is called ______. (one word)`,
    ['osmosis'], `Osmosis is diffusion applied specifically to water.`),
);

q.inUnit(2); // Cellular Energetics
out.push(
  q.mc('foundation', 'Photosynthesis', 'The pigment that absorbs light for photosynthesis is:',
    ['Chlorophyll', 'Haemoglobin', 'Keratin', 'Melanin'], 0,
    `Chlorophyll absorbs red and blue light and reflects green, which is why leaves look green.`),
  q.mc('foundation', 'Respiration', 'Glycolysis takes place in the:',
    ['Cytoplasm', 'Mitochondrial matrix', 'Nucleus', 'Chloroplast'], 0,
    `Glycolysis is cytoplasmic and needs no oxygen, which is why every organism has it.`),
  q.mc('developing', 'Photosynthesis', 'The light-dependent reactions produce which pair used by the Calvin cycle?',
    ['ATP and NADPH', 'Glucose and oxygen', 'ADP and NADP+', 'Carbon dioxide and water'], 0,
    `The Calvin cycle spends the ATP and NADPH made by the light reactions to fix carbon.`),
  q.mc('developing', 'Respiration', 'In the absence of oxygen, human muscle cells produce:',
    ['Ethanol', 'Lactic acid', 'Carbon dioxide only', 'Nothing at all'], 1,
    `Lactic acid fermentation regenerates NAD+ so glycolysis can keep running without oxygen.`),
  q.mc('developing', 'Enzymes', 'A competitive inhibitor slows an enzyme by:',
    ['Binding the active site', 'Changing the pH', 'Denaturing the enzyme', 'Removing the product'], 0,
    `It occupies the site the substrate needs, and more substrate can outcompete it.`),
  q.mc('ap_ready', 'Respiration', 'Most ATP from aerobic respiration is made during:',
    ['Glycolysis', 'The Krebs cycle', 'Oxidative phosphorylation', 'Fermentation'], 2,
    `The electron transport chain and chemiosmosis together yield far more ATP than the earlier stages.`),
  q.mc('ap_ready', 'Photosynthesis', 'Oxygen released in photosynthesis originally comes from:',
    ['Carbon dioxide', 'Water', 'Glucose', 'ATP'], 1,
    `Photolysis splits water, and the oxygen atoms are released as O₂.`),
  q.sa('ap_ready', 'Enzymes', `The molecule an enzyme acts on is called its ______. (one word)`,
    ['substrate'], `The substrate binds the active site and is converted into product.`),
);

q.inUnit(3); // Cell Communication & Cycle
out.push(
  q.mc('foundation', 'Cell cycle', 'DNA is copied during which phase of interphase?',
    ['G1', 'S', 'G2', 'M'], 1,
    `S phase is synthesis: each chromosome is replicated into two sister chromatids.`),
  q.mc('foundation', 'Signalling', 'A hormone that binds a receptor on the cell surface is acting as a:',
    ['Ligand', 'Enzyme', 'Substrate', 'Second messenger'], 0,
    `A ligand is any signalling molecule that binds a receptor to trigger a response.`),
  q.mc('developing', 'Mitosis', 'Sister chromatids separate during:',
    ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], 2,
    `Anaphase is defined by the split, with each chromatid pulled to an opposite pole.`),
  q.mc('developing', 'Cell cycle', 'Checkpoints in the cell cycle exist to:',
    ['Speed up division', 'Verify conditions before proceeding', 'Trigger apoptosis in every cell', 'Increase mutation rate'], 1,
    `Each checkpoint halts the cycle until damage is repaired and conditions are right.`),
  q.mc('developing', 'Signalling', 'Signal transduction usually amplifies a message because:',
    ['One receptor activates many downstream molecules', 'The signal molecule multiplies', 'Receptors divide', 'The nucleus enlarges'], 0,
    `Each step in a cascade activates many of the next, so a few signals produce a large response.`),
  q.mc('ap_ready', 'Cell cycle', 'A cell with a faulty G1 checkpoint is most likely to:',
    ['Divide with damaged DNA', 'Stop dividing entirely', 'Become haploid', 'Lose its membrane'], 0,
    `Without the check, damage is carried into replication rather than repaired first.`),
  q.mc('ap_ready', 'Mitosis', 'Cytokinesis in plant cells differs from animal cells because plants:',
    ['Form a cell plate', 'Use a cleavage furrow', 'Skip cytokinesis', 'Divide the nucleus twice'], 0,
    `A rigid wall cannot pinch, so vesicles build a new cell plate across the middle instead.`),
  q.sa('developing', 'Mitosis', `The stage where chromosomes line up along the cell's middle is called ______. (one word)`,
    ['metaphase'], `Metaphase — the metaphase plate is the imaginary line they align on.`),
);

q.inUnit(4); // Heredity
out.push(
  q.mc('foundation', 'Meiosis', 'Meiosis produces cells that are:',
    ['Diploid and identical', 'Haploid and genetically varied', 'Diploid and varied', 'Haploid and identical'], 1,
    `Two divisions halve the chromosome number, and crossing over varies the products.`),
  q.mc('foundation', 'Mendelian genetics', 'An organism with two identical alleles for a trait is:',
    ['Heterozygous', 'Homozygous', 'Haploid', 'Polyploid'], 1,
    `Homozygous means the same allele twice; heterozygous means two different ones.`),
  q.mc('developing', 'Punnett squares', 'Crossing two heterozygotes (Aa × Aa) gives what genotype ratio?',
    ['1:2:1', '3:1', '9:3:3:1', '1:1'], 0,
    `One AA, two Aa and one aa — which shows as a 3:1 phenotype ratio for complete dominance.`),
  q.mc('developing', 'Meiosis', 'Crossing over occurs during:',
    ['Prophase I', 'Metaphase II', 'Anaphase II', 'Telophase I'], 0,
    `Homologous chromosomes pair in prophase I and exchange segments at chiasmata.`),
  q.mc('developing', 'Mendelian genetics', 'A test cross is used to determine:',
    ['Whether a dominant-phenotype organism is homozygous', 'The number of chromosomes', 'Whether a trait is sex-linked', 'The mutation rate'], 0,
    `Crossing with a homozygous recessive reveals the unknown genotype from the offspring ratio.`),
  q.mc('ap_ready', 'Punnett squares', 'A colour-blind son can inherit the X-linked allele from:',
    ['His father only', 'His mother only', 'Either parent equally', 'Neither parent'], 1,
    `A son gets his single X from his mother; his father contributes the Y.`),
  q.mc('ap_ready', 'Mendelian genetics', 'Two genes on the same chromosome close together tend to be:',
    ['Independently assorted', 'Linked and inherited together', 'Always lethal', 'Found only in gametes'], 1,
    `Close linkage means few crossovers separate them, so they travel together more often than chance.`),
  q.sa('ap_ready', 'Meiosis', `The random orientation of homologous pairs in metaphase I is called independent ______. (one word)`,
    ['assortment'], `Independent assortment is one of the two main sources of variation in meiosis.`),
);

q.inUnit(5); // Gene Expression & Regulation
out.push(
  q.mc('foundation', 'Transcription', 'The enzyme that builds RNA from a DNA template is:',
    ['DNA polymerase', 'RNA polymerase', 'Ligase', 'Helicase'], 1,
    `RNA polymerase reads the template strand and assembles the messenger RNA.`),
  q.mc('foundation', 'Translation', 'A codon consists of how many bases?',
    ['One', 'Two', 'Three', 'Four'], 2,
    `Three bases specify one amino acid, which is why the code is called a triplet code.`),
  q.mc('developing', 'Mutations', 'A frameshift mutation is caused by:',
    ['A single base substitution', 'An insertion or deletion not in multiples of three', 'A change in chromosome number', 'DNA methylation'], 1,
    `Adding or removing bases shifts how every downstream codon is read.`),
  q.mc('developing', 'Transcription', 'In eukaryotes, introns are removed during:',
    ['RNA splicing', 'Translation', 'Replication', 'Transcription initiation'], 0,
    `The spliceosome cuts introns out and joins exons before the mRNA leaves the nucleus.`),
  q.mc('developing', 'Gene regulation', 'The lac operon in E. coli is switched on when:',
    ['Glucose is abundant', 'Lactose is present', 'The cell is dividing', 'Temperature rises'], 1,
    `Lactose inactivates the repressor, allowing transcription of the genes that digest it.`),
  q.mc('ap_ready', 'Translation', 'tRNA is responsible for:',
    ['Carrying amino acids to the ribosome', 'Copying DNA', 'Splicing introns', 'Forming the nuclear membrane'], 0,
    `Each tRNA has an anticodon matching a codon and carries the corresponding amino acid.`),
  q.mc('ap_ready', 'Mutations', 'A silent mutation changes a base but not the protein because the code is:',
    ['Universal', 'Redundant', 'Overlapping', 'Reversible'], 1,
    `Several codons specify the same amino acid, so some substitutions have no effect.`),
  q.sa('ap_ready', 'Gene regulation', `Chemical tags on DNA or histones that change expression without changing sequence are called ______ modifications. (one word)`,
    ['epigenetic'], `Epigenetic marks such as methylation alter access to genes rather than their sequence.`),
);

q.inUnit(6); // Natural Selection
out.push(
  q.mc('foundation', 'Natural selection', 'Natural selection acts directly on an organism\'s:',
    ['Genotype', 'Phenotype', 'Ribosomes', 'Codons'], 1,
    `Selection can only "see" traits that are expressed; genotype changes follow from that.`),
  q.mc('foundation', 'Evidence', 'Homologous structures suggest that species share:',
    ['A common ancestor', 'An identical habitat', 'The same diet', 'The same chromosome number'], 0,
    `Same underlying structure, different function — the signature of shared ancestry.`),
  q.mc('developing', 'Population genetics', 'Genetic drift has the largest effect in:',
    ['Very large populations', 'Small populations', 'Populations with high mutation', 'Populations under strong selection'], 1,
    `Chance changes in allele frequency matter more when there are fewer individuals to average over.`),
  q.mc('developing', 'Speciation', 'Allopatric speciation begins with:',
    ['Geographic separation', 'A change in diet', 'Polyploidy', 'Sexual selection'], 0,
    `A physical barrier stops gene flow, and the separated populations diverge.`),
  q.mc('developing', 'Natural selection', 'Antibiotic resistance spreads because antibiotics:',
    ['Cause bacteria to mutate on demand', 'Select for bacteria that already resist', 'Weaken all bacteria equally', 'Transfer genes between species'], 1,
    `The resistant variants already exist; the antibiotic removes their competition.`),
  q.mc('ap_ready', 'Population genetics', 'In Hardy-Weinberg notation, the frequency of heterozygotes is given by:',
    ['p squared', '2pq', 'q squared', 'p + q'], 1,
    `p² are one homozygote, q² the other, and 2pq the heterozygotes.`),
  q.mc('ap_ready', 'Evidence', 'Analogous structures such as bird and insect wings are the result of:',
    ['Common ancestry', 'Convergent evolution', 'Genetic drift', 'Artificial selection'], 1,
    `Similar pressures produced similar solutions in lineages that are not closely related.`),
  q.sa('developing', 'Speciation', `A population bottleneck reduces genetic ______. (one word)`,
    ['diversity', 'variation'], `A crash leaves only the alleles the survivors happened to carry.`),
);

q.inUnit(7); // Ecology
out.push(
  q.mc('foundation', 'Energy flow', 'Roughly what percentage of energy passes from one trophic level to the next?',
    ['1%', '10%', '50%', '90%'], 1,
    `About a tenth is transferred; the rest is lost as heat and to metabolism.`),
  q.mc('foundation', 'Food webs', 'An organism that eats both plants and animals is a:',
    ['Producer', 'Herbivore', 'Omnivore', 'Decomposer'], 2,
    `Omnivores occupy more than one trophic level.`),
  q.mc('developing', 'Population growth', 'Exponential growth slows as a population approaches its:',
    ['Carrying capacity', 'Trophic level', 'Biome', 'Niche width'], 0,
    `Carrying capacity is the maximum the environment can sustain, and growth flattens against it.`),
  q.mc('developing', 'Cycles', 'Nitrogen-fixing bacteria convert atmospheric nitrogen into:',
    ['Ammonia', 'Nitrogen gas', 'Oxygen', 'Carbon dioxide'], 0,
    `Fixation makes nitrogen biologically usable; plants cannot use N₂ directly.`),
  q.mc('developing', 'Ecosystems', 'Removing a keystone species usually causes:',
    ['No measurable change', 'A large change in community structure', 'An immediate increase in diversity', 'A change in climate'], 1,
    `A keystone species has an effect far out of proportion to its abundance.`),
  q.mc('ap_ready', 'Population growth', 'A species with many offspring, little parental care and a short lifespan is described as:',
    ['K-selected', 'r-selected', 'A keystone species', 'A primary producer'], 1,
    `r-selection favours rapid reproduction in unstable environments.`),
  q.mc('ap_ready', 'Cycles', 'Burning fossil fuels most directly affects the:',
    ['Nitrogen cycle', 'Carbon cycle', 'Phosphorus cycle', 'Water cycle'], 1,
    `It moves carbon stored underground for millions of years into the atmosphere as CO₂.`),
  q.sa('developing', 'Ecosystems', `The role an organism plays in its ecosystem is called its ______. (one word)`,
    ['niche'], `Habitat is where it lives; niche is what it does there.`),
);

q.inUnit(8); // Lab & Data Analysis
out.push(
  q.mc('foundation', 'Experimental design', 'The variable the experimenter changes on purpose is the:',
    ['Dependent variable', 'Independent variable', 'Control', 'Constant'], 1,
    `The independent variable is the input; the dependent variable is what you measure in response.`),
  q.mc('foundation', 'Controls', 'A control group exists so that results can be compared against:',
    ['A group with no treatment', 'A larger sample', 'A different species', 'A second hypothesis'], 0,
    `Without an untreated baseline there is nothing to attribute the difference to.`),
  q.mc('developing', 'Graphs', 'Error bars that overlap substantially suggest the difference is:',
    ['Definitely significant', 'Possibly not significant', 'Caused by the control', 'A measurement error'], 1,
    `Heavy overlap means the two means may not be distinguishable given the spread.`),
  q.mc('developing', 'Statistics', 'A chi-square test is used to compare:',
    ['Observed and expected counts', 'Two means', 'Rates of change', 'Slopes of lines'], 0,
    `It asks whether an observed distribution differs from what a hypothesis predicts.`),
  q.mc('developing', 'Experimental design', 'Increasing sample size mainly improves:',
    ['Accuracy of the hypothesis', 'Reliability of the result', 'The independent variable', 'The control group'], 1,
    `More trials average out random variation, making the result more reproducible.`),
  q.mc('ap_ready', 'Graphs', 'A line of best fit through scattered data is used to show:',
    ['Every individual measurement', 'The overall trend', 'The control value', 'The largest outlier'], 1,
    `It summarises the relationship without claiming any single point is exact.`),
  q.mc('ap_ready', 'Statistics', 'Standard error of the mean decreases as:',
    ['Sample size increases', 'Variance increases', 'The mean increases', 'The control is removed'], 0,
    `It scales with the inverse square root of n, so more data narrows the estimate.`),
  q.sa('developing', 'Controls', `A variable deliberately kept the same across all groups is called a ______. (one word)`,
    ['constant', 'control'], `Constants isolate the independent variable as the only thing that differs.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Question types', 'AP Biology multiple-choice questions frequently ask you to:',
    ['Recall a definition only', 'Apply a concept to a new scenario', 'Write a paragraph', 'Draw a diagram'], 1,
    `The exam is built around transfer: familiar concepts in unfamiliar contexts.`),
  q.mc('foundation', 'Free response', 'The command word "describe" asks you to:',
    ['Give an account of the relevant features', 'Justify a claim with reasoning', 'Draw a graph', 'List advantages and disadvantages'], 0,
    `"Describe" wants the features; "explain" wants the mechanism; "justify" wants the reasoning.`),
  q.mc('developing', 'Data questions', 'When a question gives you a table and asks for a conclusion, you should:',
    ['Quote the largest number', 'Compare the treatment with the control', 'Assume the trend continues', 'Ignore units'], 1,
    `A conclusion needs a comparison; a single value on its own says nothing.`),
  q.mc('developing', 'Free response', 'A question worth four points most likely expects:',
    ['One sentence', 'Four distinct scoreable statements', 'A full essay', 'A labelled diagram only'], 1,
    `Points map to distinct ideas, so aim for one clear statement per point.`),
  q.mc('developing', 'Timing', 'If a stimulus question has a long passage, the efficient order is:',
    ['Read the passage fully, then the question', 'Read the question first, then scan the passage', 'Answer from memory', 'Skip it'], 1,
    `Knowing what you are looking for turns a long passage into a targeted search.`),
  q.mc('ap_ready', 'Question types', 'An answer choice that is true but does not answer the question asked is:',
    ['Correct', 'A distractor', 'A control', 'A justification'], 1,
    `Distractors are usually true statements placed to reward careless reading.`),
  q.mc('ap_ready', 'Free response', 'When asked to "predict and justify", a full-credit answer contains:',
    ['A prediction only', 'A prediction and the reasoning behind it', 'Two predictions', 'A graph'], 1,
    `Both halves are scored; a prediction with no reasoning earns half the available credit.`),
  q.sa('foundation', 'Timing', `On the AP exam there is no penalty for a wrong answer, so you should never leave a question ______. (one word)`,
    ['blank', 'unanswered'], `An educated guess is strictly better than nothing.`),
);

export const apBiologyQuestions = out;
