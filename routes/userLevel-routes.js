const express = require('express');
const {
    addUserLevel,
    getLevelbyUser,
    updateUserLevel,
    deleteUserLevel
    } = require('../controllers/userLevelController');

const router = express.Router();

//UserLevel Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     UserLevel:
 *       type: object
 *       required:
 *         - level_id
 *         - collected_points
 *       properties:
 *         level_id:
 *           type: string
 *         collected_points:
 *           type: string
 *           description: collected points by user
 *       example:
 *         level_id: HipAdJgXIAELA4wA3kgz
 *         collected_points: 1000
 * 
 */

/**
 * @swagger
 * tags:
 *   name: UserLevel
 *   description: The UserLevel managing API
 * /api/userLevels:
 *   post:
 *     summary: Add a new userLevel
 *     tags: [UserLevel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLevel'
 *     responses:
 *       200:
 *         description: The userLevel has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLevel'
 *       500:
 *         description: Server error
 * /api/userLevels/{id}:
 *   get:
 *     summary: Get a userLevel
 *     security:
 *       - bearerAuth: []
 *     tags: [UserLevel]
 *     responses:
 *       200:
 *         description: List of all userLevels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserLevel'
 *   put:
 *     summary: Update Specific userLevel by userLevel id
 *     security:
 *       - bearerAuth: []
 *     tags: [UserLevel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLevel'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserLevel ID
 *     responses:
 *       200:
 *         description: update userLevel by userLevel id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserLevel'
 *   delete:
 *     summary: Delete Specific userLevel by userLevel id
 *     security:
 *       - bearerAuth: []
 *     tags: [UserLevel]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserLevel ID
 *     responses:
 *       200:
 *         description: delete userLevel by userLevel id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserLevel'
 */

// Define routes for the Level resource
router.post('/userLevels', addUserLevel);
router.get('/userLevels/:id', getLevelbyUser);
router.put('/userLevels/:id', updateUserLevel);
router.delete('/userLevels/:id', deleteUserLevel);

module.exports = {
    routes: router
}
