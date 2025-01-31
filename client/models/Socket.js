const io = require('socket.io-client');

const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const socket = io("http://192.168.1.210:5000", {
    recconection: true, 
    recconectionAttempts: Infinity,
    auth: {
        token: makeId(10)
    }
});

export default socket