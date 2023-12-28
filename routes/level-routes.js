const express = require('express');
const {
    addLevel,
    getAllLevels,
    getLevelById,
    updateLevel,
    deleteLevel
    } = require('../controllers/levelControler');

const router = express.Router();

//Level Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Level:
 *       type: object
 *       properties:
 *         xp_points:
 *           type: integer
 *         level_challenge_id:
 *           type: string
 *         unlockable_item_ids:
 *           type: string
 *           description: xx
 *       example:
 *         xp_points: 5
 *         level_challenge_id: 40
 *         unlockable_item_ids: 30
 */

/**
 * @swagger
 * tags:
 *   name: Level
 *   description: The Level managing API
 * /api/level:
 *   post:
 *     summary: Add a new level
 *     tags: [Level]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     responses:
 *       200:
 *         description: The level has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Level'
 *       500:
 *         description: Server error
 * /api/levels:
 *   get:
 *     summary: List of all levels
 *     security:
 *       - bearerAuth: []
 *     tags: [Level]
 *     responses:
 *       200:
 *         description: List of all levels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Level'
 * /api/level/{id}:
 *   get:
 *     summary: Get specific level by level id
 *     security:
 *       - bearerAuth: []
 *     tags: [Level]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level ID
 *     responses:
 *       200:
 *         description: Get a level by level id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Level'
 *   put:
 *     summary: Update Specific level by level id
 *     security:
 *       - bearerAuth: []
 *     tags: [Level]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level ID
 *     responses:
 *       200:
 *         description: update level by level id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Level'
 *   delete:
 *     summary: Delete Specific level by level id
 *     security:
 *       - bearerAuth: []
 *     tags: [Level]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level ID
 *     responses:
 *       200:
 *         description: delete level by level id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Level'
 */

// Define routes for the Level resource
router.post('/levels', addLevel);
router.get('/levels', getAllLevels);
router.get('/level/:id', getLevelById);
router.put('/level/:id', updateLevel);
router.delete('/level/:id', deleteLevel);

module.exports = {
    routes: router
}
