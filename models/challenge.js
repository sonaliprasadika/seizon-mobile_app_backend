class Challenge {
    constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description) {
      this.challenge_id = challenge_id;
      this.challenge_name = challenge_name;
      this.challenge_type = challenge_type;
      this.start_date = start_date;
      this.end_date = end_date;
      this.xp_points = xp_points;
      this.duration = duration;
      this.challenge_description = challenge_description;
    }
  }
  
  module.exports = Challenge;
  