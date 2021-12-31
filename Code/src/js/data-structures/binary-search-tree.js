import { Compare, defaultCompare } from '../util.js';
import { Node } from './models/node.js';

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = undefined;
  }
  insert(key) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
  }
  getRoot() {
    return this.root;
  }
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  /**
   * 中序遍历
   * 接收一个回调函数作为参数。回调函数用来定义我们对遍历到的每个节点进行的操作（访问者模式 Visitor Pattern）。
   */
  inOrderTraverseNode(node, callback) {
    if (node == null) return;

    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  // 先序遍历
  preOrderTraverseNode(node, callback) {
    if (node == null) return;

    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  // 后序遍历
  postOrderTraverseNode(node, callback) {
    if (node == null) return;

    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  remove(key) {
    // root 被赋值为 removeNode 方法的返回值
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      return undefined;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果移除不存在的节点值，最终只会是在叶节点的 left 和 right 再次赋值为 undefined
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    // key is equal to node.item
    // handle 3 special conditions
    // 1 - a leaf node
    // 2 - a node with only 1 child
    // 3 - a node with 2 children
    // case 1
    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    // case 2
    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }
    // case 3
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }
}
