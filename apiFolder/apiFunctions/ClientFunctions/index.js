const express = require('express');
const router = express.Router();
const sendOpinion = require('./sendOpinion')

router.post('/send-opinion', sendOpinion);



module.exports = router