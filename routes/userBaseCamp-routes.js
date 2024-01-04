const express = require('express');
const {
    addUserBaseCamp,
    getUserBaseCampByUser,
    updateUserBaseCamp,
    deleteUserBaseCamp
    } = require('../controllers/userBaseCampController');

const router = express.Router();


// Define routes for the user base camp resource
router.post('/userBaseCamps', addUserBaseCamp);
router.get('/userBaseCamps/:id', getUserBaseCampByUser);
router.put('/userBaseCamps', updateUserBaseCamp);
router.delete('/userBaseCamps/:id', deleteUserBaseCamp);

module.exports = {
    routes: router
}
