import DoublyLinkedList from './doubly-linked-list.js';

export default class StackLinkedList {
  constructor() {
    /**
     * 之所以使用双向链表而不是链表，是因为对栈来说，我们会向链表尾部添加元素，也会从链表尾部移除元素。
     * DoublyLinkedList 类有列表最后一个元素（tail）的引用，无须迭代整个链表的元素就能获取它。
     * 双向链表可以直接获取头尾的元素，减少过程消耗，它的时间复杂度和原始的 Stack 实现相同，为 O(1)。
     * 
     * 也可以对 LinkedList 类进行优化，保存一个指向尾部元素的引用，并使用这个优化版本来代替 DoublyLinkedList。
     * 
     * 在栈的实现内部使用链表数据结构会更加简单，因为不需要重新创建这些代码，也使代码的可读性更好
     */
    this.items = new DoublyLinkedList();
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.removeAt(this.size() - 1);
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1).element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}
