import { defaultToString } from '../util.js';
import { ValuePair } from './models/value-pair.js';

export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。
      hash += tableKey.charCodeAt(i);
    }
    // 为了得到比较小的数值，我们会使用 hash 值和一个任意数做除法的余数（%）
    // 这可以规避操作数超过数值变量最大表示范围的风险。
    return hash % 37;
  }
  // 更好的散列函数
  djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381; // 初始化一个 hash 变量并赋值为一个质数（大多数实现都使用 5381）
    for (let i = 0; i < tableKey.length; i++) {
      // 将 hash 与 33 相乘（用作一个幻数）【幻数在编程中指直接使用的常数】
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013; // 质数，选择比我们认为的散列表大小要大的质数
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  /**
   * put 方法和 Dictionary 类中的 set 方法逻辑相似。
   * 我们也可以将其命名为 set，但是大多数的编程语言会在 HashTable 数据结构中使用 put 方法，
   * 因此我们遵循相同的命名方式
   */
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  /**
   * HashTable 和 Dictionary 类很相似。
   * 不同之处在于在 Dictionary 类中，我们将 valuePair 保存在 table 的 key 属性中（在它被转化为字符串之后），
   * 而在 HashTable 类中，我们由 key（hash）生成一个数，并将 valuePair 保存在 hash 位置（或属性）。
   */
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      // 除了使用 JavaScript 的 delete 运算符，我们还可以将删除的 hash 位置赋值为 null 或 undefined。
      delete this.table[hash];
      return true;
    }
    return false;
  }
  getTable() {
    return this.table;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}
