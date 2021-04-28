const express = require('express');
const { userValidation } = require('../validations');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/login', userValidation.validateUser, loginController.login);

module.exports = router;