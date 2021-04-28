const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.auth = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) next(new AppError('Access denided. No token provided...!', '5000', 401));
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
    } catch (error) {
        next(new AppError(error.message, '5000', 400));
    }
    next();
}