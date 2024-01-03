const Challenge = require('./challenge');

class FriendChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, friend_id, is_received, challenge_description, duration, xp_points) {
    super(challenge_id, challenge_name, challenge_type, start_date, end_date, challenge_description, duration, xp_points);
    this.friend_id = friend_id;
    this.is_received = is_received;
  }
}

module.exports = FriendChallenge;