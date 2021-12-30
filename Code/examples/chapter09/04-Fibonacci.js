// 递归求斐波那契数
function fibonacci(n){
  if (n < 1) return 0; // {1}
  if (n <= 2) return 1; // {2}
  return fibonacci(n - 1) + fibonacci(n - 2); // {3}
}

console.log('fibonacci(0)', fibonacci(0));
console.log('fibonacci(1)', fibonacci(1));
console.log('fibonacci(2)', fibonacci(2));
console.log('fibonacci(3)', fibonacci(3));
console.log('fibonacci(4)', fibonacci(4));
console.log('fibonacci(5)', fibonacci(5));

// 迭代求斐波那契数
function fibonacciIterative(n){
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) { // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}

console.log('fibonacciIterative(0)', fibonacciIterative(0));
console.log('fibonacciIterative(1)', fibonacciIterative(1));
console.log('fibonacciIterative(2)', fibonacciIterative(2));
console.log('fibonacciIterative(3)', fibonacciIterative(3));
console.log('fibonacciIterative(4)', fibonacciIterative(4));
console.log('fibonacciIterative(5)', fibonacciIterative(5));

/**
 * 记忆化斐波那契数
 * 记忆化是一种保存前一个结果的值的优化技术，类似于缓存。
 * 可以防止递归算法重复计算一个相同的值。
 * 
 * 如果我们分析在计算 fibonacci(5) 时的调用，会发现 fibonacci(3)被计算了两次，
 * 因此可以将它的结果存储下来，这样当需要再次计算它的时候，我们就已经有它的结果了。
 */
function fibonacciMemoization(n) {
  const memo = [0, 1];
  const fibonacciInner = (n) => {
    if (memo[n] != null) return memo[n];
    // return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
  };
  console.log(memo);
  return fibonacciInner(n);
}

// console.log('fibonacciMemoization(0)', fibonacciMemoization(0));
// console.log('fibonacciMemoization(1)', fibonacciMemoization(1));
// console.log('fibonacciMemoization(2)', fibonacciMemoization(2));
// console.log('fibonacciMemoization(3)', fibonacciMemoization(3));
// console.log('fibonacciMemoization(4)', fibonacciMemoization(4));
console.log('fibonacciMemoization(5)', fibonacciMemoization(5));

// https://jsperf.com/fibonacci-comparison-jsbook
