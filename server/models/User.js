module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        gameCode: {
            type: Sequelize.STRING,
        },
        socketId: {
            type: Sequelize.STRING,
            unique: true
        },
        userCode: {
            type: Sequelize.STRING, 
            unique: true
        }
    });
    return User;
};