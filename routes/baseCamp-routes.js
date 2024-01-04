const express = require('express');
const {
    addBaseCamp,
    getAllBaseCamps,
    getBaseCampByID,
    updateBaseCamp,
    deleteBaseCamp
    } = require('../controllers/baseCampController');

const router = express.Router();

// Define routes for the Base Camp resource
router.post('/baseCamps', addBaseCamp);
router.get('/baseCamps', getAllBaseCamps);
router.get('/baseCamp/:id', getBaseCampByID);
router.put('/baseCamp/:id', updateBaseCamp);
router.delete('/baseCamp/:id', deleteBaseCamp);

module.exports = {
    routes: router
}
