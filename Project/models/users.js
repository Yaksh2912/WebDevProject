const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { timeStamps: true });

const users = mongoose.model("users", userSchema);

module.exports = users;