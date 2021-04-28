const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { UserRepository } = require('../repositories');
const AppError = require('../utils/appError');

exports.addUser = asyncHandler(async (req, res, next) => {
    try {
        const userRepository = new UserRepository();
        let user = await userRepository.findUser(req.body);
        if (user) {
            throw new Error('user already exist');
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await userRepository.insert(req.body);
        res.status(200).send(_.pick(req.body, ['id', 'username', 'email', 'phoneNumber']));
    } catch (error) {
        next(new AppError(error.message, '3000', 400));
    }
    next();
})