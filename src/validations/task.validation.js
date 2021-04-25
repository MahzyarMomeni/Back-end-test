const Joi = require('Joi');

exports.validateTask = async (req, res, next) => {
    try {
        const bodySchema = Joi.object.keys({
            note: Joi.string().required(),
            status: Joi.string().valid('todo').required()
        });
        await bodySchema.validateAsync(req.body);
    } catch (error) {

    }
    next();
}