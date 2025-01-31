class GameModel {
    gameSize;
    currentTurn;
    currentBettor;
    lastBet;
    gameArray;
    ante;
    winnerBeingChosen
    betsThisRound = [];
    roundIdle = true;
    currentRound = 0;
    roundTransition = false;
    pFoldedArr = [];
    totalBuyIns = [];
    setRoundReadyFunc;
    roundTransitionSetter;
    totalRounds = 0;

    constructor(gameSize, currentTurn, lastBet, gameArray, ante, setRoundReadyFunc, roundTransitionSetter) {
        this.gameSize = gameSize;
        this.currentTurn = currentTurn;
        this.lastBet = lastBet;
        this.gameArray = gameArray;
        this.ante = ante;
        this.setRoundReadyFunc = setRoundReadyFunc;
        this.roundTransitionSetter = roundTransitionSetter;
    }

    initRound(setTurnCB, gameObj) {
        if (this.gameSize == 2) {
            this.gameArray = [2];
        } else if (this.gameSize == 3) {
            this.gameArray = [2, 3];
        } else if (this.gameSize == 4) {
            this.gameArray = [2, 3, 4];
        } else if (this.gameSize == 5) {
            this.gameArray = [2, 3, 4, 5];
        } else if (this.gameSize == 6) {
            this.gameArray = [2, 3, 4, 5, 6];
        } else if (this.gameSize == 7) {
            this.gameArray = [2, 3, 4, 5, 6, 7];
        } else if (this.gameSize == 8) {
            this.gameArray = [2, 3, 4, 5, 6, 7, 8];
        } else if (this.gameSize == 9) {
            this.gameArray = [2, 3, 4, 5, 6, 7, 8, 9];
        }

        // this.checkForPlayersOut(gameObj);

        this.currentTurn = this.gameArray[0];

        setTurnCB(this.currentTurn);

        this.roundIdle = false;
    }

    setNextTurn(lastTurn, action) {
        
        // if (action == 'bet' || action == 'split') {
        //     // this.currentTurn = this.gameArray[0];
        //     this.currentTurn = lastTurn;
        // } else {
        //     for (let i = 0; i < this.gameArray.length; i++) {
        //         if (this.gameArray[i] == lastTurn) {
        //             if (!this.roundTransition) {
        //                 if (!this.roundIdle) {
        //                     if (this.gameArray[i + 1]) {
        //                         this.currentTurn = this.gameArray[i + 1];
        //                     } else {
                                
        //                         if (this.gameArray.includes(this.gameArray[0]) && !this.pFoldedArr.includes(this.gameArray[0])) {
        //                             this.currentTurn = this.gameArray[0];
        //                         } else {
        //                             for (let j = 1; j < this.gameArray.length; j++) {
        //                                 if (this.gameArray.includes(this.gameArray[j]) && !this.pFoldedArr.includes(this.gameArray[j])) {
        //                                     this.currentTurn = this.gameArray[j];
        //                                     j = this.gameArray.length;
        //                                 }
        //                             }
        //                         }
        //                         this.changeRound(this.currentRound);
        //                     }
        //                 }
        //             }                
        //         } 
        //     }
        // }

        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] == lastTurn) {
                if (!this.roundTransition) {
                    if (!this.roundIdle) {
                        if (action === 'bet' || action === 'split') {
                            this.currentTurn = this.gameArray[i];
                        } else {
                            if (this.gameArray[i + 1]) {
                                this.currentTurn = this.gameArray[i + 1];
                            } else {
                                
                                if (this.gameArray.includes(this.gameArray[0]) && !this.pFoldedArr.includes(this.gameArray[0])) {
                                    this.currentTurn = this.gameArray[0];
                                } else {
                                    for (let j = 1; j < this.gameArray.length; j++) {
                                        if (this.gameArray.includes(this.gameArray[j]) && !this.pFoldedArr.includes(this.gameArray[j])) {
                                            this.currentTurn = this.gameArray[j];
                                            j = this.gameArray.length;
                                        }
                                    }
                                }
                                this.changeRound(this.currentRound);
                            }
                        }
                    }
                }                
            } 
        }

    }

    setInfoGameStart(arg2) {
        this.ante = Number(arg2);
        this.gameStarted = true;
    }

    handleBets(lastTurn, lastBet, setTurnFunc, displayPlayerPots, displayPlayerPotsFunc) {
        // let holder = this.betsThisRound[lastTurn] === null ? 0 : this.betsThisRound[lastTurn];
        this.betsThisRound = displayPlayerPots;
        let holder = this.betsThisRound[lastTurn - 2];
        holder += Number(lastBet);
        this.betsThisRound[lastTurn - 2] = holder;

        this.setNextTurn(lastTurn, 'bet');
        setTurnFunc(this.currentTurn);

        displayPlayerPotsFunc(this.betsThisRound);
    }

    handleFold(lastTurn, setTurnFunc) {
        this.addPlayer2FoldedArr(lastTurn);
        this.setNextTurn(lastTurn);
        setTurnFunc(this.currentTurn);
        this.removePlayerOnFold(lastTurn);
        this.checkForRoundOver();
    }

    handleCheck(lastTurn, setTurnFunc) {
        this.setNextTurn(lastTurn, 'check');
        setTurnFunc(this.currentTurn);
    }

    roundIsIdle() {
        this.currentTurn = 0;
        this.roundIdle = true;
    }

    changeRound(r) {
        if (r === 0) {
            this.roundTransition = true;

        } else if (r === 1) {
            this.roundIdle = true;
            this.setRoundReadyFunc(true);
            this.roundTransitionSetter(true);
        }

        setTimeout(() => {
            this.roundTransition = false;
        }, 10)
    }

    addPlayer2FoldedArr(turn) {
        this.pFoldedArr.push(turn);
    }

    removePlayerOnFold(turn) {
        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] == turn) {
                this.gameArray.splice(i, 1);
                this.holderGameArr.splice(i, 1);
            }
        }
    }

    handleTotalyBuyIns(gModel) {
        this.totalBuyIns = gModel.playerDisplayChips;
    }

    handleAddOn(setResponseTextCB, setReadyResponseCB, obj, turn) {
        setResponseTextCB('Chips Have Been Added On!');
        setReadyResponseCB(true);
        // this.checkForPlayerOutReBuying(obj, turn)
    }

    handleGameSizeChange(gS) {
        this.gameSize = gS;
    }

    startNextRound(setPotsFunc) {
        this.totalRounds++;
        this.currentRound = 0;
        this.currentBettor = 0;
        this.pFoldedArr = [];
        this.betsThisRound = [];
        this.lastBet = 0;
        setPotsFunc([]);
    }

    initNextRound(setNextTurnCB, setDisplayPots, setRoundTransitionFunc, setWinnerChosenFunc, setSelectedWinnersFunc) {
        this.initRound(setNextTurnCB);
        this.startNextRound(setDisplayPots);
        setRoundTransitionFunc(false);
        setWinnerChosenFunc(false);
        setSelectedWinnersFunc('');
    }

    checkForPlayersOut(gameObj) {

        for (let i = 0; i < gameObj.playerDisplayChips.length; i++) {
            if (Number(gameObj.playerDisplayChips[i]) === 0) {
                this.gameArray.splice(i - 1, 1);
            }
        }

    }

    checkForRoundOver() {
        if (this.gameArray.length <= 1) {
            this.roundTransitionSetter(true);
        }
    }

    handleSplit(lastTurn, lastBet, setTurnFunc, displayPlayerPots, displayPlayerPotsFunc) {
        console.log(displayPlayerPots);

        this.betsThisRound = displayPlayerPots;

        let holder;

        if (this.betsThisRound[lastTurn - 2].length != undefined) {
            holder = this.betsThisRound[lastTurn - 2];
        } else {
            holder = [this.betsThisRound[lastTurn - 2]]
        }

        holder.push(lastBet);

        this.betsThisRound[lastTurn - 2] = holder;
        
        this.setNextTurn(lastTurn, 'split');
        setTurnFunc(this.currentTurn);

        console.log(this.betsThisRound);

        displayPlayerPotsFunc(this.betsThisRound);
    }

    handlePlayerLeaving(turn, setNextTurnCB) {

        if (this.gameStarted) {
            if (!this.winnerBeingChosen) {
                if (this.currentTurn == turn) {
                    this.handleFold(turn, setNextTurnCB);
                } else {
                    this.addPlayer2FoldedArr(turn);
                    this.removePlayerOnFold(turn);
                }   
            }
        } 
    }

}

export default GameModel;