import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP Calculus AB — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-calc-ab');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Limits & Continuity
out.push(
  q.mc('foundation', 'Evaluating limits', 'What is lim(x→2) of (x² − 4)/(x − 2)?',
    ['0', '2', '4', 'Undefined'], 2,
    `Factor the top to (x−2)(x+2), cancel (x−2), then substitute: 2 + 2 = 4.`),
  q.mc('foundation', 'One-sided limits', 'If the left and right limits at x = a differ, then lim(x→a) f(x):',
    ['Equals their average', 'Does not exist', 'Equals zero', 'Equals f(a)'], 1,
    `A two-sided limit exists only when both one-sided limits agree.`),
  q.mc('developing', 'Continuity', 'A function is continuous at x = a when:',
    ['f(a) is defined', 'The limit exists', 'The limit exists and equals f(a)', 'The derivative exists'], 2,
    `All three conditions must hold: f(a) defined, the limit exists, and they match.`),
  q.mc('ap_ready', 'Limits at infinity', 'What is lim(x→∞) of (3x² + 5)/(x² − 1)?',
    ['0', '3', '∞', '−3'], 1,
    `With equal degrees the limit is the ratio of leading coefficients, 3/1.`),
);

q.inUnit(1); // Differentiation: Basic Rules
out.push(
  q.mc('foundation', 'Power rule', 'What is the derivative of f(x) = x³?',
    ['3x²', 'x²', '3x', 'x⁴/4'], 0,
    `The power rule brings the exponent down and reduces it by one: 3x².`),
  q.mc('foundation', 'Meaning', 'The derivative at a point gives the:',
    ['Area under the curve', 'Slope of the tangent line', 'Average value', 'y-intercept'], 1,
    `The derivative is the instantaneous rate of change — the tangent slope.`),
  q.mc('developing', 'Product rule', 'If f(x) = x²·sin(x), then f′(x) =',
    ['2x·cos(x)', '2x·sin(x) + x²·cos(x)', 'x²·cos(x)', '2x + cos(x)'], 1,
    `Product rule: (first)′(second) + (first)(second)′.`),
  q.mc('ap_ready', 'Differentiability', 'A function with a sharp corner at x = c is:',
    ['Differentiable and continuous there', 'Continuous but not differentiable there', 'Differentiable but not continuous', 'Neither'], 1,
    `A corner has different one-sided slopes, so the derivative fails even though the function is continuous.`),
);

q.inUnit(2); // Composite & Implicit Functions
out.push(
  q.mc('foundation', 'Chain rule', 'What is the derivative of f(x) = (2x + 1)⁵?',
    ['5(2x + 1)⁴', '10(2x + 1)⁴', '(2x + 1)⁴', '10x(2x + 1)⁴'], 1,
    `Chain rule: 5(2x+1)⁴ times the inner derivative 2, giving 10(2x+1)⁴.`),
  q.mc('developing', 'Implicit differentiation', 'For x² + y² = 25, dy/dx equals:',
    ['−x/y', 'x/y', '−y/x', '2x + 2y'], 0,
    `Differentiate: 2x + 2y·(dy/dx) = 0, so dy/dx = −x/y.`),
  q.sa('developing', 'Higher-order derivatives', 'The derivative of the derivative is called the ______ derivative. (one word)',
    ['second'], `The second derivative describes concavity and acceleration.`),
  q.mc('ap_ready', 'Inverse trig', 'The derivative of arcsin(x) is:',
    ['1/(1 + x²)', '1/√(1 − x²)', '−1/√(1 − x²)', '√(1 − x²)'], 1,
    `d/dx arcsin(x) = 1/√(1 − x²); the negative form belongs to arccos.`),
);

q.inUnit(3); // Contextual Applications
out.push(
  q.mc('foundation', 'Motion', 'If s(t) is position, then s′(t) represents:',
    ['Acceleration', 'Velocity', 'Distance travelled', 'Average speed'], 1,
    `The first derivative of position is velocity; the second is acceleration.`),
  q.mc('developing', 'Related rates', 'A balloon’s radius grows at 2 cm/s. To find how fast its volume grows you would:',
    ['Differentiate V = (4/3)πr³ with respect to time', 'Solve V = (4/3)πr³ for r', 'Integrate the radius', 'Set dV/dt = 2'], 0,
    `Related rates differentiate the relationship with respect to t, giving dV/dt = 4πr²·(dr/dt).`),
  q.mc('developing', 'Units', 'If f(t) is measured in litres and t in minutes, f′(t) has units of:',
    ['Litres', 'Minutes', 'Litres per minute', 'Minutes per litre'], 2,
    `A derivative carries the units of the output divided by the units of the input.`),
  q.mc('ap_ready', "L'Hospital's rule", `L'Hospital's rule may be applied to a limit only when it takes the form:`,
    ['0 × ∞', '0/0 or ∞/∞', '1 + 1', 'Any limit at all'], 1,
    `It applies to indeterminate quotients; other indeterminate forms must first be rewritten as one.`),
);

q.inUnit(4); // Analytical Applications
out.push(
  q.mc('foundation', 'Increasing and decreasing', 'A function is increasing on an interval where:',
    ['f′(x) < 0', 'f′(x) > 0', 'f″(x) > 0', 'f(x) > 0'], 1,
    `A positive first derivative means the function is rising.`),
  q.mc('developing', 'Concavity', 'If f″(x) > 0 on an interval, the graph is:',
    ['Concave down', 'Concave up', 'Linear', 'Decreasing'], 1,
    `A positive second derivative means the slope is increasing — concave up.`),
  q.mc('developing', 'Extrema', 'At a local maximum of a differentiable function, f′(x) is:',
    ['Positive', 'Negative', 'Zero', 'Undefined'], 2,
    `The tangent is horizontal at a smooth local extremum, so the first derivative is zero.`),
  q.mc('ap_ready', 'Mean value theorem', 'The Mean Value Theorem guarantees a point where the instantaneous rate equals the:',
    ['Maximum value', 'Average rate of change over the interval', 'Second derivative', 'y-intercept'], 1,
    `On a closed interval where f is continuous and differentiable inside, some c has f′(c) equal to the average rate.`),
);

q.inUnit(5); // Integration & Accumulation
out.push(
  q.mc('foundation', 'Antiderivatives', 'What is ∫ 2x dx?',
    ['x² + C', '2x² + C', 'x + C', '2 + C'], 0,
    `Reverse the power rule and add the constant of integration.`),
  q.mc('foundation', 'Definite integrals', 'A definite integral of a positive function represents:',
    ['The slope at a point', 'The area under the curve', 'The maximum value', 'The derivative'], 1,
    `∫ from a to b of a positive f gives the area between the curve and the x-axis.`),
  q.mc('developing', 'Fundamental theorem', 'If F′(x) = f(x), then ∫ from a to b of f(x) dx equals:',
    ['F(b) + F(a)', 'F(b) − F(a)', 'f(b) − f(a)', 'F(b)·F(a)'], 1,
    `That is the Fundamental Theorem of Calculus, part two.`),
  q.mc('ap_ready', 'U-substitution', 'For ∫ 2x·cos(x²) dx, a good substitution is:',
    ['u = 2x', 'u = x²', 'u = cos(x)', 'u = x'], 1,
    `With u = x², du = 2x dx, which is exactly the rest of the integrand.`),
);

q.inUnit(6); // Differential Equations
out.push(
  q.mc('foundation', 'Reading them', 'The equation dy/dx = ky models:',
    ['Linear growth', 'Exponential growth or decay', 'Periodic motion', 'Constant velocity'], 1,
    `A rate proportional to the amount present gives y = Ce^(kx).`),
  q.mc('developing', 'Slope fields', 'A slope field shows, at each point, the:',
    ['Value of y', 'Slope a solution curve would have there', 'Area under the curve', 'Second derivative'], 1,
    `Each dash is the tangent direction a solution passing through that point would take.`),
  q.mc('developing', 'Separation of variables', 'To solve dy/dx = xy you would first:',
    ['Integrate both sides directly', 'Separate into (1/y) dy = x dx', 'Differentiate again', 'Set y = 0'], 1,
    `Separation collects the y terms on one side and the x terms on the other before integrating.`),
  q.mc('ap_ready', 'Initial conditions', 'An initial condition is used to:',
    ['Find the constant of integration', 'Check continuity', 'Determine concavity', 'Eliminate the variable'], 0,
    `The general solution carries a +C; the initial condition pins it to one particular curve.`),
);

q.inUnit(7); // Applications of Integration
out.push(
  q.mc('foundation', 'Average value', 'The average value of f on [a, b] is:',
    ['f(b) − f(a)', '(1/(b−a)) ∫ f(x) dx', '∫ f(x) dx', '(f(a) + f(b))/2'], 1,
    `Divide the accumulated total by the length of the interval.`),
  q.mc('developing', 'Area between curves', 'The area between f and g on [a, b], where f ≥ g, is:',
    ['∫ (f + g) dx', '∫ (f − g) dx', '∫ f dx × ∫ g dx', '∫ (g − f) dx'], 1,
    `Integrate the vertical gap, top curve minus bottom curve.`),
  q.mc('developing', 'Position from velocity', 'Given velocity v(t), the displacement from t = 0 to t = 5 is:',
    ['v(5) − v(0)', '∫ from 0 to 5 of v(t) dt', "v′(5)", '∫ |v(t)| dt'], 1,
    `Integrating velocity gives displacement; integrating its absolute value gives total distance.`),
  q.mc('ap_ready', 'Volumes', 'Rotating a region about the x-axis and using discs, each cross-section has area:',
    ['2πr·h', 'πr²', 'π(R² − r²)', 'r²'], 1,
    `A solid disc has area πr² where r is the function value; washers subtract an inner radius.`),
);

q.inUnit(8); // Free-Response Craft
out.push(
  q.mc('foundation', 'Notation', 'Writing your answer as a number with no units on a contextual FRQ usually:',
    ['Earns full credit', 'Loses a point', 'Is required', 'Is preferred'], 1,
    `Contextual parts expect units; leaving them off is one of the most common avoidable losses.`),
  q.mc('developing', 'Justification', 'To justify that x = c is a maximum, you should cite:',
    ['That f(c) is the biggest number you found', 'A sign change of f′ from positive to negative', 'That f″(c) exists', 'The value of f(c) alone'], 1,
    `A sign analysis of the first derivative — or a second derivative test — is what earns the justification point.`),
  q.mc('developing', 'Calculator use', 'On calculator-active parts, answers should generally be given to:',
    ['The nearest whole number', 'Three decimal places', 'One decimal place', 'Exact form only'], 1,
    `Three decimal places is the standard expectation unless the question says otherwise.`),
  q.mc('ap_ready', 'Showing work', 'You set up a correct integral but make an arithmetic slip evaluating it. You will most likely:',
    ['Lose all points for the part', 'Earn the setup point and lose the answer point', 'Earn full credit', 'Earn nothing without the right number'], 1,
    `Rubrics award setup separately, which is why writing the integral down matters even when time is short.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Pacing', 'On the multiple-choice section, a question you cannot start within about a minute is best:',
    ['Worked until finished', 'Marked and returned to later', 'Left permanently blank', 'Answered with the longest option'], 1,
    `Every question is worth the same, so time spent stuck is time taken from questions you can do.`),
  q.mc('foundation', 'Guessing', 'There is no penalty for a wrong multiple-choice answer, so you should:',
    ['Leave hard ones blank', 'Answer every question', 'Answer only what you are sure of', 'Answer at random from the start'], 1,
    `With no penalty, a blank is strictly worse than a guess.`),
  q.mc('developing', 'Error triage', 'Reviewing practice tests, the most useful thing to sort your mistakes by is:',
    ['The question number', 'Whether it was a concept gap or a slip', 'How long each took', 'The difficulty label'], 1,
    `Concept gaps need study; slips need process changes. Treating them the same wastes both fixes.`),
  q.mc('ap_ready', 'Mixed review', 'Late in preparation, practising mixed topics rather than one unit at a time helps because:',
    ['It is faster', 'It trains you to identify which method a question needs', 'It covers more pages', 'It avoids hard topics'], 1,
    `On the exam nothing tells you which technique applies — recognising that is its own skill.`),
);

export const apCalcABQuestions = out;
