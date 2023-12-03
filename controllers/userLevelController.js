'use strict';
const db = require('../config/db');
const UserLevel = require('../models/userLevel');

const addUserLevel = async (req, res, next) => {
    try {
        const userLevelData = req.body;
        // Create a new User instance using the data from the request body
        const userLevel = new UserLevel(
            userLevelData.user_level_id,
            userLevelData.user_id,
            userLevelData.level_id,
            userLevelData.collected_points
            );
        const userLevelRef = await db.collection('UserLevel').add(JSON.parse(JSON.stringify(userLevel)));
        console.log(JSON.parse(JSON.stringify(userLevel)))
        res.send(`User record saved successfully with ID: ${userLevelRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLevelbyUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const g_id = req.params.id;
        console.log(id)
        console.log(g_id)
        const querySnapshot = await db.collection('UserLevel').where('user_id', '==', id).get(g_id);

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

const updateUserLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('UserLevel').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUserLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('UserLevel').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUserLevel,
    getLevelbyUser,
    updateUserLevel,
    deleteUserLevel
}