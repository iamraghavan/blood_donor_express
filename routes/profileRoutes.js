const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route to create a new profile
router.post('/create', profileController.createProfile);

// Route to get profile by user_id
router.get('/:user_id', profileController.getProfile);

// Route to update profile by user_id
router.put('/:user_id', profileController.updateProfile);

// Route to delete profile by user_id
router.delete('/:user_id', profileController.deleteProfile);

module.exports = router;
