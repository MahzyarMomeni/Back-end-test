const asyncHandler = require('express-async-handler');

exports.addTask = asyncHandler(async (req, res, next) => {
    res.status(200).send(req.body);
})