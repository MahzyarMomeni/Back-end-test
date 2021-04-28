const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserRepository } = require('../repositories');
const appError = require('../utils/appError');
const { getToken } = require('../services');

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

        // const token = user.generateAuthToken();
        // var token = jwt.sign({ username: user.username }, 'jwtprivatekey');
        let token = getToken.generateAuthToken(user);

        res.status(200).json({ 'access token': token });

    } catch (error) {
        next(new appError(error.message, '5000', 401));
    }
    next();
})