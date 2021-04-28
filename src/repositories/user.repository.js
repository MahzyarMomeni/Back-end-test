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

    async findUser(body) {
        try {
            let user = await global.mysqlConnection.manager.findOne(userEntity, { username: body.username });
            if (!user) {
                user = await global.mysqlConnection.manager.findOne(userEntity, { email: body.email });
                if (!user) {
                    user = await global.mysqlConnection.manager.findOne(userEntity, { phoneNumber: body.phoneNumber });
                    if (!user) {
                        return undefined;
                    }
                }
            }
            return user;
        } catch (error) {
            throw new Error(`Can not Find Data: ${error.message}`);
        }
    }
}

module.exports = UserRepository;