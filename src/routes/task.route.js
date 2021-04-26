const express = require('express');
const { taskValidation } = require('../validations');

const router = express.Router();

router.post('/', taskValidation.validateTask);

module.exports = router;