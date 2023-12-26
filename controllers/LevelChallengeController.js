'use strict';
const db = require('../config/db');
const LevelChallenge = require('../models/levelChallenge');

const addLevelChallenge = async (req, res, next) => {
    try {
        const levelChallengeData = req.body;
        // Create a new User instance using the data from the request body
        const levelChallenge = new LevelChallenge(
            levelChallengeData.challenge_id,
            levelChallengeData.challenge_name,
            levelChallengeData.challenge_type,
            levelChallengeData.start_date,
            levelChallengeData.end_date,
            levelChallengeData.level_id,
            levelChallengeData.challenge_description,
            levelChallengeData.duration,
            );
        const levelChallengeRef = await db.collection('LevelChallenge').add(JSON.parse(JSON.stringify(levelChallenge)));
        console.log(JSON.parse(JSON.stringify(levelChallenge)))
        res.send(`User record saved successfully with ID: ${levelChallengeRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllLevelChallenges = async (req, res, next) => {
    try {
        const users = await db.collection('LevelChallenge');
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

const getLevelChallengesByLevel = async (req, res, next) => {
    try {
        const level_id = req.params.id;
        const users = await db.collection('LevelChallenge').where('level_id', '==', level_id);
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
};

const updateLevelChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('LevelChallenge').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLevelChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('LevelChallenge').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLevelChallenge,
    getAllLevelChallenges,
    getLevelChallengesByLevel,
    updateLevelChallenge,
    deleteLevelChallenge
}