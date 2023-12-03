const express = require('express');
const {
    addUserLevel
    // getAllLevels,
    // getLevelById,
    // updateLevel,
    // deleteLevel
    } = require('../controllers/userLevelController');

const router = express.Router();

// Define routes for the Level resource
router.post('/userLevels', addUserLevel);
// router.get('/levels', getAllLevels);
// router.get('/level/:id', getLevelById);
// router.put('/level/:id', updateLevel);
// router.delete('/level/:id', deleteLevel);

module.exports = {
    routes: router
}
