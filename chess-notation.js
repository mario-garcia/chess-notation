let whiteOrientation = true;

drawBoard();
drawCoordinates(whiteOrientation);

$("#flipBoard").click(function() {
  whiteOrientation = !whiteOrientation;
  clearBoard();
  drawBoard();
  drawCoordinates(whiteOrientation);
});

$("#identifyMode").click(function() {
  console.log("identify mode");
  let coordinate = highlightRandomSquare(whiteOrientation);
  console.log(coordinate);
});

$("#selectMode").click(function() {
  console.log("select mode");
});
