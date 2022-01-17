import BinarySearchTree from './../../src/js/data-structures/binary-search-tree.js';

const bstree = new BinarySearchTree();

// 初始化
const keys = [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25];

// keys.forEach((key, i, arr) => bstree.insert(arr[i]));
keys.forEach(key => bstree.insert(key));

console.log('search(9):', bstree.search(9));
console.log('search(21):', bstree.search(21));

console.log('root:', bstree.getRoot());
console.log('print root:', bstree.getRoot().toString());

// 中序遍历
console.log('------------ inOrderTraverse ------------');
const printNode = (value) => console.log(value);
bstree.inOrderTraverse(printNode);

// 先序遍历
console.log('------------ preOrderTraverse ------------');
bstree.preOrderTraverse(printNode);

// 后序遍历
console.log('------------ postOrderTraverse ------------');
bstree.postOrderTraverse(printNode);

// 搜索最小值
console.log('min:', bstree.min().key);

// 搜索最大值
console.log('min:', bstree.max().key);

// 移除节点
console.log('remove 21:', bstree.remove(21));
console.log('print root:', bstree.getRoot().toString());
console.log('------------ inOrderTraverse ------------');
bstree.inOrderTraverse(printNode);

bstree.printTree();