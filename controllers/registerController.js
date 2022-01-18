const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const registerController = async(req,res,next) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName && !lastName && !email && !password){
        res.status(400).json({
            'response' : 'Invalid request'
        });
    }
    const user = await User.findOne({email});
    if(user){
        res.status(400).json({
            'response':'Email already exists'
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hPass = await bcrypt.hash(password, salt);
        try{
            const user = new User({firstName, lastName, email, password : hPass});
            await user.save();
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
        }catch(err){
            res.status(500).json({
                'response':'Serverside error'
            })
        }
    }
    next();
}

module.exports = registerController;