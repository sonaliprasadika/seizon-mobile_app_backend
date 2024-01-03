class Challenge {
    constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, challenge_description, duration, xp_points) {
      this.challenge_id = challenge_id;
      this.challenge_name = challenge_name;
      this.challenge_type = challenge_type;
      this.start_date = start_date;
      this.end_date = end_date;
      this.challenge_description = challenge_description;
      this.duration = duration;
      this.xp_points = xp_points;
    }
  }
  
  module.exports = Challenge;
  