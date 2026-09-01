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

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Rhetorical Situation: Reading
out.push(
  q.mc('foundation', 'Rhetorical situation', 'The rhetorical situation includes the exigence, audience, purpose and:',
    ['Word count', 'Context', 'Genre alone', 'Publication date'], 1,
    `Context is the circumstance the text responds to and is read within.`),
  q.mc('foundation', 'Appeals', 'An appeal to the credibility of the speaker is:',
    ['Logos', 'Pathos', 'Ethos', 'Kairos'], 2,
    `Ethos asks the audience to trust the speaker.`),
  q.mc('developing', 'Audience', 'Identifying the intended audience matters because it explains:',
    ['The publication cost', 'Why the writer made particular choices', 'The word count', 'The author\'s age'], 1,
    `Every rhetorical choice is a choice made for someone.`),
  q.mc('developing', 'Purpose', 'A writer\'s purpose is best described as what they want the audience to:',
    ['Remember only', 'Think, feel or do', 'Buy', 'Write'], 1,
    `Purpose is the intended effect, not the subject matter.`),
  q.mc('developing', 'Appeals', 'Statistics and cited studies primarily appeal to:',
    ['Ethos', 'Pathos', 'Logos', 'Kairos'], 2,
    `Logos is the appeal to reason and evidence.`),
  q.mc('ap_ready', 'Rhetorical situation', 'Exigence refers to:',
    ['The writer\'s style', 'The problem or occasion prompting the text', 'The audience size', 'The genre'], 1,
    `Something has happened that makes the text necessary now.`),
  q.mc('ap_ready', 'Audience', 'A writer who anticipates objections is most likely addressing an audience that is:',
    ['Already convinced', 'Sceptical or divided', 'Uninformed', 'Absent'], 1,
    `Concession and refutation are aimed at readers who disagree.`),
  q.sa('developing', 'Appeals', `An appeal to the audience's emotions is called ______. (one word)`,
    ['pathos'], `Ethos is credibility, logos is reason, pathos is emotion.`),
);

q.inUnit(1); // Rhetorical Situation: Writing
out.push(
  q.mc('foundation', 'Thesis', 'A thesis placed at the end of the introduction typically helps the reader by:',
    ['Hiding the argument', 'Signalling the line of reasoning before it begins', 'Shortening the essay', 'Adding evidence'], 1,
    `The reader knows what the following paragraphs are building toward.`),
  q.mc('foundation', 'Introductions', 'An effective introduction usually establishes:',
    ['Every piece of evidence', 'Context and the writer\'s position', 'A conclusion', 'A bibliography'], 1,
    `Orient the reader, then commit to a claim.`),
  q.mc('developing', 'Tone', 'Tone is best described as the writer\'s attitude toward:',
    ['The page length', 'The subject and audience', 'The publisher', 'The genre'], 1,
    `Diction and syntax are the main tools that create it.`),
  q.mc('developing', 'Concession', 'A concession in an argument:',
    ['Abandons the thesis', 'Acknowledges a valid opposing point', 'Repeats the claim', 'Adds evidence'], 1,
    `Acknowledging the other side and then answering it strengthens the case.`),
  q.mc('developing', 'Introductions', 'Beginning an essay with a dictionary definition is generally weak because it:',
    ['Is too short', 'Delays the argument without adding insight', 'Is inaccurate', 'Is off topic'], 1,
    `It fills space where a position should be.`),
  q.mc('ap_ready', 'Thesis', 'A thesis that no reasonable person would dispute is:',
    ['Ideal', 'Not defensible as an argument', 'Sophisticated', 'Required'], 1,
    `If it cannot be argued against, there is nothing to argue.`),
  q.mc('ap_ready', 'Concession', 'Refutation differs from concession because refutation:',
    ['Agrees with the objection', 'Explains why the objection fails', 'Ignores the objection', 'Restates the thesis'], 1,
    `Concede what is fair, refute what is not.`),
  q.sa('developing', 'Tone', `A tone that says the opposite of what is meant, for effect, is called ______. (one word)`,
    ['irony', 'ironic'], `Sarcasm is one pointed form of it.`),
);

q.inUnit(2); // Claims & Evidence: Reading
out.push(
  q.mc('foundation', 'Claims', 'A claim of fact asserts that something:',
    ['Should be done', 'Is or is not the case', 'Is good or bad', 'Is beautiful'], 1,
    `Claims of value judge; claims of policy prescribe; claims of fact assert.`),
  q.mc('foundation', 'Evidence types', 'An anecdote is evidence that is:',
    ['Statistical', 'A brief illustrative story', 'A definition', 'An expert opinion'], 1,
    `Vivid but limited — one case cannot establish a general pattern.`),
  q.mc('developing', 'Commentary', 'Commentary in an analysis should explain:',
    ['What the evidence says', 'How the evidence supports the claim', 'Who wrote it', 'When it was written'], 1,
    `Evidence without commentary is quotation, not analysis.`),
  q.mc('developing', 'Evaluating', 'Evidence is most persuasive when it is:',
    ['Recent only', 'Relevant, sufficient and credible', 'Lengthy', 'Emotional'], 1,
    `All three tests matter; failing any one weakens the argument.`),
  q.mc('developing', 'Claims', 'A claim of policy is signalled by words such as:',
    ['Is', 'Should or must', 'Beautiful', 'Was'], 1,
    `Prescriptive language marks a policy claim.`),
  q.mc('ap_ready', 'Evaluating', 'A writer citing only sources that agree with them is committing:',
    ['A logical fallacy of cherry-picking', 'Effective synthesis', 'Concession', 'Qualification'], 0,
    `Selective evidence gives a misleading impression of the whole.`),
  q.mc('ap_ready', 'Commentary', 'The strongest commentary connects the evidence to:',
    ['The next quotation', 'The thesis and the line of reasoning', 'The word count', 'The author\'s biography'], 1,
    `Each paragraph should visibly advance the overall argument.`),
  q.sa('developing', 'Evidence types', `Evidence drawn from a recognised specialist is called expert ______. (one word)`,
    ['testimony', 'opinion'], `Its force depends on the expert\'s relevance to the specific claim.`),
);

q.inUnit(3); // Claims & Evidence: Writing
out.push(
  q.mc('foundation', 'Integration', 'A quotation should be introduced with:',
    ['Nothing', 'A signal phrase giving context', 'A page number only', 'A question'], 1,
    `Dropped quotations leave the reader to guess why they are there.`),
  q.mc('foundation', 'Attribution', 'Attributing a source in the text means naming:',
    ['The page number only', 'The author or source of the idea', 'The publisher', 'The date only'], 1,
    `It also lets you characterise the source\'s authority as you use it.`),
  q.mc('developing', 'Selection', 'Choosing evidence should be governed by:',
    ['How long it is', 'How well it supports the specific claim', 'How famous the author is', 'How recent it is'], 1,
    `Relevance beats reputation.`),
  q.mc('developing', 'Qualification', 'Qualifying a claim means:',
    ['Abandoning it', 'Limiting it to the cases where it holds', 'Repeating it', 'Strengthening it absolutely'], 1,
    `"In most cases" is often more defensible than "always".`),
  q.mc('developing', 'Integration', 'A block quotation is appropriate when:',
    ['Any quotation is used', 'The passage is long and its full wording matters', 'You are short of words', 'The source is famous'], 1,
    `Otherwise, quote selectively and weave it into your own sentence.`),
  q.mc('ap_ready', 'Qualification', 'Absolute claims such as "always" and "never" are risky because:',
    ['They are too short', 'A single counterexample defeats them', 'They are informal', 'They are unclear'], 1,
    `Qualified claims are harder to refute and usually more accurate.`),
  q.mc('ap_ready', 'Attribution', 'Using a source\'s idea without attribution is:',
    ['Good style', 'Plagiarism', 'Synthesis', 'Paraphrase'], 1,
    `Paraphrasing still requires attribution.`),
  q.sa('developing', 'Integration', `Restating a source's idea in your own words is called ______. (one word)`,
    ['paraphrasing', 'paraphrase'], `It still needs attribution, even without quotation marks.`),
);

q.inUnit(4); // Reasoning & Organization
out.push(
  q.mc('foundation', 'Organisation', 'The line of reasoning is:',
    ['The order of the sources', 'The logical progression of the argument', 'The word count', 'The thesis alone'], 1,
    `Each paragraph should follow from the one before toward the conclusion.`),
  q.mc('foundation', 'Transitions', 'Transitions primarily serve to:',
    ['Add length', 'Signal the relationship between ideas', 'Introduce quotations', 'Conclude'], 1,
    `"However" and "therefore" tell the reader what kind of move is being made.`),
  q.mc('developing', 'Fallacies', 'Attacking the person instead of the argument is the fallacy of:',
    ['Straw man', 'Ad hominem', 'False dilemma', 'Slippery slope'], 1,
    `The claim stands or falls on its own merits.`),
  q.mc('developing', 'Reasoning patterns', 'Reasoning from specific cases to a general conclusion is:',
    ['Deductive', 'Inductive', 'Circular', 'Analogical'], 1,
    `Induction generalises; deduction applies a general rule to a case.`),
  q.mc('developing', 'Fallacies', 'Misrepresenting an opponent\'s position to make it easier to attack is the:',
    ['Straw man fallacy', 'Ad hominem fallacy', 'Appeal to authority', 'False analogy'], 0,
    `The refuted position is not the one actually held.`),
  q.mc('ap_ready', 'Organisation', 'Paragraph order matters most because it:',
    ['Fills the page', 'Builds the argument cumulatively', 'Shows research', 'Varies the tone'], 1,
    `A well-ordered argument makes each step feel earned.`),
  q.mc('ap_ready', 'Reasoning patterns', 'A false dilemma presents:',
    ['Two options when more exist', 'Too much evidence', 'An irrelevant authority', 'A personal attack'], 0,
    `Framing a choice as either-or hides the alternatives.`),
  q.sa('developing', 'Fallacies', `Arguing that one small step will inevitably lead to disaster is the ______ slope fallacy. (one word)`,
    ['slippery'], `The chain of consequences is asserted rather than shown.`),
);

q.inUnit(5); // Style: Reading
out.push(
  q.mc('foundation', 'Diction', 'Diction refers to a writer\'s choice of:',
    ['Sentence length', 'Words', 'Paragraph order', 'Punctuation'], 1,
    `Formal or colloquial, abstract or concrete — all are diction choices.`),
  q.mc('foundation', 'Syntax', 'Syntax refers to:',
    ['Word choice', 'Sentence structure and arrangement', 'Tone', 'Genre'], 1,
    `Short sentences accelerate; long ones accumulate.`),
  q.mc('developing', 'Figurative language', 'A metaphor differs from a simile because it:',
    ['Uses "like" or "as"', 'States the comparison directly', 'Is longer', 'Is literal'], 1,
    `"He is a lion" rather than "he is like a lion".`),
  q.mc('developing', 'Effect', 'Analysing style means explaining not just what a device is but:',
    ['Who invented it', 'What effect it produces on the reader', 'How common it is', 'Its Latin name'], 1,
    `Naming a device without its effect earns nothing.`),
  q.mc('developing', 'Syntax', 'A series of short declarative sentences most often creates a sense of:',
    ['Leisure', 'Urgency or emphasis', 'Confusion', 'Formality'], 1,
    `Clipped syntax quickens the pace.`),
  q.mc('ap_ready', 'Figurative language', 'Anaphora is the repetition of a word or phrase at the:',
    ['End of clauses', 'Beginning of successive clauses', 'Middle of sentences', 'End of the essay'], 1,
    `It builds rhythm and emphasis, as in "I have a dream".`),
  q.mc('ap_ready', 'Diction', 'A shift from formal to colloquial diction usually signals a change in:',
    ['Topic only', 'Tone or relationship with the audience', 'Genre', 'Length'], 1,
    `Style shifts are almost always doing rhetorical work.`),
  q.sa('developing', 'Figurative language', `Deliberate exaggeration for effect is called ______. (one word)`,
    ['hyperbole'], `Understatement is its opposite.`),
);

q.inUnit(6); // Style: Writing
out.push(
  q.mc('foundation', 'Clarity', 'The clearest sentences usually favour:',
    ['Passive voice', 'Active voice with concrete subjects', 'Long noun strings', 'Abstract nouns'], 1,
    `An active subject doing something is easier to follow.`),
  q.mc('foundation', 'Variety', 'Sentence variety improves writing because it:',
    ['Adds length', 'Controls pace and emphasis', 'Shows vocabulary', 'Avoids commas'], 1,
    `Uniform sentence length flattens emphasis.`),
  q.mc('developing', 'Voice', 'Voice in writing refers to:',
    ['Volume', 'The distinctive personality on the page', 'Grammar', 'Punctuation'], 1,
    `It emerges from consistent diction, syntax and stance.`),
  q.mc('developing', 'Precision', 'Replacing "very important" with a stronger single word improves:',
    ['Length', 'Precision', 'Tone only', 'Structure'], 1,
    `"Crucial" or "decisive" carries the meaning without the intensifier.`),
  q.mc('developing', 'Clarity', 'Wordiness most often comes from:',
    ['Short sentences', 'Redundancy and unnecessary qualifiers', 'Active voice', 'Concrete nouns'], 1,
    `Cutting what repeats itself usually sharpens the point.`),
  q.mc('ap_ready', 'Voice', 'Sophistication in an AP essay is most often earned by:',
    ['Long words', 'Consistent, purposeful style and nuanced argument', 'More quotations', 'A longer conclusion'], 1,
    `The point rewards vivid, persuasive control, not vocabulary display.`),
  q.mc('ap_ready', 'Precision', 'Passive voice is appropriate when:',
    ['Always', 'The actor is unknown or unimportant', 'Never', 'The sentence is long'], 1,
    `"The samples were contaminated" is fine when who did it does not matter.`),
  q.sa('developing', 'Variety', `A sentence that places the main clause at the end for suspense is called a ______ sentence. (one word)`,
    ['periodic'], `A loose or cumulative sentence does the opposite.`),
);

q.inUnit(7); // Synthesis Argument
out.push(
  q.mc('foundation', 'Purpose', 'The synthesis essay asks you to:',
    ['Summarise the sources', 'Develop your own argument using the sources', 'Rank the sources', 'Quote every source'], 1,
    `The sources support your position; they do not replace it.`),
  q.mc('foundation', 'Citation', 'Sources in the synthesis essay should be cited:',
    ['With full bibliographies', 'By their given labels or authors', 'Not at all', 'Only if quoted'], 1,
    `Source A or the author\'s name is enough.`),
  q.mc('developing', 'Conversation', 'Treating the sources as a conversation means:',
    ['Quoting each in order', 'Showing how they agree, disagree and qualify each other', 'Summarising each', 'Ignoring disagreement'], 1,
    `Your argument arbitrates between them rather than listing them.`),
  q.mc('developing', 'Common error', 'The most common synthesis mistake is:',
    ['Using too few words', 'Summarising sources one by one with no argument', 'Citing too often', 'Being too specific'], 1,
    `A source-by-source tour has no line of reasoning of its own.`),
  q.mc('developing', 'Purpose', 'The minimum number of sources you should incorporate is usually:',
    ['One', 'Three', 'All of them', 'None'], 1,
    `Three is the usual floor, and using more well is generally stronger.`),
  q.mc('ap_ready', 'Conversation', 'A source that contradicts your position is best used to:',
    ['Be ignored', 'Be conceded and then answered', 'Be quoted approvingly', 'End the essay'], 1,
    `Engaging opposition is one of the clearest routes to sophistication.`),
  q.mc('ap_ready', 'Citation', 'Using a source without indicating where its idea ends and yours begins:',
    ['Is good style', 'Confuses attribution and weakens the essay', 'Saves time', 'Is required'], 1,
    `The reader must always know whose claim they are reading.`),
  q.sa('developing', 'Common error', `An essay that only reports what sources say, without an argument, is a ______ rather than a synthesis. (one word)`,
    ['summary'], `The argument is what makes it synthesis.`),
);

q.inUnit(8); // Rhetorical Analysis
out.push(
  q.mc('foundation', 'Task', 'A rhetorical analysis essay explains:',
    ['Whether you agree with the text', 'How the writer builds their argument', 'What the text is about', 'The author\'s biography'], 1,
    `The subject of analysis is the writer\'s choices, not the topic.`),
  q.mc('foundation', 'Structure', 'A rhetorical analysis is usually best organised by:',
    ['Listing devices alphabetically', 'Following the writer\'s line of reasoning', 'Length of quotation', 'Chronology of the author\'s life'], 1,
    `Moving with the text keeps the analysis coherent.`),
  q.mc('developing', 'Common error', 'Naming a device without explaining its effect is called:',
    ['Analysis', 'Device-spotting', 'Synthesis', 'Concession'], 1,
    `It identifies without analysing and earns little credit.`),
  q.mc('developing', 'Sophistication', 'Sophistication in rhetorical analysis often comes from:',
    ['More devices named', 'Explaining the significance of the writer\'s choices in context', 'A longer essay', 'More quotations'], 1,
    `Situating choices in the rhetorical situation is what elevates the analysis.`),
  q.mc('developing', 'Task', 'The thesis of a rhetorical analysis should identify:',
    ['The topic', 'The writer\'s choices and their purpose', 'Your own opinion', 'The publication'], 1,
    `It states what the writer does and to what end.`),
  q.mc('ap_ready', 'Structure', 'Analysing a shift in tone is valuable because a shift usually marks:',
    ['A printing error', 'A change in strategy or audience relationship', 'The conclusion', 'A new author'], 1,
    `Shifts are where the writer changes tactics, which is worth explaining.`),
  q.mc('ap_ready', 'Sophistication', 'Analysis improves when a claim about a device is followed by:',
    ['Another device', 'The specific effect on this audience', 'A longer quotation', 'The device\'s definition'], 1,
    `Effect on the intended audience is what turns identification into analysis.`),
  q.sa('developing', 'Common error', `A rhetorical analysis should focus on the writer's choices rather than your own ______ with the argument. (one word)`,
    ['agreement', 'opinion'], `Whether the argument convinces you is a different essay.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Timing', 'The exam allows a 15-minute reading period intended mainly for:',
    ['Writing the essay', 'Reading the synthesis sources and planning', 'Resting', 'Checking answers'], 1,
    `Planning during the reading period pays for itself in the writing.`),
  q.mc('foundation', 'Planning', 'A brief outline before writing helps most by:',
    ['Adding length', 'Fixing the line of reasoning before you commit', 'Impressing the reader', 'Saving ink'], 1,
    `Two minutes of planning prevents a disorganised middle.`),
  q.mc('developing', 'Multiple choice', 'On the reading multiple-choice section, answers should be based on:',
    ['Outside knowledge', 'What the passage actually says', 'Your opinion', 'The longest option'], 1,
    `Every answer is defensible from the text.`),
  q.mc('developing', 'Revision', 'With five minutes left, the best use of time is usually to:',
    ['Start a new paragraph', 'Fix the thesis and clarify unclear sentences', 'Add a quotation', 'Recopy the essay'], 1,
    `A clear thesis and readable prose are worth more than one more example.`),
  q.mc('developing', 'Multiple choice', 'A question asking about the function of a paragraph is asking:',
    ['What it says', 'What work it does in the argument', 'Who wrote it', 'How long it is'], 1,
    `Function questions are about purpose, not content.`),
  q.mc('ap_ready', 'Timing', 'Spending too long on one essay is costly because:',
    ['Essays are scored together', 'Each essay is scored separately and an unfinished one loses more', 'Length is scored', 'Readers prefer short essays'], 1,
    `Three adequate essays beat one excellent and one unfinished.`),
  q.mc('ap_ready', 'Revision', 'An essay with a strong argument but rough grammar generally scores:',
    ['Zero', 'Well, provided the argument is clear', 'Lower than a polished essay with no argument', 'The same as a blank'], 1,
    `Scoring rewards argument and evidence; errors matter only when they obscure meaning.`),
  q.sa('foundation', 'Planning', `Because there is no penalty for a wrong answer, you should never leave a question ______. (one word)`,
    ['blank', 'unanswered'], `An educated guess is strictly better than nothing.`),
);

export const apEngLangQuestions = out;
