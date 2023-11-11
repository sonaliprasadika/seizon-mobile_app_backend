const express = require('express');
const {addGoalByUser, 
       getAllGoalsByUser, 
       getGoalbyUser,
       updateGoalbyUser,
       deleteGoalbyUser
       
      } = require('../controllers/goalByUserController');

const router = express.Router();

router.post('/goal-by-user', addGoalByUser);
router.get('/goal-by-user/:id', getAllGoalsByUser);
router.get('/goal-by-user/:id/:goal_id', getGoalbyUser);
router.put('/goal-by-user/:id', updateGoalbyUser);
router.delete('/goal-by-user/:id', deleteGoalbyUser);


module.exports = {
    routes: router
}