import AVLTree from './../../src/js/data-structures/avl-tree.js';

const avlTree = new AVLTree();

// 插入
const keys = [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25, 27, 30, 46, 70];
// keys.forEach((key, i, arr) => bstree.insert(arr[i]));
keys.forEach(key => avlTree.insert(key));

// 移除
const keys_needtobe_removed = [70, 46, 30];
keys_needtobe_removed.forEach(key => avlTree.remove(key));

console.log('print root:', avlTree.getRoot());


