const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', signupUser);

// ✅ Add this route for login
// @route   POST /api/auth/login
// @desc    Authenticate user and return token
router.post('/login', loginUser);

module.exports = router;
