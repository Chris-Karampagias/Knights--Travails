function createBoard() {
  const board = [];
  for (let i = 1; i <= 8; i++) {
    let row = [];
    for (let j = 1; j <= 8; j++) {
      row.push([i, j, false]);
    }
    board.push(row);
  }
  return board;
}
const board = createBoard();
console.log(board);
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
    (pos) => pos[0] <= 8 && pos[1] <= 8 && pos[0] >= 0 && pos[1] >= 0
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
    const availableMoves = getAvailableMoves([
      currentPos[0] + 1,
      currentPos[1] + 1,
    ]);
    availableMoves.forEach((move) => {
      move = board[move[0] - 1][move[1] - 1];
      if (!move[2]) {
        move[2] = true;
      }
      queue.push(move);
    });
  }
  return totalMoves;
}

console.log(knightMoves([3, 3], [4, 3]));
