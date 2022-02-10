// import Graph from '../../data-structures/graph';

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};
  vertices.forEach(vertex => { color[vertex] = Colors.WHITE; });
  return color;
};

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }
  // console.log('Discovered ' + u);
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
  console.log('explored ' + u);
};

export const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      // 如果顶点 A 第一个调用函数，则下面的代码行只会被执行一次，因为所有其他的顶点都有路径到第一个调用 depthFirstSearchVisit 函数的顶点（顶点 A）。
      // 如果顶点 B 第一个调用函数，则下面的代码行将会为其他顶点再执行一次（比如顶点 A）。
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  // console.log('discovered ' + u);
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
  // console.log('explored ' + u);
};

export const DFS = graph => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d = {};
  const f = {};
  const p = {};
  /**
   * 我们声明一个 time 对象，包含 count 属性，这跟 JavaScript 中的方法按值或按引用传递参数有关。
   * 在一些语言中，按值或按引用传递参数是有区别的。
   * 原始数据类型是按值传递的，也就是说值的作用域只存在于函数的执行过程中。如果修改了值，只会在函数的作用域内生效。
   * 如果参数以引用形式（对象）传递，并修改了对象中的任意属性，将会影响对象的原始值。对象以引用形式传递是因为只有内存的引用被传给了函数或方法。
   * 在这个例子中，我们希望次数统计在这个算法执行过程中是全局使用的，所以需要将参数以对象传递，而不是原始值。
   */
  const time = { count: 0 };
  // init
  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    f[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  };
};
