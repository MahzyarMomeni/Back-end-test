const asyncHandler = require('express-async-handler');
const { TaskRepository } = require('../repositories');

exports.addTask = asyncHandler(async (req, res, next) => {
    const taskrepository = new TaskRepository();
    await taskrepository.insert(req.body);
    res.status(200).send(req.body);
})