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
            // console.log("location", $(this).attr("id"));
            var location = ($(this).attr("id"));
            // console.log("-------");
            // console.log(ship)
            var shipId = "#" + ship;
            // console.log(shipId);
            // console.log("--------");
            $(shipId).removeClass('selected');
            $(shipId).addClass('placed');
            shipPlacement(ship, shipLength, dir, location);
        }
    })
    $(".dir-btn").click(function() {
        // console.log($(this).attr("value"));
        dir = ($(this).attr("value"));
    })
})

function shipPlacement(ship, lng, dir, loc) {
    // console.log("length", lng);
    // console.log("dirrection", dir);
    // console.log("location", loc);
    // console.log("ship", ship)
    // console.log("+++++++");
    var xy = loc.split("");
    var x = parseInt(xy[0]);
    var y = parseInt(xy[1]);
    // console.log("x", x, "y", y);
    var placement = [];
    placement.push(loc);

    if (dir === "true") {
        // console.log("horizontal");
        for (let i = 1; i < lng; i++) {
            // console.log(i);
            var shipPlace = x + i;
            shipPlace = shipPlace.toString() + y;
            // console.log("ship places", shipPlace);
            placement.push(shipPlace);
            // console.log("new placement", placement);
        }
    } else if (dir === "false") {
        for (let i = 1; i < lng; i++) {
            var shipPlace = y + i;
            shipPlace = x + shipPlace.toString();
            // console.log("ship places", shipPlace);
            placement.push(shipPlace);
            // console.log("new placement", placement);
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

// If Ship has been placed change word background color to red;
function changeShipColor(ship) {
    console.log("SHIP FUNCTION");
    console.log(ship);
    console.log(typeof(ship));
    if ($(".ship").attr("value") === ship) {
        console.log("Worked");

    }
}