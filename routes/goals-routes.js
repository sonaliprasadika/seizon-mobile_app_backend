const express = require('express');
const {addGoal, 
       getAllGoals, 
       getGoalbyUser,
       updateGoal,
       deleteGoal
      } = require('../controllers/goalController');

const router = express.Router();

router.post('/goal', addGoal);
router.get('/goals', getAllGoals);
router.get('/goal/:id', getGoalbyUser);
router.put('/goal/:id', updateGoal);
router.delete('/goal/:id', deleteGoal);


module.exports = {
    routes: router
}