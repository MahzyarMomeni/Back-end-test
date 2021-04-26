require('reflect-metadata');
const typeorm = require('typeorm');

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = require('./keys');

const mysqlConnection = typeorm.createConnection({
    name: 'MySQL Connection',
    type: 'mysql',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    synchronize: false,
    entities: ['src/entity/task.entity.js', 'src/entity/user.entity.js'],
    cli: { entitiesDir: 'src/entity' },
});

module.exports = mysqlConnection;