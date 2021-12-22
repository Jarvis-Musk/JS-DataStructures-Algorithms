var towerOfHanoiFunc = function(plates, a, b, c) {
  if (plates <= 0) {
    return [];
  }
  if (plates === 1) {
    c.push(a.pop());
  } else {
    towerOfHanoiFunc(plates - 1, a, c, b);
    c.push(a.pop());
    towerOfHanoiFunc(plates - 1, b, a, c);
  }
  return c;
}

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
  const plates = A.length;

  C = towerOfHanoiFunc(plates, A, B, C);

};