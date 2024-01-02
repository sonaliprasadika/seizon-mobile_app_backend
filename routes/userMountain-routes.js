const express = require('express');
const {addMountainToUser} = require('../controllers/userMountainController');

const router = express.Router();

router.post('/addMountainToUser', addMountainToUser);

module.exports = {
    routes: router
}