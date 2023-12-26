const Challenge = require('./challenge');

class UserChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, user_id, externel_challenge_id, challenge_progress, completed_steps, completed_duration) {
    super(challenge_id, challenge_name, challenge_type , start_date, end_date);
    this.user_id = user_id;
    this.externel_challenge_id = externel_challenge_id;
    this.challenge_progress = challenge_progress;
    this.completed_steps = completed_steps;
    this.completed_duration = completed_duration;
  }
}

module.exports = UserChallenge;

