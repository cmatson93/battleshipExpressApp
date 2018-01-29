class BattleGame {
    constructor(p1, p2) {
        this._players = [p1, p2]
        this._turns = [
            [],
            []
        ];
        this._shipObj = [null, null];
        this._hits = [
            [],
            []
        ];
        this._misses = [
            [],
            []
        ];

        this._sendToPlayers("Battleship game starts please submit your name if you haven't already!");

        this._players.forEach((player, idx) => {
            player.on('shipPlacement', (shipObj) => {
                console.log("ship place");
                this._shipPlacement(idx, shipObj)
            })
            player.on('turn', (turn) => {
                this._checkIfGuessed(idx, turn)
            })
        })
    };

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit("message", msg);
    }

    _sendToPlayers(msg) {
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

    _checkIfGuessed(playerIndex, turn) {
        console.log("CHECKING");
        console.log(this._turns[playerIndex].length)
        if (this._turns[playerIndex].length === 0) {
            this._onTurn(playerIndex, turn);
        } else {
            for (var i = 0; i < this._turns[playerIndex].length; i++) {
                console.log(this._turns[playerIndex]);
                console.log(this._turns[playerIndex][i]);
                console.log(turn);
                console.log("======");
                if (this._turns[playerIndex][i] === turn) {
                    console.log("ALREADY Guessed");
                    this._players[playerIndex].emit("result", "already-guessed");
                } else {
                    console.log("HAVENT GUESSED");
                    this._onTurn(playerIndex, turn);
                    break;
                }
            }
        }
    }

    _onTurn(playerIndex, turn) {
        console.log("-ONTURN");
        this._turns[playerIndex].push(turn);
        this._sendToPlayer(playerIndex, `You selected position ${turn}`)
        var hits = this._hits[playerIndex];
        var misses = this._misses[playerIndex];
        var misscount = 0;
        //If statements to check player 
        if (playerIndex === 0) {
            var opponentIndex = 1;
            var opponentObj = this._shipObj[opponentIndex];
            for (var key in opponentObj) {
                var obj = opponentObj[key];
                for (var prop in obj) {
                    var positions = obj[prop];
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i] === turn) {
                            hits.push(turn);
                            var results1 = ["hit", turn];
                            var results2 = ["attacked", turn];
                            this._players[playerIndex].emit("result", results1);
                            this._players[opponentIndex].emit("result", results2);
                            this._checkGameOver();
                        } else {
                            misscount++;
                            console.log(misscount)
                            if (misscount === 17) {
                                console.log("NOTHING THERE");
                                misses.push(turn);
                                var results1 = ["miss", turn];
                                var results2 = ["opponent-missed", turn];
                                this._players[playerIndex].emit("result", results1);
                                this._players[opponentIndex].emit("result", results2);
                            }
                        }
                    }
                }
            }
        } else {
            var opponentIndex = 0;
            var opponentObj = this._shipObj[opponentIndex];
            for (var key in opponentObj) {
                var obj = opponentObj[key];
                for (var prop in obj) {
                    var positions = obj[prop];
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i] === turn) {
                            hits.push(turn);
                            var results1 = ["hit", turn];
                            var results2 = ["attacked", turn];
                            this._players[playerIndex].emit("result", results1);
                            this._players[opponentIndex].emit("result", results2);
                            this._checkGameOver();
                        } else {
                            misscount++;
                            console.log(misscount)
                            if (misscount === 17) {
                                console.log("NOTHING THERE");
                                misses.push(turn);
                                var results1 = ["miss", turn];
                                var results2 = ["opponent-missed", turn];
                                this._players[playerIndex].emit("result", results1);
                                this._players[opponentIndex].emit("result", results2);
                            }
                        }
                    }
                }
            }
        }
    };

    _checkGameOver() {
        if (this._hits[0].length === 17 || this._hits[1].length === 17) {
            this._sendToPlayers("Game Over.");
            this._players[0].emit("gameOver");
            this._players[1].emit("gameOver");
        }
    }
}

module.exports = BattleGame;