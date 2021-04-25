require('dotenv').config();
const winston = require('winston');
const express = require('express');

const v1Routes = require('./routes');
const { PORT } = require('./config/keys');

const app = express();
app.use(express.json());
app.use('/v1', v1Routes);

app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
