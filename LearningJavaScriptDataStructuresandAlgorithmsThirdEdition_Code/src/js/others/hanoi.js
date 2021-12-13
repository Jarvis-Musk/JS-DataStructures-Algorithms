// @ts-check
import Stack from '../data-structures/stack.js';

function towerOfHanoi(plates, a, b, c, aName, bName, cName, moves = []) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    c.push(a.pop());
    const move = {};
    move[aName] = a.toString();
    move[bName] = b.toString();
    move[cName] = c.toString();
    moves.push(move);
  } else {
    towerOfHanoi(plates - 1, a, c, b, aName, cName, bName, moves);
    c.push(a.pop());
    const move = {};
    move[aName] = a.toString();
    move[bName] = b.toString();
    move[cName] = c.toString();
    moves.push(move);
    towerOfHanoi(plates - 1, b, a, c, bName, aName, cName, moves);
  }
  return moves;
}

export function hanoiStack(plates) {
  const a = new Stack();
  const c = new Stack();
  const b = new Stack();

  for (let i = plates; i > 0; i--) {
    a.push(i);
  }

  return towerOfHanoi(plates, a, b, c, 'a', 'b', 'c');
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
