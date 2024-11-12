const mongoose = require('mongoose');

const UserCountSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    count: { type: Number, required: true }
});

module.exports = mongoose.model('UserCount', UserCountSchema);
