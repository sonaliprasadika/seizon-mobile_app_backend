const Challenge = require('./challenge');

class FriendChallenge extends Challenge {
  constructor(friendChallengeId, challengeName, challengeType, startDate, endDate, friendId, challengeDescription, duration, isReceived) {
    super(friendChallengeId, challengeName, challengeType , startDate, endDate);
    this.friend_id = friendId;
    this.challenge_description = challengeDescription;
    this.duration = duration;
    this.is_received = isReceived;
  }
}

module.exports = FriendChallenge;