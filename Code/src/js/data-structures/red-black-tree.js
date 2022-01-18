import { Compare, defaultCompare } from '../util.js';
import BinarySearchTree from './binary-search-tree.js';
import { RedBlackNode, Colors, isNullNode } from './models/red-black-node.js';

export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }
  addEmptyLeafNode(node) {
    node.left = new RedBlackNode(null, node, Colors.BLACK);
    node.right = new RedBlackNode(null, node, Colors.BLACK);
  }
  getNodeHeight(node) {
    if (isNullNode(node)) return 0;

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }
  insert(key) {
    if (isNullNode(this.root)) {
    // if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
    this.treeHeight = this.getTreeHeight();
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (isNullNode(node.left)) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        this.addEmptyLeafNode(node.left);
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (isNullNode(node.right)) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      this.addEmptyLeafNode(node.right);
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }
  minNode(node) {
    let current = node;
    while (!isNullNode(current) && !isNullNode(current.left)) {
      current = current.left;
    }
    return current;
  }
  maxNode(node) {
    let current = node;
    while (!isNullNode(current) && !isNullNode(current.right)) {
      current = current.right;
    }
    return current;
  }
  remove(key) {
    const rmNode = this.getNode(key);
    if (isNullNode(rmNode)) {
      console.log(`it's a empty tree or the node *${key}* you wanna remove do not exist`);
      return false;
    }

    let childNode;
    let tmpNode = rmNode;
    let tmpNode_original_color = tmpNode.color;

    if (isNullNode(rmNode.left)) {
      childNode = rmNode.right;
      this.transplant(rmNode.right, rmNode);
    } else if (isNullNode(rmNode.right)) {
      childNode = rmNode.left;
      this.transplant(rmNode.left, rmNode);
    } else {
      tmpNode = this.minNode(rmNode.right);
      tmpNode_original_color = tmpNode.color;
      childNode = tmpNode.right;

      if (tmpNode.parent === rmNode) {
        childNode.parent = tmpNode;
      } else {
        this.transplant(tmpNode.right, tmpNode);
        tmpNode.right = rmNode.right;
        tmpNode.right.parent = tmpNode;
      }

      this.transplant(tmpNode, rmNode);
      tmpNode.left = rmNode.left;
      tmpNode.left.parent = tmpNode;
      tmpNode.color = rmNode.color;
    }

    if (tmpNode_original_color === Colors.BLACK) {
      this.removeFix(childNode);
    }

    this.treeHeight = this.getTreeHeight();

    return true;
  }
  /**
   * fix tree after remove a node
   * @param {RedBlackNode} node 
   */
  removeFix(node) {
    while (node !== this.root && node.color === Colors.BLACK) {
      // node is left child
      if (node === node.parent.left) {
        let bro = node.parent.right;
        if (bro.color === Colors.RED) {
          bro.color = Colors.BLACK;
          node.parent.color = Colors.RED;
          this.rotationRR(node.parent);
          bro = node.parent.right;
        }
        if (bro.left.color === Colors.BLACK && bro.right.color === Colors.BLACK) {
          bro.color = Colors.RED;
          node = node.parent;
          continue;
        } else if (bro.right.color === Colors.BLACK) {
          bro.left.color = Colors.BLACK;
          bro.color = Colors.RED;
          bro = node.parent.right;
        }
        if (bro.right.color === Colors.RED) {
          bro.color = node.parent.color;
          node.parent.color = Colors.BLACK;
          bro.right.color = Colors.BLACK;
          this.rotationRR(node.parent);
          node = this.root;
        }
      } else { // node is right child
        let bro = node.parent.left;
        if (bro.color === Colors.RED) {
          bro.color = Colors.BLACK;
          node.parent.color = Colors.RED;
          this.rotationLL(node.parent);
          bro = node.parent.left;
        }
        if (bro.right.color === Colors.BLACK && bro.left.color === Colors.BLACK) {
          bro.color = Colors.RED;
          node = node.parent;
        } else if (bro.left.color === Colors.BLACK) {
          bro.right.color = Colors.BLACK;
          bro.color = Colors.RED;
          this.rotationRR(bro);
          bro = node.parent.left;
        }
        if (bro.left.color === Colors.RED) {
          bro.color = node.parent.color;
          node.parent.color = Colors.BLACK;
          bro.left.color = Colors.BLACK;
          this.rotationLL(node.parent);
          node = this.root;
        }
      }
    }
    node.color = Colors.BLACK;
  }
  /**
   * transplant v to the position of u
   * @param {RedBlackNode} u 
   * @param {RedBlackNode} v 
   */
  transplant(v, u) {
    if (isNullNode(u.parent)) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else if (u === u.parent.right) {
      u.parent.right = v;
    } else {
      console.log('transplant() did not match the condition');
    }
    v.parent = u.parent;
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
    node.left = isNullNode(tmp.right)
      ? new RedBlackNode(null, node, Colors.BLACK)
      : tmp.right;
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
    node.right = isNullNode(tmp.left)
      ? new RedBlackNode(null, node, Colors.BLACK)
      : tmp.left;
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
    if (!isNullNode(node)) {
      return false;
    }
    return node.isRed();
  }
  preOrderTraverseNode2Array(node, treeArray, height) {
    if (height > (this.treeHeight - 1)) return;

    if (isNullNode(node)) {
      if (treeArray[height] == null) { treeArray[height] = []; }
      const color = node.color === 0 ? 'R' : 'B';
      treeArray[height].push('*' + color + node.parent.key); // * stand for node which is null
      return;
    }

    if (treeArray[height] == null) { treeArray[height] = []; }
    const color = node.color === 0 ? 'R' : 'B';
    isNullNode(node.parent)
      ? treeArray[height].push(node.key + color + 'N')
      : treeArray[height].push(node.key + color + node.parent.key);
    this.preOrderTraverseNode2Array(node.left, treeArray, height + 1);
    this.preOrderTraverseNode2Array(node.right, treeArray, height + 1);
  }
}