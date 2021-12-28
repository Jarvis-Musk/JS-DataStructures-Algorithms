import { defaultToString } from '../util.js';
import { ValuePair } from './models/value-pair.js';

export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  // 返回 Dictionary 类中用于识别值的所有（原始）键名
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  keysLegacy() {
    const keys = [];
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      keys.push(valuePairs[i].key);
    }
    return keys;
  }
  keyValues() {
    return Object.values(this.table);
  }
  // 避免浏览器不支持 Object.values()
  keyValuesLegacy() {
    const valuePairs = [];
    for (const k in this.table) {
      /**
       * 不能仅使用 for-in 语句来迭代 table 对象的所有属性，
       * 还需要使用hasKey 方法（验证 table 对象是否包含某个属性），
       * 因为对象的原型也会包含对象的其他属性
       * （JavaScript 基本的 Object 类中的属性将会被继承，包括那些在当前数据结构中并不需要的属性）。
       */
      // if (this.hasKey(k)) {
      if (this.table.hasOwnProperty(k)) {
        valuePairs.push(this.table[k]);
      }
    }
    return valuePairs;
  };
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
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
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
