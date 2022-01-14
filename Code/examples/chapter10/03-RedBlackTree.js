import RedBlackTree from './../../src/js/data-structures/red-black-tree.js';

const redBlackTree = new RedBlackTree();

const keys = [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25, 2];
keys.forEach(key => redBlackTree.insert(key));

console.log('print root:', redBlackTree.getRoot());
