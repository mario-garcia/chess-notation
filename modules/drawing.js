const TILE_SIZE = 50;
const BOARD_SIZE = TILE_SIZE * 8;
const LIGHT = '#f0d9b5';
const DARK = '#b58863';
const ASCII_A = 97;
const ASCII_H = 104;
const ASCII_1 = 49;
const ASCII_8 = 56;

var boardContainer = document.getElementById('board');
boardContainer.style.width = `${BOARD_SIZE}px`;
boardContainer.style.height = `${BOARD_SIZE}px`;

let boardCanvas = document.createElement('canvas');
boardCanvas.width = BOARD_SIZE;
boardCanvas.height = BOARD_SIZE;
boardContainer.appendChild(boardCanvas);

let ctx = boardCanvas.getContext('2d');

/**
  Draws the board (no coordinates)
**/
function drawBoard() {
  for (i=0; i < 8; i++) {
    for (j=0; j < 8; j++) {
      let color = (i + j) % 2 === 0 ? LIGHT : DARK;
      ctx.fillStyle = color;
      ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

/**
  Draws coordinates on the board
**/
function drawCoordinates(whiteOrientation = true) {
  let padding = TILE_SIZE / 10;
  ctx.font = `lighter ${TILE_SIZE/4}px sans-serif`;
  let letterAscii = whiteOrientation ? ASCII_A : ASCII_H;
  let letterIncrement = whiteOrientation ? 1 : -1;
  let numberAscii = whiteOrientation ? ASCII_8 : ASCII_1;
  let numberIncrement = whiteOrientation ? -1 : 1;

  // bottom coordinates (a - h)
  for (let i=0; i < 8; i++) {
    let color = i % 2 === 0 ? LIGHT : DARK;
    ctx.fillStyle = color;
    let x = (i * TILE_SIZE) + padding;
    let y = BOARD_SIZE - padding;
    let letter = String.fromCharCode(letterAscii);
    ctx.fillText(letter, x, y);
    letterAscii += letterIncrement;
  }

  // right coordinates (1 - 8)
  for (let j=0; j < 8; j++) {
      let color = j % 2 === 0 ? LIGHT : DARK;
      ctx.fillStyle = color;
      let x = BOARD_SIZE - (padding * 2);
      let y = (j * TILE_SIZE) + padding + TILE_SIZE/4;
      let number = String.fromCharCode(numberAscii)
      ctx.fillText(number, x, y);
      numberAscii += numberIncrement;
  }
}

/**
  Clears the board for redrawing
**/
function clearBoard() {
  ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

function highlightRandomSquare(whiteOrientation) {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);
    let coordinate = `${String.fromCharCode(ASCII_A + x)}${y}`
    return coordinate;
}

function highlightSquare(x, y) {
}
