import { Compare, defaultCompare, reverseCompare, swap } from '../util.js';

export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  getLeftIndex(index) {
    return (2 * index) + 1;
  }
  getRightIndex(index) {
    return (2 * index) + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() <= 0;
  }
  clear() {
    this.heap = [];
  }
  // 返回最小值（最小堆）或最大值（最大堆）且不会移除这个值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  insert(value) {
    if (value == null) { return false; }

    const index = this.heap.length;
    this.heap.push(value);
    this.siftUp(index);
    return true;
  }
  // 下移沉降
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) { // 如果两个子节点中存在更小的值
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
  // 上移冒泡
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) {
      /**
       * MinHeap:
       * 如果父节点大于插入值
       * 重复这个过程直到堆的根节点（作为父节点）也经过了 swap （交换节点和父节点位置）的操作，
       * 此时，(index === 1 || index === 2) && parent === 0
       * 再次交换位置后
       * index === 0 且 parent === -1
       */
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  // 移除最小值（最小堆）或最大值（最大堆），并返回这个值
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    // 在移除后，我们将堆的最后一个元素移动至根部并执行 siftDown 函数，
    // 表示我们将交换元素直到堆的结构正常。
    this.siftDown(0);
    return removedValue;
  }
  heapify(array) {
    if (array) {
      this.heap = array;
    }
    const maxIndex = Math.floor(this.size() / 2) - 1;
    for (let i = maxIndex; i >= 0; i--) {
      this.siftDown(i);
    }
    return this.heap;
  }
  getAsArray() {
    return this.heap;
  }
}
export class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
  findMaximum() {
    return this.findMinimum();
  }
}
