const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    createdAt: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
    phone: String,
});

module.exports = mongoose.model('User', userSchema)