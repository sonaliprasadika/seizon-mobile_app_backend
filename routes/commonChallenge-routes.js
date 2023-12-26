const express = require('express');
const {addCommonChallenge, 
        getCommonChallenge, 
        updateCommonChallenge,
        deleteCommonChallenge
      } = require('../controllers/commonChallengeController');

const router = express.Router();

router.post('/commonChallenge', addCommonChallenge);
router.get('/commonChallenge/:id/', getCommonChallenge);
router.put('/commonChallenge/:id', updateCommonChallenge);
router.delete('/commonChallenge/:id', deleteCommonChallenge);


module.exports = {
    routes: router
}