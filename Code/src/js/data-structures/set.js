export default class Set {
  constructor() {
    this.items = {};
  }
  add(element) {
    if (!this.has(element)) {
      // 添加一个 element 的时候，把它同时作为键和值保存，因为这样有利于查找该元素。
      this.items[element] = element;
      return true;
    }
    return false;
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  has(element) {
    /**
     * 我们也可以在代码中使用 this.items.hasOwnProperty(element)。
     * 但是，如果这样的话，代码检查工具如 ESLint 会抛出一个错误。
     * 
     * 错误的原因为：
     * 不是所有的对象都继承了 Object.prototype，
     * 甚至继承了 Object.prototype 的对象上的 hasOwnProperty 方法也有可能被覆盖，导致代码不能正常工作。
     * 
     * 要避免出现任何问题，
     * 使用 Object.prototype.hasOwnProperty.call 是更安全的做法。
     */
    // Function.prototype.call()
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  values() {
    // Object.values() 于 ECMAScript 2017 添加
    return Object.values(this.items);
  }
  valuesLegacy() {
    let values = [];
    for(let key in this.items) {
      if(this.items.hasOwnProperty(key)) {
        values.push(key);
      }
    }
    return values;
  }
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.items).length;
  }
  sizeLegacy() {
    let count = 0;
    // for...in 语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性，包括继承的可枚举属性。
    for(let key in this.items) {
      /**
       * 我们不能简单地使用 for-in 语句迭代 items 对象的属性，并递增 count 变量的值，
       * 还需要使用 has 方法（以验证 items 对象具有该属性），
       * 因为对象的原型包含了额外的属性
       * （属性既有继承自 JavaScript 的 Object 类的，也有属于对象自身、未用于数据结构的）。
       */
      if(this.items.hasOwnProperty(key)) { // 检查它们是否是对象自身的属性
        count++;
      }
    }
    return count; 
  }
  clear() {
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const values = this.values();
    let objString = `${values[0]}`;
    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`;
    }
    return objString;
  }
}
