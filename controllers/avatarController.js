'use strict';
const db = require('../config/db');
const User = require('../models/avatar');


const addAvatar = async (req, res, next) => {
    try {
        const AvatarData = req.body;
        const userID = req.user.id;
        // Create a new User instance using the data from the request body
        const avatar = new User(
        userID,
        AvatarData.gender
        );
        const userRef = await db.collection('Avatars').add(JSON.parse(JSON.stringify(avatar)));
    res.send(`User record saved successfully with ID: ${userRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAvatar = async (req, res, next) => {
    try {
        const id = req.user.id;
        
        const querySnapshot = await db.collection('Avatars').where('user_id', '==', id).get();

        if (querySnapshot.empty) {
            res.status(404).send('Avatar not found');
        } else {
            const documentData = querySnapshot.docs[0].data();
            res.send(documentData);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error updating level');
    }
};


const updateAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Avatars').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Avatars').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAvatar,
    getAvatar,
    updateAvatar,
    deleteAvatar
}