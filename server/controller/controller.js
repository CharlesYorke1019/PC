const db = require("../models");
const Game = db.game;
const User = db.user;

exports.findUsers = (req, res) => {
    User.findAll().then(data => {
        res.send({
            message: "Request successful!",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error occured while finding users"
        });
    });
};

exports.findGames = (req, res) => {
    Game.findAll().then(data => {
        res.send({
            message: "Request successful!",
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: "Error occured while finding users"
        });
    });
}

exports.createGame = (req, res) => {

    let obj = {
        gameCode: req.body.gameCode, 
        gameType: req.body.gameType,
        roomSize: req.body.roomSize, 
        host: req.body.host,
        players: req.body.players,
        totalPlayers: req.body.totalPlayers,
        ante: req.body.ante,
        playerDisplayNames: req.body.playerDisplayNames,
        playerDisplayChips: req.body.playerDisplayChips, 
        totalBuyIns: req.body.totalBuyIns, 
        gameStyle: req.body.gameStyle,
        maxBuyIn: req.body.maxBuyIn,
        minBuyIn: req.body.minBuyIn, 
        idle: req.body.idle
    }

    Game.create(obj).then(data => {
        res.send({
            data: data
        })
    })

};