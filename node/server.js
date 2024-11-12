const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const messageController = require('./controllers/messageController');

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow requests from this origin
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post('/signup', authController.signup);
app.post('/signin', authController.signin);
app.post('/send_message', messageController.sendMessage);
app.get('/messages', messageController.getMessages);
app.get('/user-count', messageController.getUserCount);
app.get('/user-count-history', messageController.getUserCountHistory);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
