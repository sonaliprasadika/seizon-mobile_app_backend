const Challenge = require('./challenge');

class LevelChallenge extends Challenge {
  constructor(levelChallengeId, levelId, challengeName, challengeDescription, startDate, endDate, duration) {
    super(levelChallengeId, challengeName, 'level', startDate, endDate);
    this.level_id = levelId;
    this.challenge_description = challengeDescription;
    this.duration = duration;
  }
}

module.exports = LevelChallenge;

