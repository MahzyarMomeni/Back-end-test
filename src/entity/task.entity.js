const { EntitySchema } = require('typeorm');
const { TaskModel } = require('../models');

module.exports = new EntitySchema({
    name: 'Task',
    target: TaskModel,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        note: {
            type: 'text',
            required: true
        },
        status: {
            type: 'text',
            required: true
        }
    }
})