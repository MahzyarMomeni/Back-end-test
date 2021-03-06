require('dotenv').config();
const winston = require('winston');
const express = require('express');

const v1Routes = require('./routes');
const { PORT } = require('./config/keys');
const { errorMiddleware } = require('./middlewares');
const { mysqlConnection } = require('./config/typeOrm');


const app = express();
app.use(express.json());
app.use('/api/v1', v1Routes);
app.all('*', errorMiddleware.notFoundError);
app.use(errorMiddleware.responseError);

(async () => {
    global.mysqlConnection = await mysqlConnection;
})();

app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
