const jwt = require("jsonwebtoken");

const isLoggedIn = async(req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null ;
    if(cookies){
        const token = cookies[process.env.COOKIE_NAME];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
    }else{
        res.status(401).json({
            'response' : 'Authentication failure'
        });
    }
    next();
}

module.exports = isLoggedIn;