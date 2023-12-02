const express = require('express');
const {
    addLevel,
    getAllLevels,
    getLevelById,
    updateLevel,
    deleteLevel
    } = require('../controllers/levelControler');

const router = express.Router();

// Define routes for the Level resource
router.post('/levels', addLevel);
router.get('/levels', getAllLevels);
router.get('/level/:id', getLevelById);
router.put('/level/:id', updateLevel);
router.delete('/level/:id', deleteLevel);

module.exports = {
    routes: router
}
