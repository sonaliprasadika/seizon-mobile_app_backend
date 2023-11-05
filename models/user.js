class User {
    constructor(id, username, firstName, lastName, user_language, height,
        weight, age, gender, password, user_level, total_steps) {
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.user_language = user_language;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.gender = gender;
            this.password = password;
            this.user_level = user_level;
            this.total_steps = total_steps;
    }
}

module.exports = User;