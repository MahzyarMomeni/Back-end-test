const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

exports.auth = function (req, res, next) {
    const token = req.header.authorization;
    if (!token) next(new appError('Access denided. No token provided...!', '5000', 401));
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        next();
    } catch {
        next(new appError('Invalid token.', '5000', 400));
    }
    next();
}