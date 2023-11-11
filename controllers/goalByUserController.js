'use strict';
const db = require('../config/db');
const GoalsByUser = require('../models/goalByUser');

const addGoalByUser = async (req, res, next) => {
    try {
        const goalData = req.body;
        // Create a new User instance using the data from the request body
        const goalByUser = new GoalsByUser(
        goalData.user_id,
        goalData.goal_id,
        );
        const goalRef = await db.collection('Goals-by-user').add(JSON.parse(JSON.stringify(goalByUser)));
        
    res.send(`User record saved successfully with ID: ${goalRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllGoalsByUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userSnapshot = await db.collection('Goals-by-user').where('user_id', '==', id).get();

        console.log('Number of Documents:', userSnapshot.docs.length);
        console.log('Document Data:', userSnapshot.docs.map(doc => doc.data()));

        if (userSnapshot.empty) {
            console.log(`No user record found with id: ${id}`);
            return res.status(404).send('No user records found');
        }

        const goals = [];

        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(userSnapshot.docs.map(async (doc) => {
            const data = doc.data();

            if (data.goal_id) {
                const goal_id = data.goal_id;
                console.log('Goal ID:', goal_id);

                const goalSnapshot = await db.collection('Goals').doc(goal_id).get();

                if (goalSnapshot.exists) {
                    console.log('Document Data:', goalSnapshot.data());
                    goals.push(goalSnapshot.data());
                }
            }
        }));

        console.log(goals);
        res.send(goals);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const getGoalbyUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const goal_id = req.params.id;
        const userSnapshot = await db.collection('Goals-by-user').where('user_id', '==', id).get();

        console.log('Number of Documents:', userSnapshot.docs.length);
        console.log('Document Data:', userSnapshot.docs.map(doc => doc.data()));

        if (userSnapshot.empty) {
            console.log(`No user record found with id: ${id}`);
            return res.status(404).send('No user records found');
        }

        const goals = [];

        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(userSnapshot.docs.map(async (doc) => {
            const data = doc.data();

            if (data.goal_id) {
                const goal_id = data.goal_id;
                console.log('Goal ID:', goal_id);

                const goalSnapshot = await db.collection('Goals').doc(goal_id).get();

                if (goalSnapshot.exists) {
                    console.log('Document Data:', goalSnapshot.data());
                    goals.push(goalSnapshot.data());
                }
            }
        }));

        console.log(goals);
        res.send(goals);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const updateGoalbyUser = async (req, res, next) => {
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

const deleteGoalbyUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Goals').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addGoalByUser,
    getAllGoalsByUser,
    getGoalbyUser,
    updateGoalbyUser,
    deleteGoalbyUser
}