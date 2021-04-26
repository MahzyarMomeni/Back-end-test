const express = require('express');
const { taskValidation } = require('../validations');
const { taskController } = require('../controllers');

const router = express.Router();

router.post('/', taskValidation.validateTask, taskController.addTask);

module.exports = router;