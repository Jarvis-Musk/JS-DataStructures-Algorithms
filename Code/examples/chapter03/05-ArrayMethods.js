// @ts-check

//* ************** Joining multiple arrays
const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];
const str = 'str';
const obj = {
  porp1: 1,
  porp2: {
    p1: 'd',
  },
  prop3: () => {},
};
let numbers = negativeNumbers.concat(zero, positiveNumbers, str, obj);

console.log('zero', zero);
console.log('positiveNumbers', positiveNumbers);
console.log('negativeNumbers', negativeNumbers);
console.log('negativeNumbers.concat(zero, positiveNumbers)', numbers);

/* function isEven(x) {
  // returns true if x is a multiple of 2.
  console.log(x);
  return x % 2 === 0 ? true : false;
} */ // ES5 syntax
const isEven = x => x % 2 === 0;
const t = Infinity * 2;
console.log('t', t);
numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log('numbers', numbers);

// it is going to execute the function only once
console.log('numbers.every(isEven)', numbers.every(isEven));

// is going to execute the function twice
console.log('numbers.some(isEven)', numbers.some(isEven));

/* numbers.forEach(function(x) {
  console.log(x % 2 == 0);
}); */ // ES5 sintax for function below

numbers.forEach(x => console.log(`numbers.forEach: ${x} % 2 === 0`, x % 2 === 0));


console.log('numbers.map(isEven)', numbers.map(isEven));

console.log('numbers.filter(isEven)', numbers.filter(isEven));

/* console.log('numbers.reduce',
  numbers.reduce(function(previous, current, index) {
    return previous + current;
  })
); */ // ES5 sintax for function below
const reducer = (acc, cur, index) => {
  console.log('accumulator:', acc);
  console.log('index:', index);
  return acc + cur;
};
console.log('numbers.reduce', numbers.reduce(reducer));

console.log('numbers.reduce', numbers.reduce(reducer, -10));
