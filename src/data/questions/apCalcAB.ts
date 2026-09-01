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

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Limits & Continuity
out.push(
  q.mc('foundation', 'Evaluating limits', 'lim(x→3) of (x² − 9)/(x − 3) equals:',
    ['0', '3', '6', 'Undefined'], 2,
    `Factor to (x+3)(x−3)/(x−3) = x+3, then substitute 3 to get 6.`),
  q.mc('foundation', 'Continuity', 'A removable discontinuity appears on a graph as a:',
    ['Vertical asymptote', 'Hole', 'Jump', 'Corner'], 1,
    `The limit exists but does not equal the function value there.`),
  q.mc('developing', 'Limits at infinity', 'lim(x→∞) of (3x² + x)/(5x² − 2) equals:',
    ['0', '3/5', 'Infinity', '3'], 1,
    `Equal degrees, so the limit is the ratio of the leading coefficients.`),
  q.mc('developing', 'One-sided limits', 'If the left limit is 2 and the right limit is 5, the two-sided limit:',
    ['Equals 2', 'Equals 5', 'Equals 3.5', 'Does not exist'], 3,
    `A two-sided limit exists only when both one-sided limits agree.`),
  q.mc('developing', 'Evaluating limits', 'lim(x→0) of sin(x)/x equals:',
    ['0', '1', 'Infinity', 'Undefined'], 1,
    `A standard limit worth memorising; it underpins the derivative of sine.`),
  q.mc('ap_ready', 'Continuity', 'The Intermediate Value Theorem requires the function to be:',
    ['Differentiable on the interval', 'Continuous on a closed interval', 'Increasing', 'Bounded above'], 1,
    `Continuity on a closed interval is enough; differentiability is not required.`),
  q.mc('ap_ready', 'Limits at infinity', 'A horizontal asymptote describes the behaviour of a function as:',
    ['x approaches a finite value', 'x approaches positive or negative infinity', 'y approaches zero', 'The derivative is zero'], 1,
    `Horizontal asymptotes are about end behaviour; vertical ones are about finite x.`),
  q.sa('developing', 'Evaluating limits', `A limit that gives 0/0 on direct substitution is called an ______ form. (one word)`,
    ['indeterminate'], `Indeterminate forms need algebra or L'Hopital's rule before they can be evaluated.`),
);

q.inUnit(1); // Differentiation: Basic Rules
out.push(
  q.mc('foundation', 'Power rule', 'The derivative of x⁵ is:',
    ['5x⁴', 'x⁴', '5x⁶', '4x⁵'], 0,
    `Bring the exponent down and reduce it by one.`),
  q.mc('foundation', 'Power rule', 'The derivative of a constant is:',
    ['The constant itself', '0', '1', 'Undefined'], 1,
    `A constant function has no rate of change.`),
  q.mc('developing', 'Product rule', 'The derivative of x·sin(x) is:',
    ['cos(x)', 'sin(x) + x·cos(x)', 'x·cos(x)', 'sin(x) − x·cos(x)'], 1,
    `First times the derivative of the second, plus the second times the derivative of the first.`),
  q.mc('developing', 'Meaning', 'The average rate of change of f over an interval is the slope of the:',
    ['Tangent line', 'Secant line', 'Asymptote', 'Normal line'], 1,
    `A secant joins the two endpoints; a tangent touches at one point.`),
  q.mc('developing', 'Power rule', 'The derivative of the square root of x is:',
    ['1/(2√x)', '2√x', 'x^(3/2)', '1/√x'], 0,
    `Write it as x^(1/2); the power rule gives (1/2)x^(−1/2).`),
  q.mc('ap_ready', 'Differentiability', 'A function with a sharp corner at x = a is, at that point:',
    ['Continuous but not differentiable', 'Differentiable but not continuous', 'Neither continuous nor differentiable', 'Both'], 0,
    `Differentiability implies continuity, but not the reverse — a corner has no single tangent.`),
  q.mc('ap_ready', 'Product rule', 'The numerator of the quotient rule for f/g is:',
    ["f'g + fg'", "f'g − fg'", "fg' − f'g", "f'g'"], 1,
    `Low d-high minus high d-low, all over low squared.`),
  q.sa('foundation', 'Meaning', `The function that is its own derivative is e to the power of ______. (one letter)`,
    ['x'], `e^x is unchanged by differentiation, which is what makes e the natural base.`),
);

q.inUnit(2); // Composite & Implicit Functions
out.push(
  q.mc('foundation', 'Chain rule', 'The derivative of (3x + 1)⁴ is:',
    ['4(3x + 1)³', '12(3x + 1)³', '(3x + 1)³', '12(3x + 1)⁴'], 1,
    `Outer derivative 4(3x+1)³ times inner derivative 3.`),
  q.mc('foundation', 'Chain rule', 'The derivative of sin(2x) is:',
    ['cos(2x)', '2cos(2x)', '−2cos(2x)', '2sin(2x)'], 1,
    `Derivative of the outside, times the derivative of the inside.`),
  q.mc('developing', 'Implicit differentiation', 'Differentiating y² with respect to x gives:',
    ['2y', '2y·(dy/dx)', '2x', 'dy/dx'], 1,
    `y is a function of x, so the chain rule attaches a dy/dx.`),
  q.mc('developing', 'Higher-order derivatives', 'The second derivative measures the rate of change of:',
    ['Position', 'The first derivative', 'The integral', 'The domain'], 1,
    `It describes how the slope itself is changing, which is concavity.`),
  q.mc('developing', 'Implicit differentiation', 'Implicit differentiation is needed when y cannot easily be written:',
    ['As a number', 'Explicitly as a function of x', 'As a constant', 'As an integral'], 1,
    `When you cannot solve for y, differentiate the relation as it stands.`),
  q.mc('ap_ready', 'Inverse trig', 'The derivative of arctan(x) is:',
    ['1/(1 + x²)', '1/√(1 − x²)', '−1/(1 + x²)', 'sec²(x)'], 0,
    `Worth memorising alongside arcsin, whose derivative is 1/√(1 − x²).`),
  q.mc('ap_ready', 'Chain rule', 'The derivative of ln(5x) is:',
    ['5/x', '1/x', '1/(5x)', 'ln(5)/x'], 1,
    `(1/(5x))·5 = 1/x — a constant inside a log does not survive differentiation.`),
  q.sa('developing', 'Higher-order derivatives', `If s(t) is position, the second derivative represents ______. (one word)`,
    ['acceleration'], `Position, velocity, acceleration — each is the derivative of the one before.`),
);

q.inUnit(3); // Contextual Applications
out.push(
  q.mc('foundation', 'Motion', 'A particle is momentarily at rest when its velocity is:',
    ['Maximum', 'Zero', 'Negative', 'Increasing'], 1,
    `At rest means v(t) = 0, which is also where direction can change.`),
  q.mc('foundation', 'Units', 'If f(x) is in metres and x is in seconds, the derivative has units of:',
    ['Metres', 'Seconds', 'Metres per second', 'Seconds per metre'], 2,
    `A derivative always carries the units of output divided by input.`),
  q.mc('developing', 'Motion', 'A particle speeds up when velocity and acceleration:',
    ['Have the same sign', 'Have opposite signs', 'Are both zero', 'Are both positive only'], 0,
    `Same sign means the push is in the direction of travel, so speed increases.`),
  q.mc('developing', 'Related rates', 'The first step in a related-rates problem is to:',
    ['Differentiate immediately', 'Write an equation relating the quantities', 'Substitute the given values', 'Solve for the unknown'], 1,
    `Substituting before differentiating freezes the variables you needed to change.`),
  q.mc('developing', 'Motion', 'Displacement over an interval is found from velocity by:',
    ['Differentiating', 'Integrating', 'Taking the maximum', 'Averaging the endpoints'], 1,
    `The definite integral of velocity gives net change in position.`),
  q.mc('ap_ready', 'Related rates', 'A ladder slides down a wall. The quantity that stays constant is the:',
    ['Height on the wall', 'Distance from the wall', 'Ladder length', 'Rate of descent'], 2,
    `The fixed length is what relates the two changing distances.`),
  q.mc('ap_ready', 'Units', 'If R(t) is in litres per hour, the integral of R over an interval has units of:',
    ['Litres per hour', 'Litres', 'Hours', 'Litres per hour squared'], 1,
    `Integrating multiplies by the units of the variable, cancelling the "per hour".`),
  q.sa('developing', 'Motion', `Total distance travelled uses the integral of the ______ value of velocity. (one word)`,
    ['absolute'], `Net displacement can cancel; distance cannot, so the absolute value is required.`),
);

q.inUnit(4); // Analytical Applications
out.push(
  q.mc('foundation', 'Increasing and decreasing', 'A function is increasing where its first derivative is:',
    ['Positive', 'Negative', 'Zero', 'Undefined'], 0,
    `Positive slope means rising values.`),
  q.mc('foundation', 'Concavity', 'A curve is concave up where the second derivative is:',
    ['Positive', 'Negative', 'Zero', 'Constant'], 0,
    `A positive second derivative means the slope is increasing, bending the curve upward.`),
  q.mc('developing', 'Extrema', 'A critical point occurs where the first derivative is:',
    ['Positive', 'Zero or undefined', 'Always undefined', 'Equal to the function'], 1,
    `Critical points are candidates for extrema; a test tells you which they are.`),
  q.mc('developing', 'Concavity', 'An inflection point is where concavity:',
    ['Reaches a maximum', 'Changes sign', 'Is zero only', 'Is undefined only'], 1,
    `The second derivative must actually change sign, not merely equal zero.`),
  q.mc('developing', 'Extrema', 'The Extreme Value Theorem guarantees a maximum when the function is:',
    ['Differentiable everywhere', 'Continuous on a closed interval', 'Increasing', 'Bounded'], 1,
    `Continuity on a closed, bounded interval is what forces the extremes to be attained.`),
  q.mc('ap_ready', 'Mean value theorem', 'The Mean Value Theorem concludes there is a point where the derivative equals the:',
    ['Value zero', 'Average rate of change over the interval', 'Maximum of the function', 'Integral of the function'], 1,
    `Somewhere the instantaneous rate must match the average rate.`),
  q.mc('ap_ready', 'Extrema', 'If the first derivative changes from negative to positive at c, then c is a:',
    ['Local maximum', 'Local minimum', 'Inflection point', 'Discontinuity'], 1,
    `Falling then rising is the shape of a minimum.`),
  q.sa('ap_ready', 'Mean value theorem', `The special case of the Mean Value Theorem where the endpoints are equal is called ______'s theorem. (one word)`,
    ['rolle', "rolle's"], `Rolle's theorem guarantees a horizontal tangent between two equal values.`),
);

q.inUnit(5); // Integration & Accumulation
out.push(
  q.mc('foundation', 'Antiderivatives', 'The antiderivative of 3x² is:',
    ['6x + C', 'x³ + C', '3x³ + C', 'x³/3 + C'], 1,
    `Raise the power and divide by the new power; always add C.`),
  q.mc('foundation', 'Definite integrals', 'A left Riemann sum underestimates the integral when the function is:',
    ['Decreasing', 'Increasing', 'Constant', 'Negative'], 1,
    `On an increasing function every left endpoint is below the curve\'s average.`),
  q.mc('developing', 'Fundamental theorem', 'The Fundamental Theorem of Calculus connects:',
    ['Limits and continuity', 'Derivatives and integrals', 'Series and sequences', 'Domain and range'], 1,
    `It says differentiation and integration undo each other.`),
  q.mc('developing', 'U-substitution', 'For the integral of 2x·cos(x²), the natural substitution is:',
    ['u = 2x', 'u = x²', 'u = cos(x)', 'u = x'], 1,
    `Then du = 2x dx, which is exactly the rest of the integrand.`),
  q.mc('developing', 'Definite integrals', 'A Riemann sum approximates an integral using:',
    ['Tangent lines', 'Rectangles', 'Circles', 'Derivatives'], 1,
    `The integral is the limit of these rectangle sums as the width goes to zero.`),
  q.mc('ap_ready', 'Fundamental theorem', 'Differentiating an accumulation function from 0 to x returns:',
    ['The integrand evaluated at x', 'The derivative of the integrand', 'The antiderivative', 'Zero'], 0,
    `The second part of the theorem: differentiation undoes accumulation.`),
  q.mc('ap_ready', 'Definite integrals', 'If a definite integral is negative, the function over that interval is mostly:',
    ['Above the axis', 'Below the axis', 'Increasing', 'Concave up'], 1,
    `Signed area counts regions below the axis as negative.`),
  q.sa('developing', 'Antiderivatives', `The antiderivative of 1/x needs an absolute value inside the log because x can be ______. (one word)`,
    ['negative'], `The domain of 1/x includes negatives, so the log needs the absolute value.`),
);

q.inUnit(6); // Differential Equations
out.push(
  q.mc('foundation', 'Slope fields', 'A slope field shows:',
    ['The exact solution curve', 'The slope at many points', 'The area under a curve', 'The second derivative'], 1,
    `Each small segment is the slope the differential equation prescribes at that point.`),
  q.mc('foundation', 'Initial conditions', 'An initial condition is used to determine:',
    ['The derivative', 'The constant of integration', 'The domain', 'The concavity'], 1,
    `It picks one curve out of the family of antiderivatives.`),
  q.mc('developing', 'Separation of variables', 'To solve dy/dx = xy, the first step is to:',
    ['Integrate both sides directly', 'Separate into dy/y = x dx', 'Differentiate again', 'Substitute u = xy'], 1,
    `Get all the y terms with dy and all the x terms with dx, then integrate.`),
  q.mc('developing', 'Slope fields', 'Where the derivative is zero, slope field segments are:',
    ['Vertical', 'Horizontal', 'Diagonal', 'Absent'], 1,
    `A zero derivative draws a flat segment.`),
  q.mc('developing', 'Separation of variables', 'The general solution of dy/dx = ky is:',
    ['y = kx + C', 'y = Ce^(kx)', 'y = C·ln(kx)', 'y = k/x + C'], 1,
    `Exponential growth or decay, depending on the sign of k.`),
  q.mc('ap_ready', 'Initial conditions', 'Exponential decay corresponds to a rate constant that is:',
    ['Positive', 'Negative', 'Zero', 'Greater than one'], 1,
    `A negative rate constant shrinks the quantity over time.`),
  q.mc('ap_ready', 'Slope fields', 'A solution curve drawn on a slope field must:',
    ['Cross the segments', 'Follow the segments tangentially', 'Stay horizontal', 'End at the origin'], 1,
    `The curve is everywhere tangent to the field it is drawn on.`),
  q.sa('developing', 'Separation of variables', `A differential equation is separable when it can be written as a function of x times a function of ______. (one letter)`,
    ['y'], `dy/dx = g(x)h(y) is the separable form.`),
);

q.inUnit(7); // Applications of Integration
out.push(
  q.mc('foundation', 'Average value', 'The average value of a function on an interval equals the integral divided by:',
    ['The sum of the endpoints', 'The width of the interval', 'The product of the endpoints', 'Two'], 1,
    `Total accumulation divided by the width of the interval.`),
  q.mc('foundation', 'Area between curves', 'Area between two curves integrates:',
    ['Top minus bottom', 'Bottom minus top', 'Their product', 'Their derivatives'], 0,
    `Subtracting in that order keeps the area positive where the order holds.`),
  q.mc('developing', 'Position from velocity', 'Given velocity and a starting position, the position at time T is the start plus:',
    ['The velocity at T', 'The integral of velocity from 0 to T', 'The acceleration at T', 'The average velocity'], 1,
    `Accumulated change added to the starting value.`),
  q.mc('developing', 'Volumes', 'The disc method integrates the quantity:',
    ['pi times radius squared', 'Two pi times radius times height', 'Radius squared', 'Pi times radius'], 0,
    `Each slice is a circle of area pi·r², where r is the distance to the axis.`),
  q.mc('developing', 'Area between curves', 'If two curves cross inside the interval, you must:',
    ['Ignore the crossing', 'Split the integral at the crossing', 'Use the average', 'Differentiate first'], 1,
    `Which function is on top changes at the crossing, so the integrand changes with it.`),
  q.mc('ap_ready', 'Volumes', 'The washer method is needed when the solid has:',
    ['A hole through it', 'A flat top', 'Constant radius', 'No axis'], 0,
    `Subtract the inner disc from the outer one at each slice.`),
  q.mc('ap_ready', 'Average value', 'The Mean Value Theorem for Integrals guarantees a point where the function equals its:',
    ['Value zero', 'Average value', 'Maximum', 'Derivative'], 1,
    `A continuous function attains its own average somewhere on the interval.`),
  q.sa('developing', 'Volumes', `A solid built from square cross-sections integrates the ______ of the side length. (one word)`,
    ['square'], `Cross-sectional area for a square is s², so you integrate s².`),
);

q.inUnit(8); // Free-Response Craft
out.push(
  q.mc('foundation', 'Notation', 'An indefinite integral written without the constant of integration:',
    ['Is still complete', 'Is an incomplete answer', 'Needs a graph', 'Is preferred'], 1,
    `The + C is part of the answer, and readers deduct for its absence.`),
  q.mc('foundation', 'Showing work', 'A calculator answer with no supporting setup earns:',
    ['Full credit', 'Little or no credit', 'Extra credit', 'Credit only if correct'], 1,
    `Readers score the setup as well as the number; an unsupported value is unscoreable.`),
  q.mc('developing', 'Justification', 'To justify that a point is a maximum, cite:',
    ['That the value is large', 'The sign change of the first derivative', 'The value at zero', 'The domain'], 1,
    `A sign change from positive to negative is the argument, not the size of the value.`),
  q.mc('developing', 'Calculator use', 'On the calculator-active section you should still:',
    ['Write the integral you evaluated', 'Show every algebra step', 'Avoid the calculator', 'Round to one decimal'], 0,
    `Write the definite integral, then the value — the setup is what earns the point.`),
  q.mc('developing', 'Units', 'A question asking "how much" accumulated over an interval expects:',
    ['A derivative', 'A definite integral', 'A limit', 'A slope'], 1,
    `"How much" accumulates, so it integrates the rate.`),
  q.mc('ap_ready', 'Justification', 'A justification that only says "because the graph looks like it" earns:',
    ['Full credit', 'No credit', 'Half credit', 'Credit with a diagram'], 1,
    `Justifications must cite a value, a sign or a theorem.`),
  q.mc('ap_ready', 'Notation', 'Answers should be left exact unless the question asks for:',
    ['A decimal approximation', 'A graph', 'A proof', 'A justification'], 0,
    `Rounding early is a common way to lose an otherwise correct answer.`),
  q.sa('developing', 'Showing work', `Storing intermediate values instead of rounding avoids accumulated ______ error. (one word)`,
    ['rounding', 'round-off'], `Rounding at each step compounds into a wrong final digit.`),
);

q.inUnit(9); // Exam Preparation
out.push(
  q.mc('foundation', 'Pacing', 'The multiple-choice section allows roughly how long per question?',
    ['Under one minute', 'About two minutes', 'About five minutes', 'Ten minutes'], 1,
    `Around two minutes on average, so a long one should be flagged and revisited.`),
  q.mc('foundation', 'Guessing', 'On a question you cannot start, the best move is to:',
    ['Leave it blank', 'Eliminate what you can and guess', 'Spend five minutes on it', 'Copy a neighbouring answer'], 1,
    `There is no penalty for a wrong answer, so a guess is free.`),
  q.mc('developing', 'Error triage', 'If your answer is not among the choices, first check:',
    ['The question again', 'Your algebra and signs', 'Whether the exam is wrong', 'The next question'], 1,
    `Sign errors and dropped factors account for most "my answer is not there" moments.`),
  q.mc('developing', 'Mixed review', 'A table of values with a question about rate expects:',
    ['An exact derivative', 'An average rate of change', 'An integral', 'A limit'], 1,
    `With discrete data, the difference quotient over the interval is the available answer.`),
  q.mc('developing', 'Pacing', 'Flagging and returning is most useful when you are:',
    ['Unsure but close', 'Completely stuck', 'On a short question', 'On the last question'], 0,
    `Close-but-stuck questions reward a second pass; blanks are better guessed immediately.`),
  q.mc('ap_ready', 'Error triage', 'A units mismatch in a related-rates answer usually means:',
    ['The calculator is wrong', 'A rate was used where a quantity was needed', 'The formula is invalid', 'The interval is wrong'], 1,
    `Checking units at the end catches most setup errors.`),
  q.mc('ap_ready', 'Mixed review', 'When a problem says "accumulated", the tool is:',
    ['Differentiation', 'Integration', 'A limit', 'A slope field'], 1,
    `Accumulation is integration by definition.`),
  q.sa('foundation', 'Guessing', `Because there is no penalty for a wrong answer, you should never leave a question ______. (one word)`,
    ['blank', 'unanswered'], `Every blank is a guaranteed zero.`),
);

export const apCalcABQuestions = out;
