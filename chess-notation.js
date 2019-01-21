let whiteOrientation = true;
let showCoordinates = true;
let hightlightedSquare = "a1";
let selectModeOn = false;
let squareToSelect = "a1";

resetBoard();

$("#flipBoard").click(function() {
  whiteOrientation = !whiteOrientation;
  $('#playingAs').text(whiteOrientation ? "White" : "Black");
  resetBoard();
});

$("#toggleCoordinates").click(function() {
  showCoordinates = !showCoordinates;
  $(this).text(showCoordinates ? "Hide Coordinates" : "Show Coordinates");
  resetBoard();
});

$("#identifyMode").click(identifyMode);

$("#identifyModeDisplay").keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    checkInputCoordinates();
  }
});

function identifyMode() {
  selectModeOn = false;
  $("#identifyWrong").hide();
  resetBoard();
  $(this).prop("disabled", true);
  $("#selectMode").prop("disabled", false);
  $("#identifyModeDisplay").show();
  $("#selectModeDisplay").hide();
  let newHighlightedSquare = highlightRandomSquare(whiteOrientation);
  while (newHighlightedSquare === hightlightedSquare) {
    newHighlightedSquare = highlightRandomSquare(whiteOrientation);
  }
  hightlightedSquare = newHighlightedSquare;
  console.log(hightlightedSquare);
}

function checkInputCoordinates() {
  let $input = $("#identifyInput");
  let answer = $input.val();
  if (answer == hightlightedSquare) {
    $input.val('');
    identifyMode();
  } else {
    $("#identifyWrong").show();
  }
}

$("#selectMode").click(function() {
  resetBoard();
  selectMode();
});

$boardCanvas = getBoardCanvas();
$boardCanvas.addEventListener("click", checkSelection);

function selectMode() {
  selectModeOn = true;
  $("#selectWrong").hide();
  $(this).prop("disabled", true);
  $("#identifyMode").prop("disabled", false);
  $("#identifyModeDisplay").hide();
  $("#selectModeDisplay").show();
  let newSquareToSelect = getRandomSquareToSelect();
  while (newSquareToSelect == squareToSelect) {
    newSquareToSelect = getRandomSquareToSelect();
  }
  squareToSelect = newSquareToSelect;
  $("#selectInput").val(squareToSelect);
}

function getRandomSquareToSelect() {
  let x = Math.floor(Math.random() * 8);
  let y = Math.floor(Math.random() * 8);
  let coordinate = `${String.fromCharCode(ASCII_A + x)}${y+1}`
  return coordinate;
}

function checkSelection(event) {
  if (selectModeOn) {
    let x = event.x - $boardCanvas.offsetLeft;
    let y = event.y - $boardCanvas.offsetTop;
    let selectedCoordinate = convertToBoardCoordinate(x, y);
    if (selectedCoordinate == squareToSelect) {
      selectMode();
      console.log("correct");
    } else {
      $("#selectWrong").show();
    }
  } else {
    console.log('not in select mode');
  }
}

function resetBoard() {
  clearBoard();
  drawBoard();
  if (showCoordinates) {
    drawCoordinates(whiteOrientation);
  }
}
