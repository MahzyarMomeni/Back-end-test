const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const AppError = require('../utils/appError');
const { JWT_SECRET_KEY } = require('./config/keys');

exports.generateAuthToken = function (user) {
    try {
        let token;
        if (user.username) {
            token = jwt.sign({
                data: user.username
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });
        } else if (user.email) {
            token = jwt.sign({
                data: user.email
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });
        } else if (user.phoneNumber) {
            token = jwt.sign({
                data: user.phoneNumber
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });
        } else {
            throw new Error('can not generate token...');
        }
        return token;
    } catch (error) {
        next(new AppError(error.message, '5000', 400));
    }
    next();
}

exports.generateRefreshToken = function (user) {
    var refreshTokens = {};
    var refreshToken = randtoken.uid(256);
    if (user.username) {
        refreshTokens[refreshToken] = user.username;
    } else if (user.email) {
        refreshTokens[refreshToken] = user.email;
    } else if (user.phoneNumber) {
        refreshTokens[refreshToken] = user.phoneNumber;
    } else {
        throw new Error('can not generate refresh token...');
    }
    return { refreshToken: refreshToken };

}