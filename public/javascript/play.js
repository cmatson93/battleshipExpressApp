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



//Make Table 
var table1 = $('#tb1');
var row, cell;
var gameBoard = 8;

for (var i = 1; i < gameBoard; i++) {
    row = $('<tr />');
    table1.append(row);
    for (var j = 1; j < gameBoard; j++) {
        var cordinate = j.toString() + i.toString();
        cell = $('<td id=' + cordinate + '>' + cordinate + '</td>');
        row.append(cell);
    }
}

//Make Table 2
var table2 = $('#tb2');

for (var i = 1; i < gameBoard; i++) {
    row = $('<tr />');
    table2.append(row);
    for (var j = 1; j < gameBoard; j++) {
        var cordinate = j.toString() + i.toString();
        cell = $('<td id=' + cordinate + '>' + cordinate + '</td>');
        row.append(cell);
    }
}


$("td").click(function() {
    // console.log("clicked")
    // console.log($(this).attr("value"));
    boat = ($(this).attr("value"));
    switch (boat) {
        case "2":
            console.log("HIT A 2");
            $(this).addClass("hit");
            totalHits += 1;
            destroyerHits += 1;
            if (destroyerHits === 2) {
                shipsSunk.push(" Destroyer");
                $("#ships-sunk").text(shipsSunk);
            }
            break;
        case "3":
            console.log("HIT A 3");
            $(this).addClass("hit");
            totalHits += 1;
            submarineHits += 1;
            if (submarineHits === 3) {
                shipsSunk.push(" Submarine");
                $("#ships-sunk").text(shipsSunk);
            }
            break;
        case "1":
            console.log("HIT A 1");
            $(this).addClass("hit");
            totalHits += 1;
            cruiserHits += 1;
            if (cruiserHits === 3) {
                shipsSunk.push(" Cruiser");
                $("#ships-sunk").text(shipsSunk);
            }
            break;
        case "4":
            console.log("HIT A 4");
            $(this).addClass("hit");
            totalHits += 1;
            battleshipHits += 1;
            if (battleshipHits === 4) {
                shipsSunk.push(" Battleship");
                $("#ships-sunk").text(shipsSunk);
            }
            break;
        case "5":
            console.log("HIT A 5");
            $(this).addClass("hit");
            totalHits += 1;
            carrierHits += 1;
            if (carrierHits === 5) {
                shipsSunk.push(" Carrier");
                $("#ships-sunk").text(shipsSunk);
            }
            break;
        case "0":
            console.log("MISS");
            $(this).addClass("miss");
            missesLeft -= 1;
            console.log(missesLeft);
            $("#hits-left").text(missesLeft);
            break;
    }
    if (shipsSunk.length === 5) {
        console.log("YOU WIN");
        gameOver = true;
        $("td").off("click");
    }
    if (missesLeft === 0) {
        console.log("You loose...");
        $("#hits-left").text("Sorry You Loose...");
        gameOver = true;
        $("td").off("click");
    }
})