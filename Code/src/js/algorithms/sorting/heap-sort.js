import { defaultCompare, swap, Compare } from '../../util.js';

/**
 * heapify 函数和 MinHeap 类创建的 siftDown 方法有相同的代码。
 * 不同之处是将堆本身、堆的大小和要使用的比较函数传入作为参数。
 * 这是因为我们不会直接使用堆数据结构，而是使用它的逻辑来开发 heapSort 算法。
 * @param {Array} array 
 * @param {BigInt} index 
 * @param {BigInt} heapSize 
 * @param {Function} compareFn 
 */
function heapify(array, index, heapSize, compareFn) {
  let largest = index; // 对于降序排列来说，就是 smallest = index
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;
  if (left < heapSize && compareFn(array[left], array[index]) === Compare.BIGGER_THAN) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) === Compare.BIGGER_THAN) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

/**
 * 创建最大堆
 * 对于要进行的所有比较，只需要对前半部分数组执行 heapify （下移）函数。
 * （后半部分会被自动排好序）
 * @param {Array} array 
 * @param {Function} compareFn 
 * @returns {Array}
 */
function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    // 直接一开始用 i=0 去做 heapify 会遇到不全面的情况
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

export default function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn); // 1. 用数组创建一个最大堆用作源数据
  // console.log('afterBuildMaxMinHeap', array);
  while (heapSize > 1) {
    // 2. 在创建最大堆后，最大的值会被存储在堆的第一个位置。
    // 我们要将它替换为堆的最后一个值，将堆的大小减 1。
    swap(array, 0, --heapSize);
    // 3. 最后，将堆的根节点下移并重复步骤 2 直到堆的大小为 1。
    // 已经构建出最大堆了，可以直接用 0 去做 heapify
    (heapSize > 1) && heapify(array, 0, heapSize, compareFn); // 当heapSize为1时，函数执行没变化无意义
  }
  return array;
}
