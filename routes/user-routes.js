const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {
        getAllUsers,
        getUser,
        updateUser,
        deleteUser,
        userRegister,
        userLogin
      } = require('../controllers/userController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: boolean
 *         email:
 *           type: string
 *         user_language:
 *           type: string
 *         height:
 *           type: float
 *         weight:
 *           type: float
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 *         password:
 *           type: string
 *           description: The password is hashed by server
 *         user_level:
 *           type: integer
 *           description: The current level of the user
 *         total_steps:
 *           type: integer
 *           description: Total steps user has achived
 *       example:
 *         username: john_doe
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         user_language: en_US
 *         height: 180
 *         weight: 75
 *         age: 30
 *         gender: male
 *         password: secure_password123
 *         user_level: 3
 *         total_steps: 5000
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user has been registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 * /api/user/login:
 *   post:
 *     summary: Login existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user has been registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 * /api/users:
 *   get:
 *     summary: List of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 *
 */
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = {
    routes: router
}