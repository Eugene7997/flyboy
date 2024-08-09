const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { signUp }