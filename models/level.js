class Level {
    constructor(level_id, xp_points, level_challenge_id, unlockable_item_ids) {
            this.level_id = level_id;
            this.xp_points = xp_points;
            this.level_challenge_id = level_challenge_id;
            this.unlockable_item_ids = unlockable_item_ids;
    }
}

module.exports = Level;