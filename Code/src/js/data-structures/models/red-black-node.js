import { Node } from './node.js';

export const Colors = {
  RED: 0,
  BLACK: 1
};

export class RedBlackNode extends Node {
  constructor(key, parent = undefined, color = Colors.RED) {
    super(key);
    this.parent = parent; // 该节点的父节点引用
    this.color = color;
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

export function isNullNode(node) {
  return node == null ||
    (node.key == null && node.color === Colors.BLACK && node.parent != null && node.left == null && node.right == null);
}