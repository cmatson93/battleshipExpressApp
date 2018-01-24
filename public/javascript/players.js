console.log("Reading chat.js");
//Make connection:
var socket = io.connect("http://localhost:3000");

var players = [];

// Query connection
$("#submitName").on("click", function(event) {
    // console.log("CLICKED");
    // console.log($("#handle").val().trim());
    var player = $("#handle").val().trim();
    // console.log(players.length);
    if (players.length === 0) {
        // console.log("EMITING");
        socket.emit("player", {
            player1: player
        })
    }
    if (players.length > 0) {
        // console.log("EMMITING PLAYER 2");
        socket.emit("player", {
            player2: player
        })
    }
})

// Listen for events
socket.on('player', function(data) {
    // console.log(data);
    if (players.length === 0) {
        // console.log("PUSH 1")
        players.push(data.player1)
        $("#output1").text(data.player1);

    }
    if (data.player2) {
        // console.log("PUSH 2");
        players.push(data.player2);
        $("#output2").text(data.player2);
    }
    // console.log(players);
});