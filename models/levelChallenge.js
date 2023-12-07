const Challenge = require('./challenge');

class LevelChallenge extends Challenge {
  constructor(challengeId, challengeName, challengeType, startDate, endDate, levelId, challengeDescription, duration) {
    super(challengeId, challengeName, challengeType, startDate, endDate);
    this.level_id = levelId;
    this.challenge_description = challengeDescription;
    this.duration = duration;
  }
}

module.exports = LevelChallenge;

