const file1 = require('../methods/file1')
const db = require("../models");
const Game = db.game;
const User = db.user;

exports.userCreatesGame = async (socket, gameSettings) => {
    if (gameSettings.roomSize == 0 || gameSettings.ante == 0) {
        let missisng = [];
        if (gameSettings.roomSize === 0) {
            missisng.push(1);
        } 
        if (gameSettings.ante == 0) {
            missisng.push(2)
        } 

        socket.emit('event2FailedCG', missisng);
    } else {

        let obj = {
            gameCode: file1.makeId(5),
            gameType: gameSettings.gameType,
            roomSize: gameSettings.roomSize,
            host: socket.id,
            players: [],
            totalPlayers: 0,
            playerDisplayNames: [],
            playerDisplayChips: [],
            ante: Number(gameSettings.ante),
            totalBuyIns: [],
            gameStyle: gameSettings.gameStyle,
            maxBuyIn: Number(gameSettings.maxBuyIn),
            minBuyIn: Number(gameSettings.minBuyIn),
            idle: true,
            gameStarted: false,
            seatsActive: '',
            straddle: gameSettings.straddle
        }

        const exists = await Game.count({ where : { gameCode : obj.gameCode } });

        if (exists === 0) {
            const game = await Game.build(obj);
            const user = await User.findOne({where : { socketId: socket.id }})

            user.gameCode = game.gameCode;
            user.changed('gameCode', true)

            await game.save();
            await user.save();

            console.log(obj.gameCode);

            const updatedGame = await Game.findOne({ where : { gameCode : obj.gameCode } })

            socket.join(obj.gameCode);

            socket.emit('event2CG', updatedGame);
        }
    }
};

exports.userJoinsGame = async (socket, gameCode) => {
    const game = await Game.findOne({ where : { gameCode : gameCode } });
    const user = await User.findOne({ where : { socketId : socket.id } });

        if (game != null) {            
            if (game.totalPlayers < game.roomSize) {
                user.gameCode = game.gameCode;
                user.changed('gameCode', true);
        
                await user.save();

                socket.join(gameCode);

                socket.emit('event2JG', game);
            } else {
                socket.emit('event2FailedJG', 1);
            }
        } else {
            socket.emit('event2FailedJG', 0);
        }
};

exports.handleInitGameStart = async (io, socket, bigBlind, smallBlind, gameType) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    if (gameType != 'blackjack') {
        let holder = game.dataValues.ante / 2;  
        
        if (game.playerDisplayChips[bigBlind - 1] != undefined) {
            game.playerDisplayChips[bigBlind - 1] -= game.dataValues.ante;    
        };

        if (game.playerDisplayChips[smallBlind - 1] != undefined) {
            game.playerDisplayChips[smallBlind - 1] -= holder;    
        };

        game.gameStarted = true;
        game.idle = false;

        game.changed('playerDisplayChips', true);
        game.changed('gameStarted', true);
        game.changed('idle', true);

        await game.save();

        const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

        io.to(game.dataValues.gameCode).emit('event8', bigBlind, updateGame.dataValues);
    } else {

        const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

        io.to(game.dataValues.gameCode).emit('event8', 0, updateGame.dataValues);

    }
};

exports.handleSendGameInfoOnStart = async (socket) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    socket.emit('event10', game.dataValues);  
};

exports.handlePlayerAnteOnNewRoundStart = async (io, socket, bigBlind, smallBlind) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });
    
    let holder = game.dataValues.ante / 2;

    game.playerDisplayChips[bigBlind - 1] -= game.dataValues.ante;
    game.playerDisplayChips[smallBlind - 1] -= holder;

    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingEvent13', updateGame.dataValues);
}

exports.handleUserJoiningMidGame = async (io, socket, gModelSent, pJoiningTurn) => {

    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingBackEvent12', gModelSent, game.dataValues, pJoiningTurn);
};

exports.handleCheck = async (io, socket, pTurn) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent1', pTurn, game.dataValues);
};

exports.handleFold = async (io, socket, pTurn) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent4', pTurn, game.dataValues)
};

exports.handleBet = async (io, socket, amount, amount2, totalChips, turn, straddle) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.playerDisplayChips[turn - 1] = totalChips;
    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent2', amount, amount2, totalChips, turn, updateGame.dataValues, straddle)

};

exports.handleCall = async (io, socket, amount, amount2, totalChips, turn) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    console.log(amount);
    console.log(amount2)

    game.playerDisplayChips[turn - 1] = totalChips;
    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent3', amount, amount2, totalChips, turn, updateGame.dataValues)

};

exports.handlePlayerLeavingGame = async (io, socket, pTurn) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.players[pTurn - 1] = null;
    game.playerDisplayChips[pTurn - 1] = null;
    game.playerDisplayNames[pTurn - 1] = null;
    game.totalBuyIns[pTurn - 1] = null;
    game.totalPlayers = game.totalPlayers - 1;
    
    if (pTurn == 1) {
        for (let i = 0; i < game.playerDisplayNames.length; i++) {
            if (game.playerDisplayNames[i] != null && game.playerDisplayNames[i] != '') {
                game.host = game.players[i];
            }
        }
    }

    game.changed('host', true);
    game.changed('players', true);
    game.changed('playerDisplayChips', true);
    game.changed('playerDisplayNames', true);
    game.changed('totalBuyIns', true);
    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    socket.leave(updateGame.dataValues.gameCode);

    // let leftCount = 0;
    // for (let i = 0; i < updateGame.dataValues.players.length; i++) {
    //     if (updateGame.dataValues.players[i] === '') {
    //         leftCount++;
    //     }
    // }

    // if (leftCount >= updateGame.dataValues.roomSize) {
    //     await updateGame.destroy();
    // } else {
    //     io.to(updateGame.dataValues.gameCode).emit('sendingInGameEvent5', updateGame.dataValues, info1);
    // }

    io.to(updateGame.dataValues.gameCode).emit('sendingInGameEvent5', updateGame.dataValues, pTurn);
};

exports.handleWinnerChosen = async (io, socket, selectedWinnerTurn, activePot) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.playerDisplayChips[selectedWinnerTurn - 1] = +game.playerDisplayChips[selectedWinnerTurn - 1] + +activePot;
    game.idle = true;

    game.changed('playerDisplayChips', true);
    game.changed('idle', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent6', selectedWinnerTurn, updateGame.dataValues);
};

exports.handleRoundReset = async (io, socket, bigBlind, gameObj) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    let nextBigBlind = -1;
    let nextSmallBlind = -1;

    if (game.dataValues.roomSize == 2) {
        if (bigBlind == 1) {
            nextBigBlind = 2;
            nextSmallBlind = 1;
        } else if (bigBlind == 2) {
            nextBigBlind = 1; 
            nextSmallBlind = 2;
        }
    } else {
        if (bigBlind == game.dataValues.roomSize) {
            nextBigBlind = 1;
        } else {
            nextBigBlind = bigBlind + 1;
        }

        nextSmallBlind = bigBlind;
    }

    game.idle = false;

    game.changed('playerDisplayChips', true);
    game.changed('idle', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingInGameEvent7', updateGame.dataValues);
};

exports.handleAddOn = async (io, socket, pTurn, amount, totalChips) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.playerDisplayChips[pTurn - 1] += amount;
    game.changed('playerDisplayChips', true);
    game.totalBuyIns[pTurn - 1] += amount;
    game.changed('totalBuyIns', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });
    
    io.to(updateGame.dataValues.gameCode).emit('sendingInGameMenuEvent1', updateGame.dataValues, totalChips, pTurn);
};

exports.handleGameSizeChange = async (io, socket, newRs) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.roomSize = newRs;
    game.changed('roomSize', true);
    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingInGameMenuEvent2', updateGame.dataValues);
};

exports.handleSidePot = async (io, socket, sidePotWinner, currentPot, sidePotIndex) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.playerDisplayChips[sidePotWinner - 1] = +game.playerDisplayChips[sidePotWinner - 1] + +currentPot;
    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(game.dataValues.gameCode).emit('sendingInGameEvent6Side', sidePotWinner, updateGame.dataValues, sidePotIndex);
};

exports.handleWinnerChosenBJ = async (io, socket, info1, info2) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });
    
    // console.log(info1);
    // console.log(info2);

    for (let i = 0; i < info1.length; i++) {
        let holder = 0;
        // if (info2[i].length != undefined) {
        //     info2[i].forEach(el => {
        //         holder += Number(el);
        //     })
        // } else {
        //     holder += info2[i];
        // } 

        // console.log(info1[i] - 1);


        if (info2[i]) {
            if (info2[i].length != undefined) {
                info2[i].forEach(el => {
                    holder += Number(el);
                })
            } else {
                holder += info2[i];
            } 
        }

        if (!game.playerDisplayChips[info1[i] - 1]) {
            game.playerDisplayChips[info1[i] - 1] = holder;
        } else {
            game.playerDisplayChips[info1[i] - 1] += holder;
        }
    };

    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingBackInGameEvent6_BJ', updateGame.dataValues);
};  

exports.handleRoundResetBJ = async (io, socket) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingBackInGameEvent7_BJ', updateGame.dataValues);

}

exports.handleSplit = async (io, socket, pTurn, actionAmount, totalChips) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.playerDisplayChips[pTurn - 1] = totalChips;

    game.changed('playerDisplayChips', true);

    await game.save();

    const updateGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    io.to(updateGame.dataValues.gameCode).emit('sendingBackInGameEvent8_BJ', updateGame.dataValues, pTurn, actionAmount);
}

exports.handlePlayerPositionSelected = async (io, socket, positionSelected) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    if (!game.seatsActive.includes(positionSelected.toString())) {

        game.seatsActive = positionSelected;

        game.changed('seatsActive', true);

        await game.save();

        const updatedGame = await Game.findOne({ where : { gameCode : user.gameCode } });

        socket.emit('sendingBackPlayerDisplayEvent1_Side', positionSelected);
        io.to(updatedGame.dataValues.gameCode).emit('sendingBackPlayerDisplayEvent1', positionSelected, updatedGame.dataValues);
    } else {
        socket.emit('sendingBackPlayerDisplayEvent1_SideError');
    }
}

exports.handlePlayerPositionClosed = async (io, socket, currentPositionSelected) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    game.seatsActive = game.seatsActive.replace(currentPositionSelected.toString(), '');

    game.changed('seatsActive', true);

    await game.save();

    const updatedGame = await Game.findOne({ where : { gameCode : user.gameCode } });

    socket.emit('sendingBackPlayerDisplayEvent2_Side');
    io.to(updatedGame.dataValues.gameCode).emit('sendingBackPlayerDisplayEvent2', currentPositionSelected, updatedGame.dataValues);
}

exports.handlePlayerInGameDisplays = async (io, socket, pDisplayName, pDisplayChips, selectedPosition) => {
    const user = await User.findOne({ where : { socketId : socket.id } });
    const game = await Game.findOne({ where : { gameCode : user.gameCode } });

    if (socket.id != game.dataValues.host && game.dataValues.gameType === 'BlackJack' && (pDisplayName === '' || pDisplayChips === '')) {
        socket.emit('event4Failed', 0);
    } else {

        if (game.idle) {

            if (!game.players[selectedPosition - 1]) {

                if (pDisplayName != null && pDisplayName != '' || pDisplayChips != null && pDisplayChips != '') {

                    game.players[selectedPosition - 1] = socket.id;
                    game.playerDisplayNames[selectedPosition - 1] = pDisplayName;

                    if (socket.id === game.dataValues.host && game.dataValues.gameType === 'BlackJack') {
                        game.playerDisplayChips[selectedPosition - 1] = 'Dealer';
                        game.totalBuyIns[selectedPosition - 1] = 'Dealer';
                    } else {
                        game.playerDisplayChips[selectedPosition - 1] = Number(pDisplayChips);
                        game.totalBuyIns[selectedPosition - 1] = Number(pDisplayChips);
                    }

                    game.totalPlayers++;
                    game.changed('totalPlayers', true)
                    game.changed('players', true);
                    game.changed('playerDisplayNames', true);
                    game.changed('playerDisplayChips', true);
                    game.changed('totalBuyIns', true);

                    await game.save();

                    const updatedGame = await Game.findOne({ where : { gameCode : user.gameCode } });

                    socket.emit('event6_Individual', selectedPosition);
                    io.to(updatedGame.dataValues.gameCode).emit('event6', updatedGame.dataValues);

                } else {
                    socket.emit('event6Fail');
                }
            }
        }
    }
}