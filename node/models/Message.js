const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender_mail: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);
