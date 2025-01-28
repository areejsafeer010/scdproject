// UserFactory.js
class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}

class UserFactory {
    static createUser(firstName, lastName, username, password) {
        return new User(firstName, lastName, username, password);
    }
}

module.exports = UserFactory;
