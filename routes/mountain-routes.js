const express = require('express');
const {createMountain, getAllMountains, updateMountain, deleteMountain} = require('../controllers/mountainController');

const router = express.Router();

router.post('/createMountain', createMountain);
router.get('/getAllMountains', getAllMountains);
router.put('/updateMountain', updateMountain);
router.delete('/deleteMountain', deleteMountain);

module.exports = {
    routes: router
}