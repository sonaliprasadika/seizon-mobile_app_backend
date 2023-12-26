const Challenge = require('./challenge');

class LevelChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, level_id, challenge_description, duration) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date);
    this.level_id = level_id;
    this.challenge_description = challenge_description;
    this.duration = duration;
  }
}

module.exports = LevelChallenge;

