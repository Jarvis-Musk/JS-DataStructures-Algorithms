// @ts-check
"use strict";

function factorialIterative(number) {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total  = total * n;
  }
  return total;
}

console.log('factorialIterative(5): ', factorialIterative(5));

function factorial(n) {
  // console.trace(); // console 的 trace() 方法向 Web控制台 输出一个堆栈跟踪。
  if (n === 1 || n === 0) { // 基线条件
    return 1;
  }
  return n * factorial(n - 1); // 递归调用
}

console.log('factorial(5): ', factorial(5));

function factorialTailCall(n, total) {
  // console.trace();
  if (n === 1 || n === 0) return total;
  return factorialTailCall(n - 1, n * total);
}

// 过了9675就溢出了
console.log('factorialTailCall(5, 1)', factorialTailCall(5, 1)); // Chrome V8引擎的尾递归优化已经默认关闭了
