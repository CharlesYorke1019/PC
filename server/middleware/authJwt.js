const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig')

exports.isValidJwt = (token) => {

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    })

}