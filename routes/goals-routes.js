const express = require('express');
const {addGoal, 
       getAllGoals, 
       getAllGoalsByUser,
       getGoalbyUser,
       updateGoal,
       deleteGoal
      } = require('../controllers/goalController');

const router = express.Router();

//User Schema
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Goal:
 *       type: object
 *       required:
 *         - goal_basis
 *         - days
 *         - calories_to_burn
 *       properties:
 *         goal_basis:
 *           type: string
 *           description: The goal type (Daily or Weekly)
 *         steps_per_day:
 *           type: boolean
 *           description: Total number of steps per day
 *         steps_per_week:
 *           type: string
 *           description: Total number of steps per week
 *         days:
 *           type: string
 *           description: To achieve this goal, which days of the week should be used? (Monday, Tuesday, Wednesday,..)
 *         calories_to_burn:
 *           type: float
 *           description: The total amount of calories should be burned in the goal
 *       example:
 *         goal_basis: Daily
 *         steps_per_day: 10000
 *         steps_per_week: 70000
 *         days: ["Monday", "Wednesday", "Friday"]
 *         calories_to_burn: 500
 */

/**
 * @swagger
 * tags:
 *   name: Goal
 *   description: The Goal managing API
 * /api/goal:
 *   post:
 *     summary: Add a new goal
 *     tags: [Goal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: The goal has been added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       500:
 *         description: Server error
 * /api/goals:
 *   get:
 *     summary: List all goals
 *     security:
 *       - bearerAuth: []
 *     tags: [Goal]
 *     responses:
 *       200:
 *         description: Get all goals.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       500:
 *         description: Server error
 * /api/goals-by-user:
 *   get:
 *     summary: List goals for the authorized user
 *     security:
 *       - bearerAuth: []
 *     tags: [Goal]
 *     responses:
 *       200:
 *         description: List goals for the authorized user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Goal'
 * /api/goal-by-user/{g_id}:
 *   get:
 *     summary: List the goal by goal_ID for the authorized user
 *     security:
 *       - bearerAuth: []
 *     tags: [Goal]
 *     parameters:
 *       - in: path
 *         name: g_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: List the goal by goal_ID for the authorized user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Goal'
 *   put:
 *     summary: Update Specific goal by goal id
 *     security:
 *       - bearerAuth: []
 *     tags: [Goal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     parameters:
 *       - in: path
 *         name: g_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: update goal by goal id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Goal'
 *   delete:
 *     summary: Delete Specific goal by goal id
 *     security:
 *       - bearerAuth: []
 *     tags: [Goal]
 *     parameters:
 *       - in: path
 *         name: g_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: delete goal by goal id.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Goal'
 */

router.post('/goal', addGoal);
router.get('/goals', getAllGoals);
router.get('/goals-by-user', getAllGoalsByUser);
router.get('/goal-by-user/:g_id', getGoalbyUser);
router.put('/goal/:id', updateGoal);
router.delete('/goal/:id', deleteGoal);


module.exports = {
    routes: router
}