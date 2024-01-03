const Challenge = require('./challenge');

class CommonChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, challenge_description, duration, xp_points) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date, challenge_description, duration, xp_points);
  }
}

module.exports = CommonChallenge;

