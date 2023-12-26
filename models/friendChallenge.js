const Challenge = require('./challenge');

class FriendChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, friend_id, challenge_description, duration, is_received) {
    super(challenge_id, challenge_name, challenge_type , start_date, end_date);
    this.friend_id = friend_id;
    this.challenge_description = challenge_description;
    this.duration = duration;
    this.is_received = is_received;
  }
}

module.exports = FriendChallenge;