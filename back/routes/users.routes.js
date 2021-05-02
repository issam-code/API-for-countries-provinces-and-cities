const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const User = require('../controllers/user.controller')

router.post('/users/create',User.addUser );
router.post('/users/login',User.Login );
router.get('/users/me',auth,User.getUser );


module.exports = router;