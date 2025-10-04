const express = require('express');
const router = express.Router();
const { registerUser, authUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/me', protect, getProfile);

module.exports = router;
