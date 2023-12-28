const express = require('express');
const {addUserChallenge, 
        getAllUserChallengesByUser, 
        getUserChallengesbyUser,
        updateUserChallenge,
        deleteUserChallenge
      } = require('../controllers/userChallengeController');

const router = express.Router();

//UserChallenge Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     UserChallenge:
 *       type: object
 *       required:
 *         - challenge_name
 *         - challenge_type
 *         - external_challenge_id
 *       properties:
 *         challenge_name:
 *           type: string
 *           description: name of the challenge
 *         challenge_type:
 *           type: string
 *           description: challenge type (userChallenge challenge/friend challenge/common challenge)
 *         start_date:
 *           type: string
 *           description: challenge start date
 *         end_date:
 *           type: string
 *           description: challenge end date
 *         external_challenge_id:
 *           type: string
 *           description: xx
 *         challenge_progress:
 *           type: string
 *           description: xx
 *         completed_steps:
 *           type: string
 *           description: xx
 *         completed_duration:
 *           type: string
 *           description: xx
 *       example:
 *         challenge_name: Challenge 2
 *         challenge_type: Activity
 *         start_date: 2023-01-01
 *         end_date: 2023-01-15
 *         external_challenge_id: ext123
 *         challenge_progress: 60
 *         completed_steps: 14
 *         completed_duration: 14
 * 
 */

/**
 * @swagger
 * tags:
 *   name: UserChallenge
 *   description: The UserChallenge managing API
 * /api/userChallenge:
 *   post:
 *     summary: Add a new userChallenge
 *     tags: [UserChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserChallenge'
 *     responses:
 *       200:
 *         description: The userChallenge has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserChallenge'
 *       500:
 *         description: Server error
 * /api/userChallenges-by-user:
 *   get:
 *     summary: List of all userChallenges
 *     security:
 *       - bearerAuth: []
 *     tags: [UserChallenge]
 *     responses:
 *       200:
 *         description: List of all userChallenges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserChallenge'
 * /api/userChallenges-by-user/{challenge_id}:
 *   get:
 *     summary: Get specific userChallenge by userChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [UserChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserChallenge ID
 *     responses:
 *       200:
 *         description: Get a userChallenge by userChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserChallenge'
 * /api/userChallenge/{id}:
 *   put:
 *     summary: Update Specific userChallenge by userChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [UserChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserChallenge'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserChallenge ID
 *     responses:
 *       200:
 *         description: update userChallenge by userChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserChallenge'
 *   delete:
 *     summary: Delete Specific userChallenge by userChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [UserChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserChallenge ID
 *     responses:
 *       200:
 *         description: delete userChallenge by userChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UserChallenge'
 */

router.post('/userChallenge', addUserChallenge);
router.get('/userChallenges-by-user', getAllUserChallengesByUser);
router.get('/userChallenge-by-user/:challenge_id', getUserChallengesbyUser);
router.put('/userChallenge/:id', updateUserChallenge);
router.delete('/userChallenge/:id', deleteUserChallenge);


module.exports = {
    routes: router
}