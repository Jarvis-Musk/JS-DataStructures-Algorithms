import { defaultEquals } from '../util.js';
import { Node } from './models/linked-list-models.js';

export default class LinkedList {
  constructor(isEqual = defaultEquals) {
    this.isEqual = isEqual;
    this.count = 0; // 存储链表中的元素数量
    this.head = undefined; // 用来表示头节点，主要使用 head 节点来判断，end 节点主要用来辅助快速定位到尾节点
    this.tail = undefined; // 用来表示尾节点
  }
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      this.tail.next = node;
      // current = this.head;
      // while (current.next != null) {
      //   // a !== null || a !=== undefined
      //   current = current.next;
      // }
      // current.next = node;
    }
    this.tail = node;
    this.count++;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      if (this.count === 0 || index === this.count) {
        this.tail = node;
      }

      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;

        if (index === this.count - 1) {this.tail = current.next;}
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;

        if (index === this.count - 1) {this.tail = previous;}
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.isEqual(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  clear() {
    this.head = undefined;
    this.tail = undefined;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
