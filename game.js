class BattleGame {
    constructor(p1, p2) {
        this._players = [p1, p2]
        this.turns = [null, null];
        this._sendToPlayers('Battleship game starts!');

        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this.onTurn(idx, turn)
            })
        })
    };

    sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit("message", msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    };

    onTurn(playerIndex, turn) {
        this.turns[playerIndex] = turn;
        this._sendToPlayers(playerIndex, `You selected ${turn}`)
    }

}

module.exports = BattleGame;