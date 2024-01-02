class GoalSessions {
    constructor(goal_id,spent_time,remaining_time,created_at,status) {
            this.goal_id = goal_id;
            this.spent_time = spent_time;
            this.remaining_time = remaining_time;
            this.created_at = created_at;
            this.status = status;
    }
}

module.exports = GoalSessions;