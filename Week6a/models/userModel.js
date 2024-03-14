// models/userModel.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

// Check if the model exists before creating a new one
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
