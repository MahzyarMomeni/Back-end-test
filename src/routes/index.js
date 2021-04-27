const express = require('express');
const healthRoute = require('./health.route');
const taskRoute = require('./task.route');
const userRoute = require('./user.route');

const router = express.Router();
router.use('/health', healthRoute);
router.use('/todos', taskRoute);
router.use('/auth', userRoute);

module.exports = router;
