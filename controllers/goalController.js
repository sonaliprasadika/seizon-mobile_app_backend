'use strict';
const db = require('../config/db');
const Goals = require('../models/goals');

const addGoal = async (req, res, next) => {
    try {
        const goalData = req.body;
        // Create a new User instance using the data from the request body
        const goal = new Goals(
        goalData.goal_id,
        goalData.user_id,
        goalData.goal_basis,
        goalData.steps_per_day,
        goalData.steps_per_week,
        goalData.days,
        goalData.calories_to_burn,
        );
        const goalRef = await db.collection('Goals').add(JSON.parse(JSON.stringify(goal)));
    res.send(`User record saved successfully with ID: ${goalRef.id}`);
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

const getGoalbyUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.collection('Goals').doc(id);
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
    addGoal,
    getAllGoals,
    getGoalbyUser,
    updateGoal,
    deleteGoal
}