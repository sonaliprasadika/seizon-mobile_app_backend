const express = require('express');
const LevelController = require('../controllers/levelControler');

const router = express.Router();

// Define routes for the Level resource
router.get('/levels', LevelController.getAllLevels);
router.get('/levels/:id', LevelController.getLevelById);
router.post('/levels', LevelController.addLevel);
router.put('/levels/:id', LevelController.updateLevel);
router.delete('/levels/:id', LevelController.deleteLevel);

module.exports = {
    routes: router
}
