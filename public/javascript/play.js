//Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).
var destroyer = 0;
var submarine = 1;
var cruiser = 2;
var battleship = 3;
var carrier = 4;

var destroyerLength = 2;
var submarineLength = 3;
var cruiserLength = 3;
var battleshipLength = 4;
var carrierLength = 5;

var winHits = 21;
var totalHits = 0;
var missesLeft = 12;

gameOver = false;


// var gameBoard = [
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1)],
// ]]

//Ship Life: 
var destroyerHits = 0;
var submarineHits = 0;
var cruiserHits = 0;
var battleshipHits = 0;
var carrierHits = 0;

var shipsSunk = [];