// @ts-check

export default class Queue {
  constructor() {
    this.count = 0; // 追踪队列尾
    this.lowestCount = 0; // 追踪队列头
    this.items = {}; // 使用对象存储元素，获取元素时更高效
  }

  /**
   * 向队列尾添加元素
   */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * 从队列头移除并返回元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
