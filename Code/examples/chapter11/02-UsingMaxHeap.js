// const { MaxHeap } = PacktDataStructuresAlgorithms;
import { MaxHeap } from './../../src/js/data-structures/heap.js';

console.log('------------ Max Heap ------------');

const maxHeap = new MaxHeap();
const values = [7, 3, 4, 15, 5, 1, 9, 10, 14];
values.forEach(value => maxHeap.insert(value));

console.log('log heap', maxHeap.getAsArray());

console.log('Heap size: ', maxHeap.size()); // 5
console.log('Heap is empty: ', maxHeap.isEmpty()); // false
console.log('Heap max value: ', maxHeap.findMaximum()); // 5

console.log('Extract maximum: ', maxHeap.extract());
console.log('log heap', maxHeap.getAsArray());

console.log('arrBeforeHeapify', values);
const arrAfterHeapify = maxHeap.heapify(values);
console.log('arrAfterHeapify', arrAfterHeapify);

