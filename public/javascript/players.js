console.log("Reading chat.js");
//Make connection:
var socket = io.connect("http://localhost:3000");

var players = [];

var player1 = [];
var player2 = [];

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


//Highlight selected ship for ship placement.
$('h6').on("click", function() {
    $("h6").removeClass('selected');
    $(this).addClass('selected');
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
        $(id).addClass('placed');
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

// Listen for events
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
    }
    console.log(players);
});


function makeTable1() {
    //Make Table 
    var table1 = $('#tb1');
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
    //Make Table 2
    var table2 = $('#tb2');
    var row, cell;
    var gameBoard = 8;

    for (var i = 1; i < gameBoard; i++) {
        row = $('<tr />');
        table2.append(row);
        for (var j = 1; j < gameBoard; j++) {
            var cordinate = j.toString() + i.toString();
            cell = $('<td class="table2" id=' + cordinate + '>' + cordinate + '</td>');
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


socket.on('gamePlay', function(data) {
    onMessage(data);
    $(".table2").on("click", function(event) {
        var shot = $(this).attr("id");
        console.log(shot);
        socket.emit("turn", shot)
    })
})