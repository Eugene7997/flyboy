const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(409).json({ message: 'Username is already taken' });
        }
        return res.status(500).json({ message: error.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const validUser = await User.findOne({username})
        if (!validUser) {
            return res.status(404).json({message: "Username not found"})
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return res.status(401).json({message: "Wrong Password entered"})
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password: hashedPassword, ...rest} = validUser._doc
        const expiryDate = new Date(Date.now() + 10800000)
        return res
            .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signOut = async (req, res) => {
    res.clearCookie("access_token").status(200).json({message: "Sign out successful"})
}

const deleteUser = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({message: "You are not authorized to delete this user"})
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "User deleted successfully"})
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { signUp, signIn, signOut, deleteUser }