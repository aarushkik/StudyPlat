import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP U.S. History — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-us-history');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Colliding Worlds
out.push(
  q.mc('foundation', 'Contact', 'The exchange of crops, animals and diseases after 1492 is known as the:',
    ['Middle Passage', 'Columbian Exchange', 'Triangular Trade', 'Great Migration'], 1,
    `Maize and potatoes moved east; horses, wheat and smallpox moved west.`),
  q.mc('foundation', 'Demographics', 'The catastrophic decline of Indigenous populations after contact was caused mainly by:',
    ['Warfare alone', 'Epidemic disease', 'Famine alone', 'Voluntary migration'], 1,
    `Populations with no prior exposure to Eurasian pathogens suffered mortality far beyond that of warfare.`),
  q.mc('developing', 'Spanish colonisation', 'The Spanish encomienda system was primarily a means of:',
    ['Granting religious freedom', 'Extracting Indigenous labour', 'Establishing self-government', 'Encouraging free trade'], 1,
    `Colonists received the right to Indigenous labour and tribute in a given area.`),
  q.mc('ap_ready', 'Justification', 'The Spanish requerimiento was a document used to:',
    ['Grant Indigenous land rights', 'Legally justify conquest by demanding submission', 'Establish trade routes', 'Free enslaved people'], 1,
    `Read aloud before conquest, it framed resistance as grounds for war.`),
);

q.inUnit(1); // Colonial Foundations
out.push(
  q.mc('foundation', 'Regional differences', 'The New England colonies differed from the Chesapeake mainly in their:',
    ['Cash-crop economy', 'Family-based settlement and mixed economy', 'Lack of any towns', 'Absence of religion'], 1,
    `New England drew families and built towns; the Chesapeake drew young male labour for tobacco.`),
  q.mc('foundation', 'Labour systems', 'Indentured servitude declined in favour of chattel slavery partly because:',
    ['Servants became too cheap', 'Life expectancy rose and servants demanded land', 'Tobacco stopped being grown', 'Slavery was outlawed'], 1,
    `As survivors lived to claim their freedom dues, planters turned to a permanent, hereditary labour force.`),
  q.mc('developing', 'Great Awakening', 'The First Great Awakening contributed to colonial society by:',
    ['Reinforcing established church authority', 'Encouraging individual religious judgement', 'Ending religious practice', 'Uniting all colonies politically'], 1,
    `Its emphasis on personal conversion undercut deference to established clergy.`),
  q.mc('ap_ready', 'Mercantilism', 'Under mercantilism, colonies existed principally to:',
    ['Govern themselves', 'Enrich the mother country', 'Trade freely with any nation', 'Develop their own industry'], 1,
    `The Navigation Acts channelled colonial trade through Britain for Britain's benefit.`),
);

q.inUnit(2); // Revolution & Republic
out.push(
  q.mc('foundation', 'Causes', 'The slogan "no taxation without representation" objected to:',
    ['All taxes', 'Taxes imposed by a Parliament colonists did not elect', 'Colonial assemblies', 'Trade with France'], 1,
    `The grievance was the absence of consent, not the existence of taxation.`),
  q.mc('foundation', 'Founding documents', 'The Articles of Confederation are best remembered for creating a government that was:',
    ['Too powerful', 'Too weak to tax or regulate trade', 'A monarchy', 'Highly centralised'], 1,
    `No taxing power and no executive left Congress unable to act, prompting the Constitutional Convention.`),
  q.mc('developing', 'Compromises', 'The Great Compromise of 1787 resolved disputes over:',
    ['Slavery in the territories', 'Representation in Congress', 'Presidential term limits', 'Judicial review'], 1,
    `A population-based House and an equal-representation Senate settled the large-state, small-state fight.`),
  q.mc('ap_ready', 'Ratification', 'Anti-Federalists opposed the Constitution largely because it:',
    ['Was too weak', 'Lacked a bill of rights and threatened state power', 'Abolished slavery', 'Created no executive'], 1,
    `Their objections produced the promise that became the first ten amendments.`),
);

q.inUnit(3); // A Growing Nation
out.push(
  q.mc('foundation', 'Expansion', 'The Louisiana Purchase of 1803 roughly:',
    ['Halved the nation’s size', 'Doubled the nation’s size', 'Left it unchanged', 'Added Florida'], 1,
    `The purchase from France doubled U.S. territory and raised questions about slavery's expansion.`),
  q.mc('developing', 'Market revolution', 'The market revolution transformed the economy chiefly through:',
    ['A return to subsistence farming', 'Transportation improvements and wage labour', 'The end of all manufacturing', 'Isolation from Europe'], 1,
    `Canals, roads and later railroads knit regional markets into a national one.`),
  q.mc('developing', 'Jacksonian era', 'Indian Removal in the 1830s culminated in:',
    ['Voluntary migration', 'The Trail of Tears', 'Restoration of tribal lands', 'Federal protection of the Cherokee'], 1,
    `Forced removal of the Cherokee and others proceeded despite Worcester v. Georgia.`),
  q.mc('ap_ready', 'Reform', 'The Seneca Falls Convention of 1848 is best known for:',
    ['Ending slavery', 'Launching the organised women’s rights movement', 'Founding a political party', 'Establishing public schools'], 1,
    `Its Declaration of Sentiments deliberately echoed the Declaration of Independence.`),
);

q.inUnit(4); // Crisis & Civil War
out.push(
  q.mc('foundation', 'Sectionalism', 'The central issue dividing North and South by 1860 was:',
    ['Tariffs alone', 'The expansion of slavery into new territories', 'Immigration policy', 'Naval spending'], 1,
    `Every major crisis of the 1850s turned on whether slavery would extend westward.`),
  q.mc('foundation', 'Emancipation', 'The Emancipation Proclamation of 1863 declared free the enslaved people in:',
    ['All states', 'States in rebellion', 'The border states only', 'Federal territories only'], 1,
    `It applied to Confederate territory, reframing the war as a war against slavery.`),
  q.mc('developing', 'Amendments', 'The Thirteenth, Fourteenth and Fifteenth Amendments respectively addressed:',
    ['Voting, citizenship, slavery', 'Slavery, citizenship, voting', 'Taxes, slavery, voting', 'Citizenship, taxes, slavery'], 1,
    `Thirteenth abolished slavery, Fourteenth guaranteed citizenship and equal protection, Fifteenth protected the vote.`),
  q.mc('ap_ready', 'Reconstruction', 'Reconstruction is generally considered to have ended with:',
    ['The assassination of Lincoln', 'The Compromise of 1877', 'The Fifteenth Amendment', 'Plessy v. Ferguson'], 1,
    `Federal troops withdrew from the South as part of the disputed 1876 election settlement.`),
);

q.inUnit(5); // Industrial America
out.push(
  q.mc('foundation', 'Industrialisation', 'The late-nineteenth-century rise of large corporations was aided most by:',
    ['Government ownership', 'Railroads and new financial structures', 'Declining immigration', 'The end of the telegraph'], 1,
    `National rail networks and the corporate form made continent-scale business possible.`),
  q.mc('developing', 'Labour', 'Early labour unions most commonly demanded:',
    ['Longer hours', 'Shorter hours and better wages and conditions', 'An end to wage labour immediately', 'Higher tariffs'], 1,
    `The eight-hour day was the era's signature labour demand.`),
  q.mc('developing', 'Immigration', 'The Chinese Exclusion Act of 1882 was significant as:',
    ['The first federal law restricting immigration by nationality', 'A guarantee of open borders', 'A labour protection law', 'A citizenship expansion'], 0,
    `It marked the beginning of federal immigration restriction on explicitly racial grounds.`),
  q.mc('ap_ready', 'Populism', 'The Populist movement drew its strongest support from:',
    ['Urban bankers', 'Farmers facing debt and falling crop prices', 'Industrial owners', 'Railroad executives'], 1,
    `Farmers organised against railroad rates, tight money and creditor power.`),
);

q.inUnit(6); // Reform & Empire
out.push(
  q.mc('foundation', 'Progressivism', 'Progressive reformers generally believed that:',
    ['Government should not intervene', 'Government could correct social and economic problems', 'Corporations should be unregulated', 'Voting should be restricted'], 1,
    `Progressives pushed regulation, antitrust action and direct democracy measures.`),
  q.mc('developing', 'Imperialism', 'The Spanish-American War of 1898 resulted in U.S. control of:',
    ['Canada', 'The Philippines, Puerto Rico and Guam', 'Mexico', 'Alaska'], 1,
    `Victory transformed the United States into an overseas colonial power.`),
  q.mc('developing', 'World War I', 'A key factor drawing the United States into the First World War was:',
    ['An attack on U.S. soil', 'Unrestricted submarine warfare and the Zimmermann Telegram', 'A treaty obligation', 'A declaration by France'], 1,
    `Submarine attacks on shipping and the intercepted telegram shifted public opinion.`),
  q.mc('ap_ready', 'New Deal', 'The New Deal fundamentally changed American government by:',
    ['Reducing federal responsibility', 'Establishing a federal role in economic security', 'Ending regulation', 'Abolishing the income tax'], 1,
    `Social Security and federal relief created an enduring expectation of federal responsibility.`),
);

q.inUnit(7); // Cold War America
out.push(
  q.mc('foundation', 'Containment', 'The policy of containment aimed to:',
    ['Roll back Soviet borders militarily', 'Prevent the spread of communism beyond where it existed', 'Withdraw from world affairs', 'Disarm the United States'], 1,
    `Kennan's containment shaped the Marshall Plan, NATO and interventions worldwide.`),
  q.mc('developing', 'Civil rights', 'Brown v. Board of Education (1954) held that:',
    ['Separate but equal was constitutional', 'Segregated public schools were inherently unequal', 'States could not tax schools', 'Busing was required nationwide'], 1,
    `The ruling overturned the school-segregation basis of Plessy v. Ferguson.`),
  q.mc('developing', 'Postwar economy', 'The GI Bill contributed to postwar suburban growth by:',
    ['Restricting mortgages', 'Funding education and low-cost home loans for veterans', 'Raising interest rates', 'Ending highway construction'], 1,
    `Its benefits, unevenly available by race, helped build the postwar middle class.`),
  q.mc('ap_ready', 'Vietnam', 'The Gulf of Tonkin Resolution is significant because it:',
    ['Formally declared war', 'Gave the president broad authority to escalate without a declaration', 'Ended the conflict', 'Restricted presidential power'], 1,
    `It became the legal basis for a major war fought without a declaration of war.`),
);

q.inUnit(8); // Contemporary America
out.push(
  q.mc('foundation', 'End of the Cold War', 'The Cold War is generally considered to have ended with the:',
    ['Korean armistice', 'Dissolution of the Soviet Union in 1991', 'Cuban Missile Crisis', 'Vietnam withdrawal'], 1,
    `The Soviet collapse removed the rivalry that had defined the previous four decades.`),
  q.mc('developing', 'Conservatism', 'The conservative resurgence of the 1980s emphasised:',
    ['Expanded federal programmes', 'Tax cuts, deregulation and increased defence spending', 'Nationalising industry', 'Reducing military budgets'], 1,
    `Reagan-era policy combined tax reduction and deregulation with a defence build-up.`),
  q.mc('developing', 'Globalisation', 'NAFTA, which took effect in 1994, primarily:',
    ['Restricted trade', 'Reduced trade barriers among the U.S., Canada and Mexico', 'Created a common currency', 'Established a military alliance'], 1,
    `It was a regional free-trade agreement, contested over its effects on manufacturing jobs.`),
  q.mc('ap_ready', 'Continuity', 'Debates over immigration in recent decades most echo earlier arguments about:',
    ['Judicial review', 'National identity and the labour market', 'Naval policy', 'The gold standard'], 1,
    `The nineteenth-century and modern debates share concerns about identity, work and belonging.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Thesis', 'A strong thesis on an AP History essay must:',
    ['Restate the prompt', 'Make a defensible claim with a line of reasoning', 'List dates', 'Avoid a position'], 1,
    `The rubric requires a claim that responds to the prompt and sets up the argument.`),
  q.mc('developing', 'Evidence', 'Outside evidence in a DBQ means information that is:',
    ['Quoted from a document', 'Relevant, specific and not drawn from the documents', 'Any general statement', 'A restated thesis'], 1,
    `The point requires specific historical evidence beyond the provided documents.`),
  q.mc('developing', 'Complexity', 'The complexity point rewards essays that:',
    ['Are longest', 'Analyse nuance, such as change alongside continuity', 'Cite the most documents', 'Use difficult vocabulary'], 1,
    `Qualifying an argument or showing multiple causes is what earns it.`),
  q.mc('ap_ready', 'Periodisation', 'Periodisation questions ask you to evaluate whether:',
    ['A date is correct', 'A chosen turning point genuinely marks a break', 'An event happened', 'A source is authentic'], 1,
    `You argue for or against the significance of the dividing line itself.`),
);

export const apUSHQuestions = out;
