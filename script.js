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
  const board = createBoard();
  const queue = [];
  const totalMoves = [];
  let si, sj, fi, fj;
  [si, sj] = start;
  start = board[si - 1][sj - 1];
  [fi, fj] = finish;
  finish = board[fi - 1][fj - 1];
  start[2] = true;
  queue.push(start);
  let currentPos;
  while (queue.length && finish[2] != true) {
    currentPos = queue.shift();
    totalMoves.push(currentPos);
    const availableMoves = getAvailableMoves([currentPos[0], currentPos[1]]);
    availableMoves.forEach((move) => {
      move = board[move[0] - 1][move[1] - 1];
      if (!move[2]) {
        move[2] = true;
      }
      if (move[0] == fi && move[1] == fj) {
        totalMoves.push(move);
      }
      queue.push(move);
    });
  }
  return totalMoves;
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

console.log(createGraph());
