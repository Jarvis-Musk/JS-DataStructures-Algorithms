// @ts-check
import Stack from '../data-structures/stack.js';

function towerOfHanoi(plates, a, b, c) {
  if (plates <= 0) {
    return [];
  }
  if (plates === 1) {
    c.push(a.pop());
  } else {
    towerOfHanoi(plates - 1, a, c, b);
    c.push(a.pop());
    towerOfHanoi(plates - 1, b, a, c);
  }
  return `a: ${a}, b: ${b}, c: ${c}`;
}

export function hanoiStack(plates) {
  // const a = new Stack();
  // const c = new Stack();
  // const b = new Stack();
  const a = [];
  const b = [];
  const c = [];

  for (let i = plates; i > 0; i--) {
    a.push(i);
  }

  return towerOfHanoi(plates, a, b, c);
}

export function hanoi(plates, source, helper, dest, moves = []) {
  // console.log(`${source}, ${helper}, ${dest}`);
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    moves.push([source, dest]);
  } else {
    hanoi(plates - 1, source, dest, helper, moves);
    moves.push([source, dest]);
    hanoi(plates - 1, helper, source, dest, moves);
  }
  return moves;
}
