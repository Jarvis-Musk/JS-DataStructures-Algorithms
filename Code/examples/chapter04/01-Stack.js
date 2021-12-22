// @ts-check
// import Stack from './../../src/js/data-structures/stack.js'; // ES2015 modules
import Stack from './01-StackWeakMap.js';
// import Stack from './01-StackSymbol.js';
// import StackArray from './../../src/js/data-structures/stack-array.js'; // ES2015 modules
// const Stack = require('../../dist/js/data-structures/stack'); // for node
// const Stack = stack; // older browsers - remove from html script import: type="module"
// const { Stack } = PacktDataStructuresAlgorithms;

const stack = new Stack(); // new Stack();
// const stack = new StackArray(); // new StackArray();

console.log('stack.isEmpty() => ', stack.isEmpty()); // outputs true

stack.push([5, 9, 0]);
console.log(stack);
console.log(stack.toString());

stack.push(8);

console.log(stack);

console.log('stack after push 5 and 8 => ', stack.toString());

console.log('stack.peek() => ', stack.peek()); // outputs 8

stack.push(11);

console.log('stack.size() after push 11 => ', stack.size()); // outputs 3
console.log(stack);
console.log('stack.isEmpty() => ', stack.isEmpty()); // outputs false

stack.push(15);

console.log(stack.pop());

stack.pop();

console.log('stack.size() after push 15 and pop twice => ', stack.size()); // outputs 2

// using WeakMap to store Stack items we ensure true privacy
console.log(Object.getOwnPropertyNames(stack)); // {1}
console.log(Object.keys(stack)); // {2}
console.log(stack.items);
console.log(stack);


const objectSymbols = Object.getOwnPropertySymbols(stack);
console.log('objectSymbols', objectSymbols); // [Symbol()]
if (objectSymbols.length > 0) {
  stack.print();
  console.log(objectSymbols.length); // 1
  console.log(objectSymbols[0]); // Symbol()
  console.log('stack[objectSymbols[0]]', stack[objectSymbols[0]]);
  stack[objectSymbols[0]].push(1);
  console.log('stack[objectSymbols[0]]', stack[objectSymbols[0]]);
  console.log('stack', stack);
  stack.print(); // 5, 8, 1
}
