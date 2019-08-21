
const express = require('express');
const router = express.Router();
const cors = require('cors');
const apiFunctions = require('./apiFunctions');

router.use(express.json());
router.use(cors());
router.use('/', apiFunctions);


module.exports = router