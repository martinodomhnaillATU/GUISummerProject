/* ════════════════════════════════════════════════════════════
   Connect4.js
   All game logic for the Four in a Row game.
   Linked from: HTML files/Connect4.html
   ════════════════════════════════════════════════════════════ */


/* ════════════════════════════════════════════════════════════
   CONSTANTS & STATE
   ════════════════════════════════════════════════════════════ */

const ROWS = 6;   // number of rows in the grid
const COLS = 7;   // number of columns in the grid

// 2-D array representing piece placement:
//   0 = empty, 1 = Player 1's piece, 2 = Player 2's piece
let board = [];

// Whose turn it is (1 or 2)
let currentPlayer = 1;

// Cumulative win counts that persist across rounds
let scores = { 1: 0, 2: 0 };

// Flag: set to true after a win or draw to prevent further moves
let gameOver = false;


/* ════════════════════════════════════════════════════════════
   createBoard()
   Builds the visual grid and resets the internal board array.
   Called at page load and at the start of every new round.
   ════════════════════════════════════════════════════════════ */
function createBoard() 
{
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = ''; // remove all cells left over from the previous round
  board = [];              // reset the logical 2-D array
  gameOver = false;        // allow clicks again

  for (let r = 0; r < ROWS; r++) 
  {
    let row = [];

    for (let c = 0; c < COLS; c++) 
    {
      // Create one circular cell element for this grid position
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // Store row and column as data attributes so handleClick
      // can identify which grid position was clicked
      cell.dataset.row = r;
      cell.dataset.col = c;

      // Wire up the click handler so dropping a piece works
      cell.addEventListener('click', handleClick);

      boardDiv.appendChild(cell);
      row.push(0); // 0 = empty slot in the logical grid
    }

    board.push(row);
  }
}


/* ════════════════════════════════════════════════════════════
   handleClick(e)
   Fired when the player clicks any cell.
   Finds the lowest empty row in the clicked column, places a
   piece there, then checks for a win or a draw.
   ════════════════════════════════════════════════════════════ */
function handleClick(e) 
{
  if (gameOver) return; // ignore any clicks once the round has ended

  // Parse col as an integer – dataset values are always strings,
  // and using a string as an array index causes subtle comparison
  // bugs, so we convert explicitly with parseInt().
  const col = parseInt(e.target.dataset.col);

  // Search from the bottom row upward for the first empty slot
  for (let r = ROWS - 1; r >= 0; r--) 
  {
    if (board[r][col] === 0) 
    {
      // Mark the logical board with the current player's number
      board[r][col] = currentPlayer;

      // Animate a coloured disc falling into this cell
      dropPiece(r, col);

      // Play the drop sound (catch silences browser autoplay-policy warnings)
      document.getElementById('dropSound').play().catch(() => {});

      // Check whether this move completed four in a row
      const winCells = checkWin(r, col);

      if (winCells) 
      {
        gameOver = true;         // lock the board – no more moves this round
        highlightWin(winCells);  // add gold glow to the four winning cells

        scores[currentPlayer]++; // update winner's score before refreshing display
        updateScores();          // refresh the scoreboard immediately

        document.getElementById('winSound').play().catch(() => {});

        // Short delay lets the win highlight render before the modal pops up
        setTimeout(() => showWinner(), 500);
        return; // stop – don't switch player or check for draw
      }

      // Draw check: if every cell in the top row is occupied,
      // the board is completely full and no winner is possible
      if (board[0].every(cell => cell !== 0)) 
      {
        gameOver = true;
        setTimeout(() => showDraw(), 500);
        return;
      }

      // No win or draw – hand control to the other player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateTurnText();
      return; // piece placed successfully – exit the row-search loop
    }
  }

  // Reaching here means every row in this column is already occupied
  alert("Column is full! Choose another.");
}


/* ════════════════════════════════════════════════════════════
   dropPiece(r, c)
   Creates a coloured disc element inside the target cell and
   animates it dropping from above using a CSS transition on `top`.
   ════════════════════════════════════════════════════════════ */
function dropPiece(r, c) 
{
  // Select the exact cell using its data attributes
  const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);

  const piece = document.createElement('div');
  piece.classList.add('piece', currentPlayer === 1 ? 'player1' : 'player2');

  // The piece starts off-screen above the cell (top: -100px is set in CSS).
  // Appending it first, then setting top: 0 after a tiny delay, triggers
  // the CSS transition and creates the falling animation.
  cell.appendChild(piece);
  setTimeout(() => { piece.style.top = '0px'; }, 10);
}


/* ════════════════════════════════════════════════════════════
   updateTurnText()
   Updates the "Player X's Turn" status label between moves.
   ════════════════════════════════════════════════════════════ */
function updateTurnText() 
{
  document.getElementById('turnText').innerText = `Player ${currentPlayer}'s Turn`;
}


/* ════════════════════════════════════════════════════════════
   updateScores()
   Reads the scores object and refreshes both score <span> elements.
   ════════════════════════════════════════════════════════════ */
function updateScores() 
{
  document.getElementById('p1Score').innerText = scores[1];
  document.getElementById('p2Score').innerText = scores[2];
}


/* ════════════════════════════════════════════════════════════
   resetBoard()
   Starts a fresh round: resets to Player 1 and rebuilds the grid.
   Round scores are preserved – only the board state is cleared.
   ════════════════════════════════════════════════════════════ */
function resetBoard() 
{
  currentPlayer = 1;
  createBoard();
  updateTurnText();
}


/* ════════════════════════════════════════════════════════════
   resetScores()
   Zeroes out both players' scores and refreshes the display.
   ════════════════════════════════════════════════════════════ */
function resetScores() 
{
  scores = { 1: 0, 2: 0 };
  updateScores();
}


/* ════════════════════════════════════════════════════════════
   showWinner()
   Populates the modal with a win message and displays it.
   Wires the "Play Again" button to resetBoard() so the next
   round starts cleanly when the player dismisses the modal.
   ════════════════════════════════════════════════════════════ */
function showWinner() 
{
  document.getElementById('winnerText').innerText = `🎉 Player ${currentPlayer} Wins!`;

  // Assign resetBoard fresh each round to avoid stacking multiple
  // event listeners from previous rounds onto the same button
  document.getElementById('playAgainBtn').onclick = () => 
  {
    resetBoard();
  };

  new bootstrap.Modal(document.getElementById('winModal')).show();
}


/* ════════════════════════════════════════════════════════════
   showDraw()
   Populates the modal with a draw message and displays it
   when the board is completely full with no winner.
   ════════════════════════════════════════════════════════════ */
function showDraw() 
{
  document.getElementById('winnerText').innerText = `🤝 It's a Draw!`;

  document.getElementById('playAgainBtn').onclick = () => 
  {
    resetBoard();
  };

  new bootstrap.Modal(document.getElementById('winModal')).show();
}


/* ════════════════════════════════════════════════════════════
   checkWin(r, c)
   After a piece is placed at (r, c), tests all four directions:
     – vertical   (dr=1, dc=0)
     – horizontal (dr=0, dc=1)
     – diagonal ↘ (dr=1, dc=1)
     – diagonal ↙ (dr=1, dc=-1)
   Returns the array of winning cell coordinates, or null.
   ════════════════════════════════════════════════════════════ */
function checkWin(r, c) 
{
  return (
    checkDirection(r, c, 1, 0)  ||  // vertical
    checkDirection(r, c, 0, 1)  ||  // horizontal
    checkDirection(r, c, 1, 1)  ||  // diagonal ↘
    checkDirection(r, c, 1, -1)     // diagonal ↙
  );
}


/* ════════════════════════════════════════════════════════════
   checkDirection(r, c, dr, dc)
   Walks in both directions along a given vector (dr, dc) from
   the placed piece, collecting all consecutive matching cells.
   Returns the cell list if it has 4 or more entries, else null.
   ════════════════════════════════════════════════════════════ */
function checkDirection(r, c, dr, dc) 
{
  // Start with the just-placed cell, then extend in both directions
  let cells = [[r, c]];
  cells = cells.concat(countCells(r, c,  dr,  dc)); // positive direction
  cells = cells.concat(countCells(r, c, -dr, -dc)); // negative / opposite direction
  return cells.length >= 4 ? cells : null;
}


/* ════════════════════════════════════════════════════════════
   countCells(r, c, dr, dc)
   Walks step-by-step in direction (dr, dc) from (r, c),
   collecting coordinates as long as each cell belongs to the
   same player. Stops at the board edge or an opponent's piece.
   Returns an array of [row, col] pairs (start cell not included).
   ════════════════════════════════════════════════════════════ */
function countCells(r, c, dr, dc) 
{
  let result = [];
  const player = board[r][c]; // the current player's marker (1 or 2)
  let nr = r + dr;
  let nc = c + dc;

  while (
    nr >= 0 && nr < ROWS &&   // stay within row bounds
    nc >= 0 && nc < COLS &&   // stay within column bounds
    board[nr][nc] === player  // cell must belong to the same player
  ) 
  {
    result.push([nr, nc]);
    nr += dr;
    nc += dc;
  }

  return result;
}


/* ════════════════════════════════════════════════════════════
   highlightWin(cells)
   Adds the CSS 'win' class (gold glow) to each of the four
   winning cells so both players can clearly see the winning line.
   ════════════════════════════════════════════════════════════ */
function highlightWin(cells) 
{
  cells.forEach(([r, c]) => 
  {
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cell.classList.add('win');
  });
}


/* ════════════════════════════════════════════════════════════
   INITIALISE
   Build the board as soon as the script loads (page load).
   ════════════════════════════════════════════════════════════ */
createBoard();