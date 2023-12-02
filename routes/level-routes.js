const express = require('express');
const {
    addLevel
    } = require('../controllers/levelControler');

const router = express.Router();

// Define routes for the Level resource
router.post('/levels', addLevel);
// router.get('/levels', LevelController.getAllLevels);
// router.get('/levels/:id', LevelController.getLevelById);
// router.put('/levels/:id', LevelController.updateLevel);
// router.delete('/levels/:id', LevelController.deleteLevel);

module.exports = {
    routes: router
}
