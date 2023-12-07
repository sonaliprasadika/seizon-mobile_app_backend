const express = require('express');
const {addLevelChallenge, 
       getAllLevelChallenges, 
       getLevelChallengesByLevel,
       updateLevelChallenge,
       deleteLevelChallenge
      } = require('../controllers/LevelChallengeController');

const router = express.Router();

router.post('/levelChallenge', addLevelChallenge);
router.get('/levelChallenges', getAllLevelChallenges);
router.get('/levelChallenge-by-level/:id/', getLevelChallengesByLevel);
router.put('/levelChallenge/:id', updateLevelChallenge);
router.delete('/levelChallenge/:id', deleteLevelChallenge);


module.exports = {
    routes: router
}