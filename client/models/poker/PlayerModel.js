class Player {
    displayName;
    chips;
    turn;
    betAmount;
    totalBet;
    folded;
    roomId;
    socket;
    setterChips;
    currentGameTurn;
    currentGamePot;
    currentGameAnte;
    currentGameBettor;
    currentGameRound;
    betToCall = 0;
    setterBetAmount;
    setterDisplayCards;
    tapCount = 0;
    setterTapCount;
    setterInitCheck;
    anteCalled = true;
    betCalledThisRound = false;
    totalCalledThisRound = 0;
    chipsDistr;
    isBigBlind;
    isSmallBlind;
    isNotABlind;
    roundNumberHolder;
    inGameNewRound = false;
    straddle = false;
    setterStraddle;
    actionInCurrentRound = false;
    betOrCalledCurrentRound = false;
    betOrCalledAmountCurrentRound = 0;
    initStraddle = false;
    straddleSet = false;
    straddleAble;

    constructor(displayName, chips, turn, betAmount, folded, roomId, socket) {
        this.displayName = displayName;
        this.chips = chips;
        this.turn = turn;
        this.betAmount = betAmount;
        this.folded = folded;
        this.roomId = roomId;
        this.socket = socket;
    }

    setInfoOnPlayerDisplaySubmit(turn, setPlayerPositionSelected) {
        this.turn = turn;
        setPlayerPositionSelected(true)
    }

    initCheck(func1) {
        if (this.currentGameTurn == this.turn) {

            if (this.currentGameRound === 0) {

                if (this.isBigBlind || this.initStraddle && this.currentGameBettor == this.turn) {

                    this.tapCount++;

                    if (this.tapCount >= 2) {
                        this.checks();
                    }
                    
                    if (this.tapCount > 0) {
                        setTimeout(() => {
                            this.tapCount = 0;
                        }, 6000)
                    }

                }

            } else {

                if (this.currentGameBettor === 0) {

                    this.tapCount++;

                    if (this.tapCount >= 2) {
                        this.checks();
                    }
                    
                    if (this.tapCount > 0) {
                        setTimeout(() => {
                            this.tapCount = 0;
                        }, 6000)
                    }

                }

            }

            // if (this.betAmount <= 0) {

                // this.tapCount++;

                // if (this.tapCount >= 2) {
                //     this.checks();
                // }
                
                // if (this.tapCount > 0) {
                //     setTimeout(() => {
                //         this.tapCount = 0;
                //     }, 6000)
                // }

            // } else {

            //     func1(true);

            //     setTimeout(() => {
            //         func1(false);
            //     }, 2500);

            // }
        }

    }

    checks() {
        if (this.currentGameTurn == this.turn) {
            this.actionInCurrentRound = true;
            this.socket.emit('inGameEvent1', this.turn)   
        }
    }

    bets(arg) {
        if (this.currentGameTurn == this.turn) {
            if (arg > 0) {
                if (this.chips == arg) {
                    this.chips = 0;
                } else {
                    this.chips = this.chips - arg;
                }
                this.actionInCurrentRound = true;
                this.betOrCalledCurrentRound = true;
                this.betOrCalledAmountCurrentRound = arg;
                this.socket.emit('inGameEvent2', this.turn, arg, this.chips, false)
            }
        }
    }

    displayBet() {
        this.setterChips(this.chips)
        this.betAmount = 0
        this.setterBetAmount(this.betAmount);
    }

    displayChipsAnte() {
        if (this.currentGameRound <= 0) {
            if (this.isBigBlind) {
                this.chips -= Number(this.currentGameAnte)
            } else if (this.isSmallBlind) {
                this.chips -= (Number(this.currentGameAnte) / 2)
            }
        }
    }

    calls() {
        let holderAmount = 0;
        if (this.currentGameTurn == this.turn) {
            if (this.currentGameRound <= 0) {
                if (this.currentGameBettor != 0) {
                    if (!this.betCalledThisRound) {
                        holderAmount = this.betToCall;
                    } else {
                        holderAmount = this.betToCall - this.totalCalledThisRound;
                    }

                    this.chips -= holderAmount;
                    this.betCalledThisRound = true;
                    this.totalCalledThisRound = this.betToCall;
                    this.actionInCurrentRound = true;
                    this.betOrCalledCurrentRound = true;
                    this.socket.emit('inGameEvent3', this.turn, holderAmount, this.chips)
                } else {
                    if (this.isNotABlind) {
                        holderAmount = this.currentGameAnte
                    } else if (this.isSmallBlind) {
                        holderAmount = (this.currentGameAnte / 2); 
                    }
                    this.chips -= holderAmount;
                    this.anteCalled = true;

                    if (!this.isBigBlind) {
                        this.actionInCurrentRound = true;
                        this.betOrCalledCurrentRound = true;
                        this.socket.emit('inGameEvent3', this.turn, holderAmount, this.chips)
                    }
                }
            } else {
                if (this.currentGameBettor != 0) {
                    if (this.betOrCalledCurrentRound) {
                        holderAmount = this.betToCall - this.betOrCalledAmountCurrentRound;
                    } else {
                        holderAmount = this.betToCall;
                    };
                    this.chips -= holderAmount;
                    this.betCalledThisRound = true;
                    this.totalCalledThisRound = holderAmount;
                    this.betOrCalledAmountCurrentRound = holderAmount;
                    this.betOrCalledCurrentRound = true;
                    this.actionInCurrentRound = true;
                    this.socket.emit('inGameEvent3', this.turn, holderAmount, this.chips);
                }
            }
        }
    }

    displayCall() {
        this.setterChips(this.chips);
        this.betAmount = 0
        this.setterBetAmount(this.betAmount);
    }

    folds(setDisplay) {
        if (this.currentGameTurn == this.turn) {
            this.actionInCurrentRound = true;
            setDisplay(false);
            this.socket.emit('inGameEvent4', this.turn)
        }
    }

    isABlind(arg) {
        this.chips -= arg;
    }

    dragsChips(windowWidth, windowHeight, eX, eY, chipAmount) {
        // percentage conversion
        let left = (eX / windowWidth) * 100;
        let top = (eY / windowHeight) * 100; 

        if (left > 11 && left < 90) {
            if (top > 27 && top < 55) {
                this.betAmount += chipAmount;
                this.setterBetAmount(this.betAmount);
            }
        }
    }

    winnerOfRound(chips) {
        this.setterChips(chips);
    }

    checkForBlind(gameModel) {
        if (gameModel.bigBlind == this.turn) {
            this.isBigBlind = true;
            this.isSmallBlind = false;
            this.isNotABlind = false;
            // this.chips -= this.currentGameAnte;
        } else if (gameModel.smallBlind == this.turn) {
            this.isBigBlind = false;
            this.isSmallBlind = true;
            this.isNotABlind = false;
            // this.chips -= this.currentGameAnte / 2;
        } else {
            this.isBigBlind = false;
            this.isSmallBlind = false;
            this.isNotABlind = true;
        }
        // console.log(this.chips);
        // this.setChips(this.chips);
    }

    setInGameInfo(gameModel) {
        this.currentGameTurn = gameModel.currentTurn;
        this.currentGamePot = gameModel.pot;
        this.currentGameAnte = gameModel.ante;
        this.currentGameBettor = gameModel.currentBettor;
        this.currentGameRound = gameModel.currentRound;
        this.betToCall = gameModel.lastBet;  
        
        this.resetPlayerInfoOnNewRound(gameModel);
        this.checkForStraddle(gameModel);

        if (this.currentGameRound === 0) {
            this.checkForBlind(gameModel);
        }

    }

    clearsBet() {
        this.betAmount = 0;
        this.setterBetAmount(this.betAmount)
    }

    addsOn(amount, board) {
        this.chips = +this.chips + +amount;
        board.dismiss();
        this.socket.emit('inGameMenuEvent1', this.turn, amount, this.chips);
    }

    setChips(gameObj) {
        this.chips = Number(gameObj.playerDisplayChips[this.turn - 1]);
        this.setterChips(this.chips);
    }

    setPlayerViewInfo(cb1, cb2, cb3, cb4) {
        this.setterChips = cb1;
        this.setterBetAmount = cb2;
        this.setterStraddle = cb3;
        this.setterDisplayCards = cb4
    }

    setBetting(unit) {
        if (this.currentGameBettor == 0) {
            if (unit === '2x') {
                if (this.currentGameBettor != 0) {
                    this.betAmount = this.betToCall * 2;
                } else {
                    this.betAmount = this.currentGameAnte * 2;
                }
            } else if (unit === '3x') {
                if (this.currentGameBettor != 0) {
                    this.betAmount = this.betToCall * 3;
                } else {
                    this.betAmount = this.currentGameAnte * 3;
                }
            } else if (unit === 'ALL-IN') {
                this.betAmount = this.chips;
            }
        } else {
            if (unit === '2x') {
                this.betAmount = this.betToCall * 2;
            } else if (unit === '3x') {
                this.betAmount = this.betToCall * 3;
            } else if (unit === 'ALL-IN') {
                this.betAmount = this.chips;
            }
        }
        this.setterBetAmount(this.betAmount);
    }

    // checkForPlayerSpecificInfo(gModel, gState) {
    //     if (gModel.bigBlind === this.turn) {
    //         this.chips = gState.pChips[this.turn - 1];
    //         this.setterChips(gState.pChips[this.turn - 1]);
    //     } else if (gModel.smallBlind === this.turn) {
    //         this.chips = gState.pChips[this.turn - 1];
    //         this.setterChips(gState.pChips[this.turn - 1]);
    //         if (gModel.gameSize === 2) {
    //             this.checkForDisplayCurrentCall();
    //             this.checkForStraddle();
    //         }
    //     } else {
    //         this.checkForStraddle();
    //         this.checkForDisplayCurrentCall();
    //     }

    // }

    leaveGame() {
        this.socket.emit('inGameEvent5', this.turn);
    }

    // submitWinner(info1, info2) {
    //     if (info1 != 0 && info1 != null) {
    //         this.socket.emit('inGameEvent6', info1, info2);
    //     }
    // }

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

    resetPlayerInfoOnNewRound(gModel) {
        if (gModel.newRound) {
            this.betCalledThisRound = false;
            this.betCalledThisRound = 0;
            this.actionInCurrentRound = false;
            this.betOrCalledCurrentRound = false;
            this.totalCalledThisRound = 0;
            this.initStraddle = false;
        }
    }

    checkForStraddle(gModel) {
        if (this.currentGameRound <= 0) {
            if (this.currentGameTurn == this.turn) {
                if (!this.actionInCurrentRound) {
                    let index = gModel.gameArray.indexOf(Number(this.turn));

                    if (index == 0) {
                        this.straddle = true;
                    }
                } else {
                    this.straddle = false;
                }
            } else {
                this.straddle = false;
            }
        } else {
            this.straddle = false;
        }

        this.setterStraddle(this.straddle);
    }

    straddles(initStraddle, setInitStraddle) {
        setInitStraddle(!initStraddle);
        this.initStraddle = !this.initStraddle;
    }

    dropsChips(x, y, setDisplayChips, value) {
        if (y < -500) {
            this.betAmount += Number(value);
            this.setterBetAmount(this.betAmount);

            setDisplayChips(false);
            setTimeout(() => {
                setDisplayChips(true);
            }, 600)
        }
    }

    checkForFold(x, y, setDisplay) {

        if (this.currentGameTurn == this.turn) {
            if (y < -375) {
                this.folds(setDisplay);
            }
        }

    }

    confirmsAction() {
        let holderAmount = 0;
        let straddle = false;
        if (this.currentGameTurn == this.turn) {
            if (this.currentGameRound == 0) {
                if (this.currentGameBettor == 0) {
                    
                    if (this.isNotABlind) {

                        if (this.initStraddle) {

                            if (this.betAmount === this.currentGameAnte * 2) {
                                straddle = true;
                                holderAmount = this.betAmount;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, straddle);
                            }

                        } else {
                            
                            if (this.betAmount === this.currentGameAnte) {
                                // player calls ante
                                holderAmount = this.currentGameAnte;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                            } else if (this.betAmount > this.currentGameAnte) {
                                // player raises / bets
                                holderAmount = this.betAmount;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent2', this.betAmount, this.betAmount, this.chips, this.turn, straddle);
                            }

                        }

                    } else if (this.isSmallBlind) {

                        if (this.betAmount === (this.currentGameAnte / 2)) {
                            // player calls ante
                            holderAmount = (this.currentGameAnte / 2);
                            this.chips -= holderAmount;
                            this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                        } else if (this.betAmount > (this.currentGameAnte / 2)) {
                            // player raises 
                            holderAmount = this.betAmount;
                            this.chips -= holderAmount;
                            this.socket.emit('inGameEvent2', this.betAmount + (this.currentGameAnte / 2), this.betAmount, this.chips, this.turn, false);
                        }

                    } else if (this.isBigBlind) {

                        holderAmount = this.betAmount;
                        this.chips -= holderAmount;
                        this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, false);

                    }

                    this.betOrCalledCurrentRound = true;
                    this.totalCalledThisRound += holderAmount;

                } else {
                    
                    if (this.betOrCalledCurrentRound) {

                        if (this.betAmount === this.betToCall) {
                            // player calls bet, but has already called or bet this round
                            holderAmount = this.betAmount - this.totalCalledThisRound;
                            this.chips -= holderAmount;
                            this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                        } else if (this.betAmount > this.betToCall) {
                            // player raises bet, but has already called or bet this round
                            holderAmount = this.betAmount - this.totalCalledThisRound;
                            this.chips -= holderAmount;
                            this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, false);
                        }

                    } else {

                        if (this.initStraddle) {

                            if (this.betAmount === this.betToCall * 2) {
                                straddle = true;
                                holderAmount = this.betAmount;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, straddle);
                            }

                        } else {
                            if (this.betAmount === this.betToCall) {
                                // player calls bet, but has already called or bet this round
                                holderAmount = this.betAmount;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                            } else if (this.betAmount > this.betToCall) {
                                // player raises bet, but has already called or bet this round
                                holderAmount = this.betAmount;
                                this.chips -= holderAmount;
                                this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, false);
                            }
                        }

                    }

                    this.betOrCalledCurrentRound = true;
                    this.totalCalledThisRound += holderAmount;
                }
            } else {
                
                if (this.betOrCalledCurrentRound) {

                    if (this.betAmount === this.betToCall - this.totalCalledThisRound) {
                        // player calls bet, but has already called or bet this round
                        holderAmount = this.betAmount;
                        this.chips -= holderAmount;
                        this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                    } else if (this.betAmount > this.betToCall - this.totalCalledThisRound) {
                        // player raises bet, but has already called or bet this round
                        holderAmount = this.betAmount - this.totalCalledThisRound;
                        this.chips -= holderAmount;
                        this.socket.emit('inGameEvent2', this.betAmount, holderAmount, this.chips, this.turn, false);
                    }
                } else {

                    if (this.betAmount === this.betToCall) {
                        // player calls bet, but has not called or bet this round
                        holderAmount = this.betToCall;
                        this.chips -= holderAmount;
                        this.socket.emit('inGameEvent3', holderAmount, holderAmount, this.chips, this.turn);
                    } else if (this.betAmount > this.betToCall) {
                        // player raises bet, but has not called or bet this round
                        holderAmount = this.betAmount;
                        this.chips -= holderAmount;
                        this.socket.emit('inGameEvent2', holderAmount, holderAmount, this.chips, this.turn, false);
                    }

                }

                this.betOrCalledCurrentRound = true;
                this.totalCalledThisRound += holderAmount;

            }
        }
    }

    newRoundInitiated() {
        this.setterDisplayCards(true);
    }

    setInitStraddling() {
        this.initStraddle = true;
    }
    
    setStraddleAble(value) {
        this.straddleAble = value;
    }

}

export default Player