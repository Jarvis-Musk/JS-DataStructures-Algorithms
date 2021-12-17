// const { Deque } = PacktDataStructuresAlgorithms;
import Deque from './../../src/js/data-structures/deque.js';

const deque = new Deque();
deque.addBack('John');
deque.addBack('Jack');
deque.addBack('Camila');

checkFunc(deque);

deque.removeFront(); // remove John

checkFunc(deque);

deque.removeBack(); // Camila decides to leave

checkFunc(deque);

deque.addFront('John'); // John comes back for information

checkFunc(deque);




function checkFunc (deque) {
  console.log(`lowestCount: ${deque.lowestCount}, count: ${deque.count}`);
  console.log(`size: ${deque.size()}`);
  console.log(`content: ${deque.toString()}`);
  console.log('------------------');
}