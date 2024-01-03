'use strict';
const db = require('../config/db');
const UserChallenge = require('../models/userChallenge');

const addUserChallenge = async (req, res, next) => {
    try {
        const userChallengeData = req.body;
        const userID = req.user.id;
        // Create a new User instance using the data from the request body
        const userChallenge = new UserChallenge(
            userChallengeData.challenge_id,
            userChallengeData.challenge_name,
            userChallengeData.challenge_type,
            userChallengeData.start_date,
            userChallengeData.end_date,
            userID,
            userChallengeData.externel_challenge_id,
            userChallengeData.challenge_progress,
            userChallengeData.remaining_time,
            );
        const userChallengeRef = await db.collection('UserChallenge').add(JSON.parse(JSON.stringify(userChallenge)));
        console.log(JSON.parse(JSON.stringify(userChallenge)))
        res.send(`User record saved successfully with ID: ${userChallengeRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUserChallengesByUser = async (req, res, next) => {
    try {
        const userID = req.user.id;
        const userGoals= await db.collection('UserChallenge').where('user_id', '==', userID).get();

        if (userGoals.empty) {
            console.log(`No user record found with id: ${userID}`);
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

const getUserChallengesbyUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const challenge_id = req.params.challenge_id;
        
        const querySnapshot = await db.collection('UserChallenge').where('user_id', '==', id).get(challenge_id);

        if (querySnapshot.empty) {
            res.status(404).send('User with the given ID and Goal ID not found');
        } else {
            const documentData = querySnapshot.docs[0].data();
            res.send(documentData);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error updating level');
    }
};

const updateUserChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('UserChallenge').doc(id);
        await user.update(data);
        res.send('Record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUserChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('UserChallenge').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUserChallenge,
    getAllUserChallengesByUser,
    getUserChallengesbyUser,
    updateUserChallenge,
    deleteUserChallenge
}