const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Start the game
startGame();

function startGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);
  
  // Update board state
  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check if current player has won
  if (checkWin(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    endGame();
  } else if (isDraw()) {
    message.textContent = 'It\'s a draw!';
    gameActive = false;
    endGame();
  } else {
    // Switch turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check if the current player has won
function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === player;
    });
  });
}

// Check if it's a draw
function isDraw() {
  return boardState.every(cell => cell !== '');
}

// End the game
function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

// Restart the game
restartButton.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = `Player ${currentPlayer}'s turn`;
});
