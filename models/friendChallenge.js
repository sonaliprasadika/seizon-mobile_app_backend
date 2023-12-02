const Challenge = require('./challenge');

class FriendChallenge extends Challenge {
  constructor(friendChallengeId, friendId, challengeName, challengeDescription, startDate, endDate, duration, isReceived) {
    super(friendChallengeId, challengeName, 'friend', startDate, endDate);
    this.friend_id = friendId;
    this.challenge_description = challengeDescription;
    this.duration = duration;
    this.is_received = isReceived;
  }
}

module.exports = FriendChallenge;

