'use strict';
const db = require('../config/db');
const FriendChallenge = require('../models/friendChallenge');

const addFriendChallenge = async (req, res, next) => {
    try {
        const friendChallengeData = req.body;
        // Create a new User instance using the data from the request body
        const friendChallenge = new FriendChallenge(
            friendChallengeData.challenge_id,
            friendChallengeData.challenge_name,
            friendChallengeData.challenge_type,
            friendChallengeData.start_date,
            friendChallengeData.end_date,
            friendChallengeData.friend_id,
            friendChallengeData.challenge_description,
            friendChallengeData.duration,
            friendChallengeData.is_received,
            );
        const friendChallengeRef = await db.collection('FriendChallenge').add(JSON.parse(JSON.stringify(friendChallenge)));
        console.log(JSON.parse(JSON.stringify(friendChallenge)))
        res.send(`User record saved successfully with ID: ${friendChallengeRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFriendChallengesByFriendId = async (req, res, next) => {
    try {
        const friendId = req.params.id;
        const userGoals= await db.collection('FriendChallenge').where('friend_id', '==', Number(friendId)).get();

        if (userGoals.empty) {
            console.log(`No user record found with id: ${friendId}`);
            return res.status(404).send('No user records found');
        }
        const usersArray = [];

        if (userGoals.empty) {
            res.status(404).send('No user records found');
        } else {
            userGoals.forEach(doc => {
                const userData = {};
                const docData = doc.data();
                
                for (const key in docData) {
                    if (docData.hasOwnProperty(key)) {
                        userData[key] = docData[key];
                    }
                }

                usersArray.push(userData);
            });

            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getFriendChallengebyFriendId = async (req, res, next) => {
    try {
        const challengeId = req.params.id;
        const friendId = req.params.freind_id;
        console.log(challengeId)
        console.log(typeof friendId)
        const querySnapshot = await db.collection('FriendChallenge').where('friend_id', '==', Number(friendId)).get(challengeId);
        if (querySnapshot.empty) {
            res.status(404).send('Challenge with the given challenge_Id and friend_Id not found');
        } else {
            const documentData = querySnapshot.docs[0].data();
            res.send(documentData);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error updating level');
    }
};

const updateFriendChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('FriendChallenge').doc(id);
        await user.update(data);
        res.send('Record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFriendChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('FriendChallenge').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addFriendChallenge,
    getAllFriendChallengesByFriendId,
    getFriendChallengebyFriendId,
    updateFriendChallenge,
    deleteFriendChallenge
}