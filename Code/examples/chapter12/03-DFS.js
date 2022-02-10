// const { Graph } = PacktDataStructuresAlgorithms;
// const { depthFirstSearch } = PacktDataStructuresAlgorithms;
// const { DFS } = PacktDataStructuresAlgorithms;
import Graph from './../../src/js/data-structures/graph.js';
import { DFS, depthFirstSearch } from './../../src/js/algorithms/graph/depth-first-search.js';

let graph = new Graph(true);

// let myVertices = ['A', 'E', 'F', 'G', 'H', 'I', 'C', 'B', 'D'];
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];

/* for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
} */
myVertices.forEach(vertex => graph.addVertex(vertex));
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('C', 'D');
// graph.addEdge('C', 'G');
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');

console.log('********* printing graph ***********');

console.log(graph.toString());

console.log('********* dfs with callback ***********');

const printVertex = value => console.log('Visited vertex: ' + value);

depthFirstSearch(graph, printVertex);

console.log('********* topological sort - DFS ***********');

graph = new Graph(true); // directed graph

myVertices = ['B', 'A', 'C', 'D', 'E', 'F'];
/* for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
} */
myVertices.forEach(vertex => graph.addVertex(vertex));
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');

const result = DFS(graph);
console.log('discovery', result.discovery);
console.log('finished', result.finished);
console.log('predecessors', result.predecessors);

const fTimes = result.finished;
let s = '';
for (let count = 0; count < myVertices.length; count++) {
  let max = 0;
  let maxName = null;
  for (let i = 0; i < myVertices.length; i++) {
    if (fTimes[myVertices[i]] > max) {
      max = fTimes[myVertices[i]];
      maxName = myVertices[i];
    }
  }
  s += ' - ' + maxName;
  delete fTimes[maxName];
}
console.log(s);
