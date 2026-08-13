import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP English Language — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-eng-lang');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Rhetorical Situation: Reading
out.push(
  q.mc('foundation', 'Rhetorical situation', 'The rhetorical situation includes the writer, the audience, the purpose, the message and the:',
    ['Word count', 'Context (exigence)', 'Font', 'Publisher'], 1,
    `Exigence is the circumstance that makes the text necessary now.`),
  q.mc('foundation', 'Appeals', 'An appeal to the audience’s sense of right and wrong is:',
    ['Logos', 'Pathos', 'Ethos', 'Kairos'], 2,
    `Ethos concerns credibility and shared values; pathos is emotion and logos is logic.`),
  q.mc('developing', 'Audience', 'A writer addressing a hostile audience most often begins by:',
    ['Attacking their position', 'Establishing common ground', 'Withholding the thesis entirely', 'Using technical jargon'], 1,
    `Shared ground buys the writer a hearing before the disagreement arrives.`),
  q.mc('ap_ready', 'Purpose', 'Identifying a text’s purpose means determining what the writer wants the audience to:',
    ['Remember about the writer', 'Think, feel or do', 'Notice about the style', 'Count'], 1,
    `Purpose is about the intended effect on the audience, not the subject matter.`),
);

q.inUnit(1); // Rhetorical Situation: Writing
out.push(
  q.mc('foundation', 'Thesis', 'A thesis in an argument essay should:',
    ['Announce the topic', 'State a defensible position', 'Ask a question', 'Summarise the sources'], 1,
    `A thesis someone could disagree with is what makes an argument possible.`),
  q.mc('developing', 'Tone', 'Choosing a measured, formal tone for a scholarly audience is a decision about:',
    ['Exigence', 'Rhetorical choices suited to audience', 'Genre only', 'Length'], 1,
    `Tone is one of the choices a writer makes in response to the situation.`),
  q.mc('developing', 'Introductions', 'An effective introduction most importantly:',
    ['Defines every key term', 'Establishes the situation and previews the argument', 'Includes a quotation', 'States the word count'], 1,
    `The reader needs to know what is at stake and where the essay is going.`),
  q.mc('ap_ready', 'Concession', 'Acknowledging a strong opposing point before answering it generally:',
    ['Weakens the argument', 'Strengthens credibility', 'Is off-topic', 'Should be avoided'], 1,
    `Addressing the counterargument shows the writer has considered it, which builds ethos.`),
);

q.inUnit(2); // Claims & Evidence: Reading
out.push(
  q.mc('foundation', 'Claims', 'A claim differs from a fact in that a claim:',
    ['Cannot be supported', 'Requires support because it can be disputed', 'Is always false', 'Is always shorter'], 1,
    `Facts are verifiable; claims are positions argued for.`),
  q.mc('developing', 'Evidence types', 'Statistics, anecdotes and expert testimony are all types of:',
    ['Claims', 'Evidence', 'Fallacies', 'Transitions'], 1,
    `Each supports a claim in a different way and carries different weight with different audiences.`),
  q.mc('developing', 'Commentary', 'The function of commentary in a paragraph is to:',
    ['Repeat the evidence', 'Explain how the evidence supports the claim', 'Introduce a new topic', 'Cite the source'], 1,
    `Evidence does not speak for itself; commentary supplies the link.`),
  q.mc('ap_ready', 'Evaluating', 'Evidence that is relevant but drawn from a single unusual case is best described as:',
    ['Sufficient', 'Insufficient to generalise from', 'Irrelevant', 'Fabricated'], 1,
    `Relevance and sufficiency are separate tests; one case rarely establishes a general claim.`),
);

q.inUnit(3); // Claims & Evidence: Writing
out.push(
  q.mc('foundation', 'Integration', 'A quotation dropped into a paragraph with no introduction is:',
    ['Well integrated', 'A "dropped quote" that needs framing', 'Preferred style', 'A citation error'], 1,
    `Quotations need a signal phrase and follow-up commentary.`),
  q.mc('developing', 'Attribution', 'Attributing a source’s credentials before quoting them primarily builds:',
    ['Pathos', 'Ethos', 'Logos', 'Kairos'], 1,
    `Establishing why the source is trustworthy is an appeal to credibility.`),
  q.mc('developing', 'Selection', 'When choosing between two pieces of evidence, the better choice is the one that:',
    ['Is longer', 'Most directly supports the specific claim', 'Comes from the newest source', 'Uses harder vocabulary'], 1,
    `Directness of fit matters more than recency or length.`),
  q.mc('ap_ready', 'Qualification', 'Adding "in most cases" to a claim is an example of:',
    ['Hedging that weakens all arguments', 'Qualifying a claim to make it more defensible', 'A logical fallacy', 'Redundancy'], 1,
    `Qualified claims are easier to defend and often score higher than absolute ones.`),
);

q.inUnit(4); // Reasoning & Organization
out.push(
  q.mc('foundation', 'Organisation', 'A line of reasoning is:',
    ['The order sources appear', 'The logical progression of claims toward the thesis', 'The number of paragraphs', 'The introduction alone'], 1,
    `Each claim should follow from and build on the last.`),
  q.mc('foundation', 'Transitions', 'The word "however" signals a relationship of:',
    ['Addition', 'Contrast', 'Cause', 'Example'], 1,
    `Transitions tell the reader how the next idea relates to the previous one.`),
  q.mc('developing', 'Fallacies', 'Attacking the person rather than their argument is the fallacy of:',
    ['Straw man', 'Ad hominem', 'False dilemma', 'Slippery slope'], 1,
    `Ad hominem targets the arguer instead of the argument.`),
  q.mc('ap_ready', 'Reasoning patterns', 'Arguing from a series of specific cases to a general conclusion is:',
    ['Deductive reasoning', 'Inductive reasoning', 'Circular reasoning', 'Analogy'], 1,
    `Induction builds up from particulars; deduction works down from a general premise.`),
);

q.inUnit(5); // Style: Reading
out.push(
  q.mc('foundation', 'Diction', 'Diction refers to a writer’s:',
    ['Sentence length', 'Word choice', 'Paragraph order', 'Punctuation only'], 1,
    `Diction is word choice; syntax is sentence structure.`),
  q.mc('foundation', 'Syntax', 'A series of very short sentences most often creates an effect of:',
    ['Leisurely reflection', 'Urgency or emphasis', 'Confusion', 'Formality'], 1,
    `Clipped syntax speeds the reader up and lands emphasis hard.`),
  q.mc('developing', 'Figurative language', 'Comparing two unlike things without "like" or "as" is a:',
    ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], 1,
    `A metaphor asserts the comparison directly.`),
  q.mc('ap_ready', 'Effect', 'When analysing style, the essential question is:',
    ['What device is this?', 'What effect does this choice create for this audience?', 'How long is the sentence?', 'Is it grammatical?'], 1,
    `Naming devices earns little; explaining their effect is the analysis.`),
);

q.inUnit(6); // Style: Writing
out.push(
  q.mc('foundation', 'Clarity', 'The clearest revision of "It is the case that many students are of the opinion that" is:',
    ['Many students believe', 'It is believed by many students', 'There are many students who believe', 'Students, many of them, believe'], 0,
    `Cutting empty constructions leaves the subject acting directly.`),
  q.mc('developing', 'Voice', 'Active voice is generally preferred because it:',
    ['Is longer', 'Makes the actor clear and the sentence direct', 'Sounds more formal', 'Avoids verbs'], 1,
    `Passive voice has legitimate uses, but it hides the actor by default.`),
  q.mc('developing', 'Variety', 'Varying sentence length in a paragraph primarily helps to:',
    ['Fill space', 'Control pacing and emphasis', 'Avoid grammar rules', 'Increase vocabulary'], 1,
    `A short sentence after several long ones lands with force.`),
  q.mc('ap_ready', 'Precision', 'Replacing "things" and "stuff" with specific nouns improves writing chiefly by:',
    ['Increasing length', 'Increasing precision and credibility', 'Making it more formal only', 'Adding transitions'], 1,
    `Vague nouns make a reader do work the writer should have done.`),
);

q.inUnit(7); // Synthesis Argument
out.push(
  q.mc('foundation', 'Purpose', 'In a synthesis essay, sources should be used to:',
    ['Summarise each in turn', 'Support your own argument', 'Replace your thesis', 'Fill the page'], 1,
    `The essay is your argument; the sources are evidence within it.`),
  q.mc('developing', 'Citation', 'The minimum number of provided sources normally required in a synthesis essay is:',
    ['One', 'Three', 'All of them', 'Six'], 1,
    `Three is the usual requirement, though quality of use matters more than count.`),
  q.mc('developing', 'Conversation', 'Placing two sources that disagree in dialogue with each other demonstrates:',
    ['Confusion', 'Sophisticated synthesis', 'Poor selection', 'Plagiarism'], 1,
    `Putting sources in conversation, rather than in a list, is what synthesis means.`),
  q.mc('ap_ready', 'Common error', 'The most common weakness in synthesis essays is:',
    ['Too many citations', 'Summarising sources without an argument of your own', 'Too short an introduction', 'Excessive qualification'], 1,
    `A tour of the sources with no position is the classic failure mode.`),
);

q.inUnit(8); // Rhetorical Analysis
out.push(
  q.mc('foundation', 'Task', 'A rhetorical analysis essay asks you to explain:',
    ['Whether you agree with the text', 'How the writer builds their argument and why', 'What the text says, in summary', 'The text’s historical accuracy'], 1,
    `The subject is the writer's choices and their effect, not the topic itself.`),
  q.mc('developing', 'Structure', 'The strongest rhetorical analyses are organised by:',
    ['Order of devices in the passage', 'Movements in the writer’s argument', 'Length of each paragraph', 'Alphabetical device names'], 1,
    `Following the argument's development beats walking through a list of devices.`),
  q.mc('developing', 'Common error', 'Writing "the author uses pathos to appeal to emotion" is weak because it:',
    ['Is inaccurate', 'Names a device without explaining its effect', 'Is too specific', 'Uses the wrong term'], 1,
    `It restates the definition rather than analysing what the appeal accomplishes here.`),
  q.mc('ap_ready', 'Sophistication', 'The sophistication point most often rewards essays that:',
    ['Use the most devices', 'Situate choices in a broader context or tension', 'Are longest', 'Quote most heavily'], 1,
    `Nuance about the rhetorical situation earns it, not device counting.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Timing', 'With three essays in 135 minutes, a reasonable plan allots each roughly:',
    ['20 minutes', '40 minutes', '60 minutes', '15 minutes'], 1,
    `About 40 minutes each, including reading and planning time.`),
  q.mc('foundation', 'Planning', 'Spending the first few minutes planning an essay usually:',
    ['Wastes time', 'Improves organisation enough to be worth it', 'Is prohibited', 'Reduces the word count required'], 1,
    `A brief outline prevents the mid-essay collapse that costs far more time.`),
  q.mc('developing', 'Multiple choice', 'On rhetorical-analysis multiple choice, the best first step is to:',
    ['Read the choices first', 'Read the passage for argument and purpose', 'Skim for devices', 'Count paragraphs'], 1,
    `Understanding the argument makes most of the questions answerable directly.`),
  q.mc('ap_ready', 'Revision', 'With five minutes left, the most valuable use of time is usually to:',
    ['Add a new paragraph', 'Strengthen the thesis and check the line of reasoning', 'Recopy the essay', 'Add more quotations'], 1,
    `The thesis and reasoning carry the most rubric weight of anything you can still fix.`),
);

export const apEngLangQuestions = out;
