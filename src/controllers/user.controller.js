const asyncHandler = require('express-async-handler');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/appError');

exports.addUser = asyncHandler(async (req, res, next) => {
    try {
        const userRepository = new UserRepository();
        let userExist = await userRepository.findUser(req.body);
        if (!userExist) {
            throw new Error('user already exist');
        }
        await userRepository.insert(req.body);
        res.status(200).send(req.body);
    } catch (error) {
        next(new AppError(error.message, '3000', 400));
    }
    next();
})