import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP World History — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-world');
const out: PlacementQuestion[] = [];

q.inUnit(0); // The Global Tapestry
out.push(
  q.mc('foundation', 'Song China', 'The Song dynasty expanded its bureaucracy largely by relying on:',
    ['Hereditary nobility', 'The civil service examination system', 'Foreign advisors', 'Military appointment alone'], 1,
    `Exams based on Confucian texts allowed recruitment on merit and strengthened central control.`),
  q.mc('foundation', 'Belief systems', 'Which belief system emphasised filial piety and a hierarchy of social relationships?',
    ['Buddhism', 'Confucianism', 'Islam', 'Christianity'], 1,
    `Confucianism organised society around five relationships and respect for elders.`),
  q.mc('developing', 'Islamic world', 'A major reason for the spread of Islam across Afro-Eurasia was:',
    ['Forced conversion alone', 'Trade networks and merchant communities', 'Isolation from other regions', 'Rejection of scholarship'], 1,
    `Merchants carried the faith along trade routes, and Muslim scholarship attracted converts.`),
  q.mc('ap_ready', 'The Americas', 'The Inca administered a mountainous empire largely through:',
    ['A single written script', 'Roads, relay runners and the mit’a labour system', 'Naval power', 'Coined currency'], 1,
    `Roads and the mit’a labour obligation let the Inca move goods, people and information without writing or money.`),
);

q.inUnit(1); // Networks of Exchange
out.push(
  q.mc('foundation', 'Silk Roads', 'The Silk Roads primarily connected:',
    ['Europe and the Americas', 'East Asia and the Mediterranean', 'Africa and Australia', 'Only cities within China'], 1,
    `Overland routes linked China through Central Asia to Persia and the Mediterranean.`),
  q.mc('foundation', 'Indian Ocean trade', 'Indian Ocean trade depended most on knowledge of:',
    ['River currents', 'Monsoon winds', 'Canal systems', 'Mountain passes'], 1,
    `Seasonal monsoons determined when ships could sail in each direction.`),
  q.mc('developing', 'The Mongols', 'One consequence of Mongol rule across Eurasia was:',
    ['The end of long-distance trade', 'Safer travel and greater cultural exchange', 'Complete religious uniformity', 'The isolation of China'], 1,
    `The Pax Mongolica lowered the risk of long-distance travel, moving goods, ideas and disease alike.`),
  q.sa('ap_ready', 'Consequences', 'The fourteenth-century pandemic that spread along these trade routes is known as the Black ______. (one word)',
    ['death'], `The Black Death travelled the same networks that carried silk and silver.`),
);

q.inUnit(2); // Land-Based Empires
out.push(
  q.mc('foundation', 'Gunpowder empires', 'The Ottoman, Safavid and Mughal empires are often grouped because they:',
    ['Shared one ruler', 'Used gunpowder weapons to expand and consolidate', 'Were all Christian', 'Avoided all warfare'], 1,
    `Artillery and firearms let each centralise power over large territories.`),
  q.mc('developing', 'Legitimacy', 'Rulers of land-based empires commonly justified their authority through:',
    ['Popular election', 'Religion and monumental architecture', 'Written constitutions', 'Trade guild approval'], 1,
    `Divine sanction, patronage of religion and grand building projects all signalled legitimacy.`),
  q.mc('developing', 'Administration', 'The Ottoman devshirme system recruited administrators and soldiers by:',
    ['Hereditary succession', 'Taking and training boys from conquered Christian populations', 'Open public examination', 'Foreign purchase'], 1,
    `Devshirme created a loyal elite with no independent noble power base.`),
  q.mc('ap_ready', 'Comparison', 'A shared challenge for all three gunpowder empires was:',
    ['Lack of any bureaucracy', 'Governing religiously and ethnically diverse subjects', 'Absence of trade', 'No access to firearms'], 1,
    `Each ruled populations that did not share the dynasty's faith, requiring policies of accommodation or coercion.`),
);

q.inUnit(3); // Transoceanic Connections
out.push(
  q.mc('foundation', 'Columbian Exchange', 'The Columbian Exchange refers to the transfer of:',
    ['Only precious metals', 'Plants, animals, people and diseases between hemispheres', 'Only manufactured goods', 'Only religious ideas'], 1,
    `Crops, livestock, populations and pathogens all moved between the Americas and Afro-Eurasia.`),
  q.mc('foundation', 'Navigation', 'Which technology most helped European sailors determine latitude?',
    ['The astrolabe', 'The printing press', 'The steam engine', 'The telegraph'], 0,
    `The astrolabe measured the angle of the sun or stars above the horizon.`),
  q.mc('developing', 'Coerced labour', 'The encomienda system in Spanish America granted colonists:',
    ['Land only', 'The labour of Indigenous people in a given area', 'Trading monopolies in Europe', 'Naval command'], 1,
    `It was a grant of labour and tribute, nominally in exchange for protection and religious instruction.`),
  q.mc('ap_ready', 'Silver', 'The flow of American silver into global trade most directly:',
    ['Ended long-distance trade', 'Tied the economies of the Americas, Europe and Asia together', 'Isolated China', 'Eliminated inflation'], 1,
    `Silver from Potosí paid for Asian goods, creating the first genuinely global exchange network.`),
);

q.inUnit(4); // Revolutions
out.push(
  q.mc('foundation', 'The Enlightenment', 'Enlightenment thinkers most emphasised:',
    ['Divine right of kings', 'Reason, natural rights and the social contract', 'Feudal obligation', 'Religious uniformity'], 1,
    `Locke, Rousseau and others argued that legitimate government rests on consent.`),
  q.mc('developing', 'Atlantic revolutions', 'The Haitian Revolution was distinctive because it:',
    ['Was led by enslaved people and abolished slavery', 'Restored a monarchy', 'Was entirely peaceful', 'Left the colonial system intact'], 0,
    `It is the only revolution of the era in which enslaved people won both independence and emancipation.`),
  q.mc('developing', 'Industrialisation', 'Britain industrialised first partly because it had:',
    ['No access to coal', 'Coal, capital, colonies and a mobile labour force', 'A ban on machinery', 'No overseas trade'], 1,
    `The combination of resources, finance, markets and available workers is the standard explanation.`),
  q.mc('ap_ready', 'Reactions', 'Marx and Engels argued that industrial society was defined by:',
    ['Harmony between classes', 'Conflict between those who own production and those who work it', 'The absence of classes', 'Religious division alone'], 1,
    `The Communist Manifesto frames history as a struggle between bourgeoisie and proletariat.`),
);

q.inUnit(5); // Consequences of Industrialization
out.push(
  q.mc('foundation', 'New imperialism', 'European powers divided African territory among themselves at the:',
    ['Congress of Vienna', 'Berlin Conference', 'Treaty of Tordesillas', 'Yalta Conference'], 1,
    `The 1884–85 Berlin Conference set the rules for partition without African representation.`),
  q.mc('developing', 'Migration', 'Industrialisation drove mass migration mainly because it:',
    ['Reduced the need for labour everywhere', 'Created demand for labour in some regions and displaced it in others', 'Closed all borders', 'Ended agriculture'], 1,
    `Factory and plantation demand pulled migrants while mechanised agriculture pushed them.`),
  q.mc('developing', 'Resistance', 'The Meiji Restoration is best described as:',
    ['A rejection of all change', 'Rapid state-led industrialisation to resist foreign domination', 'A colonial conquest of Japan', 'A peasant revolt'], 1,
    `Japan industrialised deliberately and quickly in order not to be colonised.`),
  q.mc('ap_ready', 'Economic imperialism', 'Economic imperialism differs from direct colonial rule in that it:',
    ['Requires formal annexation', 'Controls an economy without governing the territory', 'Involves no trade', 'Always fails'], 1,
    `Concessions, loans and unequal treaties gave control without the cost of administration.`),
);

q.inUnit(6); // Global Conflict
out.push(
  q.mc('foundation', 'Total war', 'The term "total war" describes a conflict in which:',
    ['Only professional armies fight', 'Entire economies and civilian populations are mobilised', 'No weapons are used', 'Fighting is limited to one region'], 1,
    `Industrial warfare drew whole societies into the war effort.`),
  q.mc('developing', 'Causes', 'A major structural cause of the First World War was:',
    ['A single assassination alone', 'Alliance systems, militarism and imperial rivalry', 'The absence of nationalism', 'Global disarmament'], 1,
    `The assassination was the trigger; the alliances and rivalries made escalation likely.`),
  q.mc('developing', 'Interwar years', 'The global depression of the 1930s contributed to the rise of:',
    ['Liberal democracy everywhere', 'Authoritarian and fascist movements', 'Complete disarmament', 'The end of nationalism'], 1,
    `Economic collapse discredited existing governments and made radical alternatives attractive.`),
  q.mc('ap_ready', 'Consequences', 'One lasting outcome of the Second World War was:',
    ['The strengthening of European empires', 'Acceleration of decolonisation movements', 'The end of international organisations', 'A return to isolation'], 1,
    `Weakened imperial powers and wartime promises made independence movements far harder to resist.`),
);

q.inUnit(7); // Cold War & Decolonization
out.push(
  q.mc('foundation', 'Cold War', 'The Cold War was primarily a rivalry between:',
    ['Britain and France', 'The United States and the Soviet Union', 'China and Japan', 'India and Pakistan'], 1,
    `Two superpowers with opposing economic and political systems competed without direct war between them.`),
  q.mc('developing', 'Proxy conflicts', 'Cold War proxy wars were fought:',
    ['Directly between the superpowers', 'In third countries backed by each superpower', 'Only in Europe', 'Without weapons'], 1,
    `Korea, Vietnam, Angola and Afghanistan were fought by local forces with superpower backing.`),
  q.mc('developing', 'Decolonisation', 'Indian independence in 1947 was accompanied by:',
    ['A peaceful single state', 'Partition and mass displacement', 'Continued British rule', 'Immediate economic union'], 1,
    `Partition into India and Pakistan displaced millions and caused widespread violence.`),
  q.mc('ap_ready', 'Non-alignment', 'The Non-Aligned Movement sought to:',
    ['Join NATO', 'Avoid committing to either Cold War bloc', 'Restore colonial rule', 'End all trade'], 1,
    `States including India, Egypt and Yugoslavia pursued independence from both blocs.`),
);

q.inUnit(8); // Globalization
out.push(
  q.mc('foundation', 'Definition', 'Globalisation refers most directly to:',
    ['The end of trade', 'Increasing interconnection of economies and cultures', 'The growth of empires', 'A single world government'], 1,
    `Faster movement of goods, capital, people and information ties regions together.`),
  q.mc('developing', 'Technology', 'The container ship changed global trade mainly by:',
    ['Making shipping far cheaper and faster to load', 'Reducing the number of ports', 'Ending air freight', 'Eliminating tariffs'], 0,
    `Standardised containers collapsed loading costs, which restructured where things are made.`),
  q.mc('developing', 'Institutions', 'The World Trade Organization primarily exists to:',
    ['Set national tax rates', 'Negotiate and enforce trade rules between states', 'Command armies', 'Issue currency'], 1,
    `The WTO provides a framework and dispute process for international trade.`),
  q.mc('ap_ready', 'Debate', 'A common critique of globalisation is that its benefits:',
    ['Are shared perfectly evenly', 'Are distributed unevenly within and between countries', 'Do not exist at all', 'Only reach governments'], 1,
    `Gains have been real but uneven, which is the substance of most political argument about it.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'DBQ basics', 'In a document-based question, documents should be used to:',
    ['Summarise each one in turn', 'Support an argument you have already stated', 'Replace a thesis', 'Fill space'], 1,
    `A DBQ is an argument that uses documents as evidence, not a tour of the documents.`),
  q.mc('developing', 'Sourcing', 'Analysing a document’s point of view means considering:',
    ['How long it is', 'Who wrote it, for whom, and why', 'Whether it is in English', 'The font used'], 1,
    `Author, audience, purpose and situation are what earn the sourcing point.`),
  q.mc('developing', 'Contextualisation', 'Contextualisation asks you to:',
    ['List every date you know', 'Situate the topic in broader developments before or around it', 'Quote a document', 'Restate the prompt'], 1,
    `It places the question inside the wider historical moment, briefly but specifically.`),
  q.mc('ap_ready', 'Thesis', 'A strong LEQ thesis must:',
    ['Restate the prompt', 'Make a defensible claim that establishes a line of reasoning', 'List three facts', 'Avoid taking a position'], 1,
    `The rubric rewards a claim that could be argued against and that structures what follows.`),
);

export const apWorldQuestions = out;
