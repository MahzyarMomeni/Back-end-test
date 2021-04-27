const Joi = require('joi');
const AppError = require('../utils/appError');

exports.validateUser = async (req, res, next) => {
    try {
        const bodySchema = Joi.object().keys({
            username: Joi.string(),
            email: Joi.string().email(),
            phoneNumber: Joi.string(),
            password: Joi.string().required()
        })
        await bodySchema.validateAsync(req.body);
    } catch (error) {
        next(new AppError(error.message, '1000', 400));
    }
    next();
}