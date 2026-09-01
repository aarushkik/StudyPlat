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

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Colliding Worlds
out.push(
  q.mc('foundation', 'Contact', 'The Columbian Exchange refers to the transfer between hemispheres of:',
    ['Only gold and silver', 'Plants, animals, people and diseases', 'Only enslaved people', 'Only manufactured goods'], 1,
    `The exchange ran both ways and reshaped diets and populations on both sides.`),
  q.mc('foundation', 'Demographics', 'The largest cause of Indigenous population decline after 1492 was:',
    ['Warfare', 'Epidemic disease', 'Famine', 'Migration'], 1,
    `Populations with no prior exposure had no immunity to Old World pathogens.`),
  q.mc('developing', 'Spanish colonisation', 'The encomienda system granted Spanish colonists:',
    ['Land only', 'The labour of Indigenous people', 'Trading monopolies', 'Military rank'], 1,
    `In theory it obliged protection and instruction in return; in practice it was forced labour.`),
  q.mc('developing', 'Justification', 'Bartolomé de las Casas is best known for:',
    ['Defending the encomienda', 'Criticising the treatment of Indigenous peoples', 'Leading conquests', 'Founding Jamestown'], 1,
    `His accounts fuelled debate over the morality of Spanish colonisation.`),
  q.mc('developing', 'Contact', 'Horses reintroduced by the Spanish most transformed the lives of:',
    ['Eastern woodland farmers', 'Great Plains peoples', 'Pacific Northwest peoples', 'Caribbean peoples'], 1,
    `Mounted hunting reorganised Plains societies around the bison.`),
  q.mc('ap_ready', 'Demographics', 'The shift to African slavery in the Americas was driven partly by:',
    ['Indigenous population collapse', 'A shortage of land', 'European emigration', 'Falling sugar prices'], 0,
    `Planters sought a replacement labour force as Indigenous numbers fell.`),
  q.mc('ap_ready', 'Spanish colonisation', 'The Spanish casta system organised colonial society by:',
    ['Wealth alone', 'Ancestry and racial category', 'Religion only', 'Occupation'], 1,
    `A detailed hierarchy of ancestry determined legal and social standing.`),
  q.sa('developing', 'Contact', `The forced voyage of enslaved Africans across the Atlantic is called the Middle ______. (one word)`,
    ['passage'], `It was the middle leg of the triangular trade.`),
);

q.inUnit(1); // Colonial Foundations
out.push(
  q.mc('foundation', 'Regional differences', 'The New England colonies were founded primarily for:',
    ['Cash crops', 'Religious community', 'Gold mining', 'Naval bases'], 1,
    `Puritan settlers came in family groups seeking to build a religious society.`),
  q.mc('foundation', 'Labour systems', 'Indentured servitude differed from slavery because it was:',
    ['Permanent', 'For a fixed term', 'Only for women', 'Illegal'], 1,
    `Servants worked a set number of years in exchange for passage.`),
  q.mc('developing', 'Great Awakening', 'The First Great Awakening challenged:',
    ['Colonial trade', 'Established church authority', 'Slavery directly', 'The monarchy'], 1,
    `Itinerant preachers undercut settled clergy and encouraged personal judgement.`),
  q.mc('developing', 'Mercantilism', 'The Navigation Acts required colonial goods to be:',
    ['Sold locally', 'Shipped on English ships', 'Taxed at the port of origin', 'Traded with France'], 1,
    `Mercantilism treated colonies as suppliers and markets for the mother country.`),
  q.mc('developing', 'Regional differences', 'The Chesapeake colonies\' economy centred on:',
    ['Fishing', 'Tobacco', 'Shipbuilding', 'Textiles'], 1,
    `Tobacco shaped the labour system, the settlement pattern and the politics.`),
  q.mc('ap_ready', 'Labour systems', 'Bacon\'s Rebellion accelerated the shift toward:',
    ['More indentured servants', 'Racialised chattel slavery', 'Abolition', 'Free wage labour'], 1,
    `Planters concluded that a permanently unfree labour force was less dangerous.`),
  q.mc('ap_ready', 'Great Awakening', 'The Enlightenment influenced colonial thought mainly through ideas about:',
    ['Divine right', 'Natural rights and reason', 'Mercantilism', 'Feudal obligation'], 1,
    `Locke\'s natural rights would later be written into the Declaration.`),
  q.sa('developing', 'Mercantilism', `Britain's loose enforcement of trade laws before 1763 is called salutary ______. (one word)`,
    ['neglect'], `Its end after the Seven Years\' War provoked colonial resistance.`),
);

q.inUnit(2); // Revolution & Republic
out.push(
  q.mc('foundation', 'Causes', 'The Stamp Act provoked colonial protest chiefly because it was:',
    ['A trade regulation', 'A direct tax imposed without colonial consent', 'A military order', 'A religious law'], 1,
    `"No taxation without representation" turned on the distinction between trade duties and direct taxes.`),
  q.mc('foundation', 'Founding documents', 'The Declaration of Independence drew most directly on the ideas of:',
    ['Thomas Hobbes', 'John Locke', 'Karl Marx', 'Adam Smith'], 1,
    `Life, liberty and the pursuit of happiness restates Locke\'s natural rights.`),
  q.mc('developing', 'Compromises', 'The Three-Fifths Compromise concerned:',
    ['Taxation only', 'How enslaved people counted for representation', 'The slave trade\'s end date', 'Western land'], 1,
    `It inflated southern representation in the House without granting any rights.`),
  q.mc('developing', 'Ratification', 'Anti-Federalists opposed the Constitution mainly because it:',
    ['Was too weak', 'Lacked a bill of rights and centralised too much power', 'Abolished slavery', 'Kept the Articles'], 1,
    `The Bill of Rights was the price of ratification.`),
  q.mc('developing', 'Founding documents', 'The Articles of Confederation failed largely because Congress could not:',
    ['Declare war', 'Tax or regulate commerce', 'Sign treaties', 'Admit states'], 1,
    `Without revenue or trade authority the national government could not function.`),
  q.mc('ap_ready', 'Compromises', 'The Great Compromise resolved the dispute over:',
    ['Slavery', 'Representation in Congress', 'The presidency', 'Judicial review'], 1,
    `A population-based House and an equal-representation Senate.`),
  q.mc('ap_ready', 'Ratification', 'Federalist No. 10 argues that a large republic will:',
    ['Be dominated by one faction', 'Make any single faction less able to dominate', 'Require a monarchy', 'Fail quickly'], 1,
    `Madison argued that scale multiplies factions and dilutes each one.`),
  q.sa('developing', 'Causes', `The 1786 uprising of indebted Massachusetts farmers that alarmed nationalists was ______'s Rebellion. (one word)`,
    ['shays', "shays'"], `It underlined how little force the Articles government could muster.`),
);

q.inUnit(3); // A Growing Nation
out.push(
  q.mc('foundation', 'Expansion', 'The Louisiana Purchase of 1803 was made from:',
    ['Britain', 'France', 'Spain', 'Mexico'], 1,
    `Napoleon sold the territory, roughly doubling the size of the United States.`),
  q.mc('foundation', 'Market revolution', 'The cotton gin most directly increased demand for:',
    ['Factory workers', 'Enslaved labour in the South', 'Immigration to New England', 'Railroads'], 1,
    `Faster processing made short-staple cotton profitable across the Deep South.`),
  q.mc('developing', 'Jacksonian era', 'The Indian Removal Act led most directly to:',
    ['The Trail of Tears', 'The Missouri Compromise', 'The Mexican-American War', 'Nullification'], 0,
    `Forced relocation of southeastern nations west of the Mississippi.`),
  q.mc('developing', 'Reform', 'The Seneca Falls Convention of 1848 focused on:',
    ['Abolition', 'Women\'s rights', 'Temperance only', 'Prison reform'], 1,
    `Its Declaration of Sentiments deliberately echoed the Declaration of Independence.`),
  q.mc('developing', 'Market revolution', 'The Erie Canal most directly:',
    ['Linked the Great Lakes to the Atlantic', 'Opened California', 'Ended slavery in the North', 'Funded the railroads'], 0,
    `It cut freight costs dramatically and pulled western produce toward New York.`),
  q.mc('ap_ready', 'Jacksonian era', 'The Nullification Crisis centred on a state\'s claimed right to:',
    ['Secede immediately', 'Void a federal law within its borders', 'Coin money', 'Make treaties'], 1,
    `South Carolina asserted it could nullify the tariff; Jackson denied it.`),
  q.mc('ap_ready', 'Expansion', 'Manifest Destiny was the belief that the United States was destined to:',
    ['Industrialise', 'Expand across the continent', 'Abolish slavery', 'Avoid foreign entanglement'], 1,
    `It supplied a moral vocabulary for territorial expansion.`),
  q.sa('developing', 'Reform', `The movement to end slavery immediately and unconditionally was called ______. (one word)`,
    ['abolitionism', 'abolition'], `Distinct from gradualist or colonisation schemes.`),
);

q.inUnit(4); // Crisis & Civil War
out.push(
  q.mc('foundation', 'Sectionalism', 'The Missouri Compromise of 1820 maintained balance by:',
    ['Banning slavery everywhere', 'Admitting Missouri as a slave state and Maine as free', 'Ending the slave trade', 'Creating the Confederacy'], 1,
    `It also drew a line at 36°30′ across the remaining Louisiana Territory.`),
  q.mc('foundation', 'Emancipation', 'The Emancipation Proclamation applied to enslaved people in:',
    ['All states', 'States in rebellion', 'Border states only', 'Territories only'], 1,
    `It deliberately exempted loyal border states to keep them in the Union.`),
  q.mc('developing', 'Sectionalism', 'The Dred Scott decision held that:',
    ['Slavery could be banned in territories', 'African Americans were not citizens', 'The Missouri Compromise was valid', 'States could secede'], 1,
    `It also struck down the Missouri Compromise as unconstitutional.`),
  q.mc('developing', 'Amendments', 'The Thirteenth Amendment:',
    ['Granted voting rights', 'Abolished slavery', 'Defined citizenship', 'Ended Reconstruction'], 1,
    `Thirteen abolished, fourteen defined citizenship, fifteen protected the vote.`),
  q.mc('developing', 'Emancipation', 'A major effect of the Emancipation Proclamation was to:',
    ['End the war', 'Discourage British intervention on the Confederate side', 'Free all enslaved people at once', 'Restore the Union'], 1,
    `Making the war explicitly about slavery made European support politically impossible.`),
  q.mc('ap_ready', 'Reconstruction', 'Radical Reconstruction ended largely because of:',
    ['A constitutional amendment', 'The Compromise of 1877', 'A Supreme Court ruling', 'Confederate victory'], 1,
    `Federal troops withdrew from the South as part of the disputed election settlement.`),
  q.mc('ap_ready', 'Amendments', 'Black Codes and later Jim Crow laws were designed to:',
    ['Enforce the Fifteenth Amendment', 'Restrict the freedom of formerly enslaved people', 'Expand suffrage', 'Fund schools'], 1,
    `They rebuilt racial control after formal emancipation.`),
  q.sa('developing', 'Reconstruction', `The 1896 case that upheld "separate but equal" was Plessy v. ______. (one word)`,
    ['ferguson'], `Overturned by Brown v. Board of Education in 1954.`),
);

q.inUnit(5); // Industrial America
out.push(
  q.mc('foundation', 'Industrialisation', 'Vertical integration means a company controls:',
    ['Its competitors', 'Every stage of production', 'Only distribution', 'Government policy'], 1,
    `Carnegie\'s steel operation is the standard example.`),
  q.mc('foundation', 'Immigration', 'The "new immigration" after 1880 came mainly from:',
    ['Northern and Western Europe', 'Southern and Eastern Europe', 'Canada', 'Australia'], 1,
    `Italians, Poles, Slavs and Eastern European Jews arrived in large numbers.`),
  q.mc('developing', 'Labour', 'The American Federation of Labor focused on:',
    ['Radical political change', 'Practical gains for skilled workers', 'Organising all workers', 'Abolishing wage labour'], 1,
    `Gompers pursued wages, hours and conditions rather than a political programme.`),
  q.mc('developing', 'Populism', 'The Grange and later Farmers\' Alliances organised primarily against:',
    ['Tariff reduction', 'Railroad rates and creditor terms', 'Immigration', 'Public schools'], 1,
    `Freight rates and debt were the two pressures farmers organised around.`),
  q.mc('developing', 'Industrialisation', 'The Sherman Antitrust Act was intended to:',
    ['Protect unions', 'Restrict monopolistic combinations', 'Raise tariffs', 'Fund railroads'], 1,
    `Early on it was more often used against unions than against trusts.`),
  q.mc('ap_ready', 'Immigration', 'Settlement houses such as Hull House aimed to:',
    ['Restrict immigration', 'Provide services and education to urban immigrants', 'Organise strikes', 'Fund railroads'], 1,
    `Addams\' model combined social services with advocacy for reform.`),
  q.mc('ap_ready', 'Populism', 'Populists advocated free coinage of silver in order to:',
    ['Reduce inflation', 'Expand the money supply and ease farm debt', 'Back the dollar in gold', 'Fund the navy'], 1,
    `Inflation would have made fixed debts easier to repay.`),
  q.sa('developing', 'Labour', `The 1892 strike at Carnegie's steel works in Pennsylvania was the ______ Strike. (one word)`,
    ['homestead'], `Its defeat set back steel unionisation for decades.`),
);

q.inUnit(6); // Reform & Empire
out.push(
  q.mc('foundation', 'Progressivism', 'Muckrakers were journalists who:',
    ['Defended big business', 'Exposed corruption and abuses', 'Wrote fiction only', 'Worked for the government'], 1,
    `Sinclair\'s The Jungle led directly to federal food inspection.`),
  q.mc('foundation', 'Imperialism', 'The Spanish-American War of 1898 resulted in US control of:',
    ['Canada', 'The Philippines, Puerto Rico and Guam', 'Mexico', 'Alaska'], 1,
    `Cuba became nominally independent under the Platt Amendment.`),
  q.mc('developing', 'Progressivism', 'The Seventeenth Amendment provided for:',
    ['Women\'s suffrage', 'Direct election of senators', 'Prohibition', 'The income tax'], 1,
    `It moved Senate selection from state legislatures to the voters.`),
  q.mc('developing', 'World War I', 'A major immediate cause of US entry into World War I was:',
    ['The Zimmermann Telegram and unrestricted submarine warfare', 'The Treaty of Versailles', 'The fall of France', 'Pearl Harbor'], 0,
    `Both pushed public opinion decisively toward intervention in 1917.`),
  q.mc('developing', 'Imperialism', 'The Open Door Policy sought to:',
    ['Annex China', 'Keep Chinese markets open to all trading powers', 'End immigration', 'Build the Panama Canal'], 1,
    `It protected American commercial access without territorial claims.`),
  q.mc('ap_ready', 'World War I', 'The Senate rejected the Treaty of Versailles mainly over:',
    ['Reparations', 'Article X and the League of Nations', 'Territorial changes', 'War debts'], 1,
    `Senators objected to a commitment that might override Congress\'s war power.`),
  q.mc('ap_ready', 'New Deal', 'The Social Security Act of 1935 established:',
    ['Unemployment insurance and old-age pensions', 'A national health service', 'Bank deposit insurance', 'Farm price supports'], 0,
    `It created the enduring core of the American welfare state.`),
  q.sa('developing', 'New Deal', `The New Deal is often summarised as relief, recovery and ______. (one word)`,
    ['reform'], `Relief for the immediate crisis, recovery for the economy, reform to prevent a repeat.`),
);

q.inUnit(7); // Cold War America
out.push(
  q.mc('foundation', 'Containment', 'The Truman Doctrine pledged US support to nations resisting:',
    ['Colonial rule', 'Communist pressure', 'Economic depression', 'Nuclear armament'], 1,
    `It began with aid to Greece and Turkey in 1947.`),
  q.mc('foundation', 'Civil rights', 'Brown v. Board of Education (1954) declared:',
    ['Segregated schools unconstitutional', 'Poll taxes illegal', 'Bus segregation legal', 'Affirmative action required'], 0,
    `It overturned the "separate but equal" doctrine of Plessy.`),
  q.mc('developing', 'Containment', 'The Marshall Plan aimed to:',
    ['Rebuild Western Europe economically', 'Arm NATO', 'Contain China', 'Fund the space race'], 0,
    `Prosperity was seen as the best defence against communist appeal.`),
  q.mc('developing', 'Postwar economy', 'Levittown-style suburbs expanded rapidly after 1945 because of:',
    ['Rising urban rents alone', 'Mass construction methods, cheap loans and new highways', 'Federal ownership', 'Falling population'], 1,
    `Restrictive covenants meanwhile excluded Black families from many of them.`),
  q.mc('developing', 'Civil rights', 'The Civil Rights Act of 1964 primarily prohibited discrimination in:',
    ['Voting only', 'Public accommodations and employment', 'Housing only', 'Education only'], 1,
    `The Voting Rights Act of 1965 addressed voting separately.`),
  q.mc('ap_ready', 'Vietnam', 'The Tet Offensive of 1968 mattered chiefly because it:',
    ['Was a US military defeat', 'Undermined American confidence that the war was being won', 'Ended the war', 'Began the draft'], 1,
    `Militarily costly for the North, but decisive in shifting US opinion.`),
  q.mc('ap_ready', 'End of the Cold War', 'Détente in the 1970s referred to:',
    ['Escalation of the arms race', 'Easing of US-Soviet tensions', 'A trade embargo', 'A military alliance'], 1,
    `SALT I and the Helsinki Accords were its main products.`),
  q.sa('developing', 'Civil rights', `The 1955 Montgomery bus ______ launched the modern civil rights movement. (one word)`,
    ['boycott'], `It lasted over a year and made King a national figure.`),
);

q.inUnit(8); // Contemporary America
out.push(
  q.mc('foundation', 'Conservatism', 'Reaganomics emphasised:',
    ['Higher taxes and more regulation', 'Tax cuts, deregulation and reduced domestic spending', 'Nationalisation', 'Price controls'], 1,
    `Supply-side theory held that cuts at the top would raise overall growth.`),
  q.mc('foundation', 'Globalisation', 'NAFTA, signed in 1993, created a free trade area among:',
    ['The US, Canada and Mexico', 'The US and the EU', 'The Americas as a whole', 'The US and Japan'], 0,
    `It became a lasting flashpoint in debates over manufacturing employment.`),
  q.mc('developing', 'End of the Cold War', 'The Soviet Union dissolved in:',
    ['1989', '1991', '1993', '1985'], 1,
    `The Berlin Wall fell in 1989; the USSR itself dissolved in December 1991.`),
  q.mc('developing', 'Globalisation', 'The information technology boom of the 1990s most changed:',
    ['Agricultural output', 'Productivity and the structure of work', 'Immigration law', 'Federalism'], 1,
    `Computing reshaped which jobs existed and where they could be done.`),
  q.mc('developing', 'Conservatism', 'The rise of the New Right drew on:',
    ['Labour unions', 'Religious conservatives and anti-tax activists', 'Urban progressives', 'Farm cooperatives'], 1,
    `The coalition combined social conservatism with economic libertarianism.`),
  q.mc('ap_ready', 'Continuity', 'Debates over immigration in the late twentieth century echoed earlier debates about:',
    ['Tariffs', 'Who belongs in the nation', 'Judicial review', 'Currency'], 1,
    `The Chinese Exclusion Act and 1920s quotas are the direct precedents.`),
  q.mc('ap_ready', 'Globalisation', 'The USA PATRIOT Act (2001) raised lasting debate over the balance between:',
    ['States and the federal government', 'Security and civil liberties', 'Labour and capital', 'Church and state'], 1,
    `Surveillance powers expanded sharply after September 11.`),
  q.sa('developing', 'Continuity', `The 2008 crisis began in the ______ mortgage market. (one word)`,
    ['subprime', 'housing'], `Risky lending and securitisation combined into a systemic failure.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Thesis', 'A strong APUSH thesis must be:',
    ['A restatement of the prompt', 'A defensible claim that establishes a line of reasoning', 'A list of facts', 'A question'], 1,
    `It has to take a position that could be argued against.`),
  q.mc('foundation', 'Evidence', 'On the DBQ, using a document means:',
    ['Quoting it at length', 'Describing its content in support of an argument', 'Listing its author', 'Copying it'], 1,
    `Content must be put to work; summary alone does not earn the point.`),
  q.mc('developing', 'Complexity', 'The complexity point is most often earned by:',
    ['Writing more', 'Analysing multiple perspectives or qualifying the argument', 'Adding dates', 'Using more documents'], 1,
    `Nuance, corroboration or a counterargument developed throughout.`),
  q.mc('developing', 'Periodisation', 'A periodisation question asks you to evaluate whether a date is:',
    ['Accurate', 'A meaningful turning point', 'Well known', 'Recent'], 1,
    `You argue about continuity and change across the proposed boundary.`),
  q.mc('developing', 'Evidence', 'Sourcing a document requires explaining how its purpose, audience or point of view:',
    ['Makes it unreliable', 'Is relevant to the argument', 'Was written', 'Compares to a textbook'], 1,
    `Relevance to your argument is what earns the point, not mere identification.`),
  q.mc('ap_ready', 'Thesis', 'Contextualisation requires:',
    ['A single sentence naming a date', 'Broader historical circumstances relevant to the prompt', 'A list of causes', 'A conclusion'], 1,
    `It should situate the topic in developments before, during or after.`),
  q.mc('ap_ready', 'Complexity', 'An effective counterargument in a LEQ:',
    ['Weakens your thesis', 'Is acknowledged and then answered', 'Should be avoided', 'Replaces evidence'], 1,
    `Addressing the strongest objection strengthens rather than undermines the case.`),
  q.sa('foundation', 'Periodisation', `Historical arguments about cause commonly distinguish between long-term and ______-term causes. (one word)`,
    ['short'], `Distinguishing them is often what earns analytical credit.`),
);

export const apUSHQuestions = out;
