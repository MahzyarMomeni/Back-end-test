const asyncHandler = require('express-async-handler');
const { TaskRepository } = require('../repositories');
const { AppError } = require('../utils/appError');

exports.addTask = asyncHandler(async (req, res, next) => {
    const taskrepository = new TaskRepository();
    await taskrepository.insert(req.body);
    res.status(200).send(req.body);
})

exports.getTask = asyncHandler(async (req, res, next) => {
    try {
        const taskrepository = new TaskRepository();
        const allTask = await taskrepository.findAll();
        res.status(200).json(allTask);
    } catch (error) {
        next(new AppError(error.message, 3000, res.status));
    }
})