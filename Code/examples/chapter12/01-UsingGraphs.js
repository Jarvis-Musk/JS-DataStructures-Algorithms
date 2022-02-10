// const { Graph } = PacktDataStructuresAlgorithms;
import Graph from './../../src/js/data-structures/graph.js';

const graph = new Graph();

const myVertices = ['A', 'B', 'D', 'C', 'E', 'F', 'G', 'H', 'I'];

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
graph.addEdge('T', 'O');

console.log('********* printing graph ***********');

console.log(graph.toString());

console.log('vertices:', graph.getVertices());

console.log('adjacency list:', graph.getAdjList());
