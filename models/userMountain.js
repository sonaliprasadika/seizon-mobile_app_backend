class UserMountain {
    constructor(user_id, mountain_id, remaining_steps, mountain_progress) {
        this.user_id = user_id;
        this.mountain_id = mountain_id;
        this.remaining_steps = remaining_steps;
        this.mountain_progress = mountain_progress;
    }
}

module.exports = UserMountain;