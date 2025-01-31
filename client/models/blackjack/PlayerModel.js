class Player {
    displayName;
    chips; 
    turn;
    betAmount;
    roomId;
    socket;
    setterChips;
    setterBetAmount;
    totalBetThisRound; 
    currentGameTurn;
    currentGameRound;
    minBet;
    roundSetter;
    lastActionAmount = 0;

    constructor(displayName, chips, turn, betAmount, roomId, socket) {
        this.displayName = displayName;
        this.chips = chips;
        this.turn = turn;
        this.betAmount = betAmount;
        this.roomId = roomId;
        this.socket = socket;
    }

    setInfoOnPlayerDisplaySubmit(turn, setPlayerPositionSelected) {
        this.turn = turn;
        setPlayerPositionSelected(true);
    }

    setInGameTurn(arg) {
        this.turn = arg;
    }

    setPlayerViewInfo(cb1, cb2, cb3) {
        this.setterChips = cb1;
        this.setterBetAmount = cb2;
        this.roundSetter = cb3;
    }

    bets(total) {
        if (this.currentGameTurn == this.turn) {
            this.lastActionAmount = Number(total);
            this.chips -= Number(total);
            this.socket.emit('inGameEvent2', this.turn, Number(total), this.chips, false);
        }
    }

    calls() {
        if (this.currentGameTurn == this.turn) {
            this.lastActionAmount = Number(this.minBet);
            this.chips -= Number(this.minBet);
            this.socket.emit('inGameEvent3', this.turn, Number(this.minBet), this.chips);
        }
    }

    folds() {
        if (this.currentGameTurn == this.turn) {
            this.socket.emit('inGameEvent4', this.turn);
        }
    }

    splits() {
        if (this.currentGameTurn == this.turn) {
            this.chips -= this.lastActionAmount;
            this.socket.emit('inGameEvent8_BJ', this.turn, this.lastActionAmount, this.chips);
        }
    }

    setInGameInfo(gameModel) {
        this.minBet = gameModel.ante;
        this.currentGameTurn = gameModel.currentTurn;
        this.currentGameRound = gameModel.currentRound;

        this.roundSetter(gameModel.currentRound);
    }

    setBetting(unit) {
        if (this.betAmount > 0) {
            if (unit === '2x') {
                this.betAmount = this.betAmount * 2;
            } else if (unit === '3x') {
                this.betAmount = this.betAmount * 3;
            } else if (unit === 'ALL-IN') {
                this.betAmount = this.chips;
            }
        } else {
            if (unit === '2x') {
                this.betAmount = this.minBet * 2;
            } else if (unit === '3x') {
                this.betAmount = this.minBet * 3;
            } else if (unit === 'ALL-IN') {
                this.betAmount = this.chips;
            }
        }
        this.setterBetAmount(this.betAmount);
    }

    displayCall() {
        this.setterChips(this.chips)
    }

    displayBet() {
        this.setterChips(this.chips)
        this.betAmount = 0
        this.setterBetAmount(this.betAmount);
    }

    finished() {
        if (this.currentGameTurn == this.turn) {
            this.lastActionAmount = 0;
            this.socket.emit('inGameEvent1', this.turn);
        }
    }

    addsOn(amount, board) {
        this.chips = +this.chips + +amount;
        board.dismiss();
        this.socket.emit('inGameMenuEvent1', this.turn, amount, this.chips);
    }

    displayLastAction() {
        this.setterChips(this.chips);
    }

    plusBetSetting() {
        if (this.betAmount < this.chips) {
            this.betAmount += this.currentGameAnte;
            this.setterBetAmount(this.betAmount);
        }
    }   

    minusBetSetting() {
        if (this.betAmount > 0) {
            this.betAmount -= this.currentGameAnte;
            this.setterBetAmount(this.betAmount);
        }
    }

    confirmsAction(total) {
        if (this.currentGameTurn == this.turn) {
            this.lastActionAmount = Number(total);
            this.chips -= Number(total);
            this.socket.emit('testInGameEvent2', total, total, this.chips, this.turn, false);
        }
    }

}

export default Player