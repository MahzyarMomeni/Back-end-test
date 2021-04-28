const express = require('express');
const { userValidation } = require('../validations');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/login', userValidation.validateUser, loginController.login);
router.post('/refresh-token', userValidation.validateUser, loginController.refreshToken);

module.exports = router;