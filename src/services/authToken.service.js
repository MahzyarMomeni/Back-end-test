const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

exports.generateAuthToken = function (user) {
    try {
        let token;
        if (user.username) {
            token = jwt.sign({ username: user.username }, 'jwtPrivateKey');
        } else if (user.email) {
            token = jwt.sign({ email: user.email }, 'jwtPrivateKey');
        } else if (user.phoneNumber) {
            token = jwt.sign({ username: user.phoneNumber }, 'jwtPrivateKey');
        } else {
            next(new appError('can not generate token', '5000', 400));
        }
        return token;
    } catch (error) {
        next(new appError(error.message, '5000', 400));
    }
    next();
}