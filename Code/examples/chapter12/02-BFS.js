// const { Graph } = PacktDataStructuresAlgorithms;
// const { Stack } = PacktDataStructuresAlgorithms;
// const { BFS } = PacktDataStructuresAlgorithms;
// const { breadthFirstSearch } = PacktDataStructuresAlgorithms;
import Graph from './../../src/js/data-structures/graph.js';
import Stack from './../../src/js/data-structures/stack.js';
import { BFS, breadthFirstSearch } from './../../src/js/algorithms/graph/breadth-first-search.js';

const graph = new Graph();

const myVertices = ['A', 'E', 'F', 'G', 'I', 'H', 'C', 'B', 'D'];

/* for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
} */
myVertices.forEach(vertex => graph.addVertex(vertex));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log('********* printing graph ***********');

console.log(graph.toString());

console.log('********* bfs with callback ***********');

const printVertex = (value) => console.log('The vertex has been fully explored: ' + value);

breadthFirstSearch(graph, myVertices[0], printVertex);

console.log('********* sorthest path - BFS ***********');
const shortestPathA = BFS(graph, myVertices[0]);
console.log('distances:', shortestPathA.distances);
console.log('predecessors:', shortestPathA.predecessors);

//from A to all other vertices
const fromVertex = myVertices[0];

for (let i = 1; i < myVertices.length; i++) {
  const toVertex = myVertices[i];
  const path = new Stack();
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  let s = path.pop();
  while (!path.isEmpty()) {
    s += ' - ' + path.pop();
  }
  console.log(s);
}
