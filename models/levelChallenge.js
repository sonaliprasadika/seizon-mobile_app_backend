const Challenge = require('./challenge');

class LevelChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, level_id, challenge_description, duration, xp_points) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date, challenge_description, duration, xp_points);
    this.level_id = level_id;
  }
}

module.exports = LevelChallenge;

