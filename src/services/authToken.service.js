const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { JWT_SECRET_KEY } = require('../config/keys');

exports.generateAuthToken = function (user) {
    try {
        let accessToken;
        let refreshToken;
        if (user.username) {
            accessToken = jwt.sign({
                data: user.username
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });

            refreshToken = jwt.sign({
                data: user.username
            }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        } else if (user.email) {
            accessToken = jwt.sign({
                data: user.email
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });

            refreshToken = jwt.sign({
                data: user.username
            }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        } else if (user.phoneNumber) {
            accessToken = jwt.sign({
                data: user.phoneNumber
            }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });

            refreshToken = jwt.sign({
                data: user.username
            }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        } else {
            throw new Error('can not generate token...');
        }
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.refreshToken = function (user) {
    try {
        let accessToken;
        let refreshToken;
        accessToken = jwt.sign({
            data: user
        }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });

        refreshToken = jwt.sign({
            data: user
        }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    }
}
