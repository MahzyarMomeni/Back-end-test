const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const { UserRepository } = require('../repositories');
const { getToken } = require('../services');
const appError = require('../utils/appError');
const AppError = require('../utils/appError');

exports.login = asyncHandler(async (req, res, next) => {
    try {
        const userRepository = new UserRepository();
        let user = await userRepository.findUser(req.body);
        if (!user) {
            throw new Error('invalid username or email or phoneNumber');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw new Error('invalid password');
        };

        let token = getToken.generateAuthToken(user);

        res.status(200).json({ 'access_token': token });

    } catch (error) {
        next(new appError(error.message, '5000', 401));
    }
    next();
})

exports.refreshToken = asyncHandler(async (req, res, next) => {
    try {

        var refreshToken = getToken.generateRefreshToken(req.headers.authorization);
        res.status(200).json(refreshToken);
    } catch (error) {
        next(new AppError(errro.message, '4000', 400));
    }
})