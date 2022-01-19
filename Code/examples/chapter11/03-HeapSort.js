// const { heapSort } = PacktDataStructuresAlgorithms;
import heapSort from './../../src/js/algorithms/sorting/heap-sort.js';
import { defaultCompare, reverseCompare } from './../../src/js/util.js';
// import { MaxHeap } from './../../src/js/data-structures/heap.js';

console.log('********** Heap Ascending Sort **********');
const arr1 = [7, 3, 4, 15, 5, 1, 9, 10, 14];
console.log('Before sorting: ', arr1);
console.log('After sorting: ', heapSort(arr1));

console.log('********** Heap Descending Sort **********');
const arr2 = [7, 3, 4, 15, 5, 1, 9, 6, 10, 14, 22, 6, 4, 34];
console.log('Before sorting: ', arr2);
console.log('After sorting: ', heapSort(arr2, reverseCompare(defaultCompare)));
