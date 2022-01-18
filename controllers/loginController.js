const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/user");

const loginController = async(req,res,next) => {
    const { email, password } = req.body;
    if(!email && !password){
        res.status(400).json({
            'response' : 'Invalid request'
        })
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400).json({
            'response' : 'Invalid request'
        });
    }
    const userExists = await bcrypt.compare(password, user.password);
    if(!userExists){
        res.status(400).json({
            'response' : 'Invalid request'
        });
    } 
    user.password = undefined;
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
    res.cookie(process.env.COOKIE_NAME,token,{
        maxAge:process.env.COOKIE_EXPIRY ,
        httpOnly: true,
        signed: true,
    });
    res.status(200).json({
        'response':user
    });
    next();
}

module.exports = loginController;