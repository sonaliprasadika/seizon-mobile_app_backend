const express = require('express');
const {addLevelChallenge, 
       getAllLevelChallenges, 
       getLevelChallengesByLevel,
       updateLevelChallenge,
       deleteLevelChallenge
      } = require('../controllers/LevelChallengeController');

const router = express.Router();

//LevelChallenge Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     LevelChallenge:
 *       type: object
 *       required:
 *         - challenge_name
 *         - challenge_type
 *         - levelChallenge_id
 *       properties:
 *         challenge_name:
 *           type: string
 *           description: name of the challenge
 *         challenge_type:
 *           type: string
 *           description: challenge type (levelChallenge challenge/friend challenge/common challenge)
 *         start_date:
 *           type: string
 *           description: challenge start date
 *         end_date:
 *           type: string
 *           description: challenge end date
 *         levelChallenge_id:
 *           type: string
 *           description: particular levelChallenge for the challenge
 *         challenge_description:
 *           type: string
 *           description: challenge description
 *         duration:
 *           type: string
 *           description: number of days per the challenge
 *       example:
 *         challenge_name: Challenge 2
 *         challenge_type: levelChallenge 1
 *         start_date: 2023-01-01
 *         end_date: 2023-01-15
 *         levelChallenge_id: QZafuC7vsanKPeBW6zO6
 *         challenge_description: Intermediate LevelChallenge
 *         duration: 14
 * 
 */

/**
 * @swagger
 * tags:
 *   name: LevelChallenge
 *   description: The LevelChallenge managing API
 * /api/levelChallenge:
 *   post:
 *     summary: Add a new levelChallenge
 *     tags: [LevelChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LevelChallenge'
 *     responses:
 *       200:
 *         description: The levelChallenge has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LevelChallenge'
 *       500:
 *         description: Server error
 * /api/levelChallenges:
 *   get:
 *     summary: List of all levelChallenges
 *     security:
 *       - bearerAuth: []
 *     tags: [LevelChallenge]
 *     responses:
 *       200:
 *         description: List of all levelChallenges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/LevelChallenge'
 * /api/levelChallenge-by-level/{id}:
 *   get:
 *     summary: Get specific levelChallenge by levelChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [LevelChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: LevelChallenge ID
 *     responses:
 *       200:
 *         description: Get a levelChallenge by levelChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/LevelChallenge'
 *   put:
 *     summary: Update Specific levelChallenge by levelChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [LevelChallenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LevelChallenge'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: LevelChallenge ID
 *     responses:
 *       200:
 *         description: update levelChallenge by levelChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/LevelChallenge'
 *   delete:
 *     summary: Delete Specific levelChallenge by levelChallenge id
 *     security:
 *       - bearerAuth: []
 *     tags: [LevelChallenge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: LevelChallenge ID
 *     responses:
 *       200:
 *         description: delete levelChallenge by levelChallenge id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/LevelChallenge'
 */

router.post('/levelChallenge', addLevelChallenge);
router.get('/levelChallenges', getAllLevelChallenges);
router.get('/levelChallenge-by-level/:id/', getLevelChallengesByLevel);
router.put('/levelChallenge/:id', updateLevelChallenge);
router.delete('/levelChallenge/:id', deleteLevelChallenge);


module.exports = {
    routes: router
}