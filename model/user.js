const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, require: true},
    password: { type: String, required: true},
}, { timestamps: true, });

const User = mongoose.model('User', userSchema);

module.exports = User;