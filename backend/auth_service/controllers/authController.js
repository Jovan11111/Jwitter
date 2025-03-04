const User = require('./../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    console.log(username);
    console.log(password);
    
    try{
        const userExists = await User.findOne({username})

        if (userExists){
            return res.status(400).json({message: "User allready exists"})
        }

        const hashPass = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username: username,
            password: hashPass,
            email: email
        })
        await newUser.save()
        console.log("User created")
        res.status(201).json({message: "User registered"})
    }
    catch (error) {
        res.status(500).json({message: `Server error: ${error}`})
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({message: "User doesnt exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Wrong password"})
        }

        const token = jwt.sign({user_Id: user._id}, process.env.JWT_KEY, {expiresIn: '1d'});

        res.status(200).json({message: "Login succesfull"})
    }
    catch (error){
        res.status(500).json({message: "Server error"})
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({message: "Logout successfull"})
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
} 