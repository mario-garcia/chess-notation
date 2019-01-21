let whiteOrientation = true;
let showCoordinates = true;
let hightlightedSquare = "a1";

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

$("#identifyModeInput").keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    checkInputCoordinates();
  }
});

$("#identifyMode").click(identifyMode);

function identifyMode() {
  $("#identifyWrong").hide();
  resetBoard();
  $(this).prop("disabled", true);
  $("#selectMode").prop("disabled", false);
  $("#identifyModeInput").show();
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
  $(this).prop("disabled", true);
  $("#identifyMode").prop("disabled", false);
  $("#identifyModeInput").hide();
});

function resetBoard() {
  clearBoard();
  drawBoard();
  if (showCoordinates) {
    drawCoordinates(whiteOrientation);
  }
}
