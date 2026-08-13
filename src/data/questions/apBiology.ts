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
    `The electron transport chain and chemiosmosis together yield roughly 34 of the ~38 ATP.`),
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

export const apBiologyQuestions = out;
