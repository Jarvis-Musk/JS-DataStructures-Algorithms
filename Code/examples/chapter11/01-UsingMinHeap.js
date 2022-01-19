// const { MinHeap } = PacktDataStructuresAlgorithms;
import { MinHeap } from './../../src/js/data-structures/heap.js';

console.log('------------ Min Heap ------------');
let heap = new MinHeap();

const value_tobe_insert = [1, 3, 4, 6, 5, 7, 4];
value_tobe_insert.forEach(value => heap.insert(value));

console.log(heap.getAsArray());

console.log('Heap size: ', heap.size()); // 5
console.log('Heap is empty: ', heap.isEmpty()); // false
console.log('Heap min value: ', heap.findMinimum()); // 1

heap = new MinHeap();
for (let i = 1; i < 10; i++) {
  heap.insert(i);
}

console.log(heap.getAsArray());

console.log('Extract minimum: ', heap.extract()); // 1
console.log(heap.getAsArray()); // [2, 4, 3, 8, 5, 6, 7, 9]

