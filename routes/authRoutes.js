const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const userController = require('../controllers/userController');

// Register route
router.post('/register', apiKeyMiddleware, userController.register);
router.post('/login', apiKeyMiddleware, userController.login);

module.exports = router;
