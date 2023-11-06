'use strict';
const db = require('../config/db');
const User = require('../models/user');


const addUser = async (req, res, next) => {
    try {
        const userData = req.body;
        // Create a new User instance using the data from the request body
        const user = new User(
        userData.username,
        userData.firstName,
        userData.lastName,
        userData.user_language,
        userData.height,
        userData.weight,
        userData.age,
        userData.gender,
        userData.password,
        userData.user_level,
        userData.total_steps
        );
        const userRef = await db.collection('Users').add(JSON.parse(JSON.stringify(user)));
    res.send(`User record saved successfully with ID: ${userRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.collection('Users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().user_language,
                    doc.data().height,
                    doc.data().weight,
                    doc.data().age,
                    doc.data().gender,
                    doc.data().password,
                    doc.data().user_level,
                    doc.data().total_steps,
                    doc.data().user_language
                );
                usersArraysArray.push(user);
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
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}