const express = require('express');
const {addFriend, getAllReceivedFriendRequests, getAllSentFriendRequests, getAllFriends, acceptFriendRequest, declineFriendRequest} = require('../controllers/friendController');

const router = express.Router();

router.post('/addFriend', addFriend);
router.get('/receivedRequests', getAllReceivedFriendRequests);
router.get('/sentRequests', getAllSentFriendRequests);
router.get('/friends', getAllFriends);
router.post('/acceptRequest', acceptFriendRequest);
router.post('/declineRequest', declineFriendRequest);

module.exports = {
    routes: router
}