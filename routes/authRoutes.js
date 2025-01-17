const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Register route
router.post('/register', apiKeyMiddleware, userController.register);
router.post('/login', apiKeyMiddleware, userController.login);


// Send reset password email
router.post('/send-reset-email', authController.sendResetPasswordEmail);

// Render reset password page
router.get('/reset-password', authController.renderResetPasswordPage);

// Handle password reset
router.post('/reset-password', authController.resetPassword);

module.exports = router;
