// import { setInterval } from 'timers';

var express = require('express');
var socket = require('socket.io');

var BattleGame = require('./game.js');

var app = express();
var PORT = process.env.PORT || 3000;

// Starts the server to begin listening
// =============================================================
var server = app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

//Set up static files
app.use(express.static('public'));

//Socket Setup
var io = socket(server)

var waitingPlayer;

var player1Obj = {};
var player2Obj = {};

io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);

    if (waitingPlayer) {
        //Can start game
        // socket.emit('msg', 'Match Starts');
        // waitingPlayer.emit('msg', 'Match Starts');
        new BattleGame(waitingPlayer, socket);
        waitingPlayer = null;
    } else {
        waitingPlayer = socket;
        // socket.emit('msg', "Waiting for another player to join.");
        waitingPlayer.emit('message', "Waiting for another player")

    }

    //Handle player input 
    socket.on('player', function(data) {
        // player1Obj.push(data);
        // consoloe.log(player1Obj);
        io.sockets.emit('player', data);
    })

    //Handle ship placement 
    socket.on('shipObj', function(data) {
        io.sockets.emit('shipObj', data);
    })
})

// setInterval(function() {
//     for (var i in socketList) {
//         var socket = socketList[i];
//         socket.emit('New Postiion', {
//             id: socketList[i];
//         })

//     }
// }, 1000 / 25)