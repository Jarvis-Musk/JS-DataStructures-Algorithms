import RedBlackTree from './../../src/js/data-structures/red-black-tree.js';

const rbTree = new RedBlackTree();

const keys = [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25, 2, 19];
keys.forEach(key => rbTree.insert(key));

console.log('print root:', rbTree.getRoot());

console.log('treeHeight', rbTree.treeHeight);
rbTree.printTree();

// 移除
const keys_needtobe_removed = [15, 9, 11];
keys_needtobe_removed.forEach(key => {
  if (rbTree.remove(key)) {
    console.log(`removed node: ${key}`);
  }
});

rbTree.printTree();
