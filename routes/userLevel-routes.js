const express = require('express');
const {
    addUserLevel,
    getLevelbyUser,
    updateUserLevel,
    deleteUserLevel
    } = require('../controllers/userLevelController');

const router = express.Router();

// Define routes for the Level resource
router.post('/userLevels', addUserLevel);
router.get('/userLevels/:id', getLevelbyUser);
router.put('/userLevels/:id', updateUserLevel);
router.delete('/userLevels/:id', deleteUserLevel);

module.exports = {
    routes: router
}
