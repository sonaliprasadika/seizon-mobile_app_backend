const express = require('express');
const { manageSession} = require('../controllers/manageSessionController');

const router = express.Router();

router.post('/update-session', manageSession);

module.exports = {
    routes: router
}
