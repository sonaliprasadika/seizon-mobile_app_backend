const Challenge = require('./challenge');

class CommonChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date);
  }
}

module.exports = CommonChallenge;

