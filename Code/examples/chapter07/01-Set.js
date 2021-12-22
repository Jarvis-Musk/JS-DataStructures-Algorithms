// const { Set } = PacktDataStructuresAlgorithms;
import Set from './../../src/js/data-structures/set.js';

const set = new Set();

set.add(1);
console.log(set.values()); // outputs [1]
console.log(set.has(1)); // outputs true
console.log(set.size()); // outputs 1

set.add(2);
console.log('use valuesLegacy()', set.valuesLegacy()); // outputs [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2


set.add(7);
console.log(set.values()); // outputs [1, 2]
console.log(set.has(7)); // true
console.log(set.size()); // 2


set.add('8');
console.log(set.values()); // outputs [1, 2]
console.log(set.has('8')); // true
console.log(set.size()); // 2

set.delete(1);
console.log(set.values()); // outputs [2]

set.delete(2);
console.log(set.values()); // outputs []

console.log('set', set);
