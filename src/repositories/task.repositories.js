const { TaskModel } = require('../models');
const { taskEntity } = require('../entity');

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
        } catch {
            throw new Error(`Can not insert data into 'task': ${error.message}`);

        }
    }
}

module.exports = TaskRepository;