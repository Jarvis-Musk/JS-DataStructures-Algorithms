import Queue from '../../data-structures/queue.js';

const Colors = {
  WHITE: 0, // 表示该顶点还没有被访问
  GREY: 1, // 表示该顶点被访问过，但并未被探索过
  BLACK: 2 // 表示该顶点被访问过且被完全探索过
};

/**
 * 在每个算法的开头，所有的顶点会被标记为未访问（白色）。
 * 用下面的函数来初始化每个顶点的颜色
 */
const initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color; // 一个辅助对象，帮助存储顶点是否被访问过
};

export const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue(); // 存储待访问和待探索的顶点

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY; // 只有在给指定的第一个顶点 - startVertex - 赋值时不是重复的
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
};

export const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distances = {};
  const predecessors = {};
  queue.enqueue(startVertex);

  // 初始化 distances 和 predecessors
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distances[w] = distances[u] + 1; // 通过给distances[u]加 1 来增加 v(startVertex) 和 w 之间的距离（u 是 w 的前溯点，distances[u]的值已经有了）
        predecessors[w] = u; // 当我们发现顶点 u 的邻点 w 时，则设置 w 的前溯点值为 u
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }
  return {
    distances,
    predecessors
  };
};
