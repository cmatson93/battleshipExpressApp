console.log("Reading chat.js");
//Make connection:
var socket = io.connect("https://quiet-sierra-43006.herokuapp.com/");
// var socket = io.connect("//localhost:3000/");

var players = [];

var hitCount = 0;
var hitsToWin = 17;
socket.on('message', onMessage);

function onMessage(text) {
    $("#message").text(text);
}

// Query connection to get players names
$("#submitName").on("click", function(event) {
    var player = $("#handle").val().trim();
    if (players.length === 0) {
        socket.emit("player", {
            player1: player
        })
    }
    if (players.length > 0) {
        socket.emit("player", {
            player2: player
        })
    }
    $(".form-row").remove();
})

//Player Ship Selection 
//Init some global variables. 
var shipLength;
//default direction=horizontal, have to click manually to chage
//horizontal = true vertical = false
var dir = "true";
var shipObj = {
    destroyer: [],
    submarine: [],
    cruiser: [],
    battleship: [],
    carrier: []
};

var shipSelected = false;
//Highlight selected ship for ship placement.
$('h6').on("click", function() {
    shipSelected = true;
    $("h6").removeClass('selected');
    $(this).addClass('selected');
    var length = $(this).attr("id");
    $(document).ready(function() {
        console.log(length);

        if (shipSelected === true) {
            $(".table1").hover(function() {
                $(this).css("background-color", "pink");
                var item = $(this).attr("id");
                var hoverArray = [];
                console.log(length);
                console.log("item", item);
                console.log(typeof(item));
                if (dir === "true") {
                    for (var i = 0; i < length; i++) {
                        hoverArray.push(parseInt(item) + 1);
                        console.log(hoverArray);
                    }
                }
            }, function() {
                if ($(this).text() === '-') {
                    $(this).css("background-color", "blue")
                } else {
                    $(this).css("background", "none");
                }
            });
        }
    });
});


var ship;
//Get info to place ship when user clicks on ship name. 
$(".ships").click(function() {
    ship = ($(this).attr("value"));
    switch (ship) {
        case "0":
            ship = 'destroyer';
            shipLength = 2;
            break;
        case "1":
            ship = 'submarine';
            shipLength = 3;
            break;
        case "2":
            ship = 'cruiser';
            shipLength = 3;
            break;
        case "3":
            ship = 'battleship';
            shipLength = 4;
            break;
        case "4":
            ship = 'carrier';
            shipLength = 5;
            break;
    }

    $("td").click(function() {
        if (shipObj[ship].length === 0) {
            var location = ($(this).attr("id"));
            var shipId = "#" + ship;
            $(shipId).removeClass('selected');
            $(shipId).addClass('placed');
            shipPlacement(ship, shipLength, dir, location);
        }
    })
    $(".dir-btn").click(function() {
        dir = ($(this).attr("value"));
    })
})

function shipPlacement(ship, lng, dir, loc) {
    var xy = loc.split("");
    var x = parseInt(xy[0]);
    var y = parseInt(xy[1]);
    var placement = [];
    placement.push(loc);

    if (dir === "true") {
        for (let i = 1; i < lng; i++) {
            var shipPlace = x + i;
            shipPlace = shipPlace.toString() + y;
            placement.push(shipPlace);
        }
    } else if (dir === "false") {
        for (let i = 1; i < lng; i++) {
            var shipPlace = y + i;
            shipPlace = x + shipPlace.toString();
            placement.push(shipPlace);
        }
    }
    for (let i = 0; i < placement.length; i++) {
        var id = "#" + placement[i];
        $(id).text("-");
        $(id).css('background-color', 'blue');
    }

    makeShipObj(placement, ship);
}

function makeShipObj(placement, ship) {
    switch (ship) {
        case "destroyer":
            shipObj.destroyer = { coordinates: placement, hits: [] };
            // console.log(shipObj);
            break;
        case "submarine":
            shipObj.submarine = { coordinates: placement, hits: [] };
            // console.log(shipObj);
            break;
        case "cruiser":
            shipObj.cruiser = { coordinates: placement, hits: [] };
            // console.log(shipObj);
            break;
        case "battleship":
            shipObj.battleship = { coordinates: placement, hits: [] };
            // console.log(shipObj);
            break;
        case "carrier":
            shipObj.carrier = { coordinates: placement, hits: [] };
            // console.log(shipObj);
            break;
    }
}

// Displaying Players names on Scoreboard:
socket.on('player', function(data) {
    if (players.length === 0) {
        players.push(data.player1)
        $("#output1").text(data.player1);

    }
    if (data.player2) {
        players.push(data.player2);
        $("#output2").text(data.player2);
        makeTable1();
        makeTable2();
        onMessage("Place your ships on your board.");
    }
    console.log(players);
});


function makeTable1() {
    //Make Table 
    var table1 = $('#tb1');
    //Give table a header: 
    $(".header1").append("<h2 class=table1-header>Your Board</h2>");
    var row, cell;
    var gameBoard = 8;

    for (var i = 1; i < gameBoard; i++) {
        row = $('<tr />');
        table1.append(row);
        for (var j = 1; j < gameBoard; j++) {
            var cordinate = j.toString() + i.toString();
            cell = $('<td class="table1" id=' + cordinate + '>' + cordinate + '</td>');
            row.append(cell);
        }
    }

}

function makeTable2() {
    //Give table a header 
    $(".moves").removeClass("hidden-moves");
    $(".header2").append("<h2 class=table2-header>Opponents Board</h2>");
    //Make Table 2
    var table2 = $('#tb2');
    var row, cell;
    var gameBoard = 8;

    for (var i = 1; i < gameBoard; i++) {
        row = $('<tr />');
        table2.append(row);
        for (var j = 1; j < gameBoard; j++) {
            var cordinate = j.toString() + i.toString();
            cell = $('<td class="table2" id=' + cordinate + '-2>' + cordinate + '</td>');
            row.append(cell);
        }
    }
}

var shipobjLength = 0;
//Once Ships are all placed send object to server:
$(".submit-btn").on('click', function(event) {
    console.log(shipObj);
    console.log(shipObj.destroyer.coordinates.length);
    if (shipObj.destroyer.coordinates.length > 0) {
        if (shipObj.battleship.coordinates.length > 0) {
            if (shipObj.carrier.coordinates.length > 0) {
                if (shipObj.cruiser.coordinates.length > 0) {
                    if (shipObj.submarine.coordinates.length > 0) {
                        console.log("SHIP OBJ IS FULL");
                        shipobjLength += 1;
                        socket.emit("shipPlacement", shipObj)
                        $(".moves").remove();
                    }
                }
            }
        }
    }
})

var shot;
var shotSplit;
var myturn = true;
socket.on('gamePlay', function(data) {
    onMessage(data);
    $(".table2").on("click", fire);
})

function fire() {
    if (myturn) {
        console.log($(this).text());
        var value = $(this).text();
        if ($(this).text() === "*") {
            onMessage("Already guessed this one try agian.");
        } else {
            ($(this).text("*"));
            shotSplit = $(this).attr("id").split("-");
            console.log(shotSplit);
            shot = shotSplit[0];
            console.log(shot);
            socket.emit("turn", shot)
            myturn = false;
        }
    }
}

socket.on("result", function(data) {
    console.log("data", data);
    if (data[0] === "hit") {
        onMessage("You hit one! Try again. ");
        console.log(shot);
        var td = "#" + shot + "-2";
        $(td).addClass("hit");
        myturn = true;
    } else if (data[0] === "attacked") {
        onMessage("Your ship has been hit! Your opponent gets another try.");
        myturn = false;
        console.log("---------");
        console.log(data[1]);
        var td = "#" + data[1];
        console.log(td);
        $(td).removeClass("placed");
        $(td).addClass("hit");
    } else if (data[0] === "miss") {
        onMessage("You missed. ");
        var td = "#" + shot + "-2";
        $(td).addClass("miss");
        myturn = false;
    } else if (data[0] === "opponent-missed") {
        onMessage("Your opponent missed. Your turn");
        myturn = true;
        var td = "#" + data[1];
        $(td).addClass("miss");
    } else if (data === "already-guessed") {
        onMessage("You already guessed that one. Try again.");
        myturn = true;
    }
})

socket.on("gameOver", function() {
    $(".gameboards").remove();
})