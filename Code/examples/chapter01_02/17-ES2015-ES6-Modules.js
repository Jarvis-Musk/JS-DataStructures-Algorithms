// @ts-check
/* eslint-disable */
// import { circleArea, squareArea } from './17-CalcArea'; // {2}
// import { circleArea as circle } from './17-CalcArea';

// console.log(circleArea(2));
// console.log(squareArea(2));

/* Different way of importing the module  */
// import * as area from './17-CalcArea';
// import Book from './17-Book';

/**
 * import Book from '17-Book.js';
 * Uncaught TypeError: Failed to resolve module specifier "17-Book.js".
 * Relative references must start with either "/", "./", or "../".
 */

import * as area from './17-CalcArea.js'; // we need the .js to run this code in the browser
import Book from './17-Book';

console.log(area.circle(2));
console.log(area.square(2));

const myBook = new Book('some title');
myBook.printTitle();
