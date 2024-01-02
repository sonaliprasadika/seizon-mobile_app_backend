class Level {
    constructor(level_id, level_name, xp_points, unlockable_item_ids) {
            this.level_id = level_id;
            this.level_name = level_name;
            this.xp_points = xp_points;
            this.unlockable_item_ids = unlockable_item_ids;
    }
}

module.exports = Level;