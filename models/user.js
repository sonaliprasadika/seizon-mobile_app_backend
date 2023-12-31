class User {
    constructor(
        username,
        firstName, 
        lastName, 
        email,
        user_language, 
        height,
        weight,
        age, 
        gender, 
        password, 
        user_level, 
        total_steps,
        xp_points
        ) {

            // Validation for username: Should be a non-empty string
            if (typeof username !== "string" || username.trim() === "") {
                throw new Error("Username must be a non-empty string.");
            }
            if (typeof firstName !== "string") {
                throw new Error("First Name is required and must be a string.");
            }
          
            if (typeof lastName !== "string") {
                throw new Error("Last Name is required and must be a string.");
            }

            if (typeof email !== "string" || email.trim() === "") {
                throw new Error("Username must be a non-empty string.");
            }

            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.user_language = user_language;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.gender = gender;
            this.password = password;
            this.user_level = user_level;
            this.total_steps = total_steps;
            this.xp_points = xp_points;
    }

}



module.exports = User;