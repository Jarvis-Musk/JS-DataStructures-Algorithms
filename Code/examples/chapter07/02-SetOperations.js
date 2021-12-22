// const { Set } = PacktDataStructuresAlgorithms;
import Set from './../../src/js/data-structures/set.js';

// --------- Union ----------
console.log('--------- Union ----------');

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add('3'); // 和 3 视为相同，
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);

console.log('setA.items', setA.items);
console.log('setA', setA.values());
console.log('setB.items', setB.items);
console.log('setB', setB.values());
console.log(unionAB.values()); // [1, 2, 3, 4, 5, 6]

// --------- Intersection ----------
console.log('--------- Intersection ----------');

setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); // [2, 3]

// --------- Difference ----------
console.log('--------- Difference ----------');

setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const differenceAB = setA.difference(setB);
console.log(differenceAB.values()); // [1]

// --------- Subset ----------
console.log('--------- Subset ----------');

setA = new Set();
setA.add(1);
setA.add(2);

setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

const setD = new Set();
setD.add(1);
setD.add(2);

console.log(setA.isSubsetOf(setB)); // true
console.log(setA.isSubsetOf(setC)); // false
console.log(setA.isSubsetOf(setD)); // false
