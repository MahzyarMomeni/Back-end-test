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
        } catch {
            throw new Error(`Can not Delete Data: ${error.message}`);
        }
    }

    async update(id) {
        try {
            const task = await global.mysqlConnection.manager.findOne(taskEntity);
            if (task.status == 'todo') {
                task.status = 'doing';
            }
            else if (task.status == 'doing') {
                task.status = 'done';
            }
            const newTask = await global.mysqlConnection.manager.update(taskEntity, id, task.status);
            return newTask;
        } catch (error) {
            throw new Error(`Can not Update Data: ${error.message}`);
        }
    }
}

module.exports = TaskRepository;