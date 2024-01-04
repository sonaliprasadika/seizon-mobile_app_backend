const express = require('express');
const {createMountain, getAllMountains, updateMountain, deleteMountain} = require('../controllers/mountainController');

const router = express.Router();

router.post('/mountain', createMountain);
router.get('/mountains', getAllMountains);
router.put('/mountain', updateMountain);
router.delete('/mountain', deleteMountain);

module.exports = {
    routes: router
}