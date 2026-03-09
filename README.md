================= All Question =================================================


1️⃣ What is the difference between var, let, and const?
2️⃣ What is the spread operator (...)?
3️⃣ What is the difference between map(), filter(), and forEach()?
4️⃣ What is an arrow function?
5️⃣ What are template literals?



 ======================= All answer =============================================


1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript. The main difference between them is how they behave with scope and reassignment.

Var => var is function-scoped which means it is accessible anywhere inside the function where it is declared. It can  also be redeclared and reassigned, which sometimes causes unexpected behavior.

let => let was introduced in ES6 and it is block-scoped. That means it only exists inside the block { } where it is declared. Unlike var, it cannot be redeclared in the same scope, but its value can be changed.

const => const is also block-scoped like let, but its value cannot be reassigned after it is declared. However, if a const variable contains an object or array, the contents of that object or array can still be modified.

Example:
          let age = 20;
          age = 21;  // allowed

          const name = "John";
          name = "Mike"; // not allowed



2️⃣ What is the spread operator (...)?

Definition: The spread operator (...) is used to expand elements of an array or properties of an object. It helps when we want to copy arrays, merge arrays, or pass multiple values to a function.

For example, if we want to combine two arrays, we can use the spread operator instead of writing a loop.

Example:

          const a = [1, 2];
          const b = [3, 4];

          const result = [...a, ...b];

          Now result will contain [1, 2, 3, 4].

It is also useful when copying arrays or objects without modifying the original data.



3️⃣ What is the difference between map(), filter(), and forEach()?

These three are array methods used to iterate through array elements, but they serve different purposes.

map(): map() is used when we want to transform every element of an array and create a new array from it.

Example:
        const numbers = [1,2,3];
        const doubled = numbers.map(n => n * 2);


filter(): filter() is used when we want to select elements that match a specific condition.

Example:
      const numbers = [1,2,3,4];
      const result = numbers.filter(n => n > 2);


forEach(): forEach() is simply used to run a function for each element of an array. It does not return a new array.

Example:
        numbers.forEach(n => {
          console.log(n);
        });

So in short, map() transforms data, filter() selects data, and forEach() just loops through elements.




4️⃣ What is an arrow function?

An arrow function is a shorter way of writing functions in JavaScript. It was introduced in ES6 to make the code cleaner and easier to read.

Instead of using the function keyword, we use an arrow (=>) between the parameters and the function body.

Example:

        Normal function:

                        function add(a, b) {
                          return a + b;
                        }

        Arrow function:

                      const add = (a, b) => {
                        return a + b;
                      };

If the function has only one expression, we can even write it in a shorter way:

                      const add = (a, b) => a + b;

Arrow functions are commonly used in modern JavaScript, especially with array methods like map() and filter().




5️⃣ What are template literals?

Definition: Template literals are a way to create strings in JavaScript using backticks ( ) instead of single or double quotes. They allow us to easily include variables or expressions inside a string.

To insert variables into the string, we use ${}.

Example:
        const name = "Alex";
        const message = `Hello ${name}`;

This will produce: Hello Alex

Template literals also allow writing multi-line strings without using \n, which makes the code easier to read.