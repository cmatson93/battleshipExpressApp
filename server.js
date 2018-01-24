var express = require('express');
var socket = require('socket.io');

var app = express();
var PORT = process.env.PORT || 3000;

// Starts the server to begin listening
// =============================================================
var server = app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.use(express.static('public'));

//Socket Setup
var io = socket(server)

io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);

    //Handle player input 
    socket.on('player', function(data) {
        io.sockets.emit('player', data);
    })
})