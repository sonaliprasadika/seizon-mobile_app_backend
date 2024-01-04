const express = require('express');
const {addMountainToUser} = require('../controllers/userMountainController');

const router = express.Router();

router.post('/userMountain', addMountainToUser);

module.exports = {
    routes: router
}