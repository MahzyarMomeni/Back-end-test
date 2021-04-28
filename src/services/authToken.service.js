const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

exports.generateAuthToken = function (user) {
    try {
        let token;
        if (user.username) {
            token = jwt.sign({
                data: user.username
            }, 'jwtPrivateKey', { expiresIn: 30 });
        } else if (user.email) {
            token = jwt.sign({
                data: user.email
            }, 'jwtPrivateKey', { expiresIn: 30 });
        } else if (user.phoneNumber) {
            token = jwt.sign({
                data: user.phoneNumber
            }, 'jwtPrivateKey', { expiresIn: 30 });
        } else {
            next(new appError('can not generate token', '5000', 400));
        }
        return token;
    } catch (error) {
        next(new appError(error.message, '5000', 400));
    }
    next();
}