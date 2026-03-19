const bcrypt = require("bcryptjs");
const User = require("../models/user");
const RefreshToken = require("../models/RefreshToken");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/tokenUtils");

const registerUser = async(name, email, password) => {
    const existinguser = await User.findOne({email});
    if(existinguser){
        throw new Error("User Already Exists !!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    });
    return user;
};

const loginUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Invalid Credentials!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid Credentials!");
    }

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken
    });
    return {user, accessToken, refreshToken};
};

module.exports = {
    registerUser,
    loginUser
};