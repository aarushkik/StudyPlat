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

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // The Global Tapestry
out.push(
  q.mc('foundation', 'Song China', 'The Song dynasty expanded its bureaucracy through:',
    ['Hereditary titles', 'The civil service examination system', 'Military appointment', 'Purchase of office'], 1,
    `Exams on Confucian texts recruited officials on tested merit.`),
  q.mc('foundation', 'Belief systems', 'Neo-Confucianism combined Confucian ethics with elements of:',
    ['Christianity', 'Buddhism and Daoism', 'Islam', 'Judaism'], 1,
    `It answered Buddhist metaphysics in Confucian terms.`),
  q.mc('developing', 'Islamic world', 'The Abbasid caliphate is associated with:',
    ['Rejection of Greek learning', 'A flourishing of scholarship and translation', 'Isolation from trade', 'The end of Islam in Persia'], 1,
    `Baghdad became a centre for translating and extending Greek and Indian knowledge.`),
  q.mc('developing', 'The Americas', 'The Inca state managed its empire partly through:',
    ['A written alphabet', 'An extensive road system and rotational labour obligations', 'Maritime trade', 'A cash economy'], 1,
    `Roads, storehouses and the mita labour draft held the empire together.`),
  q.mc('developing', 'Belief systems', 'A shared feature of Christianity, Islam and Buddhism that aided their spread was:',
    ['Restriction to one ethnicity', 'Universal appeal across ethnic lines', 'Prohibition of trade', 'Rejection of writing'], 1,
    `Universalising religions could recruit anyone, which suited trade networks.`),
  q.mc('ap_ready', 'Song China', 'Champa rice contributed to Song population growth because it:',
    ['Grew quickly and allowed multiple harvests', 'Needed no water', 'Was imported from Europe', 'Replaced all other crops'], 0,
    `A fast-ripening, drought-resistant strain raised total output substantially.`),
  q.mc('ap_ready', 'The Americas', 'Aztec chinampas were:',
    ['Floating garden plots', 'Stone temples', 'Trade routes', 'Tax records'], 0,
    `Raised beds in the lake supported dense agriculture around Tenochtitlan.`),
  q.sa('developing', 'Islamic world', `Islamic scholars preserved and extended the learning of ancient ______. (one word)`,
    ['greece'], `Greek philosophy and science reached medieval Europe largely through Arabic transmission.`),
);

q.inUnit(1); // Networks of Exchange
out.push(
  q.mc('foundation', 'Silk Roads', 'Caravanserais along the Silk Roads functioned as:',
    ['Military forts', 'Roadside inns for merchants', 'Temples', 'Tax offices'], 1,
    `Shelter at regular intervals made long-distance overland trade practical.`),
  q.mc('foundation', 'Indian Ocean trade', 'Indian Ocean trade depended above all on:',
    ['Rivers', 'Monsoon wind patterns', 'Canals', 'Overland roads'], 1,
    `Seasonal winds set the entire rhythm of sailing and return.`),
  q.mc('developing', 'The Mongols', 'The Pax Mongolica refers to:',
    ['A peace treaty with Europe', 'A period of safer trade across Eurasia under Mongol rule', 'The end of the Mongol empire', 'A religious reform'], 1,
    `Unified control lowered the risk and cost of crossing the continent.`),
  q.mc('developing', 'Consequences', 'The Black Death spread to Europe largely along:',
    ['Atlantic shipping', 'Trans-Eurasian trade routes', 'Rivers only', 'Pilgrim roads'], 1,
    `The same networks that carried goods carried the plague.`),
  q.mc('developing', 'Silk Roads', 'Bills of exchange and paper money mattered because they:',
    ['Reduced the need to carry coin', 'Ended taxation', 'Replaced trade', 'Slowed commerce'], 0,
    `Credit instruments made long-distance trade far less risky.`),
  q.mc('ap_ready', 'Indian Ocean trade', 'Swahili city-states grew wealthy primarily through:',
    ['Manufacturing', 'Trade linking the African interior to the Indian Ocean', 'Conquest of Arabia', 'Silk production'], 1,
    `Gold, ivory and enslaved people moved outward; textiles and porcelain came in.`),
  q.mc('ap_ready', 'The Mongols', 'A lasting effect of Mongol conquest was:',
    ['Complete cultural isolation', 'Transfer of technologies and ideas across Eurasia', 'The end of the Silk Roads', 'European colonisation of Asia'], 1,
    `Gunpowder and printing among others moved westward under Mongol rule.`),
  q.sa('developing', 'Consequences', `Merchant communities living abroad under their own customs are called merchant ______. (one word)`,
    ['diasporas', 'diaspora'], `They linked distant markets through kin and trust networks.`),
);

q.inUnit(2); // Land-Based Empires
out.push(
  q.mc('foundation', 'Gunpowder empires', 'The Ottoman, Safavid and Mughal empires are grouped together as:',
    ['Maritime empires', 'Gunpowder empires', 'City-states', 'Nomadic confederations'], 1,
    `All three used firearms and artillery to build and hold large land empires.`),
  q.mc('foundation', 'Legitimacy', 'Rulers commonly justified their authority through:',
    ['Elections', 'Religious sanction and monumental architecture', 'Trade agreements', 'Written constitutions'], 1,
    `Mosques, palaces and patronage all advertised divinely sanctioned rule.`),
  q.mc('developing', 'Administration', 'The Ottoman devshirme recruited administrators and soldiers by:',
    ['Open examination', 'Levying Christian boys from the Balkans', 'Hereditary succession', 'Purchase'], 1,
    `Janissaries owed loyalty to the sultan rather than to any noble family.`),
  q.mc('developing', 'Comparison', 'Akbar\'s policy toward non-Muslims in Mughal India involved:',
    ['Forced conversion', 'Religious tolerance and abolishing the jizya tax', 'Expulsion', 'Isolation'], 1,
    `Toleration helped govern a Hindu-majority population.`),
  q.mc('developing', 'Legitimacy', 'The Safavid empire established which branch of Islam as official?',
    ['Sunni', 'Shia', 'Sufi only', 'Ibadi'], 1,
    `Shia identity distinguished Safavid Persia from its Ottoman rival.`),
  q.mc('ap_ready', 'Administration', 'Tax farming was used by land empires because it:',
    ['Raised revenue without a large bureaucracy', 'Reduced total taxes', 'Ended corruption', 'Encouraged trade'], 0,
    `It also encouraged extraction by the collectors, a recurring source of unrest.`),
  q.mc('ap_ready', 'Comparison', 'A common challenge for all the land-based empires was:',
    ['Lack of gunpowder', 'Governing diverse populations over long distances', 'Absence of trade', 'Small territory'], 1,
    `Each developed different accommodations for religious and ethnic difference.`),
  q.sa('developing', 'Gunpowder empires', `Ottoman elite infantry recruited through the devshirme were called ______. (one word)`,
    ['janissaries', 'janissary'], `They became a powerful political force in their own right.`),
);

q.inUnit(3); // Transoceanic Connections
out.push(
  q.mc('foundation', 'Columbian Exchange', 'Maize and potatoes moving to Europe and Africa contributed most directly to:',
    ['Population growth', 'Deforestation', 'The end of slavery', 'Industrialisation'], 0,
    `Calorie-dense New World crops supported larger populations across the Old World.`),
  q.mc('foundation', 'Navigation', 'The caravel improved European voyaging because it could:',
    ['Carry more cannon', 'Sail closer to the wind', 'Travel underwater', 'Cross rivers'], 1,
    `Lateen sails allowed tacking against the wind on open ocean routes.`),
  q.mc('developing', 'Coerced labour', 'The Atlantic plantation system depended primarily on:',
    ['Free wage labour', 'Enslaved African labour', 'Indentured Europeans throughout', 'Mechanisation'], 1,
    `Sugar in particular consumed enormous quantities of forced labour.`),
  q.mc('developing', 'Silver', 'Silver from Potosi and Mexico flowed largely to:',
    ['Africa', 'China', 'Russia', 'Australia'], 1,
    `Chinese demand for silver currency pulled bullion across the Pacific and Atlantic.`),
  q.mc('developing', 'Navigation', 'Joint-stock companies mattered because they:',
    ['Spread risk across many investors', 'Were run by monarchs', 'Avoided all profit', 'Replaced trade'], 0,
    `Pooling capital made expensive, risky long-distance ventures possible.`),
  q.mc('ap_ready', 'Silver', 'A global consequence of the silver trade was:',
    ['The first truly global trade network', 'The end of Asian commerce', 'European isolation', 'The collapse of Chinese agriculture'], 0,
    `Silver linked the Americas, Europe and Asia into one circuit.`),
  q.mc('ap_ready', 'Coerced labour', 'The Spanish adapted which existing Andean institution for mine labour?',
    ['A voluntary labour market', 'The Inca rotational labour draft', 'A tax in silver', 'A trading company'], 1,
    `The mita obligation was repurposed for the silver mines at Potosi.`),
  q.sa('developing', 'Columbian Exchange', `Diseases such as smallpox devastated the Americas because populations had no prior ______. (one word)`,
    ['immunity', 'exposure'], `Isolation from Old World pathogens left no acquired resistance.`),
);

q.inUnit(4); // Revolutions
out.push(
  q.mc('foundation', 'The Enlightenment', 'Enlightenment thinkers generally emphasised:',
    ['Divine right of kings', 'Reason, natural rights and popular sovereignty', 'Feudal hierarchy', 'Religious uniformity'], 1,
    `These ideas supplied the vocabulary of the Atlantic revolutions.`),
  q.mc('foundation', 'Atlantic revolutions', 'The Haitian Revolution is distinctive because it was:',
    ['Led by planters', 'The only large-scale slave revolt to found an independent state', 'Peaceful', 'Backed by France'], 1,
    `Enslaved people overthrew slavery and colonial rule together.`),
  q.mc('developing', 'Atlantic revolutions', 'Latin American independence movements were often led by:',
    ['Enslaved people', 'Creole elites', 'Spanish officials', 'Indigenous councils'], 1,
    `Creoles resented peninsular privilege while preserving much of the social order.`),
  q.mc('developing', 'Industrialisation', 'Britain industrialised first partly because of its:',
    ['Lack of coal', 'Coal, capital, colonial markets and an agricultural surplus', 'Large peasantry', 'Isolation from trade'], 1,
    `The combination mattered more than any single factor.`),
  q.mc('developing', 'The Enlightenment', 'Mary Wollstonecraft argued that:',
    ['Women should be excluded from education', 'Women deserved the same rational education as men', 'Monarchy was natural', 'Revolution was wrong'], 1,
    `A Vindication of the Rights of Woman extended Enlightenment logic to gender.`),
  q.mc('ap_ready', 'Industrialisation', 'The factory system changed work most fundamentally by:',
    ['Increasing craft autonomy', 'Concentrating labour under time discipline', 'Reducing hours', 'Ending child labour'], 1,
    `The clock, not the task, came to govern the working day.`),
  q.mc('ap_ready', 'Reactions', 'Utopian socialists such as Robert Owen proposed to address industrial conditions by:',
    ['Armed revolution', 'Building model communities', 'Abolishing trade', 'Restoring feudalism'], 1,
    `They sought reform by example rather than by class struggle.`),
  q.sa('developing', 'Reactions', `Workers who destroyed machinery in protest during early British industrialisation were called ______. (one word)`,
    ['luddites', 'luddite'], `Their target was the loss of skilled livelihoods, not technology as such.`),
);

q.inUnit(5); // Consequences of Industrialization
out.push(
  q.mc('foundation', 'New imperialism', 'The Berlin Conference of 1884 to 1885:',
    ['Ended African colonisation', 'Set rules among European powers for partitioning Africa', 'Granted African independence', 'Created the United Nations'], 1,
    `No African representatives were present.`),
  q.mc('foundation', 'Migration', 'Indentured labour from India and China after 1834 largely replaced:',
    ['Free European labour', 'Enslaved labour on plantations', 'Factory labour', 'Domestic service'], 1,
    `Abolition created a demand that indenture was used to fill.`),
  q.mc('developing', 'Resistance', 'The Indian Rebellion of 1857 led most directly to:',
    ['Indian independence', 'Direct British Crown rule over India', 'The end of all British trade', 'A French takeover'], 1,
    `The East India Company was dissolved and the Raj established.`),
  q.mc('developing', 'Economic imperialism', 'The Opium Wars resulted in:',
    ['Chinese victory', 'Treaty ports and extraterritorial rights for foreign powers', 'The end of the opium trade', 'Japanese colonisation'], 1,
    `Unequal treaties opened China to foreign commerce on foreign terms.`),
  q.mc('developing', 'New imperialism', 'Social Darwinism was used to:',
    ['Oppose imperialism', 'Justify imperial rule as a natural hierarchy', 'Explain evolution accurately', 'Promote equality'], 1,
    `It misapplied biological language to nations and races.`),
  q.mc('ap_ready', 'Resistance', 'The Meiji Restoration is significant because Japan:',
    ['Was colonised', 'Industrialised rapidly and became an imperial power itself', 'Rejected all Western technology', 'Remained isolated'], 1,
    `Selective adoption of Western models preserved independence.`),
  q.mc('ap_ready', 'Migration', 'Receiving societies frequently responded to mass migration with:',
    ['Permanently open borders', 'Restrictive laws, and ethnic enclaves forming', 'Immediate assimilation', 'No response'], 1,
    `Exclusion acts and quota systems appear across several receiving states.`),
  q.sa('developing', 'Economic imperialism', `Colonies were valued as sources of raw materials and as ______ for manufactured goods. (one word)`,
    ['markets', 'market'], `The double role is the core of the economic argument for empire.`),
);

q.inUnit(6); // Global Conflict
out.push(
  q.mc('foundation', 'Total war', 'Total war means that:',
    ['Only soldiers are involved', 'Entire societies and economies are mobilised', 'Wars end quickly', 'Civilians are protected'], 1,
    `Industry, labour and propaganda are all directed toward the war effort.`),
  q.mc('foundation', 'Causes', 'The alliance system contributed to the outbreak of World War I by:',
    ['Preventing conflict', 'Turning a regional crisis into a general war', 'Ending imperial rivalry', 'Disarming Europe'], 1,
    `Interlocking commitments pulled the great powers in successively.`),
  q.mc('developing', 'Interwar years', 'The Treaty of Versailles contributed to instability by:',
    ['Being too lenient', 'Imposing reparations and war guilt on Germany', 'Ignoring Germany entirely', 'Creating a strong League'], 1,
    `Economic strain and grievance fed later extremism.`),
  q.mc('developing', 'Consequences', 'The Great Depression had global reach because:',
    ['Economies were interconnected through trade and finance', 'It was caused by war', 'Gold was abolished', 'Only the US was affected'], 0,
    `Credit contraction and collapsing trade transmitted the shock worldwide.`),
  q.mc('developing', 'Causes', 'Fascist movements in the interwar period generally emphasised:',
    ['Individual liberty', 'Extreme nationalism and a strong leader', 'Free trade', 'Internationalism'], 1,
    `They defined themselves against both liberalism and communism.`),
  q.mc('ap_ready', 'Total war', 'Women\'s participation in wartime industry often led to:',
    ['No political change', 'Strengthened arguments for suffrage after the war', 'Immediate equality', 'Reduced employment'], 1,
    `Several states extended the franchise in the immediate postwar years.`),
  q.mc('ap_ready', 'Consequences', 'Decolonisation was accelerated by the world wars partly because they:',
    ['Strengthened European empires', 'Exhausted the imperial powers and undercut claims of superiority', 'Ended nationalism', 'Increased colonial loyalty'], 1,
    `Colonial troops who fought for empire returned with claims of their own.`),
  q.sa('developing', 'Interwar years', `The Nazi campaign of genocide against European Jews is called the ______. (one word)`,
    ['holocaust', 'shoah'], `Roughly six million Jews were murdered, alongside other targeted groups.`),
);

q.inUnit(7); // Cold War & Decolonization
out.push(
  q.mc('foundation', 'Cold War', 'NATO and the Warsaw Pact were:',
    ['Trade agreements', 'Opposing military alliances of the Cold War', 'UN agencies', 'Colonial administrations'], 1,
    `Each bound its bloc to collective defence against the other.`),
  q.mc('foundation', 'Decolonisation', 'India gained independence from Britain in:',
    ['1919', '1947', '1960', '1975'], 1,
    `Partition into India and Pakistan accompanied independence.`),
  q.mc('developing', 'Proxy conflicts', 'The Korean and Vietnam wars are described as proxy conflicts because they:',
    ['Involved no superpowers', 'Saw superpowers back opposing local sides', 'Were fought in Europe', 'Ended quickly'], 1,
    `Superpower rivalry was fought out through local combatants.`),
  q.mc('developing', 'Non-alignment', 'The 1955 Bandung Conference brought together representatives of:',
    ['NATO members', 'Newly independent Asian and African states', 'Warsaw Pact states', 'European empires'], 1,
    `It gave institutional form to the non-aligned position.`),
  q.mc('developing', 'Decolonisation', 'Ghana\'s independence in 1957 was significant because it was:',
    ['The last African colony freed', 'The first sub-Saharan African colony to gain independence', 'A French colony', 'Never colonised'], 1,
    `Nkrumah\'s success became a model for movements across the continent.`),
  q.mc('ap_ready', 'Cold War', 'The Cuban Missile Crisis is significant chiefly as:',
    ['The start of the Cold War', 'The closest approach to nuclear war', 'A proxy conflict', 'The end of the Cold War'], 1,
    `It led directly to arms-control talks and a direct communication line.`),
  q.mc('ap_ready', 'Non-alignment', 'Newly independent states often struggled with borders because they:',
    ['Were drawn by colonial powers without regard to local groups', 'Followed rivers exactly', 'Were chosen by referendum', 'Did not exist'], 0,
    `Arbitrary colonial boundaries produced lasting internal conflicts.`),
  q.sa('developing', 'Proxy conflicts', `The policy of preventing the spread of communism was called ______. (one word)`,
    ['containment'], `It shaped US strategy for four decades.`),
);

q.inUnit(8); // Globalization
out.push(
  q.mc('foundation', 'Definition', 'Globalisation refers most broadly to:',
    ['Military alliances', 'Increasing interconnection of economies, cultures and populations', 'Colonial rule', 'Population decline'], 1,
    `Flows of goods, capital, people and information across borders.`),
  q.mc('foundation', 'Technology', 'The container ship reduced trade costs mainly by:',
    ['Increasing crew sizes', 'Standardising and speeding cargo handling', 'Avoiding ports', 'Carrying passengers'], 1,
    `Standard boxes made loading a mechanised rather than a manual operation.`),
  q.mc('developing', 'Institutions', 'The World Trade Organization exists primarily to:',
    ['Set immigration policy', 'Regulate and liberalise international trade', 'Provide military aid', 'Print currency'], 1,
    `It administers agreements and adjudicates trade disputes.`),
  q.mc('developing', 'Debate', 'Critics of globalisation frequently argue that it:',
    ['Reduces inequality everywhere', 'Widens inequality and erodes local industries', 'Prevents migration', 'Slows technology'], 1,
    `Gains and losses have been distributed very unevenly.`),
  q.mc('developing', 'Technology', 'The internet has most changed global culture by:',
    ['Ending local traditions', 'Accelerating the spread of information and cultural forms', 'Reducing literacy', 'Stopping migration'], 1,
    `Both homogenisation and new forms of local expression have followed.`),
  q.mc('ap_ready', 'Institutions', 'The United Nations differs from the League of Nations chiefly in having:',
    ['Fewer members', 'A Security Council with enforcement powers and near-universal membership', 'No charter', 'No headquarters'], 1,
    `The League\'s lack of enforcement was its central weakness.`),
  q.mc('ap_ready', 'Debate', 'Climate change is described as a global problem because:',
    ['It affects one region', 'Emissions anywhere affect the atmosphere everywhere', 'It is recent', 'It has no economic cost'], 1,
    `The shared atmosphere makes it a collective-action problem.`),
  q.sa('developing', 'Definition', `Companies operating across many countries are called ______ corporations. (one word)`,
    ['multinational', 'transnational'], `Their scale can rival that of some states.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Thesis', 'A thesis for an AP World essay must be:',
    ['A restatement of the prompt', 'A defensible claim establishing a line of reasoning', 'A list of dates', 'A question'], 1,
    `It must be arguable, not merely descriptive.`),
  q.mc('foundation', 'DBQ basics', 'The DBQ expects you to use:',
    ['All documents equally', 'Most of the documents in support of the argument', 'One document', 'No documents'], 1,
    `Using more documents in support of the argument raises the score.`),
  q.mc('developing', 'Sourcing', 'Sourcing a document means explaining how its point of view, purpose, situation or audience:',
    ['Makes it useless', 'Is relevant to the argument', 'Was created', 'Compares to a textbook'], 1,
    `Naming the author is not sourcing; connecting it to your argument is.`),
  q.mc('developing', 'Contextualisation', 'Contextualisation should:',
    ['Be one sentence naming a date', 'Situate the topic in broader developments', 'List all causes', 'Repeat the thesis'], 1,
    `Broader circumstances before, during or after the period in question.`),
  q.mc('developing', 'DBQ basics', 'Evidence beyond the documents must be:',
    ['Any fact at all', 'Specific and relevant to the argument', 'Taken from the documents', 'A quotation'], 1,
    `A relevant specific example that is not drawn from the provided documents.`),
  q.mc('ap_ready', 'Thesis', 'Comparison questions ask you to analyse:',
    ['Only similarities', 'Both similarities and differences, with reasons', 'Only differences', 'A single case'], 1,
    `The reasoning behind the similarity or difference is what is scored.`),
  q.mc('ap_ready', 'Sourcing', 'A continuity and change question expects you to identify:',
    ['Only what changed', 'Both what persisted and what changed', 'Only what persisted', 'Dates alone'], 1,
    `Both halves are required for full credit.`),
  q.sa('foundation', 'Contextualisation', `Because there is no penalty for a wrong answer, you should never leave a question ______. (one word)`,
    ['blank', 'unanswered'], `An educated guess is strictly better than nothing.`),
);

export const apWorldQuestions = out;
