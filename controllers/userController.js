'use strict';
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userRegister = async (req, res, next) => {
    try {
        const userData = req.body;
        // Create a new User instance using the data from the request body
        const hashedPassword = await hashPassword(userData.password);
        const user = new User(
            userData.username,
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.user_language,
            userData.height,
            userData.weight,
            userData.age,
            userData.gender,
            hashedPassword,
            userData.user_level,
            userData.total_steps,
            userData.xp_points
        );

        const usersCollection = await db.collection('Users'); 
        const querySnapshot = await usersCollection.where('email', '==', userData.email).get();
    
        if (querySnapshot.empty) {
            const userResponse = await usersCollection.add(JSON.parse(JSON.stringify(user)));

            const levelRef= await db.collection('Levels').where('level_name', '==', 'Level_1').get();
            const lowerLevelId = levelRef.docs.map(doc => doc.id);

            const levelChallengesRef = await db.collection('LevelChallenge').where('level_id', '==', lowerLevelId[0]).get()
            const levelChallengeIds = levelChallengesRef.docs.map(doc=>doc.id)

            for (const challengeID of levelChallengeIds) {
                const levelRef =  await db.collection('LevelChallenge').doc(challengeID);
                const levelChallengeData = await levelRef.get();
                await db.collection('UserChallenge').add({
                    user_id: userResponse.id,
                    externel_challenge_id: challengeID,
                    challenge_progress: 'INCOMPLETE',
                    remaining_time: levelChallengeData.data().duration,
                    challenge_type: levelChallengeData.data().challenge_type,
                    xp_points: levelChallengeData.data().xp_points,
                });
            }

            const commonChallengesRef = await db.collection('CommonChallenge').get()
            const commoChallengeIds = commonChallengesRef.docs.map(doc=>doc.id)
            for (const challengeID of commoChallengeIds) {
                const CommonChallengeRef =  await db.collection('CommonChallenge').doc(challengeID);
                const commonChallengeData = await CommonChallengeRef.get();
                await db.collection('UserChallenge').add({
                    user_id: userResponse.id,
                    externel_challenge_id: challengeID,
                    challenge_progress: 'INCOMPLETE',
                    remaining_time: commonChallengeData.data().duration,
                    challenge_type: commonChallengeData.data().challenge_type,
                    xp_points: commonChallengeData.data().xp_points,
                });
            }

                   
            var token = jwt.sign({ id: userResponse.id }, process.env.ACCESS_TOKEN_SECRET);
            const userDoc = await userResponse.get();
            const data = userDoc.data();
            data.token = token
            
            res.status(200).send(data);
        } else {
            // User with the provided email does not exist
            res.status(400).send({error: 'User already exists'});
        }

        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const userLogin = async (req, res, next) => {
    try{
        const userData = req.body;
        const usersCollection = await db.collection('Users');
        const querySnapshot = await usersCollection.where('email', '==', userData.email).get();
    
        if (querySnapshot.empty) {
            res.status(404).send('Invalid user email');
        } else {
            const userDoc = querySnapshot.docs[0];
            const user = userDoc.data(); 
            const isTrue = bcrypt.compareSync(userData.password, user.password)
            if(isTrue === true){
                const userId = userDoc.id;
                var token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET);
                user.token = token
                res.status(200).send(user)
            }else{
                res.status(404).send('Invalid password'); 
            }
        }        
    }catch(error){
        res.status(400).send(error.message);
    }
}

// Function to hash a password
async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.collection('Users');
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

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.collection('Users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    userRegister,
    userLogin,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}