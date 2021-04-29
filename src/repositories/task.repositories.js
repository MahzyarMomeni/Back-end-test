const { TaskModel } = require('../models');
const { taskEntity } = require('../entity');
const AppError = require('../utils/appError');

class TaskRepository {
    constructor() { }

    async insert({ note, status }) {
        try {
            const task = new TaskModel(
                note,
                status
            )
            const taskManager = global.mysqlConnection.manager.create(taskEntity, task);
            await global.mysqlConnection.manager.save(taskManager);
        } catch (error) {
            throw new Error(`Can not insert data into 'task': ${error.message}`);

        }
    }

    async findAll() {
        try {
            const allTask = await global.mysqlConnection.manager.find(taskEntity);
            return allTask;
        } catch (error) {
            throw new Error(`Can not Find Data: ${error.message}`);
        }
    }

    async deleteOne(id) {
        try {
            await global.mysqlConnection.manager.delete(taskEntity, id);
        } catch (error) {
            throw new Error(`Can not Delete Data: ${error.message}`);
        }
    }

    async update(id) {
        try {
            const task = await global.mysqlConnection.manager.findOne(taskEntity, id);
            if (!task) {
                throw new AppError('there is no task with this id...', '4000', 400);
            };
            let status;
            if (task.status == 'todo') {
                status = 'doing';
            }
            else if (task.status == 'doing') {
                status = 'done';
            }
            await global.mysqlConnection.manager.update(taskEntity, id, { status });
            return { 'message': 'task updated successfully.' };
        } catch (error) {
            throw new AppError(error.message, '4000', 400);
        }
    }
}

module.exports = TaskRepository;