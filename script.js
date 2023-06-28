import { Graph } from "./graph.mjs";

function createBoard() {
  const board = [];
  for (let i = 1; i <= 8; i++) {
    let row = [];
    for (let j = 1; j <= 8; j++) {
      row.push([i, j, false, 0]);
    }
    board.push(row);
  }
  return board;
}
function getAvailableMoves(pos) {
  let i, j;
  [i, j] = pos;
  let moves = [
    [i - 2, j - 1],
    [i - 2, j + 1],
    [i - 1, j - 2],
    [i + 1, j - 2],
    [i + 2, j - 1],
    [i + 2, j + 1],
    [i + 1, j + 2],
    [i - 1, j + 2],
  ];
  moves = moves.filter(
    (pos) => pos[0] <= 8 && pos[1] <= 8 && pos[0] > 0 && pos[1] > 0
  );
  return moves;
}

function knightMoves(start, finish) {
  const graph = createGraph().adjacencyList;
  const queue = [start],
    visited = { [start]: true },
    predecessor = {};
  while (queue.length) {
    let u = queue.shift(),
      neighbours = graph[`${u[0]}${u[1]}`];
    for (let i = 0; i < neighbours.length; i++) {
      let ic = Number(neighbours[i][0]),
        jc = Number(neighbours[i][1]),
        v = [ic, jc];
      if (visited[v]) {
        continue;
      }
      visited[v] = true;
      if (v[0] == finish[0] && v[1] == finish[1]) {
        predecessor[v] = u;
        const path = [v];
        let flag = true;
        while (flag) {
          path.push(u);
          u = predecessor[u];
          if (u[0] == start[0] && u[1] == start[1]) {
            path.push(u);
            flag = false;
          }
        }
        path.reverse();
        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`
        );
        for (let j = 0; j < path.length; j++) {
          console.log(`[${path[j][0]},${path[j][1]}]`);
        }
      }
      predecessor[v] = u;
      queue.push(v);
    }
  }
}

function createGraph() {
  const graph = new Graph();
  const board = createBoard();
  const queue = [];
  let currentPos = board[0][0];
  queue.push(currentPos);
  let i, j, v1, v2;
  while (true) {
    currentPos = queue.shift();
    while (currentPos[2] == true) {
      currentPos = queue.shift();
      if (!queue.length) {
        return graph;
      }
    }
    currentPos[2] = true;
    i = currentPos[0];
    j = currentPos[1];
    v1 = `${i}${j}`;
    graph.addVertex(i, j);
    const availableMoves = getAvailableMoves([i, j]);
    availableMoves.forEach((move) => {
      v2 = `${move[0]}${move[1]}`;
      graph.addVertex(move[0], move[1]);
      graph.addEdge(v1, v2);
      move = board[move[0] - 1][move[1] - 1];
      queue.push(move);
    });
  }
}

knightMoves([1, 1], [8, 8]);
