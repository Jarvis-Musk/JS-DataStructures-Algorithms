export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

export const DOES_NOT_EXIST = -1;

export function lesserEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

export function biggerEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

export function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 使用 linkedList 类的开发者可以自行传入用于比较两个 JavaScript 对象或值是否相等的自定义函数。
export function defaultEquals(a, b) {
  return a === b;
}

export function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

export function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */

  // ES6 引入的解构赋值语法，可用来进行值的互换
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#swapping_variables
  // 目前数组解构赋值比正常赋值要慢 https://bugzilla.mozilla.org/show_bug.cgi?id=1177319
  [array[a], array[b]] = [array[b], array[a]];
}

export const swap2 = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];

export function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

export function defaultDiff(a, b) {
  return Number(a) - Number(b);
}
