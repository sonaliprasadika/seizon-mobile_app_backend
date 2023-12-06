'use strict';
const db = require('../config/db');
const LevelChallenge = require('../models/levelChallenge');

const addLevelChallenge = async (req, res, next) => {
    try {
        const levelChallengeData = req.body;
        // Create a new User instance using the data from the request body
        const levelChallenge = new LevelChallenge(
            levelChallengeData.challengeId,
            levelChallengeData.challengeName,
            levelChallengeData.challengeType,
            levelChallengeData.startDate,
            levelChallengeData.endDate,
            levelChallengeData.levelId,
            levelChallengeData.challengeDescription,
            levelChallengeData.duration,
            );
        const levelChallengeRef = await db.collection('LevelChallenge').add(JSON.parse(JSON.stringify(levelChallenge)));
        console.log(JSON.parse(JSON.stringify(levelChallenge)))
        res.send(`User record saved successfully with ID: ${levelChallengeRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllGoals = async (req, res, next) => {
    try {
        const users = await db.collection('Goals');
        const data = await users.get();
        const usersArray = [];

        if (data.empty) {
            res.status(404).send('No user records found');
        } else {
            data.forEach(doc => {
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
}

const getAllGoalsByUser = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const userGoals= await db.collection('Goals').where('user_id', '==', userID).get();

        console.log('Number of Documents:', userGoals.docs.length);
        console.log('Document Data:', userGoals.docs.map(doc => doc.data()));

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

const getGoalbyUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const g_id = req.params.g_id;
        
        const querySnapshot = await db.collection('Goals').where('user_id', '==', id).get(g_id);

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

const updateGoal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Goals').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteGoal = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Goals').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLevelChallenge,
    getAllGoals,
    getAllGoalsByUser,
    getGoalbyUser,
    updateGoal,
    deleteGoal
}