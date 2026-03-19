const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require("../models/RefreshToken");
const Session = require("../models/Session");

const {
    registerUser,
    loginUser
} = require("../services/authService");

const register = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const user = await registerUser(name, email, password);

        res.json({message: "User registered", user});   
    } catch(error){
        next(error);
    }
};

const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        const result = await loginUser(email, password);

        await Session.create({
            userId: result.user._id,
            userAgent: req.headers["user-agent"],
            ipAddress:req.ip
        });
        res.json(result);
    } catch(error){
        next(error);
    }
};

const refresh = async (req, res) => {

    const { token } = req.body;
  
    if (!token) return res.status(401).json({ error: "No token" });
  
    try {
  
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(payload.id);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
  
    } catch (err) {
      res.status(403).json({ error: "Invalid refresh token" });
    }
  };
  
  module.exports = { register, login, refresh };