export default class Set {
  constructor() {
    this.items = {};
  }
  add(element) {
    if (!this.has(element)) {
      // 添加一个 element 的时候，把它同时作为键和值保存，因为这样有利于查找该元素。
      // 区别不了 3 和 '3'，如果要区别的话，has() 比较的应该是属性值而不是键值。
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
        values.push(this.items[key]);
      }
    }
    return values;
  }

  /**
   * 此处实现的 union，intersection 和 difference 方法不会修改当前的 Set 类实例或是作为参数传入的 otherSet。
   * 没有副作用的方法和函数被称为纯函数。
   * 纯函数不会修改当前的实例或参数，只会生成一个新的结果。
   * 这在函数式编程中是非常重要的概念。
   */
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  intersection_0(otherSet) { 
    const intersectionSet = new Set(); // {1}
    const values = this.values(); 
    for (let i = 0; i < values.length; i++) { // {2}
      if (otherSet.has(values[i])) { // {3}
        intersectionSet.add(values[i]); // {4}
      }
    }
    return intersectionSet;
  }
  // 优化迭代次数
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
        /**
         * forEach 方法会在数组中的每个值上调用。
         * 在子集逻辑中，当我们发现一个值不存在于 otherSet 中时，可以停止迭代值，表示这不是一个子集。
         * 只要回调函数返回 true，every 方法就会被调用。如果回调函数返回 false，循环会停止。
         * 
         * every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 falsy 的元素。
         * 如果发现了一个这样的元素，every 方法将会立即返回 false。
         * 否则，callback 为每一个元素返回 true，every 就会返回 true。
         * callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。
         */
        isSubset = false;
        return false; // every() 停止迭代
      }
      return true; // every() 继续迭代下一个 value
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
