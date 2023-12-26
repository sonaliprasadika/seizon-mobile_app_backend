const express = require('express');
const {addUserChallenge, 
        getAllUserChallengesByUser, 
        getUserChallengesbyUser,
        updateUserChallenge,
        deleteUserChallenge
      } = require('../controllers/userChallengeController');

const router = express.Router();

router.post('/userChallenge', addUserChallenge);
router.get('/userChallenges-by-user', getAllUserChallengesByUser);
router.get('/userChallenge-by-user/:challenge_id', getUserChallengesbyUser);
router.put('/userChallenge/:id', updateUserChallenge);
router.delete('/userChallenge/:id', deleteUserChallenge);


module.exports = {
    routes: router
}