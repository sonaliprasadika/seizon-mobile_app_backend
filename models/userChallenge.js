const Challenge = require('./challenge');

class UserChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, user_id, externel_challenge_id, challenge_progress, remaining_time) {
    super(challenge_id, challenge_name, challenge_type , start_date, end_date);
    this.user_id = user_id;
    this.externel_challenge_id = externel_challenge_id;
    this.challenge_progress = challenge_progress;
    this.remaining_time = remaining_time;
  }
}

module.exports = UserChallenge;

