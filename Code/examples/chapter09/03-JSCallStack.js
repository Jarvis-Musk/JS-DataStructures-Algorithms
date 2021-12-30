let i = 0;
function recursiveFn() {
  // Chrome 96: i = 13975
  // Node.js v14.16.0: i = 15636
  i++;
  recursiveFn();
}

try {
  recursiveFn();
} catch (ex) {
  console.log('i = ' + i + ' error: ' + ex);
  // error: RangeError: Maximum call stack size exceeded
}
