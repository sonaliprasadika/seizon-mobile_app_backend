'use strict';
const db = require('../config/db');
const Level = require('../models/level');

const addLevel = async (req, res) => {   
    try {
        const newLevelData = req.body;
        const newLevel = new Level(
            newLevelData.level_id, 
            newLevelData.xp_points, 
            newLevelData.level_challenge_id, 
            newLevelData.unlockable_item_ids
            );
        const levelRef = await db.collection('Levels').add(JSON.parse(JSON.stringify(newLevel)));
        console.log(JSON.parse(JSON.stringify(newLevel)))
        res.json(`User record saved successfully with ID: ${levelRef.id}`);
    } catch (error) {
        console.error('Error adding level', error);
        res.status(400).json({ error: 'Error adding level' });
    }
}

const getAllLevels = async (req, res) => {
    try {
        const users = await db.collection('Levels');
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

const getLevelById = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelDoc = await db.collection('Levels').doc(levelId).get();
        if (!levelDoc.exists) {
            res.status(404).json({ error: 'Level not found' });
        } else {
            res.json(levelDoc.data());
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting level' });
    }
}

const updateLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Levels').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Levels').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLevel,
    getAllLevels,
    getLevelById,
    updateLevel,
    deleteLevel
}
