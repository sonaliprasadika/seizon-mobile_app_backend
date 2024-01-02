const Challenge = require('./challenge');

class FriendChallenge extends Challenge {
  constructor(challenge_id, challenge_name, challenge_type, start_date, end_date, xp_points, duration, challenge_description, friend_id, is_received) {
    super(challenge_id, challenge_name, challenge_type , start_date, end_date, xp_points, duration, challenge_description);
    this.friend_id = friend_id;
    this.is_received = is_received;
  }
}

module.exports = FriendChallenge;