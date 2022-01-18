const express = require('express');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;
