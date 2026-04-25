/* ==========================================================
   File: Connect4.js
   Written by: Mairtin O Domhnaill
   Purpose:
   Handles all gameplay logic for the Connect 4 game.
   ========================================================== */

const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let gameOver = false;

/* ==========================================================
   Written by: Mairtin O Domhnaill
   Purpose:
   Creates the board and resets game state.
   ========================================================== */
function createBoard() 
{
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board = [];
  gameOver = false;

  for (let r = 0; r < ROWS; r++) 
    {
    let row = [];

    for (let c = 0; c < COLS; c++) 
      {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleClick);

      boardDiv.appendChild(cell);
      row.push(0);
    }

    board.push(row);
  }
}

/* ==========================================================
   Written by: Mairtín O Domhnaill
   Purpose:
   Handles player move when a column is clicked.
   ========================================================== */
function handleClick(e) 
{
  if (gameOver) return;

  const col = parseInt(e.target.dataset.col, 10);

  for (let r = ROWS - 1; r >= 0; r--) 
    {
    if (board[r][col] === 0) 
      {
      board[r][col] = currentPlayer;
      dropPiece(r, col);

      const winCells = checkWin(r, col);

      if (winCells) 
        {
        gameOver = true;
        highlightWin(winCells);
        scores[currentPlayer]++;
        updateScores();
        setTimeout(showWinner, 500);
        return;
      }

      if (board[0].every(cell => cell !== 0)) 
        {
        gameOver = true;
        setTimeout(showDraw, 500);
        return;
        }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateTurnText();
      return;
    }
  }

  alert("Column is full.");
}

/* Drop animation */
function dropPiece(r, c) 
{
  const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
  const piece = document.createElement('div');

  piece.classList.add('piece', currentPlayer === 1 ? 'player1' : 'player2');
  cell.appendChild(piece);

  setTimeout(() => 
    {
    piece.style.top = '0px';
    }, 10);
}

function updateTurnText() 
{
  document.getElementById('turnText').innerText = `Player ${currentPlayer}'s Turn`;
}

function updateScores() 

{
  document.getElementById('p1Score').innerText = scores[1];
  document.getElementById('p2Score').innerText = scores[2];
}

function resetBoard() 
{
  currentPlayer = 1;
  createBoard();
  updateTurnText();
}

function resetScores() 
{
  scores = { 1: 0, 2: 0 };
  updateScores();
  resetBoard();
}

function showWinner() 
{
  document.getElementById('winnerText').innerText = `🎉 Player ${currentPlayer} Wins!`;
  document.getElementById('playAgainBtn').onclick = resetBoard;
  new bootstrap.Modal(document.getElementById('winModal')).show();
}

function showDraw() 
{
  document.getElementById('winnerText').innerText = `🤝 It's a Draw!`;
  document.getElementById('playAgainBtn').onclick = resetBoard;
  new bootstrap.Modal(document.getElementById('winModal')).show();
}

function checkWin(r, c) 
{
  return (
    checkDirection(r, c, 1, 0) ||
    checkDirection(r, c, 0, 1) ||
    checkDirection(r, c, 1, 1) ||
    checkDirection(r, c, 1, -1)
  );
}

function checkDirection(r, c, dr, dc) 
{
  let cells = [[r, c]];
  cells = cells.concat(countCells(r, c, dr, dc));
  cells = cells.concat(countCells(r, c, -dr, -dc));
  return cells.length >= 4 ? cells : null;
}

function countCells(r, c, dr, dc) 
{
  let result = [];
  const player = board[r][c];
  let nr = r + dr;
  let nc = c + dc;

  while (
    nr >= 0 && nr < ROWS &&
    nc >= 0 && nc < COLS &&
    board[nr][nc] === player
  ) 
  {
    result.push([nr, nc]);
    nr += dr;
    nc += dc;
  }

  return result;
}

function highlightWin(cells) 
{
  cells.forEach(([r, c]) => 
    {
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cell.classList.add('win');
    });
}

createBoard();