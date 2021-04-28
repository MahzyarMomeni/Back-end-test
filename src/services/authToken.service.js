const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

exports.generateAuthToken = function (user) {
    try {
        let token;
        if (user.username) {
            token = jwt.sign({ username: user.username }, 'jwtprivatekey');
        } else if (user.email) {
            token = jwt.sign({ email: user.email }, 'jwtprivatekey');
        } else if (user.phoneNumber) {
            token = jwt.sign({ username: user.phoneNumber }, 'jwtprivatekey');
        } else {
            next(new appError('can not generate token', '5000', 400));
        }
        return token;
    } catch (error) {
        next(new appError(error.message, '5000', 400));
    }
    next();
}