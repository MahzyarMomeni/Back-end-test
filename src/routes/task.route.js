const express = require('express');
const { taskValidation } = require('../validations');
const { taskController } = require('../controllers');
const { authentication } = require('../middlewares');

const router = express.Router();

router.post('/', authentication.auth, taskValidation.validateTask, taskController.addTask);
router.get('/', authentication.auth, taskController.getTask);
router.delete('/:id', authentication.auth, taskController.deleteTask);
router.put('/:id', authentication.auth, taskController.updateTaske);

module.exports = router;