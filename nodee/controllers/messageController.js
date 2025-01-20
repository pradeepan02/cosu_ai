// controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');
const UserCount = require('../models/UserCount'); // Import UserCount model

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { sender_mail, sender, message } = req.body; // Matching with schema fields
        const newMessage = new Message({ sender_mail, sender, message }); // Use fields from request
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Get all messages
exports.getMessages = async (req, res) => {
    console.log("Received request for messages");
    try {
        const messages = await Message.find();
        console.log("Messages fetched:", messages);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

// Get user count
exports.getUserCount = async (req, res) => {
    console.log("Received request for user count");
    try {
        const count = await User.countDocuments(); // Returns the total number of users
        console.log("User count:", count);
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ error: 'Error fetching user count' });
    }
};
exports.getUserCountHistory = async (req, res) => {
    try {
        const userCounts = await UserCount.find().sort({ date: 1 }); // Sort by date ascending
        res.status(200).json({ data: userCounts });
    } catch (error) {
        console.error("Error fetching user count history:", error);
        res.status(500).json({ error: 'Error fetching user count history' });
    }
};