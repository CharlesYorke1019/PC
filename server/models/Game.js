module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define('Game', {
        gameCode: {
            type: Sequelize.STRING,
            unique: true
        },
        gameType: {
            type: Sequelize.STRING
        },
        roomSize: {
            type: Sequelize.INTEGER
        },
        host: {
            type: Sequelize.STRING
        },
        players: {
            type: Sequelize.JSON
        },
        totalPlayers: {
            type: Sequelize.INTEGER
        },
        ante: {
            type: Sequelize.DOUBLE
        },
        playerDisplayNames: {
            type: Sequelize.JSON
        },
        playerDisplayChips: {
            type: Sequelize.JSON
        },
        totalBuyIns: {
            type: Sequelize.JSON
        },
        gameStarted: {
            type: Sequelize.BOOLEAN
        },
        gameStyle: {
            type: Sequelize.STRING
        },
        maxBuyIn: {
            type: Sequelize.INTEGER
        },
        minBuyIn: {
            type: Sequelize.INTEGER
        },
        idle: {
            type: Sequelize.BOOLEAN
        },
        seatsActive: {
            type: Sequelize.STRING
        },
        straddle: {
            type: Sequelize.BOOLEAN
        }
    });
    return Game;
}