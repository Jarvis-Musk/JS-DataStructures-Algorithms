import { Node } from './node.js';

export const Colors = {
  RED: 0,
  BLACK: 1
};

export class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.parent = undefined; // 该节点的父节点引用
    this.color = Colors.RED;
  }
  isRed() {
    return this.color === Colors.RED;
  }
  flipColor() {
    if (this.color === Colors.RED) {
      this.color = Colors.BLACK;
    } else {
      this.color = Colors.RED;
    }
  }
}