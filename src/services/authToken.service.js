const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { JWT_SECRET_KEY } = require('../config/keys');

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

exports.generateRefreshToken = function (token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti;
        const jwtSignOptions = Object.assign({}, this.options, { jwtid: { expiresIn: 60 * 5 } });
        return jwt.sign(payload, JWT_SECRET_KEY, jwtSignOptions);
    } catch (error) {
        throw (new Error(error.message));

    }
}