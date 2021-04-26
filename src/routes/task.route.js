const express = require('express');
const { taskValidation } = require('../validations');
const { taskController } = require('../controllers');

const router = express.Router();

router.post('/', taskValidation.validateTask, taskController.addTask);
router.get('/', taskController.getTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;