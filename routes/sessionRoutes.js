const express = require('express');
const { manageSession } = require('../controllers/manageSessionController');

const router = express.Router();

//User Schema

router.post('/update-goal-session', manageSession);


module.exports = {
    routes: router
}