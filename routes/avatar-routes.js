const express = require('express');
const {addAvatar,
       getAvatar,
       updateAvatar,
       deleteAvatar
      } = require('../controllers/avatarController');

const router = express.Router();

router.post('/avatar', addAvatar);
router.get('/avatar', getAvatar);
router.put('/avatar/:id', updateAvatar);
router.delete('/avatar/:id', deleteAvatar);


module.exports = {
    routes: router
}