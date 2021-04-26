const express = require('express');
const healthRoute = require('./health.route');
const taskRoute = require('./task.route');

const router = express.Router();
router.use('/health', healthRoute);
router.use('/todos', taskRoute);

module.exports = router;
