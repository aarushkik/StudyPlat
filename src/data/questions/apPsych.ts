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

export const apPsychQuestions = out;
