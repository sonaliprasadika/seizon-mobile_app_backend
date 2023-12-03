class UserLevel {
    constructor(user_level_id, user_id, level_id, collected_points) {
            this.user_level_id = user_level_id;
            this.user_id = user_id;
            this.level_id = level_id;
            this.collected_points = collected_points;
    }
}

module.exports = UserLevel;