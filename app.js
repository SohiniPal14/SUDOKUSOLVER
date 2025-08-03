// Create 9x9 input grid
const board = document.getElementById("board");

function createBoard() {
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("input");
    cell.type = "number";
    cell.min = "1";
    cell.max = "9";
    board.appendChild(cell);
  }
}

function getBoard() {
  const inputs = board.querySelectorAll("input");
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      const value = parseInt(inputs[i * 9 + j].value);
      grid[i][j] = isNaN(value) ? 0 : value;
    }
  }
  return grid;
}

function setBoard(grid) {
  const inputs = board.querySelectorAll("input");
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    inputs[i].value = grid[row][col] !== 0 ? grid[row][col] : '';
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solve() {
  const grid = getBoard();
  if (solveSudoku(grid)) {
    setBoard(grid);
    alert("Solved!");
  } else {
    alert("No solution found.");
  }
}

function clearBoard() {
  board.querySelectorAll("input").forEach(cell => cell.value = '');
}

createBoard();
