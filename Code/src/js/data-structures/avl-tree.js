import { Compare, defaultCompare } from '../util.js';
import BinarySearchTree from './binary-search-tree.js';
import { Node } from './models/node.js';

const BalanceFactor = { // 平衡因子
  UNBALANCED_RIGHT: 1, // 不平衡右
  SLIGHTLY_UNBALANCED_RIGHT: 2, // 偏右
  BALANCED: 3, // 平衡
  SLIGHTLY_UNBALANCED_LEFT: 4, // 偏左
  UNBALANCED_LEFT: 5 // 不平衡左
};

export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
  // 获取节点深度
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }
  /**
   * Left left case: rotate right
   * 左-左（LL）：向右的单旋转
   * 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度，并且左侧子节点也是平衡或左侧较重的
   * 
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }
  /**
   * Right right case: rotate left
   * 右-右（RR）：向左的单旋转
   * 这种情况出现于节点的右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
   * 
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }
  /**
   * Left right case: rotate left then right
   * 左-右（LR）：向右的双旋转
   * 这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重。
   * 在这种情况下，可以对左侧子节点进行左旋转来修复，这样会形成左-左的情况，然后再对不平衡的节点进行一个右旋转来修复
   * @param node Node<T>
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }
  /**
   * Right left case: rotate right then left
   * 右-左（RL）：向左的双旋转
   * 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重。
   * 在这种情况下，可以对右侧子节点进行右旋转来修复，这样会形成右-右的情况，然后再对不平衡的节点进行一个左旋转来修复
   * @param node Node<T>
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
  /**
   * 平衡因子概念
   * 在 AVL 树中，需要对每个节点计算左子树高度（hl）和右子树高度（hr）之间的差值，
   * 该值（hl－hr）应为 0、1 或 -1。如果结果不是这三个值之一，则需要平衡该 AVL 树。
   */
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      // 差值不会大于 2
      // 因为每插入或删除一个节点后，就会进行平衡操作
      // 故，执行平衡操作前，最大的差值只可能为 -2
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }
  /**
   * AVL 树中插入或移除节点和 BST 完全相同。
   * 然而，AVL 树的不同之处在于我们需要检验它的平衡因子，如果有需要，会将其逻辑应用于树的自平衡。
   */
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  /**
   * 添加或移除节点时，AVL树会尝试保持自平衡（尽可能尝试转换为完全树）
   */
  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // 左边更高
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // 右边更高
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        return this.rotationRL(node);
      }
    }
    return node;
  }
  /**
   * 添加或移除节点时，AVL树会尝试保持自平衡（尽可能尝试转换为完全树）
   */
  removeNode(node, key) {
    console.log(`AVLTree removeNode run --- node: ${node.key}, key: ${key}`);

    node = super.removeNode(node, key); // 父类的removeNode()返回根的引用

    console.log(`node return from BinarySearchTree removeNode: ${node}`);
    if (node == null) {
      return node;
    }
    // verify if tree is balanced
    console.log(`verify node: ${node.key}`);
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      console.log(`左边高`);
      // Left left case
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Left right case
      if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      console.log(`右边高`);
      // Right right case
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Right left case
      if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node);
      }
    }
    return node;
  }
}
