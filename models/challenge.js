class Challenge {
    constructor(challengeId, challengeName, challengeType, startDate, endDate) {
      this.challenge_id = challengeId;
      this.challenge_name = challengeName;
      this.challenge_type = challengeType;
      this.start_date = startDate;
      this.end_date = endDate;
    }
  }
  
  module.exports = Challenge;
  