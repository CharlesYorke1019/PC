const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const file1 = require('./methods/file1')
const db = require("./models");
const Game = db.game;
const User = db.user;
const controller = require('./controller/controller');
const socketController = require('./controller/socketController');
const authJwt = require('./middleware/authJwt')

const app = express();

app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "exp://192.168.1.209:8081"
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 3 * 60 * 1000, // 3 minutes
        skipMiddlewares: true
    },
    pingInterval: 25000,
    pingTimeout: 100000
},);

const PORT = process.env.PORT || 8080;

const socketPORT = 5000;

// potential middleware
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     console.log(token);
//     if (authJwt.isValidJwt(token)) {
//         next();
//     } else {
//         next(new Error('Socket authentication error'));
//     }
// })

io.on('connection', async (socket) => {

    // conditional to see if socket existed and reconnected
    if (socket.recovered) {
        console.log('recovered!');

        const user = await User.findOne({ where : { socketId : socket.id }});
        const count = await Game.count({ where : { gameCode : user.gameCode } });
        
        if (count === 1) {

            const game = await Game.findOne({ where : { gameCode : user.gameCode } });

            socket.emit('testRecoveryLoad');
        }
    };

    socket.on('userConnects', async () => {
        User.count({ where : { socketId : socket.id } }).then(count => {
            if (count === 0) {
                User.create({gameCode: '', socketId: socket.id, userCode: file1.makeUserId(5)}).then(data => {
                    // socket.emit('sendingUserConnects', data);
                    return;
                });
            };
        });

    });

    socket.on('event1', async (gameSettings) => {
        socketController.userCreatesGame(socket, gameSettings);
    });

    socket.on('event3', async (gameCode) => {
        socketController.userJoinsGame(socket, gameCode);
    });

    socket.on('event4', async (pDisplayName, pDisplayChips, selectedPosition) => {
        socketController.handlePlayerInGameDisplays(io, socket, pDisplayName, pDisplayChips, selectedPosition)
    })

    socket.on('event7', async (bigBlind, smallBlind, gameType) => {
        socketController.handleInitGameStart(io, socket, bigBlind, smallBlind, gameType);
    });

    socket.on('event9', async () => {
        socketController.handleSendGameInfoOnStart(socket);
    });

    socket.on('event12', async (gModelSent, pJoiningTurn) => {
        socketController.handleUserJoiningMidGame(io, socket, gModelSent, pJoiningTurn);
    });

    socket.on('event13', (bigBlind, smallBlind) => {
        socketController.handlePlayerAnteOnNewRoundStart(io, socket, bigBlind, smallBlind);
    })

    socket.on('inGameEvent1', async (pTurn) => {
        socketController.handleCheck(io, socket, pTurn);
    });

    socket.on('inGameEvent2', async (amount, amount2, totalChips, turn, straddle) => {
        socketController.handleBet(io, socket, amount, amount2, totalChips, turn, straddle);
    });

    socket.on('inGameEvent3', async (amount, amount2, totalChips, turn) => {
        socketController.handleCall(io, socket, amount, amount2, totalChips, turn);
    });

    socket.on('inGameEvent4',  async (pTurn) => {
        socketController.handleFold(io, socket, pTurn);
    });

    socket.on('inGameEvent5', async (pTurn) => {
        socketController.handlePlayerLeavingGame(io, socket, pTurn);
    });

    socket.on('inGameEvent6', async (selectedWinnerTurn, activePot) => {
        socketController.handleWinnerChosen(io, socket, selectedWinnerTurn, activePot);
    });

    socket.on('inGameEvent6_BJ', async (info1, info2) => {
        socketController.handleWinnerChosenBJ(io, socket, info1, info2)
    })

    socket.on('inGameEvent7', async (bigBlind, gameObj) => {
        socketController.handleRoundReset(io, socket, bigBlind, gameObj);
    });

    socket.on('inGameEvent7_BJ', async () => {
        socketController.handleRoundResetBJ(io, socket);
    })

    socket.on('inGameEvent8_BJ', async (pTurn, actionAmount, totalChips) => {
        socketController.handleSplit(io, socket, pTurn, actionAmount, totalChips);
    })

    socket.on('inGameEvent6Side', async (sidePotWinner, currentPot, sidePotIndex) => {
        socketController.handleSidePot(io, socket, sidePotWinner, currentPot, sidePotIndex);
    });

    socket.on('inGameMenuEvent1', async (pTurn, amount, totalChips) => {
        socketController.handleAddOn(io, socket, pTurn, amount, totalChips);
    });

    socket.on('inGameMenuEvent2', async (newRs) => {
        socketController.handleGameSizeChange(io, socket, newRs);
    });

    socket.on('playerDisplayEvent1', async (positionSelected) => {
        socketController.handlePlayerPositionSelected(io, socket, positionSelected);
    })

    socket.on('playerDisplayEvent2', async (currentPositionSelected) => {
        socketController.handlePlayerPositionClosed(io, socket, currentPositionSelected);
    })

    socket.on('disconnect', () => {
        console.log('disconnect');
    })
});

app.get('/users', controller.findUsers);
app.get('/games', controller.findGames);
app.post('/games', controller.createGame)

db.sequelize.sync({
    force: true
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.listen(socketPORT, () => {
    console.log(`Socket.io Server running on port ${socketPORT}`);
});