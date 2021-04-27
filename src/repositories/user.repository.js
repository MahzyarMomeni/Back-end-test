const { UserModel } = require('../models');
const { userEntity } = require('../entity');

class UserRepository {
    constructor() { }

    async insert({ username, email, phoneNumber, password }) {
        try {
            const user = new UserModel(
                username,
                email,
                phoneNumber,
                password
            );
            const userManager = global.mysqlConnection.manager.create(userEntity, user);
            await global.mysqlConnection.manager.save(userManager);
        } catch {
            throw new Error(`Can not insert data into 'user': ${error.message}`);
        }
    }

}