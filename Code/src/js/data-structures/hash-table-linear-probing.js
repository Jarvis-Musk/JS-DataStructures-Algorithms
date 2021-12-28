import { defaultToString } from '../util.js';
import { ValuePair } from './models/value-pair.js';

// 删除时：移动一个或多个元素到之前的位置
export default class HashTableLinearProbing {
  constructor(toStrFn = defaultToString) {
    console.log('------------ Using HashTableLinearProbing ------------');

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
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
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
   * 在一些编程语言中，我们需要定义数组的大小。
   * 如果使用线性探查的话，数组的可用位置可能会被用完。
   * 当算法到达数组的尾部时，它需要循环回到开头并继续迭代元素。
   * 如果必要的话，我们还需要创建一个更大的数组并将元素复制到新数组中。
   * 在 JavaScript 中，不需要担心这个问题。我们不需要定义数组的大小，
   * 因为它可以根据需要自动改变，这是 JavaScript 内置的一个功能。
   */
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }
  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[index].value;
      }
    }
    return undefined;
  }
  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }
  /**
   * 由于我们不知道在散列表的不同位置上是否存在具有相同 hash 的元素，
   * 需要验证删除操作是否有副作用。
   * 如果有，就需要将冲突的元素移动至一个之前的位置，这样就不会产生空位置。
   */
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;

    // 当空位置被找到后，表示元素都在合适的位置上，不需要进行移动（或更多的移动）。
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
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
  getTable() {
    return this.table;
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
