const { EntitySchema } = require('typeorm');
const { UserModel } = require('../models');

module.exports = new EntitySchema({
    name: 'User',
    target: UserModel,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar',
            unique: true
        },
        email: {
            type: 'varchar',
            unique: true
        },
        phoneNumber: {
            type: 'varchar',
            unique: true
        },
        password: {
            type: 'varchar'
        }
    }
})