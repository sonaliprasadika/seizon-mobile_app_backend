const express = require('express');
const {addCommonChallenge, 
        getCommonChallenge, 
        updateCommonChallenge,
        deleteCommonChallenge
      } = require('../controllers/commonChallengeController');

const router = express.Router();

//CommonChallenge Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     CommonChallenge:
 *       type: object
 *       required:
 *         - challenge_name
 *         - challenge_type
 *       properties:
 *         challenge_name:
 *           type: string
 *           description: name of the challenge
 *         challenge_type:
 *           type: string
 *           description: challenge type (commonChallenge challenge/friend challenge/common challenge)
 *         start_date:
 *           type: string
 *           description: challenge start date
 *         end_date:
 *           type: string
 *           description: challenge end date
 *       example:
 *         challenge_name: Fitness Challenge
 *         challenge_type: Activity
 *         start_date: 2023-01-01
 *         end_date: 2023-01-15
 * 
 */

/**
 * @swagger
 * tags:
 *   name: CommonChallenge
 *   description: The CommonChallenge managing API
 * /api/commonChallenge:
 *   post:
 *     summary: Add a new commonChallenge
 *     tags: [CommonChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommonChallenge'
 *     responses:
 *       200:
 *         description: The commonChallenge has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonChallenge'
 *       500:
 *         description: Server error
 * /api/commonChallenge/{id}:
 *   get:
 *     summary: List of all commonChallenges
 *     security:
 *       - bearerAuth: []
 *     tags: [CommonChallenge]
 *     responses:
 *       200:
 *         description: List of all commonChallenges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/CommonChallenge'
 *   put:
 *     summary: Update Specific commonChallenge by commonChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [CommonChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommonChallenge'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CommonChallenge ID
 *     responses:
 *       200:
 *         description: update commonChallenge by commonChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/CommonChallenge'
 *   delete:
 *     summary: Delete Specific commonChallenge by commonChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [CommonChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CommonChallenge ID
 *     responses:
 *       200:
 *         description: delete commonChallenge by commonChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/CommonChallenge'
 */

router.post('/commonChallenge', addCommonChallenge);
router.get('/commonChallenge/:id/', getCommonChallenge);
router.put('/commonChallenge/:id', updateCommonChallenge);
router.delete('/commonChallenge/:id', deleteCommonChallenge);


module.exports = {
    routes: router
}