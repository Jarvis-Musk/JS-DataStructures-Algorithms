// @ts-check

export default class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element) {
    if (Array.isArray(element) && element.length > 0) {
      this.items[this.count] = element.shift();
      this.count++;
      this.push(element);
    } else if (!Array.isArray(element)) {
      this.items[this.count] = element;
      this.count++;
    }
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.items = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`; // 上一个循环的 String 变量被内存回收了？
    }
    return objString;
  }
}
