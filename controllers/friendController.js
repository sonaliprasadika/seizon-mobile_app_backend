'use strict';
const db = require('../config/db');
const Friends = require('../models/friends');

const addFriend = async (req, res, next) => {
    try {
        // req body -> friend_user_id
        const friendRequestData = req.body;
        const userID = req.user.id;

        //check the user with friend_user_id exist
        const recivedFriendID = await db.collection('Users').doc(friendRequestData.friend_user_id);

        if (recivedFriendID.empty) {
            console.log(`No user records found with id: ${userID}`);
            res.status(404).send('User with the given ID not found');
        }else {
            const friendRequest = new Friends(
                userID,
                friendRequestData.friend_user_id,
                'pending',
                friendRequestData.recipient
            );
    
            const friendReqRef = await db.collection('UserFriends').add(JSON.parse(JSON.stringify(friendRequest)));       
    
            // Update the same record to include the received doc ID
            await db.collection('UserFriends').doc(friendReqRef.id).update({
                doc_id: friendReqRef.id
            });

            res.send(`Friends request record saved successfully with ID: ${friendReqRef.id}`);
        }       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// if recieved -> user ID should be in the friend_user_id field
const getAllReceivedFriendRequests = async (req, res, next) => {
    try {
        const userID = req.user.id;
        const target = 'friend_user_id'
        getAllRequests(res, target, userID)       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllSentFriendRequests = async (req, res, next) => {
    try {
        const userID = req.user.id;
        const target = 'user_id'
        getAllRequests(res, target, userID)       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllRequests = async (res, target, userID) => {

    const requestsArray = [];

    const friendReqs = await db.collection('UserFriends').where(`${target}`, '==', userID).where('friendship_status', '==', "pending").get();

        if (friendReqs.empty) {
            res.status(404).send(`No friend requests records found with id: ${userID}`);
        }else {
            friendReqs.forEach(doc => {
                const requestData = {};
                const docData = doc.data();
                
                for (const key in docData) {
                    if (docData.hasOwnProperty(key)) {
                        requestData[key] = docData[key];
                    }
                }
                requestsArray.push(requestData);
            });

            res.send(requestsArray);
        }       
}


const getAllFriends = async (req, res, next) => {

    try {
        const userID = req.user.id;     
        const friendsArray = [];
    
        const friends = await db.collection('UserFriends').where('user_id', '==', userID).where('friendship_status', '==', 'accepted').get();
    
            if (friends.empty) {
                res.status(404).send(`No friend requests records found with id: ${userID}`);
            }else {
                friends.forEach(doc => {
                    const requestData = {};
                    const docData = doc.data();
                    
                    for (const key in docData) {
                        if (docData.hasOwnProperty(key)) {
                            requestData[key] = docData[key];
                        }
                    }
                    friendsArray.push(requestData);
                });
    
                res.send(friendsArray);
            }       
    } catch (error) {
        res.status(400).send(error.message);
    }

}

// accept or decline request
const acceptFriendRequest = async (req, res, next) => {

    try {
        const requestID = req.body.doc_id;
        const userID = req.user.id;
        
        handleFriendRequest(res, userID, requestID, 'accepted')    
              
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const declineFriendRequest = async (req, res, next) => {

    try {
        const requestID = req.body.doc_id;
        const userID = req.user.id;
        
        handleFriendRequest(res, userID, requestID, 'declined')    
              
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const handleFriendRequest = async (res, userID, doc_id, decision) => {
    
        const requestQS = await db.collection('UserFriends').doc(doc_id);
        
        //check the user with friend_user_id exist
        if (requestQS.empty) {
            console.log(`No friends records found with id: ${userID}`);
            res.status(404).send('Friend with the given ID not found');
        }else {

            await requestQS.update({
                friendship_status: `${decision}`
            });

            res.send(`Friends request ${decision}`);
        } 
}

module.exports = {
    addFriend,
    getAllReceivedFriendRequests,
    getAllSentFriendRequests,
    getAllFriends,
    acceptFriendRequest,
    declineFriendRequest
}