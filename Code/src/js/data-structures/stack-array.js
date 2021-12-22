// @ts-check

export default class StackArray {
  constructor() {
    this.items = [];
  }
  push(element) {
    /**
     * Array.prototype.push()
     * push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
     */
    // example 1
    // const returnVal = Array.isArray(element)
    //   // ? Array.prototype.push.apply(this.items, element)
    //   ? [].push.apply(this.items, element) // 与上行效果一样
    //   : this.items.push(element);

    // example 2
    const returnVal = Array.isArray(element)
      ? this.items.push(...element)
      : this.items.push(element);
    return returnVal;
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return this.items;
  }

  toString() {
    return this.items.toString();
  }
}
