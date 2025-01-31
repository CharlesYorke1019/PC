class GameModel {
    gameSize;
    currentTurn;
    currentRound;
    currentBettor;
    lastBet;
    gameArray;
    bigBlind;
    smallBlind;
    pot;
    ante;
    currentRoundName;
    pFoldedArr;
    roundSetter;
    roundTransitionSetter;
    pDisplayNames;
    pDisplayChips;
    roundTransition = false;
    gameStyle;
    gameTime = 0;
    active = true;
    gameStarted;
    // anyPlayersAllIn = false;
    totalBuyIns = [];
    initBorderSelectSetter;
    sidePotActive = false;
    sidePots = [];
    currentSidePot = -1;
    totalRounds = 0;
    firstTurn = 0;
    winnerBeingChosen = false;
    tourneyPlayersOut = [];
    cashPlayersOut = [];
    playersAllIn = [];
    holderGameArr = [];
    newRound = false;
    playerStraddled = false;
    playerStraddling = 0;
    straddleTotal = 0;
    allInBet = 0;
    roundPlayerAllInArr = [];

    constructor(gameSize, currentTurn, currentRound, currentBettor, lastBet, gameArray, bigBlind, smallBlind, pot, ante, pFoldedArr, roundSetter, roundTransitionSetter, pDisplayNames, pDisplayChips, gameStyle, initBorderSelectSetter) {
        this.gameSize = gameSize
        this.currentTurn = currentTurn;
        this.currentRound = currentRound;
        this.currentBettor = currentBettor;
        this.lastBet = lastBet;
        this.gameArray = gameArray;
        this.bigBlind = bigBlind;
        this.smallBlind = smallBlind;
        this.pot = pot;
        this.ante = ante
        this.currentRoundName = 'Pre-Flop';
        this.pFoldedArr = pFoldedArr
        this.roundSetter = roundSetter;
        this.roundTransitionSetter = roundTransitionSetter;
        this.pDisplayNames = pDisplayNames;
        this.pDisplayChips = pDisplayChips;
        this.gameStyle = gameStyle;
        this.initBorderSelectSetter = initBorderSelectSetter;
    }

    initRound(setTurnCB, setPotCB, setRoundCB, obj) {
        if (this.gameSize == 2) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 1];
                this.holderGameArr = [2, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [1, 2];
                this.holderGameArr = [1, 2];
            }
        } else if (this.gameSize == 3) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 1];
                this.holderGameArr = [2, 3, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 1, 2];
                this.holderGameArr = [3, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [1, 2, 3];
                this.holderGameArr = [1, 2, 3];
            }
        } else if (this.gameSize == 4) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 1];
                this.holderGameArr = [2, 3, 4, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 1, 2];
                this.holderGameArr = [3, 4, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 1, 2, 3];
                this.holderGameArr = [4, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [1, 2, 3, 4];
                this.holderGameArr = [1, 2, 3, 4];
            }
        } else if (this.gameSize == 5) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 1];
                this.holderGameArr = [2, 3, 4, 5, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 1, 2];
                this.holderGameArr = [3, 4, 5, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 1, 2, 3];
                this.holderGameArr = [4, 5, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 1, 2, 3, 4];
                this.holderGameArr = [5, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [1, 2, 3, 4, 5];
                this.holderGameArr = [1, 2, 3, 4, 5];
            }
        } else if (this.gameSize == 6) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 1];
                this.holderGameArr = [2, 3, 4, 5, 6, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 1, 2];
                this.holderGameArr = [3, 4, 5, 6, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 1, 2, 3];
                this.holderGameArr = [4, 5, 6, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 1, 2, 3, 4];
                this.holderGameArr = [5, 6, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 1, 2, 3, 4, 5];
                this.gameArra2 = [6, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [1, 2, 3, 4, 5, 6];
                this.holderGameArr = [1, 2, 3, 4, 5, 6];
            }
        } else if (this.gameSize == 7) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 1];
                this.holderGameArr = [2, 3, 4, 5, 6, 7, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 1, 2];
                this.holderGameArr = [3, 4, 5, 6, 7, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 1, 2, 3];
                this.holderGameArr = [4, 5, 6, 7, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 1, 2, 3, 4];
                this.holderGameArr = [5, 6, 7, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 1, 2, 3, 4, 5];
                this.holderGameArr = [6, 7, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 1, 2, 3, 4, 5, 6];
                this.holderGameArr = [7, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7];
                this.holderGameArr = [1, 2, 3, 4, 5, 6, 7];
            }
        } else if (this.gameSize == 8) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 8, 1];
                this.holderGameArr = [2, 3, 4, 5, 6, 7, 8, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 8, 1, 2];
                this.holderGameArr = [3, 4, 5, 6, 7, 8, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 8, 1, 2, 3];
                this.holderGameArr = [4, 5, 6, 7, 8, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 8, 1, 2, 3, 4];
                this.holderGameArr = [5, 6, 7, 8, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 8, 1, 2, 3, 4, 5];
                this.holderGameArr = [6, 7, 8, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 8, 1, 2, 3, 4, 5, 6];
                this.holderGameArr = [7, 8, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [8, 1, 2, 3, 4, 5, 6, 7];
                this.holderGameArr = [8, 1, 2, 3, 4, 5, 6, 7];
            } else if (this.bigBlind === 8) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7, 8];
                this.holderGameArr = [1, 2, 3, 4, 5, 6, 7, 8];
            }
        } else if (this.gameSize == 9) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 8, 9, 1];
                this.holderGameArr = [2, 3, 4, 5, 6, 7, 8, 9, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 8, 9, 1, 2];
                this.holderGameArr = [3, 4, 5, 6, 7, 8, 9, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 8, 9, 1, 2, 3];
                this.holderGameArr = [4, 5, 6, 7, 8, 9, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 8, 9, 1, 2, 3, 4];
                this.holderGameArr = [5, 6, 7, 8, 9, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 8, 9, 1, 2, 3, 4, 5];
                this.holderGameArr = [6, 7, 8, 9, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 8, 9, 1, 2, 3, 4, 5, 6];
                this.holderGameArr = [7, 8, 9, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [8, 9, 1, 2, 3, 4, 5, 6, 7];
                this.holderGameArr = [8, 9, 1, 2, 3, 4, 5, 6, 7];
            } else if (this.bigBlind === 8) {
                this.gameArray = [9, 1, 2, 3, 4, 5, 6, 7, 8];
                this.holderGameArr = [9, 1, 2, 3, 4, 5, 6, 7, 8];
            } else if (this.bigBlind === 9) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                this.holderGameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        }

        if (this.gameStyle === 'Tournament') {
            if (this.totalRounds % 15 === 0) {
                this.ante = Number(this.ante) * +2;
            }
        }
        
        // should be utilized when testing with more than 1 device // 
        // this.confirmGameArr(obj);

        this.currentTurn = this.gameArray[0];
        this.firstTurn = this.gameArray[0];
        this.smallBlind = this.gameArray[this.gameArray.length - 2];
        this.pot += +Number(this.ante) + +(Number(this.ante) / 2);

        setTurnCB(this.currentTurn);
        setRoundCB(this.currentRoundName);
        setPotCB(this.pot);
    }

    setInfoGameStart(arg1, arg2) {
        this.bigBlind = arg1;
        this.ante = Number(arg2);
        this.gameStarted = true;
    }

    setNextTurn(lastTurn, action) {
        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] == lastTurn) {
                if (!this.roundTransition) {
                    if (action === 'call' || action === 'fold') {
                        if (this.gameArray[i + 1]) {
                            if (this.gameArray[i + 1] != this.currentBettor) {
                                this.currentTurn = this.gameArray[i + 1];
                            } else {

                                if (this.playerStraddled) {
                                    
                                    if (this.gameArray[i + 1] == this.playerStraddling) {

                                        this.currentTurn = this.gameArray[i + 1];
                                        this.resetGameArray();

                                    } else {
                                        
                                        this.currentTurn = this.gameArray[i + 1];

                                    }
                                
                                } else {

                                    if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                        this.currentTurn = this.smallBlind;
                                    } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                        this.currentTurn = this.bigBlind;
                                    } else {
                                        if (!this.pFoldedArr.includes(this.gameArray[0])) {
                                            this.currentTurn = this.gameArray[0];
                                        } 
                                    }
                                    this.changeRound(this.currentRound)

                                }
                            }

                        } else {
                            if (this.gameArray[0] != this.currentBettor) {
                                this.currentTurn = this.gameArray[0];
                            } else {
                                if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                    this.currentTurn = this.smallBlind;
                                } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                    this.currentTurn = this.bigBlind;
                                } else {
                                    if (!this.pFoldedArr.includes(this.gameArray[0])) {
                                        this.currentTurn = this.gameArray[0];
                                    } 
                                }
                                this.changeRound(this.currentRound)
                            }
                        }
                    }

                    if (action === 'bet') {
                        if (this.gameArray[i + 1]) {
                            this.currentTurn = this.gameArray[i + 1];
                        } else {
                            this.currentTurn = this.gameArray[0]
                        }
                    }

                    if (action === 'check') {
                        if (this.currentRound === 0) {
                            if (lastTurn == this.bigBlind || this.playerStraddled && lastTurn == this.playerStraddling) {
                                if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                    this.currentTurn = this.smallBlind;
                                } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                    this.currentTurn = this.bigBlind;
                                } else {
                                    this.currentTurn = this.playerStraddling;
                                }
                                this.changeRound(this.currentRound)
                            } 

                        } else {
                            if (!this.gameArray[i + 1]) {
                                if (lastTurn == this.smallBlind || lastTurn == this.bigBlind) {
                                    this.currentTurn = this.gameArray[0];
                                    if (this.gameSize == 2) {
                                        this.changeRound(this.currentRound);
                                    }
                                } else {
                                    this.currentTurn = this.gameArray[0];
                                    this.changeRound(this.currentRound);
                                }

                            } else {
                                if (this.gameArray[i + 1] != this.smallBlind || this.gameArray[i + 1] != this.bigBlind) {
                                    this.currentTurn = this.gameArray[i + 1];
                                } else {
                                    this.currentTurn = this.gameArray[i + 1];
                                    this.changeRound(this.currentRound);
                                }
                            }
                        }
                    }
                }
            } 
        }
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

    changeRound(r) {
        if (r === 0) {
            this.roundTransition = true;
            this.currentRoundName = 'Flop';
            this.roundSetter(this.currentRoundName);

            if (this.playerStraddled) {
                this.gameArray = this.holderGameArr;
                this.playerStraddled = false;
            };

        } else if (r === 1) {
            this.roundTransition = true;
            this.currentRoundName = 'Turn';
            this.roundSetter(this.currentRoundName);
        } else if (r === 2) {
            this.roundTransition = true;
            this.currentRoundName = 'River';
            this.roundSetter(this.currentRoundName);
        } else if (r === 3) {
            this.winnerBeingChosen = true;
            this.roundTransitionSetter(true);
            this.initBorderSelectSetter(true);
        }

        this.currentBettor = 0;
        this.lastBet = 0;
        this.currentRound = r + 1;
        this.newRound = true;

        setTimeout(() => {
            this.roundTransition = false;
        }, 10)
    }

    startNextRound(blindCB) {
        this.totalRounds++;
        this.pot = 0;
        this.currentRound = 0;
        this.currentRoundName = 'Pre-Flop'
        this.currentBettor = 0;
        this.lastBet = 0;
        let tIndex = 1;
        let cIndex = 1;

        // utilized when testing with more than 1 device //
        if (this.gameStyle === 'Tournament') {
            if (this.tourneyPlayersOut.includes(this.firstTurn)) {
                if (!this.tourneyPlayersOut.includes(this.holderGameArr[tIndex])) {
                    this.bigBlind = this.holderGameArr[tIndex];
                } else {
                    tIndex++;
                }
            } else {
                this.bigBlind = this.firstTurn;
            }
        } else {
            if (this.cashPlayersOut.includes(this.firstTurn)) {
                if (!this.cashPlayersOut.includes(this.holderGameArr[cIndex])) {
                    this.bigBlind = this.holderGameArr[cIndex];
                } else {
                    cIndex++;
                }
            } else {
                this.bigBlind = this.firstTurn;
            }
        }

        // only utilized when testing with 1 device //
        // this.bigBlind = this.gameArray[0];
        
        blindCB(this.bigBlind);
    }

    updateGameSize(arg) {
        this.gameSize = arg;
    }

    setPot(amount, cb, cb2, type) {
        if (!this.sidePotActive) {
            this.pot += +amount;
            cb(this.pot);
        } else {
            // let holder = this.sidePots[this.currentSidePot] === null ? this.sidePots[this.currentSidePot] : 0;
            let holder = this.sidePots[this.currentSidePot] === null ? 0 : this.sidePots[this.currentSidePot];

            if (this.currentRound == this.roundPlayerAllInArr[this.currentSidePot]) {
                holder += this.lastBet - this.allInBet;
                this.pot += +this.allInBet;
            } else {
                holder += +amount;
            }

            if (this.sidePots[this.currentSidePot]) {
                this.sidePots[this.currentSidePot] += holder;
            } else {
                this.sidePots[this.currentSidePot] = holder;
            }
            
            cb(this.pot);
            cb2(this.sidePots);
        }
    }

    setSidePotActive() {
        this.sidePotActive = true;
    }

    handleBet(bet, amount2, setPotF, lastTurn, setNextTurnF, obj, setSidePotActive, setTotalSidePots, setSidePots, straddle) {
        this.resetNewRound();
        this.lastBet = bet;
        this.currentBettor = lastTurn;
        this.checkForAllIn(obj, lastTurn, bet);
        this.checkForSidePot(bet, lastTurn, obj, setSidePotActive, setTotalSidePots, 'bet');
        this.setPot(amount2, setPotF, setSidePots, 'bet');
        this.setNextTurn(lastTurn, 'bet');
        setNextTurnF(this.currentTurn);
        this.checkForRemovePlayerOnAllIn(lastTurn);
        this.changeGameArrayStraddle(straddle, bet, lastTurn);
    }

    handleFold(lastTurn, setNextTurnF, setPotF) {
        this.resetNewRound();
        this.addPlayer2FoldedArr(lastTurn);
        this.setNextTurn(lastTurn, 'fold');
        setNextTurnF(this.currentTurn);
        setPotF(this.pot);
        this.removePlayerOnFold(lastTurn);
        this.checkForRoundOver();
    }

    handleCheck(lastTurn, setNextTurnF) {
        this.resetNewRound();
        this.setNextTurn(lastTurn, 'check');
        setNextTurnF(this.currentTurn);
    }

    handleCall(call, amount2, setPotF, lastTurn, setNextTurnF, obj, setSidePotActive, setTotalSidePots, setSidePots) {
        this.resetNewRound();
        this.checkForAllIn(obj, lastTurn);
        this.checkForSidePot(call, lastTurn, obj, setSidePotActive, setTotalSidePots, 'call')
        this.setPot(call, setPotF, setSidePots, 'call');
        this.setNextTurn(lastTurn, 'call');
        setNextTurnF(this.currentTurn);
        this.checkForRemovePlayerOnAllIn(lastTurn);
    }

    initNextRound(activeBbCB, setNextTurnCB, setPotCB, setRoundCB, obj) {
        this.checkForPlayersAtZero(obj);
        this.startNextRound(activeBbCB);
        this.initRound(setNextTurnCB, setPotCB, setRoundCB, obj);
    }

    handlePlayerLeaving(turn, setNextTurnCB, setPotCB) {

        if (this.gameStarted) {
            if (!this.winnerBeingChosen) {
                if (this.currentTurn == turn) {
                    this.handleFold(turn, setNextTurnCB, setPotCB);
                } else {
                    this.addPlayer2FoldedArr(turn);
                    this.removePlayerOnFold(turn);
                }   
            }
        } 
    }

    handleAddOn(setResponseTextCB, setReadyResponseCB, obj, turn) {
        setResponseTextCB('Chips Have Been Added On!');
        setReadyResponseCB(true);
        this.checkForPlayerOutReBuying(obj, turn)
    }

    handleGameSizeChange(rS) {
        this.gameSize = rS;
    }

    handleTotalyBuyIns(gModel) {
        this.totalBuyIns = gModel.playerDisplayChips;
    }

    checkForRoundOver() {
        if (this.gameArray.length <= 1) {
            this.roundTransitionSetter(true);
            this.initBorderSelectSetter(true);
        }
    }

    checkForAllIn(obj, arg1, bet) {
        if (obj.playerDisplayChips[arg1 - 1] == 0) {
            this.playersAllIn.push(arg1);
            this.allInBet = bet;
            this.roundPlayerAllInArr.push(this.currentRound);
        }
    }

    checkForRemovePlayerOnAllIn(turn) {
        if (this.playersAllIn.includes(turn)) {
            this.addPlayer2FoldedArr(turn);
            this.removePlayerOnFold(turn);
        }
    }

    checkForSidePot(amount, lastTurn, obj, setSidePotActive, setTotalSidePots, type) {
        if (this.gameSize > 2) {
            if (this.gameArray.length > 2) {
                if (this.playersAllIn.length >= 1 && this.currentSidePot < this.playersAllIn.length - 1) {
                    if (Number(obj.playerDisplayChips[lastTurn - 1]) > 0 && amount > this.allInBet) {                 
                        this.sidePotActive = true;
                        setSidePotActive(true);
                        this.currentSidePot++;
                        setTotalSidePots(this.currentSidePot + +1);
                    }
                }   
            }
        }
    }

    completeUpdate(obj) {
        this.active = obj.active;
        this.allInBet = obj.allInBet;
        this.ante = obj.ante;
        this.anyPlayersAllIn = obj.anyPlayersAllIn;
        this.bigBlind = obj.bigBlind;
        this.cashPlayersOut = obj.cashPlayersOut;
        this.currentBettor = obj.currentBettor;
        this.currentRound = obj.currentRound;
        this.currentRoundName = obj.currentRoundName;
        this.currentSidePot = obj.currentSidePot;
        this.currentTurn = obj.currentTurn;
        this.firstTurn = obj.firstTurn;
        this.gameArray = obj.gameArray;
        this.gameSize = obj.gameSize;
        this.gameStarted = obj.gameStarted;
        this.gameStyle = obj.gameStyle;
        this.gameTime = obj.gameTime;
        this.holderGameArr = obj.holderGameArr;
        this.lastBet = obj.lastBet;
        this.newRound = obj.newRound;
        this.pDisplayChips = obj.pDisplayChips;
        this.pDisplayNames = obj.pDisplayNames;
        this.pFoldedArr = obj.pFoldedArr;
        this.playerStraddled = obj.playerStraddled;
        this.playerStraddling = obj.playerStraddling;
        this.playersAllIn = obj.playersAllIn;
        this.pot = obj.pot;
        this.roundPlayerAllInArr = obj.roundPlayerAllInArr;
        this.roundTransition = obj.roundTransition;
        this.sidePotActive = obj.sidePotActive;
        this.sidePots = obj.sidePots;
        this.smallBlind = obj.smallBlind;
        this.straddleTotal = obj.straddleTotal;
        this.totalBuyIns = obj.totalBuyIns;
        this.totalRounds = obj.totalRounds;
        this.tourneyPlayersOut = obj.tourneyPlayersOut;
        this.winnerBeingChosen = obj.winnerBeingChosen;

        // this.initBorderSelectSetter = borderSelectFunc;
        // this.roundSetter = roundTransitionFunc
    }

    checkForPlayersAtZero(obj) {
        if (this.gameStyle == 'Tournament') {
            for (let i = 0; i < this.gameArray.length; i++) {

                if (obj.players[this.gameArray[i] - 1] == null || obj.playerDisplayChips[this.gameArray[i] - 1] <= 0) {

                    this.tourneyPlayersOut.push(this.gameArray[i]);

                }

            }
        } else {
            for (let i = 0; i < this.gameArray.length; i++) {

                if (obj.players[this.gameArray[i] - 1] == null || obj.playerDisplayChips[this.gameArray[i] - 1] <= 0) {

                    this.cashPlayersOut.push(this.gameArray[i]);

                }

            }
        }
    }

    removePlayersWhoLost() {
        if (this.gameStyle == 'Tournament') {
            for (let i = 0; i < this.tourneyPlayersOut.length; i++) {
                // this.gameArray.splice(i, 1);
                this.gameArray.splice(this.tourneyPlayersOut[i], 1);
            }
        } else {
            for (let i = 0; i < this.cashPlayersOut.length; i++) {
                // this.gameArray.splice(i, 1);
                this.gameArray.splice(this.cashPlayersOut[i], 1);
            }
        }
    }

    checkForPlayerOutReBuying(obj, turn) {

        if (this.gameStyle === 'Cash') {
            if (this.cashPlayersOut.includes(turn)) {
                this.gameArray = this.holderGameArr;
                this.checkForPlayersAtZero(obj);
                this.removePlayersWhoLost();
                this.cashPlayersOut.splice(turn, 1);
            }
        }

    }

    resetNewRound() {
        if (this.newRound) {
            this.newRound = false;
        }
    }

    changeGameArrayStraddle(straddle, bet, lastTurn) {
        if (straddle && this.currentRound <= 0) {

            let first = this.gameArray[0];
            this.gameArray = this.gameArray.slice(1, this.gameArray.length);
            this.gameArray.push(first);

            console.log(this.gameArray);

            this.playerStraddling = lastTurn;
            this.straddleTotal = bet;
            
            this.playerStraddled = true;

        }
    }

    confirmGameArr(obj) {
        for (let i = 0; i < this.gameArray.length; i++) {

            if (obj.players[this.gameArray[i] - 1] == null || obj.playerDisplayChips[this.gameArray[i] - 1] <= 0) {

                this.removePlayerOnFold(this.gameArray[i]);

            }

        }
    }

    resetGameArray() {
        this.gameArray = this.holderGameArr;
    }

}

export default GameModel