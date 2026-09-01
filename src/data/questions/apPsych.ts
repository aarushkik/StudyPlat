import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP Psychology — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-psych');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Biological Bases of Behavior
out.push(
  q.mc('foundation', 'Neurons', 'The gap between two neurons across which signals pass is the:',
    ['Axon', 'Synapse', 'Dendrite', 'Myelin sheath'], 1,
    `Neurotransmitters cross the synaptic gap to reach the next neuron's receptors.`),
  q.mc('foundation', 'Brain regions', 'Which brain structure is most associated with balance and coordinated movement?',
    ['Cerebellum', 'Hippocampus', 'Amygdala', 'Hypothalamus'], 0,
    `The cerebellum coordinates movement and balance.`),
  q.mc('developing', 'Neurotransmitters', 'Dopamine is most closely associated with:',
    ['Reward and movement', 'Digestion only', 'Blood clotting', 'Bone growth'], 0,
    `Dopamine pathways underpin reward learning and motor control.`),
  q.mc('ap_ready', 'Nervous system', 'The sympathetic nervous system is responsible for:',
    ['Rest and digestion', 'Arousing the body for action', 'Storing memories', 'Producing speech'], 1,
    `It drives the fight-or-flight response; the parasympathetic branch calms the body afterward.`),
);

q.inUnit(1); // Sensation & Perception
out.push(
  q.mc('foundation', 'Definitions', 'Sensation differs from perception in that sensation is:',
    ['The interpretation of stimuli', 'The detection of stimuli by receptors', 'A form of memory', 'Always conscious'], 1,
    `Sensation detects; perception organises and interprets.`),
  q.mc('foundation', 'Thresholds', 'The absolute threshold is the:',
    ['Largest detectable stimulus', 'Smallest stimulus detectable half the time', 'Difference between two stimuli', 'Point of sensory overload'], 1,
    `It is defined at 50% detection, not at certainty.`),
  q.mc('developing', 'Adaptation', 'Ceasing to notice a constant smell after a few minutes is:',
    ['Sensory adaptation', 'Selective attention', 'Perceptual set', 'Signal detection'], 0,
    `Receptors reduce their response to an unchanging stimulus.`),
  q.mc('ap_ready', 'Perceptual organisation', 'Perceptual set refers to how:',
    ['Receptors fire', 'Expectations shape what we perceive', 'Light enters the eye', 'Sound waves travel'], 1,
    `Prior experience and context predispose us to perceive one interpretation over another.`),
);

q.inUnit(2); // Learning
out.push(
  q.mc('foundation', 'Classical conditioning', 'In Pavlov’s experiment, the bell became a:',
    ['Unconditioned stimulus', 'Conditioned stimulus', 'Unconditioned response', 'Reinforcer'], 1,
    `Pairing the neutral bell with food made it a conditioned stimulus.`),
  q.mc('foundation', 'Reinforcement', 'Negative reinforcement:',
    ['Decreases a behaviour', 'Increases a behaviour by removing something unpleasant', 'Is the same as punishment', 'Has no effect'], 1,
    `Reinforcement always increases behaviour; "negative" means something is taken away.`),
  q.mc('developing', 'Schedules', 'Which reinforcement schedule produces behaviour most resistant to extinction?',
    ['Continuous', 'Fixed ratio', 'Variable ratio', 'Fixed interval'], 2,
    `Unpredictable reward keeps the behaviour going longest once reward stops.`),
  q.mc('ap_ready', 'Observational learning', 'Bandura’s Bobo doll study demonstrated that children:',
    ['Learn only through reinforcement', 'Imitate behaviour they observe', 'Cannot learn aggression', 'Learn only from parents'], 1,
    `Modelling alone was enough to produce imitation, without direct reinforcement.`),
);

q.inUnit(3); // Cognition & Memory
out.push(
  q.mc('foundation', 'Memory stages', 'The three stages of memory are encoding, storage and:',
    ['Rehearsal', 'Retrieval', 'Attention', 'Perception'], 1,
    `Retrieval is getting information back out when it is needed.`),
  q.mc('foundation', 'Short-term memory', 'Short-term memory holds roughly how many items?',
    ['3', '7', '20', 'Unlimited'], 1,
    `Miller's classic estimate is about seven items, plus or minus two.`),
  q.mc('developing', 'Heuristics', 'Judging how likely something is by how easily examples come to mind is the:',
    ['Representativeness heuristic', 'Availability heuristic', 'Anchoring effect', 'Framing effect'], 1,
    `Vivid or recent examples inflate perceived probability.`),
  q.mc('ap_ready', 'Forgetting', 'Proactive interference occurs when:',
    ['New information disrupts old memories', 'Old information disrupts new learning', 'Memories fade with time', 'Retrieval cues are absent'], 1,
    `Proactive means the older learning acts forward onto the new.`),
);

q.inUnit(4); // Motivation & Emotion
out.push(
  q.mc('foundation', 'Maslow', 'In Maslow’s hierarchy, which needs must be met first?',
    ['Esteem', 'Physiological', 'Self-actualisation', 'Belonging'], 1,
    `Basic physical needs form the base of the pyramid.`),
  q.mc('developing', 'Drive theory', 'Drive-reduction theory explains motivation as an attempt to:',
    ['Seek novelty', 'Restore internal balance', 'Maximise arousal', 'Imitate others'], 1,
    `A physiological need creates a drive that pushes toward homeostasis.`),
  q.mc('developing', 'Emotion theories', 'The James-Lange theory proposes that emotion results from:',
    ['Cognitive appraisal alone', 'Awareness of bodily arousal', 'Social context', 'Simultaneous arousal and feeling'], 1,
    `We feel afraid because we notice we are trembling, in this account.`),
  q.mc('ap_ready', 'Intrinsic motivation', 'Rewarding someone for an activity they already enjoy can reduce interest, an effect called:',
    ['The Yerkes-Dodson law', 'The overjustification effect', 'Cognitive dissonance', 'Learned helplessness'], 1,
    `External reward can crowd out the internal reason for doing something.`),
);

q.inUnit(5); // Developmental Psychology
out.push(
  q.mc('foundation', 'Piaget', 'Object permanence develops during Piaget’s:',
    ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'], 0,
    `Infants learn that objects continue to exist when out of sight.`),
  q.mc('foundation', 'Attachment', 'Harlow’s monkey studies showed that attachment depends heavily on:',
    ['Food alone', 'Contact comfort', 'Punishment', 'Visual stimulation'], 1,
    `Infant monkeys preferred the cloth mother even when the wire one provided food.`),
  q.mc('developing', 'Erikson', 'Erikson’s adolescent stage centres on the conflict of:',
    ['Trust vs. mistrust', 'Identity vs. role confusion', 'Integrity vs. despair', 'Autonomy vs. shame'], 1,
    `Adolescence is when identity is worked out, in Erikson's account.`),
  q.mc('ap_ready', 'Parenting', 'Authoritative parenting is characterised by:',
    ['High demands, low warmth', 'High demands and high warmth', 'Low demands, high warmth', 'Low demands, low warmth'], 1,
    `It combines clear expectations with responsiveness — distinct from authoritarian parenting.`),
);

q.inUnit(6); // Personality
out.push(
  q.mc('foundation', 'Big Five', 'Which is NOT one of the Big Five personality traits?',
    ['Openness', 'Conscientiousness', 'Intelligence', 'Neuroticism'], 2,
    `The five are openness, conscientiousness, extraversion, agreeableness and neuroticism.`),
  q.mc('developing', 'Freud', 'In Freud’s model, the component operating on the pleasure principle is the:',
    ['Ego', 'Id', 'Superego', 'Persona'], 1,
    `The id seeks immediate gratification; the ego mediates and the superego moralises.`),
  q.mc('developing', 'Humanistic', 'Carl Rogers argued that healthy development requires:',
    ['Conditional approval', 'Unconditional positive regard', 'Strict discipline', 'Frequent reinforcement'], 1,
    `Acceptance without conditions allows the self-concept to develop congruently.`),
  q.mc('ap_ready', 'Assessment', 'A criticism of projective tests such as the Rorschach is that they:',
    ['Take too long', 'Have low reliability and validity', 'Are too structured', 'Require no training'], 1,
    `Interpretation varies widely between scorers, which limits their scientific usefulness.`),
);

q.inUnit(7); // Clinical Psychology
out.push(
  q.mc('foundation', 'Diagnosis', 'The manual most used to classify psychological disorders in the U.S. is the:',
    ['DSM', 'APA Style Guide', 'MMPI', 'WAIS'], 0,
    `The Diagnostic and Statistical Manual defines diagnostic criteria.`),
  q.mc('developing', 'Anxiety disorders', 'A persistent, irrational fear of a specific object or situation is a:',
    ['Panic disorder', 'Specific phobia', 'Generalised anxiety disorder', 'Obsession'], 1,
    `A phobia is tied to a particular trigger, unlike generalised anxiety.`),
  q.mc('developing', 'Therapy', 'Cognitive behavioural therapy works primarily by:',
    ['Exploring childhood conflicts', 'Changing maladaptive thoughts and behaviours', 'Prescribing medication', 'Free association'], 1,
    `CBT targets the thought-behaviour loop directly.`),
  q.mc('ap_ready', 'Biomedical', 'SSRIs treat depression by affecting the availability of:',
    ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'], 1,
    `Selective serotonin reuptake inhibitors leave more serotonin in the synapse.`),
);

q.inUnit(8); // Social Psychology
out.push(
  q.mc('foundation', 'Attribution', 'The fundamental attribution error is the tendency to:',
    ['Overestimate situational causes for others’ behaviour', 'Overestimate personality causes for others’ behaviour', 'Blame ourselves', 'Ignore behaviour entirely'], 1,
    `We attribute others' actions to character while explaining our own by circumstance.`),
  q.mc('foundation', 'Conformity', 'Asch’s line experiments demonstrated the power of:',
    ['Obedience to authority', 'Group conformity', 'Cognitive dissonance', 'Bystander apathy'], 1,
    `Participants gave obviously wrong answers to match a unanimous group.`),
  q.mc('developing', 'Obedience', 'Milgram’s experiments are best known for showing that:',
    ['People rarely obey', 'Ordinary people will obey authority even against conscience', 'Groups always resist', 'Punishment is ineffective'], 1,
    `A majority continued administering what they believed were dangerous shocks when instructed.`),
  q.mc('ap_ready', 'Bystander effect', 'The bystander effect predicts that as the number of witnesses rises, the likelihood any one helps:',
    ['Rises', 'Falls', 'Stays constant', 'Doubles'], 1,
    `Diffusion of responsibility spreads the obligation thin.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Research methods', 'Only an experiment can establish:',
    ['Correlation', 'Causation', 'Reliability', 'Sample size'], 1,
    `Random assignment and manipulation of a variable are what license a causal claim.`),
  q.mc('developing', 'Correlation', 'A correlation of −0.85 indicates a relationship that is:',
    ['Weak and negative', 'Strong and negative', 'Strong and positive', 'Nonexistent'], 1,
    `The sign gives direction and the magnitude gives strength; 0.85 is strong.`),
  q.mc('developing', 'FRQ format', 'AP Psychology free-response answers are best written as:',
    ['A bulleted list', 'Complete sentences that apply each named term', 'A single paragraph summary', 'Definitions only'], 1,
    `Points are earned for applying the term to the scenario, not for defining it.`),
  q.mc('ap_ready', 'Application', 'An FRQ asks you to "apply" a concept. Simply defining it will:',
    ['Earn the point', 'Not earn the point', 'Earn half a point', 'Earn bonus credit'], 1,
    `Application requires connecting the concept to the specific situation described.`),
);

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Biological Bases of Behavior
out.push(
  q.mc('foundation', 'Neurons', 'Neurotransmitters are released from the axon terminal into the synapse by:',
    ['Diffusion through the membrane', 'Vesicles fusing with the membrane', 'Active transport pumps', 'The myelin sheath'], 1,
    `Vesicles release their contents when the action potential arrives.`),
  q.mc('foundation', 'Brain regions', 'The brain region most associated with balance and coordinated movement is the:',
    ['Cerebellum', 'Hippocampus', 'Amygdala', 'Hypothalamus'], 0,
    `The cerebellum fine-tunes movement and posture.`),
  q.mc('developing', 'Neurotransmitters', 'Low levels of serotonin are most associated with:',
    ['Muscle movement', 'Depressed mood', 'Vision', 'Digestion'], 1,
    `SSRIs target serotonin for exactly this reason.`),
  q.mc('developing', 'Nervous system', 'The parasympathetic nervous system is responsible for:',
    ['Fight or flight arousal', 'Calming the body and conserving energy', 'Language production', 'Sensation'], 1,
    `It returns the body to baseline after arousal.`),
  q.mc('developing', 'Brain regions', 'Damage to the hippocampus most directly impairs:',
    ['Old memories', 'Forming new long-term memories', 'Vision', 'Balance'], 1,
    `The hippocampus consolidates new memories rather than storing old ones.`),
  q.mc('ap_ready', 'Neurons', 'The all-or-none principle means a neuron:',
    ['Fires at varying strengths', 'Either fires fully or not at all', 'Never stops firing', 'Fires only in pairs'], 1,
    `Intensity is coded by firing rate, not by the size of each action potential.`),
  q.mc('ap_ready', 'Neurotransmitters', 'An agonist drug works by:',
    ['Blocking a receptor', 'Mimicking or enhancing a neurotransmitter', 'Destroying the axon', 'Removing myelin'], 1,
    `Antagonists block; agonists mimic.`),
  q.sa('developing', 'Neurons', `The fatty covering that speeds signal conduction along an axon is the ______ sheath. (one word)`,
    ['myelin'], `Its loss in multiple sclerosis slows and disrupts conduction.`),
);

q.inUnit(1); // Sensation & Perception
out.push(
  q.mc('foundation', 'Definitions', 'Sensation refers to detecting stimuli; perception refers to:',
    ['Ignoring stimuli', 'Organising and interpreting them', 'Storing them', 'Reacting physically'], 1,
    `Sensation is intake; perception is the interpretation your brain builds from it.`),
  q.mc('foundation', 'Thresholds', 'The absolute threshold is the minimum stimulus detectable:',
    ['Always', '50% of the time', '100% of the time', 'Never'], 1,
    `Detection is probabilistic, so the threshold is defined at half the trials.`),
  q.mc('developing', 'Adaptation', 'No longer noticing a smell after a few minutes is an example of:',
    ['Sensory adaptation', 'Selective attention', 'Perceptual set', 'Signal detection'], 0,
    `Constant unchanging stimuli fade from awareness.`),
  q.mc('developing', 'Perceptual organisation', 'Gestalt closure describes the tendency to:',
    ['Group nearby items', 'Fill in gaps to see whole shapes', 'See motion in still images', 'Focus on one voice'], 1,
    `Your brain completes an incomplete figure into a familiar whole.`),
  q.mc('developing', 'Thresholds', 'The just-noticeable difference is a constant proportion of the stimulus, according to:',
    ['Weber\'s law', 'Fechner\'s law', 'The Yerkes-Dodson law', 'The James-Lange theory'], 0,
    `Weber's law: the JND scales with the size of the original stimulus.`),
  q.mc('ap_ready', 'Perceptual organisation', 'Binocular depth cues rely on:',
    ['One eye only', 'Comparing input from both eyes', 'Colour differences', 'Memory'], 1,
    `Retinal disparity between the two views encodes depth.`),
  q.mc('ap_ready', 'Adaptation', 'Perceptual set means expectations can:',
    ['Have no effect on perception', 'Shape what you perceive', 'Only affect memory', 'Remove sensation'], 1,
    `Context and expectation change how ambiguous input is interpreted.`),
  q.sa('developing', 'Definitions', `Processing that starts with raw sensory input rather than expectations is called ______-up processing. (one word)`,
    ['bottom'], `Top-down processing runs the other way, from expectation to interpretation.`),
);

q.inUnit(2); // Learning
out.push(
  q.mc('foundation', 'Classical conditioning', 'In Pavlov\'s experiment, the food was the:',
    ['Conditioned stimulus', 'Unconditioned stimulus', 'Conditioned response', 'Neutral stimulus'], 1,
    `Food naturally produced salivation without any learning.`),
  q.mc('foundation', 'Reinforcement', 'Negative reinforcement is best described as:',
    ['Adding something unpleasant', 'Removing something unpleasant to increase behaviour', 'Punishment', 'Extinction'], 1,
    `Negative means removal; reinforcement always increases behaviour.`),
  q.mc('developing', 'Schedules', 'The reinforcement schedule most resistant to extinction is:',
    ['Fixed ratio', 'Variable ratio', 'Fixed interval', 'Continuous'], 1,
    `Unpredictable payoffs keep the behaviour going long after reinforcement stops.`),
  q.mc('developing', 'Observational learning', 'Bandura\'s Bobo doll study demonstrated learning through:',
    ['Classical conditioning', 'Observation and imitation', 'Negative reinforcement', 'Insight'], 1,
    `Children copied aggressive behaviour they had merely watched.`),
  q.mc('developing', 'Classical conditioning', 'Extinction in classical conditioning occurs when the conditioned stimulus is:',
    ['Paired more often', 'Presented repeatedly without the unconditioned stimulus', 'Made stronger', 'Changed'], 1,
    `The learned association weakens without reinforcement of the pairing.`),
  q.mc('ap_ready', 'Reinforcement', 'Shaping reinforces:',
    ['Only the final behaviour', 'Successive approximations toward a goal', 'Random behaviours', 'Unwanted behaviours'], 1,
    `Each step closer to the target behaviour is reinforced in turn.`),
  q.mc('ap_ready', 'Schedules', 'A fixed-interval schedule typically produces:',
    ['A steady high rate', 'A scalloped pattern rising before reinforcement', 'No responding', 'Random responding'], 1,
    `Responding drops after reinforcement and climbs as the next interval ends.`),
  q.sa('developing', 'Classical conditioning', `Responding to stimuli similar to the conditioned stimulus is called ______. (one word)`,
    ['generalization', 'generalisation'], `Discrimination is the opposite: responding only to the specific stimulus.`),
);

q.inUnit(3); // Cognition & Memory
out.push(
  q.mc('foundation', 'Memory stages', 'The three stages of memory in order are:',
    ['Storage, encoding, retrieval', 'Encoding, storage, retrieval', 'Retrieval, encoding, storage', 'Encoding, retrieval, storage'], 1,
    `Get it in, keep it, get it back out.`),
  q.mc('foundation', 'Short-term memory', 'Information is held in short-term memory for roughly:',
    ['A fraction of a second', 'About twenty seconds without rehearsal', 'An hour', 'Indefinitely'], 1,
    `Rehearsal is what extends it beyond that window.`),
  q.mc('developing', 'Heuristics', 'Judging how common something is by how easily examples come to mind is the:',
    ['Representativeness heuristic', 'Availability heuristic', 'Anchoring effect', 'Framing effect'], 1,
    `Vivid or recent events feel more common than they are.`),
  q.mc('developing', 'Forgetting', 'Proactive interference is when:',
    ['New learning disrupts old memories', 'Old learning disrupts new memories', 'Memories fade with time', 'Cues are absent'], 1,
    `Proactive works forward: what you learned first gets in the way.`),
  q.mc('developing', 'Memory stages', 'Rehearsing information by linking it to existing knowledge is called:',
    ['Maintenance rehearsal', 'Elaborative rehearsal', 'Chunking', 'Priming'], 1,
    `Elaborative rehearsal produces far more durable memories than simple repetition.`),
  q.mc('ap_ready', 'Heuristics', 'Confirmation bias is the tendency to:',
    ['Seek evidence that supports existing beliefs', 'Change beliefs easily', 'Ignore all evidence', 'Overestimate risk'], 0,
    `Contradicting evidence is discounted or not sought at all.`),
  q.mc('ap_ready', 'Forgetting', 'The serial position effect predicts best recall for items:',
    ['In the middle', 'At the beginning and end', 'At the end only', 'Chosen at random'], 1,
    `Primacy and recency together produce the characteristic U-shaped curve.`),
  q.sa('developing', 'Short-term memory', `Grouping items into meaningful units to hold more in short-term memory is called ______. (one word)`,
    ['chunking'], `A phone number is easier as three chunks than as ten digits.`),
);

q.inUnit(4); // Motivation & Emotion
out.push(
  q.mc('foundation', 'Maslow', 'At the base of Maslow\'s hierarchy are:',
    ['Esteem needs', 'Physiological needs', 'Self-actualisation', 'Love and belonging'], 1,
    `Food, water and sleep must be met before higher needs become motivating.`),
  q.mc('foundation', 'Drive theory', 'Drive-reduction theory says behaviour is motivated by the need to:',
    ['Increase arousal', 'Restore homeostasis', 'Seek novelty', 'Imitate others'], 1,
    `A physiological need creates a drive that behaviour acts to reduce.`),
  q.mc('developing', 'Emotion theories', 'The James-Lange theory holds that emotion follows:',
    ['Cognitive appraisal', 'Physiological arousal', 'Social context', 'Memory'], 1,
    `You feel afraid because your heart is racing, not the reverse.`),
  q.mc('developing', 'Intrinsic motivation', 'Rewarding an already enjoyable activity can reduce interest in it — this is the:',
    ['Overjustification effect', 'Yerkes-Dodson law', 'Halo effect', 'Zeigarnik effect'], 0,
    `The external reward crowds out the internal reason for doing it.`),
  q.mc('developing', 'Emotion theories', 'The Schachter-Singer two-factor theory adds which element to arousal?',
    ['Memory', 'Cognitive label', 'Reflex', 'Genetics'], 1,
    `Arousal plus an interpretation of its cause produces the specific emotion.`),
  q.mc('ap_ready', 'Drive theory', 'The Yerkes-Dodson law states that performance is best at:',
    ['Very low arousal', 'Moderate arousal', 'Maximum arousal', 'Zero arousal'], 1,
    `Too little and you are unmotivated; too much and you are impaired.`),
  q.mc('ap_ready', 'Intrinsic motivation', 'Intrinsic motivation means doing something:',
    ['For a reward', 'For its own sake', 'To avoid punishment', 'Because of social pressure'], 1,
    `The activity itself is the reason.`),
  q.sa('developing', 'Maslow', `The need at the very top of Maslow's hierarchy is self-______. (one word)`,
    ['actualization', 'actualisation'], `Realising one\'s full potential sits above esteem.`),
);

q.inUnit(5); // Developmental Psychology
out.push(
  q.mc('foundation', 'Piaget', 'Object permanence develops during Piaget\'s:',
    ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'], 0,
    `Understanding that hidden objects still exist emerges in the first two years.`),
  q.mc('foundation', 'Attachment', 'Harlow\'s monkey studies showed that attachment depends more on:',
    ['Food', 'Comfort and contact', 'Punishment', 'Genetics alone'], 1,
    `Infant monkeys preferred the cloth mother to the wire one that fed them.`),
  q.mc('developing', 'Piaget', 'Conservation — knowing quantity stays the same despite shape — appears in the:',
    ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'], 2,
    `Around ages 7 to 11, children stop being fooled by the tall thin glass.`),
  q.mc('developing', 'Erikson', 'Erikson\'s adolescent stage centres on:',
    ['Trust versus mistrust', 'Identity versus role confusion', 'Integrity versus despair', 'Autonomy versus shame'], 1,
    `Working out who you are is the adolescent task in his scheme.`),
  q.mc('developing', 'Parenting', 'Authoritarian parenting is characterised by:',
    ['High demands with low warmth', 'High demands with high warmth', 'Low demands with high warmth', 'Low demands with low warmth'], 0,
    `Strict rules without responsiveness — distinct from authoritative.`),
  q.mc('ap_ready', 'Attachment', 'In the Strange Situation, a securely attached infant typically:',
    ['Ignores the caregiver', 'Is distressed at separation and comforted on return', 'Is never distressed', 'Resists all contact'], 1,
    `Using the caregiver as a secure base is the marker.`),
  q.mc('ap_ready', 'Piaget', 'Abstract and hypothetical reasoning defines the:',
    ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'], 3,
    `Formal operations allow reasoning about possibilities rather than only actualities.`),
  q.sa('developing', 'Piaget', `Fitting new information into an existing mental framework is called ______. (one word)`,
    ['assimilation'], `Accommodation is the opposite: changing the framework to fit new information.`),
);

q.inUnit(6); // Personality
out.push(
  q.mc('foundation', 'Big Five', 'Which is NOT one of the Big Five traits?',
    ['Openness', 'Conscientiousness', 'Intelligence', 'Neuroticism'], 2,
    `OCEAN: openness, conscientiousness, extraversion, agreeableness, neuroticism.`),
  q.mc('foundation', 'Freud', 'In Freud\'s model, the component operating on the pleasure principle is the:',
    ['Ego', 'Id', 'Superego', 'Persona'], 1,
    `The id demands immediate gratification.`),
  q.mc('developing', 'Humanistic', 'Rogers described the gap between how a person sees themselves and who they wish to be as the gap between the:',
    ['Id and superego', 'Real self and ideal self', 'Conscious and unconscious', 'Trait and state'], 1,
    `A large gap predicts lower wellbeing in his account.`),
  q.mc('developing', 'Freud', 'The ego operates on the:',
    ['Pleasure principle', 'Reality principle', 'Morality principle', 'Learning principle'], 1,
    `It mediates between the id\'s demands and what the world allows.`),
  q.mc('developing', 'Assessment', 'A projective test such as the Rorschach assumes that:',
    ['Answers are objectively scored', 'Ambiguous stimuli reveal inner conflicts', 'Traits are inherited', 'Behaviour is learned'], 1,
    `Its reliability and validity are widely criticised for exactly this reason.`),
  q.mc('ap_ready', 'Big Five', 'The Big Five trait most associated with organisation and dependability is:',
    ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness'], 1,
    `It predicts academic and job performance better than the others.`),
  q.mc('ap_ready', 'Assessment', 'The MMPI differs from projective tests because it is:',
    ['Unstructured', 'Empirically derived and objectively scored', 'Based on dreams', 'A physiological measure'], 1,
    `Items were selected because they actually discriminated between groups.`),
  q.sa('developing', 'Humanistic', `Rogers used the term self-______ for a person's overall view of who they are. (one word)`,
    ['concept'], `A large gap between the real and ideal self predicts poorer wellbeing.`),
);

q.inUnit(7); // Clinical Psychology
out.push(
  q.mc('foundation', 'Diagnosis', 'The manual used to classify psychological disorders in the United States is the:',
    ['DSM', 'MMPI', 'WAIS', 'APA'], 0,
    `The Diagnostic and Statistical Manual of Mental Disorders.`),
  q.mc('foundation', 'Anxiety disorders', 'A specific phobia is characterised by:',
    ['Generalised worry', 'Intense fear of a particular object or situation', 'Repetitive rituals', 'Loss of memory'], 1,
    `The fear is out of proportion to the actual danger and is narrowly focused.`),
  q.mc('developing', 'Therapy', 'Cognitive behavioural therapy focuses on:',
    ['Unconscious conflicts', 'Changing thought patterns and behaviours', 'Medication only', 'Childhood dreams'], 1,
    `It targets the thoughts and actions maintaining the problem now.`),
  q.mc('developing', 'Biomedical', 'SSRIs treat depression by affecting levels of:',
    ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'], 1,
    `Selective serotonin reuptake inhibitors keep serotonin in the synapse longer.`),
  q.mc('developing', 'Anxiety disorders', 'Obsessive-compulsive disorder involves:',
    ['Intrusive thoughts and repetitive behaviours', 'Persistent low mood only', 'Hallucinations', 'Memory loss'], 0,
    `Compulsions are performed to reduce the anxiety the obsessions create.`),
  q.mc('ap_ready', 'Therapy', 'Systematic desensitisation treats phobias by pairing relaxation with:',
    ['Sudden full exposure', 'A gradual hierarchy of feared situations', 'Medication', 'Free association'], 1,
    `Gradual exposure while relaxed replaces the fear response.`),
  q.mc('ap_ready', 'Diagnosis', 'The biopsychosocial model explains disorders as arising from:',
    ['Biology alone', 'Interacting biological, psychological and social factors', 'Social factors alone', 'Choice'], 1,
    `No single level of explanation is treated as sufficient.`),
  q.sa('developing', 'Biomedical', `Antipsychotic medications most often reduce activity of the neurotransmitter ______. (one word)`,
    ['dopamine'], `Excess dopamine activity is linked to positive symptoms of schizophrenia.`),
);

q.inUnit(8); // Social Psychology
out.push(
  q.mc('foundation', 'Attribution', 'The fundamental attribution error is overestimating the role of:',
    ['Situation', 'Personality', 'Genetics', 'Chance'], 1,
    `We explain others\' behaviour by who they are and our own by circumstances.`),
  q.mc('foundation', 'Conformity', 'Asch\'s line studies demonstrated conformity to:',
    ['An authority figure', 'A unanimous group', 'A reward', 'A written rule'], 1,
    `Participants agreed with an obviously wrong majority.`),
  q.mc('developing', 'Obedience', 'Milgram\'s obedience study found that most participants:',
    ['Refused immediately', 'Continued to the highest shock level', 'Left the room', 'Reversed roles'], 1,
    `Around two thirds continued when instructed by the experimenter.`),
  q.mc('developing', 'Bystander effect', 'The bystander effect predicts that help is least likely when:',
    ['One person is present', 'Many people are present', 'The victim is known', 'It is quiet'], 1,
    `Responsibility diffuses across the group.`),
  q.mc('developing', 'Conformity', 'Groupthink occurs when a group prioritises:',
    ['Accuracy over harmony', 'Harmony over critical evaluation', 'Individual dissent', 'Outside opinions'], 1,
    `Dissent is suppressed to preserve consensus, and decision quality falls.`),
  q.mc('ap_ready', 'Attribution', 'The self-serving bias means people attribute their successes to:',
    ['Luck', 'Internal factors and failures to external ones', 'Others', 'The situation'], 1,
    `Credit goes inward, blame goes outward.`),
  q.mc('ap_ready', 'Obedience', 'Cognitive dissonance is reduced most often by:',
    ['Changing the behaviour or the attitude', 'Ignoring the conflict entirely', 'Increasing arousal', 'Seeking punishment'], 0,
    `The discomfort pushes toward realigning belief and action.`),
  q.sa('developing', 'Bystander effect', `The spreading of responsibility across a crowd is called ______ of responsibility. (one word)`,
    ['diffusion'], `The larger the group, the less any individual feels obliged to act.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Research methods', 'Random assignment is what allows a study to establish:',
    ['Correlation', 'Causation', 'Reliability', 'Validity of a survey'], 1,
    `It rules out pre-existing differences between groups.`),
  q.mc('foundation', 'Correlation', 'A correlation cannot establish causation because of the possibility of:',
    ['Random assignment', 'A third variable', 'A large sample', 'Replication'], 1,
    `An unmeasured variable may drive both of the correlated measures.`),
  q.mc('developing', 'FRQ format', 'AP Psychology free-response answers should:',
    ['Be written as a list of terms', 'Define the term and apply it to the scenario', 'Include a diagram', 'Be a single sentence'], 1,
    `Definition alone rarely scores; application to the prompt is what earns the point.`),
  q.mc('developing', 'Research methods', 'A double-blind procedure controls for:',
    ['Sampling error', 'Experimenter and participant expectations', 'Low sample size', 'Attrition'], 1,
    `Neither side knows the condition, so expectations cannot bias the result.`),
  q.mc('developing', 'Correlation', 'A scatterplot with points scattered randomly suggests a correlation near:',
    ['+1', '0', '−1', '+0.8'], 1,
    `No systematic relationship gives a coefficient close to zero.`),
  q.mc('ap_ready', 'Application', 'A question giving a scenario and asking you to apply a concept is testing:',
    ['Recall only', 'Transfer of understanding', 'Reading speed', 'Vocabulary only'], 1,
    `The exam is built around applying familiar ideas to unfamiliar situations.`),
  q.mc('ap_ready', 'FRQ format', 'Writing the term in your answer without using it correctly earns:',
    ['Full credit', 'No credit', 'Half credit', 'Extra credit'], 1,
    `Readers score correct application, not keyword spotting.`),
  q.sa('foundation', 'Research methods', `A variable other than the independent variable that could explain the result is called a ______ variable. (one word)`,
    ['confounding', 'confound'], `Controls and random assignment exist to rule these out.`),
);

export const apPsychQuestions = out;
