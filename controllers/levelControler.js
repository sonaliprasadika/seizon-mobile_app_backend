'use strict';
const db = require('../config/db');
const Level = require('../models/level');

class LevelController {
    static async getAllLevels(req, res) {
        try {
            const levelsSnapshot = await db.collection('levels').get();
            const levels = levelsSnapshot.docs.map(doc => doc.data());
            res.json(levels);
        } catch (error) {
            console.error('Error getting levels', error);
            res.status(500).json({ error: 'Error getting levels' });
        }
    }

    static async getLevelById(req, res) {
        const levelId = req.params.id;
        try {
            const levelDoc = await db.collection('levels').doc(levelId).get();
            if (!levelDoc.exists) {
                res.status(404).json({ error: 'Level not found' });
            } else {
                res.json(levelDoc.data());
            }
        } catch (error) {
            console.error('Error getting level', error);
            res.status(500).json({ error: 'Error getting level' });
        }
    }

    static async addLevel(req, res) {
        const { level_id, xp_points, level_challenge_id, unlockable_item_ids } = req.body;
        const newLevel = new Level(level_id, xp_points, level_challenge_id, unlockable_item_ids);

        try {
            const docRef = await db.collection('levels').add(newLevel);
            res.json({ id: docRef.id, ...newLevel });
        } catch (error) {
            console.error('Error adding level', error);
            res.status(500).json({ error: 'Error adding level' });
        }
    }

    static async updateLevel(req, res) {
        const levelId = req.params.id;
        const { xp_points, level_challenge_id, unlockable_item_ids } = req.body;
        const updatedLevel = new Level(levelId, xp_points, level_challenge_id, unlockable_item_ids);

        try {
            await db.collection('levels').doc(levelId).set(updatedLevel, { merge: true });
            res.json(updatedLevel);
        } catch (error) {
            console.error('Error updating level', error);
            res.status(500).json({ error: 'Error updating level' });
        }
    }

    static async deleteLevel(req, res) {
        const levelId = req.params.id;
        try {
            await db.collection('levels').doc(levelId).delete();
            res.json({ message: `Level ${levelId} deleted successfully` });
        } catch (error) {
            console.error('Error deleting level', error);
            res.status(500).json({ error: 'Error deleting level' });
        }
    }
}


module.exports = {
    addLevel,
    deleteLevel,
    getAllLevels,
    getLevelById,
    updateLevel,
}
