// const { CircularLinkedList } = PacktDataStructuresAlgorithms;
import CircularLinkedList from './../../src/js/data-structures/circular-linked-list.js'

const list = new CircularLinkedList();

console.log('------CircularLinkedList------');
console.log('push element 15');
list.push(15);
console.log('list.toString() => ', list.toString());
// console.log('list', list); // 当只有一个节点时，head.next 是个一路迭代下去都重复的对象

console.log('push element 16');
list.push(16);
console.log('list.toString() => ', list.toString());

console.log('insert element 14 pos 0 => ', list.insert(14, 0));
console.log('list.toString() => ', list.toString());

console.log('insert element 14.5 pos 1 => ', list.insert(14.5, 1));
console.log('list.toString() => ', list.toString());

console.log('insert element 17 pos 4 => ', list.insert(17, 4));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(0) => ', list.removeAt(0));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(1) => ', list.removeAt(1));
console.log('list.toString() => ', list.toString());

console.log('list.removeAt(2) => ', list.removeAt(2));
console.log('list.toString() => ', list.toString());

console.log('list.indexOf(14.5) => ', list.indexOf(14.5));
console.log('list.indexOf(16) => ', list.indexOf(16));
