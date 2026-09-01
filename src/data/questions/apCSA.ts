import type { PlacementQuestion } from '@/types';
import { subject } from './builders';

/** AP Computer Science A — four questions per unit, ten units. Original scaffolding. */

const q = subject('ap-csa');
const out: PlacementQuestion[] = [];

q.inUnit(0); // Primitive Types
out.push(
  q.mc('foundation', 'Primitive types', 'Which Java type stores a whole number?',
    ['double', 'int', 'String', 'boolean'], 1,
    `int holds integers; double holds decimals and String is an object, not a primitive.`),
  q.mc('foundation', 'Integer division', 'What is the value of 7 / 2 in Java?',
    ['3.5', '3', '4', '3.0'], 1,
    `Dividing two ints performs integer division and truncates toward zero.`),
  q.mc('developing', 'Modulus', 'What is the value of 17 % 5?',
    ['3', '2', '3.4', '85'], 1,
    `The remainder operator returns what is left after division: 17 = 3×5 + 2.`),
  q.mc('ap_ready', 'Casting', 'What does (int)(3.99) evaluate to?',
    ['4', '3', '3.9', 'A compile error'], 1,
    `Casting a double to int truncates rather than rounding.`),
);

q.inUnit(1); // Using Objects
out.push(
  q.mc('foundation', 'Objects', 'Which keyword creates a new object in Java?',
    ['make', 'new', 'create', 'object'], 1,
    `The new keyword allocates an object and calls its constructor.`),
  q.mc('foundation', 'String methods', 'For String s = "hello", what does s.length() return?',
    ['4', '5', '6', 'An error'], 1,
    `length() counts characters, and "hello" has five.`),
  q.mc('developing', 'substring', 'For String s = "computer", what is s.substring(0, 3)?',
    ['"com"', '"comp"', '"omp"', '"c"'], 0,
    `substring starts at the first index and stops before the second, giving three characters.`),
  q.mc('ap_ready', 'References', 'Comparing two String objects with == checks whether they:',
    ['Contain the same characters', 'Refer to the same object', 'Have the same length', 'Are both non-null'], 1,
    `== compares references; .equals() compares contents, which is almost always what you want.`),
);

q.inUnit(2); // Boolean Expressions & if
out.push(
  q.mc('foundation', 'Boolean operators', 'Which operator means logical AND in Java?',
    ['&&', '||', '!', '=='], 0,
    `&& is AND, || is OR, ! is NOT.`),
  q.mc('foundation', 'Comparison', 'The expression 5 != 5 evaluates to:',
    ['true', 'false', '0', 'An error'], 1,
    `!= is "not equal", and 5 does equal 5, so the result is false.`),
  q.mc('developing', 'De Morgan', 'The expression !(a && b) is equivalent to:',
    ['!a && !b', '!a || !b', 'a || b', 'a && b'], 1,
    `De Morgan's law: negating an AND distributes as an OR of the negations.`),
  q.mc('ap_ready', 'Short-circuit', 'In (x != 0 && 10 / x > 2), the first condition prevents:',
    ['A syntax error', 'Division by zero at runtime', 'An infinite loop', 'A type mismatch'], 1,
    `&& stops evaluating once the left side is false, so the division never runs when x is 0.`),
);

q.inUnit(3); // Iteration
out.push(
  q.mc('foundation', 'for loops', 'How many times does `for (int i = 0; i < 5; i++)` run its body?',
    ['4', '5', '6', 'Infinitely'], 1,
    `i takes the values 0 through 4 — five iterations.`),
  q.mc('foundation', 'while loops', 'A while loop whose condition never becomes false is:',
    ['A compile error', 'An infinite loop', 'Skipped entirely', 'Run once'], 1,
    `Nothing stops it, so the program hangs inside the loop.`),
  q.mc('developing', 'Nested loops', 'Two nested loops each running n times execute the inner body:',
    ['n times', '2n times', 'n² times', 'n/2 times'], 2,
    `The inner loop runs fully for every iteration of the outer one.`),
  q.mc('ap_ready', 'Loop tracing', 'After `int s = 0; for (int i = 1; i <= 4; i++) s += i;` the value of s is:',
    ['4', '10', '24', '6'], 1,
    `s accumulates 1 + 2 + 3 + 4 = 10.`),
);

q.inUnit(4); // Writing Classes
out.push(
  q.mc('foundation', 'Constructors', 'A constructor in Java must:',
    ['Return void', 'Have the same name as its class', 'Be called main', 'Be private'], 1,
    `Constructors share the class name and declare no return type at all.`),
  q.mc('foundation', 'Encapsulation', 'Instance variables are usually declared private in order to:',
    ['Save memory', 'Control access through methods', 'Run faster', 'Allow inheritance'], 1,
    `Encapsulation keeps the internal state consistent by routing changes through methods.`),
  q.mc('developing', 'Static', 'A static variable belongs to:',
    ['Each object separately', 'The class as a whole', 'The main method', 'The superclass only'], 1,
    `One copy of a static field is shared by every instance.`),
  q.mc('ap_ready', 'this', 'Inside a method, `this` refers to:',
    ['The class definition', 'The object the method was called on', 'The superclass', 'A new object'], 1,
    `this is a reference to the current instance, used to disambiguate parameters from fields.`),
);

q.inUnit(5); // Array
out.push(
  q.mc('foundation', 'Indexing', 'The first element of a Java array is at index:',
    ['1', '0', '−1', 'The array length'], 1,
    `Java arrays are zero-indexed.`),
  q.mc('foundation', 'Length', 'For an array `arr`, the number of elements is given by:',
    ['arr.length()', 'arr.length', 'arr.size()', 'length(arr)'], 1,
    `Arrays use the field length, without parentheses; that is Strings and lists that use methods.`),
  q.mc('developing', 'Bounds', 'Accessing arr[arr.length] causes:',
    ['A compile error', 'An ArrayIndexOutOfBoundsException', 'The last element', 'null'], 1,
    `The last valid index is length − 1, so length itself is one past the end.`),
  q.mc('ap_ready', 'Enhanced for', 'Which loop cannot change the elements of an array of ints?',
    ['A standard for loop', 'An enhanced for-each loop', 'A while loop', 'A do-while loop'], 1,
    `The for-each variable is a copy, so assigning to it does not write back to the array.`),
);

q.inUnit(6); // ArrayList
out.push(
  q.mc('foundation', 'Basics', 'Which method adds an element to the end of an ArrayList?',
    ['append()', 'add()', 'push()', 'insert()'], 1,
    `add(E) appends; add(int, E) inserts at an index.`),
  q.mc('foundation', 'Size', 'The number of elements in an ArrayList is given by:',
    ['list.length', 'list.size()', 'list.count()', 'list.length()'], 1,
    `ArrayList uses the size() method.`),
  q.mc('developing', 'Removal', 'Removing elements while looping forward with an index often skips elements because:',
    ['The list is immutable', 'Later elements shift down into the current index', 'size() is cached', 'remove() is slow'], 1,
    `After a removal everything shifts left, so incrementing the index steps over one item.`),
  q.mc('ap_ready', 'Generics', 'ArrayList<Integer> cannot store an int directly, but it works because Java performs:',
    ['Casting', 'Autoboxing', 'Overloading', 'Inheritance'], 1,
    `Autoboxing wraps the primitive int in an Integer object automatically.`),
);

q.inUnit(7); // 2D Array
out.push(
  q.mc('foundation', 'Declaration', 'Which declares a 3×4 array of ints?',
    ['int[3][4] a;', 'int[][] a = new int[3][4];', 'int a = new int[3,4];', 'int[] a = new int[12];'], 1,
    `Both bracket pairs go on the type, with the sizes on the new expression.`),
  q.mc('developing', 'Traversal', 'For a 2D array, `arr.length` gives the number of:',
    ['Columns', 'Rows', 'Total elements', 'Bytes'], 1,
    `arr.length is the number of rows; arr[0].length is the columns in the first row.`),
  q.mc('developing', 'Row-major', 'Nested for-each loops over a 2D array visit elements in:',
    ['Column-major order', 'Row-major order', 'Random order', 'Reverse order'], 1,
    `The outer loop walks rows and the inner loop walks the columns within each.`),
  q.mc('ap_ready', 'Access', 'For int[][] g = new int[2][3], the expression g[1][2] refers to:',
    ['Row 1, column 2 (the last element)', 'Row 2, column 1', 'An out-of-bounds index', 'The array length'], 0,
    `Both indices are zero-based, so g[1][2] is the last element of the second row.`),
);

q.inUnit(8); // Inheritance
out.push(
  q.mc('foundation', 'extends', 'The keyword that establishes inheritance in Java is:',
    ['implements', 'extends', 'inherits', 'super'], 1,
    `A class extends another class; it implements an interface.`),
  q.mc('foundation', 'super', 'Calling super() inside a constructor invokes the:',
    ['Same class constructor', 'Superclass constructor', 'Main method', 'Object destructor'], 1,
    `super() runs the parent constructor and must come first if used.`),
  q.mc('developing', 'Overriding', 'A subclass method with the same signature as its parent’s method is:',
    ['Overloaded', 'Overridden', 'Ignored', 'A compile error'], 1,
    `Same name and parameters overrides; a different parameter list overloads.`),
  q.mc('ap_ready', 'Polymorphism', 'For `Animal a = new Dog();` where Dog overrides speak(), a.speak() runs:',
    ['Animal’s version', 'Dog’s version', 'Neither', 'Both'], 1,
    `Method calls are resolved at runtime by the actual object type, not the declared type.`),
);

q.inUnit(9); // Recursion
out.push(
  q.mc('foundation', 'Base case', 'Every recursive method must have a base case in order to:',
    ['Run faster', 'Stop the recursion', 'Return a value', 'Compile'], 1,
    `Without a base case the calls never stop and the stack overflows.`),
  q.mc('developing', 'Tracing', 'For `int f(int n) { return n <= 1 ? 1 : n * f(n - 1); }`, f(4) returns:',
    ['4', '10', '24', '16'], 2,
    `That is factorial: 4 × 3 × 2 × 1 = 24.`),
  q.mc('developing', 'Call stack', 'Each recursive call adds to the:',
    ['Heap', 'Call stack', 'Array', 'Constant pool'], 1,
    `Every pending call keeps a frame on the stack until it returns.`),
  q.mc('ap_ready', 'Recursive search', 'Binary search is naturally recursive because at each step it:',
    ['Checks every element', 'Solves the same problem on half the data', 'Sorts the array', 'Reverses the array'], 1,
    `Discarding half and repeating is the definition of a recursive subproblem.`),
);

// ---------------------------------------------------------------------------
// Second pass — eight more per unit.
//
// Four questions per unit meant a track of eighteen stops drew the same four
// over and over. Unit tags are re-declared rather than the blocks above being
// edited, because selection filters by tag and never by position.
// ---------------------------------------------------------------------------

q.inUnit(0); // Primitive Types
out.push(
  q.mc('foundation', 'Primitive types', 'Which of these is NOT a Java primitive type?',
    ['int', 'double', 'String', 'boolean'], 2,
    `String is a class, not a primitive — which is why it is capitalised.`),
  q.mc('foundation', 'Integer division', 'What does 7 / 2 evaluate to in Java?',
    ['3.5', '3', '4', '3.0'], 1,
    `Both operands are int, so the division is integer division and the remainder is discarded.`),
  q.mc('developing', 'Modulus', 'What does 17 % 5 evaluate to?',
    ['3', '2', '3.4', '85'], 1,
    `The modulus operator returns the remainder after division.`),
  q.mc('developing', 'Casting', 'What does (int) 9.99 evaluate to?',
    ['10', '9', '9.99', 'A compile error'], 1,
    `Casting a double to int truncates toward zero; it does not round.`),
  q.mc('developing', 'Integer division', 'To force floating-point division of two ints a and b, you can write:',
    ['a / b', '(double) a / b', '(int) (a / b)', 'a % b'], 1,
    `Casting one operand promotes the whole expression to double.`),
  q.mc('ap_ready', 'Modulus', 'The expression n % 2 == 0 tests whether n is:',
    ['Positive', 'Even', 'Prime', 'Negative'], 1,
    `A remainder of zero on division by two means the number is even.`),
  q.mc('ap_ready', 'Casting', 'Assigning an int to a double variable requires:',
    ['An explicit cast', 'No cast — it widens automatically', 'A String conversion', 'A method call'], 1,
    `Widening conversions are implicit; narrowing ones need an explicit cast.`),
  q.sa('foundation', 'Primitive types', `The primitive type that stores true or false is called ______. (one word)`,
    ['boolean'], `Java's boolean is lowercase, unlike the wrapper class Boolean.`),
);

q.inUnit(1); // Using Objects
out.push(
  q.mc('foundation', 'Objects', 'The keyword used to create a new object is:',
    ['create', 'new', 'object', 'make'], 1,
    `new allocates the object and calls its constructor.`),
  q.mc('foundation', 'String methods', 'What does "hello".length() return?',
    ['4', '5', '6', 'An error'], 1,
    `length() counts characters; note the parentheses, unlike an array's length field.`),
  q.mc('developing', 'substring', 'What does "computer".substring(0, 3) return?',
    ['"com"', '"comp"', '"omp"', '"c"'], 0,
    `The start index is inclusive and the end index is exclusive.`),
  q.mc('developing', 'References', 'Two variables referring to the same object means changing one:',
    ['Has no effect on the other', 'Changes what the other sees', 'Causes a compile error', 'Creates a copy'], 1,
    `Both names point at the same object in memory.`),
  q.mc('developing', 'String methods', 'What does "Java".indexOf("v") return?',
    ['1', '2', '3', '-1'], 1,
    `Indexing starts at zero, so v is at position 2.`),
  q.mc('ap_ready', 'References', 'Comparing two Strings with == compares:',
    ['Their contents', 'Their references', 'Their lengths', 'Their hash codes'], 1,
    `Use .equals() to compare contents; == asks whether they are the same object.`),
  q.mc('ap_ready', 'Objects', 'A variable of a reference type that has not been assigned an object holds:',
    ['0', 'null', 'An empty String', 'A compile error'], 1,
    `null means the reference points at nothing, and using it throws a NullPointerException.`),
  q.sa('developing', 'substring', `Calling substring with an end index past the string length throws an ______ exception. (one word)`,
    ['indexoutofbounds', 'stringindexoutofbounds'], `Java throws StringIndexOutOfBoundsException for an invalid range.`),
);

q.inUnit(2); // Boolean Expressions & if
out.push(
  q.mc('foundation', 'Boolean operators', 'The Java operator for logical AND is:',
    ['&&', '||', '!', '&'], 0,
    `Double ampersand is the short-circuiting logical AND.`),
  q.mc('foundation', 'Comparison', 'The operator that tests equality of two ints is:',
    ['=', '==', 'equals', '==='], 1,
    `A single equals sign assigns; a double equals sign compares.`),
  q.mc('developing', 'De Morgan', '!(a && b) is equivalent to:',
    ['!a && !b', '!a || !b', 'a || b', '!a == !b'], 1,
    `De Morgan's law: negating an AND distributes as an OR of the negations.`),
  q.mc('developing', 'Short-circuit', 'In the expression a != null && a.size() > 0, the null check:',
    ['Is unnecessary', 'Prevents a NullPointerException', 'Slows the program', 'Causes an error'], 1,
    `Short-circuiting means the right side is never evaluated when the left is false.`),
  q.mc('developing', 'Boolean operators', 'An else-if chain evaluates conditions:',
    ['All of them, always', 'Until one is true, then stops', 'In reverse order', 'Randomly'], 1,
    `Once a branch matches, the rest are skipped.`),
  q.mc('ap_ready', 'Comparison', 'To compare two objects for equal content, you should use:',
    ['==', '.equals()', '>=', '!='], 1,
    `equals() compares content when the class overrides it properly.`),
  q.mc('ap_ready', 'De Morgan', '!(x > 5) is equivalent to:',
    ['x < 5', 'x <= 5', 'x >= 5', 'x != 5'], 1,
    `Negating "greater than" gives "less than or equal to", including the boundary.`),
  q.sa('developing', 'Short-circuit', `The || operator stops evaluating as soon as one operand is ______. (one word)`,
    ['true'], `OR short-circuits on true; AND short-circuits on false.`),
);

q.inUnit(3); // Iteration
out.push(
  q.mc('foundation', 'for loops', 'How many times does "for (int i = 0; i < 5; i++)" run its body?',
    ['4', '5', '6', 'Infinitely'], 1,
    `i takes the values 0 through 4, which is five iterations.`),
  q.mc('foundation', 'while loops', 'A while loop whose condition is never false is:',
    ['A compile error', 'An infinite loop', 'Skipped', 'Run once'], 1,
    `Nothing terminates it, so the program hangs.`),
  q.mc('developing', 'Nested loops', 'A loop that runs while i is strictly less than n, starting at 0, executes:',
    ['n − 1 times', 'n times', 'n + 1 times', 'Once'], 1,
    `Zero through n−1 inclusive is n iterations.`),
  q.mc('developing', 'Loop tracing', 'After "int s = 0; for (int i = 1; i <= 3; i++) s += i;", s equals:',
    ['3', '6', '7', '0'], 1,
    `1 + 2 + 3 = 6.`),
  q.mc('developing', 'while loops', 'A do-while loop differs from a while loop because it:',
    ['Never runs', 'Always runs at least once', 'Runs twice', 'Cannot be nested'], 1,
    `The condition is checked after the body rather than before.`),
  q.mc('ap_ready', 'Loop tracing', 'The loop "for (int i = 10; i > 0; i -= 3)" runs how many times?',
    ['3', '4', '5', '10'], 1,
    `i takes 10, 7, 4 and 1 — four iterations before it drops to −2.`),
  q.mc('ap_ready', 'Nested loops', 'To print a triangle where row i has i stars, the inner loop should run:',
    ['A fixed number of times', 'i times', 'n times', 'Once'], 1,
    `The inner bound depends on the outer counter.`),
  q.sa('developing', 'for loops', `The keyword that exits a loop immediately is ______. (one word)`,
    ['break'], `break leaves the loop; continue skips to the next iteration.`),
);

q.inUnit(4); // Writing Classes
out.push(
  q.mc('foundation', 'Constructors', 'A constructor has the same name as its class and:',
    ['Returns void', 'Has no return type at all', 'Returns the class', 'Returns int'], 1,
    `Constructors declare no return type, not even void.`),
  q.mc('foundation', 'Encapsulation', 'A class that exposes its fields directly rather than through methods breaks:',
    ['Inheritance', 'Encapsulation', 'Recursion', 'Iteration'], 1,
    `Outside code can then put the object into an invalid state.`),
  q.mc('developing', 'Static', 'A static method belongs to:',
    ['Each instance', 'The class itself', 'The superclass only', 'The constructor'], 1,
    `Static members are shared and can be called without creating an object.`),
  q.mc('developing', 'this', 'Inside a constructor, "this.name = name;" is used when:',
    ['The parameter shadows the field', 'The field is static', 'The class has no fields', 'name is a method'], 0,
    `this distinguishes the instance variable from the parameter of the same name.`),
  q.mc('developing', 'Encapsulation', 'A method that returns the value of a private field is called a:',
    ['Mutator', 'Accessor', 'Constructor', 'Static method'], 1,
    `Accessors get, mutators set.`),
  q.mc('ap_ready', 'Static', 'A static variable shared by all instances is useful for:',
    ['Storing per-object state', 'Counting how many objects exist', 'Overriding methods', 'Constructors'], 1,
    `A single shared copy is exactly what a counter needs.`),
  q.mc('ap_ready', 'Constructors', 'If a class defines no constructor, Java provides:',
    ['No constructor', 'A default no-argument constructor', 'A copy constructor', 'A static initialiser'], 1,
    `The default disappears as soon as you write any constructor yourself.`),
  q.sa('developing', 'Encapsulation', `A method that changes a private field is called a ______. (one word)`,
    ['mutator', 'setter'], `Mutators are conventionally named setSomething.`),
);

q.inUnit(5); // Array
out.push(
  q.mc('foundation', 'Indexing', 'The last valid index of an array of length n is:',
    ['n', 'n − 1', 'n + 1', '1'], 1,
    `Zero-indexing means the final slot is one below the length.`),
  q.mc('foundation', 'Length', 'The number of elements in an array a is given by:',
    ['a.length()', 'a.length', 'a.size()', 'length(a)'], 1,
    `Arrays use a length field with no parentheses; Strings use a length() method.`),
  q.mc('developing', 'Bounds', 'Accessing a[a.length] throws:',
    ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'Nothing', 'A compile error'], 1,
    `The last valid index is length − 1.`),
  q.mc('developing', 'Enhanced for', 'An enhanced for loop over an array can:',
    ['Modify elements of a primitive array', 'Read each element in order', 'Change the array length', 'Run backwards'], 1,
    `The loop variable is a copy, so assigning to it does not change the array.`),
  q.mc('developing', 'Indexing', 'A new int array of size 5 has all elements initialised to:',
    ['null', '0', '1', 'Undefined values'], 1,
    `Numeric primitives default to zero; booleans to false; references to null.`),
  q.mc('ap_ready', 'Bounds', 'To loop over an array safely, the condition should be:',
    ['i <= a.length', 'i < a.length', 'i < a.length + 1', 'i != a.length - 1'], 1,
    `Strictly less than length stops at the last valid index.`),
  q.mc('ap_ready', 'Enhanced for', 'An enhanced for loop is a poor choice when you need:',
    ['To read every element', 'The index of each element', 'To sum values', 'To print values'], 1,
    `It gives you the values but not their positions.`),
  q.sa('developing', 'Length', `An array's length in Java is fixed once it is ______. (one word)`,
    ['created', 'initialized', 'initialised'], `Resizing requires making a new array or using an ArrayList.`),
);

q.inUnit(6); // ArrayList
out.push(
  q.mc('foundation', 'Basics', 'Unlike an array, an ArrayList can:',
    ['Hold primitives directly', 'Change size at runtime', 'Be indexed', 'Be printed'], 1,
    `Growing and shrinking is the main reason to choose it.`),
  q.mc('foundation', 'Size', 'Calling get with an index equal to an ArrayList\'s size throws:',
    ['NullPointerException', 'IndexOutOfBoundsException', 'Nothing', 'A compile error'], 1,
    `Valid indices run from 0 to size() − 1.`),
  q.mc('developing', 'Removal', 'Removing elements while looping forward with an index causes:',
    ['A compile error', 'Skipped elements', 'An infinite loop', 'No problem'], 1,
    `Everything after the removed element shifts down, so the next index is skipped.`),
  q.mc('developing', 'Generics', 'ArrayList<Integer> can store:',
    ['Any object', 'Only Integer objects', 'Only int primitives', 'Only Strings'], 1,
    `The type parameter restricts what may be added, and autoboxing converts ints.`),
  q.mc('developing', 'Basics', 'list.add(2, "x") inserts "x":',
    ['At the end', 'At index 2, shifting the rest right', 'Replacing index 2', 'Twice'], 1,
    `The two-argument add inserts; set replaces.`),
  q.mc('ap_ready', 'Removal', 'The safe way to remove while iterating forward is to:',
    ['Loop backwards', 'Use a for-each loop', 'Increase the index twice', 'Remove after the loop only'], 0,
    `Iterating from the end means shifted elements have already been visited.`),
  q.mc('ap_ready', 'Generics', 'Storing an int in an ArrayList<Integer> works because of:',
    ['Casting', 'Autoboxing', 'Inheritance', 'Overloading'], 1,
    `Java automatically wraps the primitive in its object type.`),
  q.sa('developing', 'Size', `The method that removes every element from an ArrayList is ______. (one word, no parentheses)`,
    ['clear'], `clear() empties the list without replacing the object.`),
);

q.inUnit(7); // 2D Array
out.push(
  q.mc('foundation', 'Declaration', 'A 2D int array with 3 rows and 4 columns is declared as:',
    ['int[3][4] a;', 'int[][] a = new int[3][4];', 'int a[3,4];', 'array int a(3,4);'], 1,
    `Java uses arrays of arrays with two sets of brackets.`),
  q.mc('foundation', 'Access', 'In a 2D array a, the first index normally refers to the:',
    ['Column', 'Row', 'Depth', 'Length'], 1,
    `Java stores 2D arrays in row-major order.`),
  q.mc('developing', 'Row-major', 'The number of rows in a 2D array a is:',
    ['a.length', 'a[0].length', 'a.size()', 'a.rows()'], 0,
    `a.length counts the rows; a[0].length counts the columns in the first row.`),
  q.mc('developing', 'Traversal', 'Nested loops traversing a 2D array in row-major order have the outer loop over:',
    ['Columns', 'Rows', 'Diagonals', 'Elements'], 1,
    `Outer over rows, inner over columns.`),
  q.mc('developing', 'Access', 'For a 3-by-4 array, valid indices for a[i][j] are:',
    ['i up to 4, j up to 3', 'i up to 2, j up to 3', 'i up to 3, j up to 4', 'i and j up to 3'], 1,
    `Zero-indexed, so rows run 0 to 2 and columns 0 to 3.`),
  q.mc('ap_ready', 'Traversal', 'An enhanced for loop over a 2D array yields, on each outer step:',
    ['A single element', 'A whole row array', 'A column array', 'An index'], 1,
    `Each element of the outer array is itself an array.`),
  q.mc('ap_ready', 'Row-major', 'Summing a single column requires looping over:',
    ['Columns with a fixed row', 'Rows with a fixed column', 'Both freely', 'Neither'], 1,
    `Hold the column index constant and vary the row.`),
  q.sa('developing', 'Declaration', `A 2D array whose rows have different lengths is called a ______ array. (one word)`,
    ['jagged', 'ragged'], `Java allows jagged arrays because each row is a separate array object.`),
);

q.inUnit(8); // Inheritance
out.push(
  q.mc('foundation', 'extends', 'The keyword that makes one class inherit from another is:',
    ['implements', 'extends', 'inherits', 'super'], 1,
    `extends creates a subclass; implements is for interfaces.`),
  q.mc('foundation', 'super', 'super() inside a constructor calls the:',
    ['Same constructor again', 'Superclass constructor', 'Subclass constructor', 'Static initialiser'], 1,
    `It must be the first statement in the constructor if present.`),
  q.mc('developing', 'Overriding', 'An overriding method must have the same:',
    ['Body', 'Name, parameters and compatible return type', 'Access modifier exactly', 'Class name'], 1,
    `Same signature; the body is what changes.`),
  q.mc('developing', 'Polymorphism', 'If Dog extends Animal, then "Animal a = new Dog();" is:',
    ['A compile error', 'Legal, and calls Dog\'s overridden methods', 'Legal, but calls Animal\'s methods', 'A runtime error'], 1,
    `The declared type governs what you may call; the actual object governs which version runs.`),
  q.mc('developing', 'extends', 'A subclass inherits which members of its superclass?',
    ['Private ones only', 'Public and protected ones', 'Constructors', 'Nothing'], 1,
    `Private members exist in the object but are not directly accessible.`),
  q.mc('ap_ready', 'Polymorphism', 'Choosing which overridden method runs happens at:',
    ['Compile time', 'Run time', 'Class-loading time', 'Never'], 1,
    `Dynamic dispatch selects the version based on the object\'s actual class.`),
  q.mc('ap_ready', 'Overriding', 'Overloading differs from overriding because overloading changes the:',
    ['Class', 'Parameter list', 'Return type only', 'Access modifier'], 1,
    `Same name, different parameters, same class.`),
  q.sa('developing', 'super', `Every class in Java that does not extend another implicitly extends ______. (one word)`,
    ['object'], `Object sits at the root of the whole class hierarchy.`),
);

q.inUnit(9); // Recursion
out.push(
  q.mc('foundation', 'Base case', 'A recursive method without a base case will:',
    ['Return zero', 'Cause a StackOverflowError', 'Run once', 'Not compile'], 1,
    `Nothing stops the recursion, so the call stack fills.`),
  q.mc('foundation', 'Base case', 'The base case of a recursive method is the case that:',
    ['Calls itself', 'Returns without recursing', 'Runs first', 'Is fastest'], 1,
    `It is what makes the recursion terminate.`),
  q.mc('developing', 'Tracing', 'For "int f(int n) { return n <= 1 ? 1 : n * f(n-1); }", f(4) returns:',
    ['4', '10', '24', '256'], 2,
    `4 × 3 × 2 × 1 — this is factorial.`),
  q.mc('developing', 'Call stack', 'Each recursive call adds to the call stack a new:',
    ['Class', 'Frame with its own local variables', 'Thread', 'Object'], 1,
    `Each frame keeps its own copies of the parameters and locals.`),
  q.mc('developing', 'Recursive search', 'Binary search is naturally recursive because each step:',
    ['Checks every element', 'Halves the remaining range', 'Sorts the array', 'Reverses the array'], 1,
    `The same problem on a smaller range is the definition of a recursive structure.`),
  q.mc('ap_ready', 'Recursive search', 'Binary search requires the array to be:',
    ['Unsorted', 'Sorted', 'Of even length', 'All positive'], 1,
    `Without order there is no way to discard half the range.`),
  q.mc('ap_ready', 'Tracing', 'A recursive method that calls itself twice per invocation grows:',
    ['Linearly', 'Exponentially', 'Logarithmically', 'Not at all'], 1,
    `Each level doubles the number of calls, which is why naive Fibonacci is slow.`),
  q.sa('developing', 'Call stack', `A method that calls itself is described as ______. (one word)`,
    ['recursive'], `The call must eventually reach a base case to terminate.`),
);

export const apCSAQuestions = out;
