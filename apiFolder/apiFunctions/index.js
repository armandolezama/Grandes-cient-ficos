const express = require('express');
const router = express.Router();
const home = require('./home');
const signin = require('./signin');
const login = require('./login');
const logout = require('./Firebase/logout');
// const admin = require('./AdminFunctions');
const client = require('./ClientFunctions');


// router.use('/admin', admin);
router.use('/client', client);
router.get('/home', home);
router.post('/signin', signin);
router.post('/login', login);
router.post('/logout', logout);


module.exports = router;
