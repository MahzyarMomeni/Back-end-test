const Joi = require('joi');
const AppError = require('../utils/appError');
exports.validateTask = async (req, res, next) => {
    try {
        const bodySchema = Joi.object().keys({
            note: Joi.string().required(),
            status: Joi.string().valid('todo').required()
        });
        await bodySchema.validateAsync(req.body);
    } catch (error) {
        // res.status(error.status).send(error);
        next(new AppError(error.message, '20010031', 400));
        // throw new AppError(error.message, '1000', 400);
    }
    next();
}