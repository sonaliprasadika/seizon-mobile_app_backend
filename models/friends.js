class Friends {
    constructor(user_id, friend_user_id, friendship_status, recipient) {
        this.user_id = user_id;
        this.friend_user_id = friend_user_id;
        this.friendship_status = friendship_status;
        this.recipient = recipient;
    }
}

module.exports = Friends;