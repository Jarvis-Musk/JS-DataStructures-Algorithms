// const { SortedLinkedList } = PacktDataStructuresAlgorithms;
// const { util } = PacktDataStructuresAlgorithms;
import SortedLinkedList from './../../src/js/data-structures/sorted-linked-list.js';
import { defaultEquals } from './../../src/js/util.js';

const list = new SortedLinkedList();

console.log('------------*------------');
for (let i = 5; i > 0; i--) {
  list.push(i);
}
list.push(3.1);

console.log('list after pushing 5, 4, 3, 2, 1 and 3.1 => ', list.toString());

console.log('list.removeAt(1) => ', list.removeAt(1));

console.log('remove element 16 => ', list.remove(6));

console.log('insert element -2 at pos 2 => ', list.insert(-2, 2));
console.log('list.toString() => ', list.toString());

// ------- Example 02

class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
  }
  /**
   * 每个对象都有一个 toString() 方法，
   * 当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。
   * 默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
   * 
   * 可以自定义一个方法，来取代默认的 toString() 方法。该 toString() 方法不能传入参数，并且必须返回一个字符串。
   * 自定义的 toString() 方法可以是任何我们需要的值。
   */
  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

function myObjCompare(a, b) {
  /**
   * String.prototype.localeCompare()
   * 语法 referenceStr.localeCompare(compareString[, locales[, options]])
   * 
   * 返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
   * 
   * 当 引用字符串 在 比较字符串 前面时返回 -1
   * 当 引用字符串 在 比较字符串 后面时返回 1
   * 相同位置时返回 0
   * 
   * 切勿依赖于 -1 或 1 这样特定的返回值。
   * 不同浏览器之间（以及不同浏览器版本之间）返回的正负数的值各有不同，因为W3C规范中只要求返回值是正值和负值，而没有规定具体的值。
   * 一些浏览器可能返回-2或2或其他一些负的、正的值。
   */
  return a.toString().localeCompare(b.toString());
}

const ds = new SortedLinkedList(defaultEquals, myObjCompare);

console.log('*** SortedLinkedList with custom sorting function ***');

ds.push(new MyObj(3, 4));
console.log('push MyObj(3, 4)');
console.log('list.toString() => ', ds.toString());

ds.push(new MyObj(3, 4));
console.log('push MyObj(3, 4)');
console.log('list.toString() => ', ds.toString());

ds.push(new MyObj(1, 2));
console.log('push MyObj(1, 2)');
console.log('list.toString() => ', ds.toString());

ds.push(new MyObj(5, 6));
console.log('push MyObj(5, 6)');
console.log('list.toString() => ', ds.toString());

ds.insert(new MyObj(0, 0), 4);
console.log('insert MyObj(0, 0) pos 4 (pos ignored)');
console.log('list.toString() => ', ds.toString());

console.log('ds', ds);
