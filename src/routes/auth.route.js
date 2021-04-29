const express = require('express');
const { userValidation } = require('../validations');
const { loginController } = require('../controllers');
const { authentication } = require('../middlewares');


const router = express.Router();

router.post('/login', userValidation.validateUser, loginController.login);
router.post('/refresh-token', authentication.auth, loginController.refreshToken);

module.exports = router;