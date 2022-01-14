import { Compare, defaultCompare } from '../util.js';
import BinarySearchTree from './binary-search-tree.js';
import { RedBlackNode, Colors } from './models/red-black-node.js';

export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }
  insert(key) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }
  /**
   * 红黑树结构规则：
   * 1. 每个节点不是红的就是黑的；
   * 2. 树的根节点是黑的；
   * 3. 所有叶节点都是黑的（用 NULL 引用表示的节点）；
   * 4. 如果一个节点是红的，那么它的两个子节点都是黑的；
   * 5. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
   * 6. 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点。
   */
  fixTreeProperties(node) {
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      // 如果插入节点的父节点是红色，那么会违反规则 5：“不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点”
      // 要解决这个冲突，我们需要改变父节点、祖父节点和叔节点（因为我们同样改变了父节点的颜色）。
      // 需要更改叔节点的原因：为了满足规则 6：“从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点”

      let parent = node.parent;
      const grandParent = parent.parent;

      // case A: parent is left child of grandParent
      if (grandParent && grandParent.left === parent) {

        const uncle = grandParent.right;

        // case A1: uncle of node is also red - only recoloring
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent; // 将当前节点的引用指向祖父节点，继续检查树是否有其他冲突
        } else {
          // case A2: node is right child - left rotate -> right rotate - [rotationLR] 
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          
          // case A3: node is left child - right rotate
          this.rotationLL(grandParent);
          // swap color
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
        
      } else { // case B: parent is right child of grandParent
        // else 不需要过滤 grandParent 为空的情况吗：不需要，满足 while 条件的话，都存在 grandParent

        const uncle = grandParent.left;

        // case B1: uncle is red - only recoloring
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;          
        } else {
          // case B2: node is left child - right rotate -> left rotate - [rotationRL]
          if (node === parent.left) {
            this.rotationLL(parent);
            // 更新节点和父节点引用
            node = parent;
            parent = node.parent;
          }

          // case B3: node is right child - left rotate
          this.rotationRR(grandParent);
          // swap color
          // 更新父节点和祖父节点颜色
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          // 更新当前节点引用，以继续检查树的其他冲突
          node = parent;          
        }
      }
    }
    this.root.color = Colors.BLACK;
  }
  // Left left case: rotate right
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent; // {1}
    if (!node.parent) {
      this.root = tmp; // {2}
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp; // {2}
      } else {
        node.parent.right = tmp; // {2}
      }
    }
    tmp.right = node; // {3}
    node.parent = tmp; // {4}
  }
  // Right right case: rotate left
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent; // {1}
    if (!node.parent) {
      this.root = tmp; // {2}
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp; // {2}
      } else {
        node.parent.right = tmp; // {2}
      }
    }
    tmp.left = node; // {3}
    node.parent = tmp; // {4}
  }
  flipColors(node) {
    node.left.flipColor();
    node.right.flipColor();
  }
  isRed(node) {
    if (!node) {
      return false;
    }
    return node.isRed();
  }
}