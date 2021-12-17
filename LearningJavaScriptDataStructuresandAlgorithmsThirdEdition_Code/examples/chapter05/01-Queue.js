// const { Queue } = PacktDataStructuresAlgorithms;
import Queue from './../../src/js/data-structures/queue.js';

const queue = new Queue();
queue.enqueue('John');
queue.enqueue('Jack');
checkFunc(queue);
queue.enqueue('Camila');
checkFunc(queue);
queue.dequeue(); // remove John
checkFunc(queue);
queue.dequeue(); // remove Jack
checkFunc(queue);
queue.dequeue();
checkFunc(queue);

queue.enqueue('Apll');
checkFunc(queue);

function checkFunc (queue) {
  console.log(`size: ${queue.size()}`);
  console.log(`lowestCount: ${queue.lowestCount}, count: ${queue.count}`);
  console.log(`content: ${queue.toString()}`);
  console.log('------------------');
}