const express = require('express');
const {addLevelChallenge, 
       getAllGoals, 
       getAllGoalsByUser,
       getGoalbyUser,
       updateGoal,
       deleteGoal
      } = require('../controllers/LevelChallengeController');

const router = express.Router();

router.post('/levelChallenge', addLevelChallenge);
router.get('/goals', getAllGoals);
router.get('/goals-by-user/:id', getAllGoalsByUser);
router.get('/goal-by-user/:id/:g_id', getGoalbyUser);
router.put('/goal/:id', updateGoal);
router.delete('/goal/:id', deleteGoal);


module.exports = {
    routes: router
}