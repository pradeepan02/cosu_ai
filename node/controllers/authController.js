const User = require('../models/User');
const UserCount = require('../models/UserCount');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash the password and create the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Update or create user count entry for today
        const today = new Date().toISOString().split('T')[0];
        console.log("Today's date for user count update:", today);

        const count = await User.countDocuments();
        const result = await UserCount.updateOne(
            { date: today },
            { count },
            { upsert: true }
        );

        console.log("User count entry updated for:", today, "Result:", result);

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Error in signup:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "User signed in successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
