const express = require('express');
const { manageSession,
    updateChallenge
     } = require('../controllers/manageSessionController');

const router = express.Router();

//User Schema

router.post('/update-goal-session', manageSession);
router.post('/update-challenge-session', updateChallenge);

module.exports = {
    routes: router
}
