const express = require('express');
const {addFriendChallenge, 
        getAllFriendChallengesByFriendId, 
        getFriendChallengebyFriendId,
        updateFriendChallenge,
        deleteFriendChallenge
      } = require('../controllers/friendChallengeController');

const router = express.Router();

router.post('/freindChallenge', addFriendChallenge);
router.get('/freindChallenge-by-friend/:id/', getAllFriendChallengesByFriendId);
router.get('/freindChallenge-by-friend/:id/:freind_id', getFriendChallengebyFriendId);
router.put('/freindChallenge/:id', updateFriendChallenge);
router.delete('/freindChallenge/:id', deleteFriendChallenge);


module.exports = {
    routes: router
}