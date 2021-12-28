import { defaultToString } from '../util.js';
import { ValuePairLazy } from './models/value-pair-lazy.js';

// 删除时：软删除（惰性删除）
export default class HashTableLinearProbingLazy {
  constructor(toStrFn = defaultToString) {
    console.log('------------ Using HashTableLinearProbingLazy ------------');
    
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
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (
        this.table[position] == null ||
        (this.table[position] != null && this.table[position].isDeleted)
      ) {
        this.table[position] = new ValuePairLazy(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null && !this.table[index].isDeleted) {
          // 继续向下检索的条件：该位置不为空 且 未被删除
          index++;
        }
        this.table[index] = new ValuePairLazy(key, value); // 覆盖键相同的键值对{1}
      }
      return true;
    }
    return false;
  }
  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) { // 继续向下检索的条件：（当该位置不为空 且 键不同） 或者 （当该位置不为空 且 已标记删除）
        if (this.table[index].key === key && this.table[index].isDeleted) {
          // 当该位置不为空 且 已标记为删除 且 键相同
          // 返回 undefined，因为如果删除后新插入了同键的键值对，则原先被标记为删除的键值对就会被覆盖，在上面的{1}处。
          // 没有被覆盖，仍标记为删除，说明没有新增同键的键值对。
          return undefined;
        }
        index++;
      }
      if ( // 找到的条件：当该位置不为空 且 键相同 且 未被标记删除
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        return this.table[index].value;
      }
    }
    return undefined;
  }
  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true;
        return true;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) { // 继续向下检索的条件：（当该位置不为空 且 键不同） 或者 （当该位置不为空 且 已标记删除）
        index++;
      }
      if ( // 找到的条件：当该位置不为空 且 键相同 且 未被标记删除
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true;
        return true;
      }
    }
    return false;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    let count = 0;
    Object.values(this.table).forEach(valuePair => {
      count += valuePair.isDeleted === true ? 0 : 1;
    });
    return count;
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
    // console.log(`keys: ${keys.toString()}, length: ${keys.length}`);
    const keysFiltered = keys.filter(key => {
      return this.table[key].isDeleted === false;
    }, this);
    // console.log(`keysFiltered: ${keysFiltered.toString()}, length: ${keysFiltered.length}`);

    let objString = `{${keysFiltered[0]} => ${this.table[keysFiltered[0]].toString()}}`;
    for (let i = 1; i < keysFiltered.length; i++) {
      objString = `${objString},{${keysFiltered[i]} => ${this.table[keysFiltered[i]].toString()}}`;
    }
    return objString;
  }
}
