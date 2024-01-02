const Challenge = require('./challenge');

class CommonChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description);
  }
}

module.exports = CommonChallenge;

