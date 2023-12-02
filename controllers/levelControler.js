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

// static async getLevelById(req, res) {
//     const levelId = req.params.id;
//     try {
//         const levelDoc = await db.collection('levels').doc(levelId).get();
//         if (!levelDoc.exists) {
//             res.status(404).json({ error: 'Level not found' });
//         } else {
//             res.json(levelDoc.data());
//         }
//     } catch (error) {
//         console.error('Error getting level', error);
//         res.status(500).json({ error: 'Error getting level' });
//     }
// }

// static async updateLevel(req, res) {
//     const levelId = req.params.id;
//     const { xp_points, level_challenge_id, unlockable_item_ids } = req.body;
//     const updatedLevel = new Level(levelId, xp_points, level_challenge_id, unlockable_item_ids);

//     try {
//         await db.collection('levels').doc(levelId).set(updatedLevel, { merge: true });
//         res.json(updatedLevel);
//     } catch (error) {
//         console.error('Error updating level', error);
//         res.status(500).json({ error: 'Error updating level' });
//     }
// }

// static async deleteLevel(req, res) {
//     const levelId = req.params.id;
//     try {
//         await db.collection('levels').doc(levelId).delete();
//         res.json({ message: `Level ${levelId} deleted successfully` });
//     } catch (error) {
//         console.error('Error deleting level', error);
//         res.status(500).json({ error: 'Error deleting level' });
//     }
// }



module.exports = {
    addLevel
}
