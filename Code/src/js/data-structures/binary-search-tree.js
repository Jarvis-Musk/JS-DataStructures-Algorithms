import { Compare, defaultCompare } from '../util.js';
import { Node } from './models/node.js';

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = undefined;
    this.treeHeight = 0;
  }
  insert(key) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
    this.treeHeight = this.getTreeHeight();
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
  getTreeHeight() {
    if (this.root == null) return 0;
    
    return this.getNodeHeight(this.root);
  }
  getNodeHeight(node) {
    if (node == null) return 0;

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
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
  getNode(key) {
    let node = this.root;
    while (node != null) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        node = node.left;
      } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        node = node.right;
      } else if (this.compareFn(key, node.key) === Compare.EQUALS) {
        return node;
      } else {
        return undefined;
      }
    }
    return undefined;
  }
  /**
   * 中序遍历
   * 一种以上行顺序（先左侧子节点 → 自身节点 → 最后右侧子节点）访问 BST 所有节点的遍历方式，
   * 也就是以从最小到最大的顺序访问所有节点。
   * 中序遍历的一种应用就是对树进行排序操作。
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  /**
   * 接收一个回调函数作为参数。
   * 回调函数用来定义我们对遍历到的每个节点进行的操作（访问者模式 Visitor Pattern）。
   */
  inOrderTraverseNode(node, callback) {
    if (node == null) return;

    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }
  /**
   * 先序遍历
   * 以优先于后代节点的顺序（先自身节点 → 左侧子节点 → 最后右侧子节点）访问每个节点。
   * 先序遍历的一种应用是打印一个结构化的文档。
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node == null) return;

    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }
  /**
   * 后序遍历
   * 以优先于后代节点的顺序（先自身节点 → 左侧子节点 → 最后右侧子节点）访问每个节点。
   * 后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
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
    this.root = this.removeNode(this.root, key);
    this.treeHeight = this.getTreeHeight();
  }
  removeNode(node, key) {
    // console.log(`BinarySearchTree removeNode run --- node: ${node}, key: ${key}`);

    if (node == null) {
      return undefined;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果移除不存在的节点值，最终只会是在叶节点的 left 和 right 再次赋值为 undefined
      node.left = this.removeNode(node.left, key);  // AVLTree类实例执行时，此处调用的是复写后的函数
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key); // AVLTree类实例执行时，此处调用的是复写后的函数
      return node;
    }
    // key is equal to node.item
    // handle 3 special conditions
    // case 1 - a leaf node
    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    // case 2 - a node with only 1 child
    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }
    // case 3 - a node with 2 children
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }
  // 控制台打印树图
  printTree() {
    const array = [];
    this.preOrderTraverseNode2Array(this.root, array, 0);
    console.log('------------ start print tree ------------');
    console.log('treeArray:', array);
    this.printTreeChars(array);
  }
  preOrderTraverseNode2Array(node, treeArray, height) {
    if (node == null) {
      if (treeArray[height] == null) { treeArray[height] = []; }
      treeArray[height].push('*'); // * stand for node which is null
      return; 
    }

    if (treeArray[height] == null) { treeArray[height] = []; }
    treeArray[height].push(node.key);
    this.preOrderTraverseNode2Array(node.left, treeArray, height + 1);
    this.preOrderTraverseNode2Array(node.right, treeArray, height + 1);
  }
  printTreeChars(treeArray) {
    treeArray.forEach(treeArrayLayer => {
      console.log(treeArrayLayer.join(' '));
    });
    console.log('------------ end print tree ------------');
  }
}
