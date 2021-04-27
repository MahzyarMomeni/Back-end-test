const express = require('express');
const { userValidation } = require('../validations');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/signup', userValidation, userController);