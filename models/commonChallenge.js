const Challenge = require('./challenge');

class CommonChallenge extends Challenge {
  constructor(challengeId, challengeName, startDate, endDate) {
    super(challengeId, challengeName, 'common', startDate, endDate);
  }
}

module.exports = CommonChallenge;

