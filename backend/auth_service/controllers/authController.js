const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    
    try {
        const userExists = await User.findOne({username});

        if (userExists){
            return res.status(400).json({message: 'User allready exists'});
        }

        const hashPass = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username: username,
            password: hashPass,
            email: email
        });
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: `Server error: ${error.message}`});
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (! user){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Wrong password'});
        }

        const token = jwt.sign({user_Id: user._id} , process.env.JWT_KEY);

        res.status(200).json({message: 'Login succesfull', token: token});
    } catch (error){
        res.status(500).json({message: `Server error: ${error.message}`});
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({message: `Server error: ${error.message}`});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}