const express = require('express');
const {addFriendChallenge, 
        getAllFriendChallengesByFriendId, 
        getFriendChallengebyFriendId,
        updateFriendChallenge,
        deleteFriendChallenge
      } = require('../controllers/friendChallengeController');

const router = express.Router();

//FriendChallenge Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     FriendChallenge:
 *       type: object
 *       required:
 *         - challenge_name
 *         - challenge_type
 *         - friend_id
 *       properties:
 *         challenge_name:
 *           type: string
 *           description: name of the challenge
 *         challenge_type:
 *           type: string
 *           description: challenge type (friendChallenge challenge/friend challenge/common challenge)
 *         start_date:
 *           type: string
 *           description: challenge start date
 *         end_date:
 *           type: string
 *           description: challenge end date
 *         friend_id:
 *           type: string
 *           description: ID of the particular friend
 *         challenge_description:
 *           type: string
 *           description: xx
 *         duration:
 *           type: string
 *           description: xx
 *         is_received:
 *           type: string
 *           description: xx
 *       example:
 *         challenge_name: Fitness Challenge
 *         challenge_type: Activity
 *         start_date: 2023-01-01
 *         end_date: 2023-01-15
 *         friend_id: QZafuC7vsanKPeBW6zO6
 *         challenge_description: Complete 30 minutes of exercise daily
 *         completed_steps: 14
 *         completed_duration: 14
 * 
 */

/**
 * @swagger
 * tags:
 *   name: FriendChallenge
 *   description: The FriendChallenge managing API
 * /api/friendChallenge:
 *   post:
 *     summary: Add a new friendChallenge
 *     tags: [FriendChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FriendChallenge'
 *     responses:
 *       200:
 *         description: The friendChallenge has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FriendChallenge'
 *       500:
 *         description: Server error
 * /api/freindChallenges-by-friend/{id}:
 *   get:
 *     summary: List of all friendChallenges
 *     security:
 *       - bearerAuth: []
 *     tags: [FriendChallenge]
 *     responses:
 *       200:
 *         description: List of all friendChallenges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/FriendChallenge'
 * /api/freindChallenges-by-friend/{id}/{freind_id}:
 *   get:
 *     summary: Get specific friendChallenge by friendChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [FriendChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FriendChallenge ID
 *     responses:
 *       200:
 *         description: Get a friendChallenge by friendChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/FriendChallenge'
 * /api/freindChallenge/{id}:
 *   put:
 *     summary: Update Specific friendChallenge by friendChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [FriendChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FriendChallenge'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FriendChallenge ID
 *     responses:
 *       200:
 *         description: update friendChallenge by friendChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/FriendChallenge'
 *   delete:
 *     summary: Delete Specific friendChallenge by friendChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [FriendChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FriendChallenge ID
 *     responses:
 *       200:
 *         description: delete friendChallenge by friendChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/FriendChallenge'
 */

router.post('/freindChallenge', addFriendChallenge);
router.get('/freindChallenges-by-friend/:id', getAllFriendChallengesByFriendId);
router.get('/freindChallenge-by-friend/:id/:freind_id', getFriendChallengebyFriendId);
router.put('/freindChallenge/:id', updateFriendChallenge);
router.delete('/freindChallenge/:id', deleteFriendChallenge);


module.exports = {
    routes: router
}