const express = require('express');
const router = express.Router();
const home = require('./home');
const signin = require('./signin');
const login = require('./login')


router.get('/home', home);
router.post('/signin', signin);
router.post('/login', login)
// router.use('/public', public);

module.exports = router;
