const express = require('express');
const {addAvatar,
       getAvatar,
       updateAvatar,
       deleteAvatar
      } = require('../controllers/avatarController');

const router = express.Router();

//Avatar Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Avatar:
 *       type: object
 *       required:
 *         - gender
 *       properties:
 *         gender:
 *           type: string
 *       example:
 *         gender: Female
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Avatar
 *   description: The Avatar managing API
 * /api/avatar:
 *   post:
 *     summary: Add user avatar
 *     tags: [Avatar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avatar'
 *     responses:
 *       200:
 *         description: The avatar has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       500:
 *         description: Server error
 * /api/avatar/{id}:
 *   get:
 *     summary: Get user avatar
 *     security:
 *       - bearerAuth: []
 *     tags: [Avatar]
 *     responses:
 *       200:
 *         description: List of all avatars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Avatar'
 *   put:
 *     summary: Update Specific avatar by avatar id
 *     security:
 *       - bearerAuth: []
 *     tags: [Avatar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avatar'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Avatar ID
 *     responses:
 *       200:
 *         description: update avatar by avatar id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Avatar'
 *   delete:
 *     summary: Delete Specific avatar by avatar id
 *     security:
 *       - bearerAuth: []
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Avatar ID
 *     responses:
 *       200:
 *         description: delete avatar by avatar id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Avatar'
 */

router.post('/avatar', addAvatar);
router.get('/avatar', getAvatar);
router.put('/avatar/:id', updateAvatar);
router.delete('/avatar/:id', deleteAvatar);


module.exports = {
    routes: router
}