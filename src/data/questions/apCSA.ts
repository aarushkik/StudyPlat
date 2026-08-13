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

export const apCSAQuestions = out;
