class BattleGame {
    constructor(p1, p2) {
        this._players = [p1, p2]
        this._turns = [null, null];
        this._shipObj = [null, null];
        this._hits = [
            [],
            []
        ];
        this._misses = [
            [null],
            [null]
        ];

        this._sendToPlayers("Battleship game starts please submit your name if you haven't already!");

        this._players.forEach((player, idx) => {
            player.on('shipPlacement', (shipObj) => {
                console.log("ship place");
                this._shipPlacement(idx, shipObj)
            })
        })

        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this._onTurn(idx, turn)
            })
        })
    };

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit("message", msg);
    }

    _sendToPlayers(msg) {
        console.log("Constructor");
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    };

    _shipPlacement(playerIndex, shipObj) {
        this._shipObj[playerIndex] = shipObj;
        console.log(this._shipObj);

        //Send some kind of message that tells it's time to fire. 
        if (this._shipObj[0] && this._shipObj[1]) {
            console.log("FULL");
            this._players.forEach((player) => {
                player.emit("gamePlay", "Boards are ready time to FIRE!");
            })
        }
    };

    _onTurn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._sendToPlayer(playerIndex, `You selected position ${turn}`)
        var hits = this._hits[playerIndex];
        var misses = this._misses[playerIndex];
        console.log("TURN");
        console.log(this._hits);
        console.log(this._hits[playerIndex]);
        if (playerIndex === 0) {
            var opponentIndex = 1;
            // console.log("------------------");
            // console.log(this._shipObj[opponentIndex]);
            var opponentObj = this._shipObj[opponentIndex];
            for (var key in opponentObj) {
                // console.log(key);
                // console.log(opponentObj[key]);
                var obj = opponentObj[key];
                for (var prop in obj) {
                    // console.log(prop);
                    // console.log(obj[prop]);
                    var positions = obj[prop];
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i] === turn) {
                            hits.push(turn);
                            this._players.forEach((player) => {
                                player.emit("result", "hit");
                            })
                        } else {
                            // misses.push(turn);
                            // this._players.forEach((player) => {
                            //     player.emit("result", "miss");
                            // })
                        }
                    }
                }
            }
        } else {
            var opponentIndex = 0;
            // console.log("------------------");
            // console.log(this._shipObj[opponentIndex]);
            var opponentObj = this._shipObj[opponentIndex];
            for (var key in opponentObj) {
                // console.log(key);
                // console.log(opponentObj[key]);
                var obj = opponentObj[key];
                for (var prop in obj) {
                    // console.log(prop);
                    // console.log(obj[prop]);
                    var positions = obj[prop];
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i] === turn) {
                            hits.push(turn);
                            this._players.forEach((player) => {
                                    player.emit("result", "hit");
                                })
                                //Use this._sendToPlayer to send result message
                        } else {
                            // misses.push(turn);
                            // this._players.forEach((player) => {
                            //     player.emit("result", "miss");
                            // })
                        }
                    }
                }
            }
        }
    };

    _checkGameOver() {
        const turns = this._turns;

        if (turns[0] && turns[1]) {
            this._sendToPlayers("Game Over" + turns.join(' : '));
            this._turns = [null, null];
            this._sendToPlayers("Next Round!!!");
        }
    }

    _getGameResult() {
        switch (this._turns[0]) {
            case rock:

                break;

            case 's':
                break;
        }
    }

}

module.exports = BattleGame;