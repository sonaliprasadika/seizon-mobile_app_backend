const Challenge = require('./challenge');

class LevelChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description, level_id) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description);
    this.level_id = level_id;
  }
}

module.exports = LevelChallenge;

