const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');
const User = require('../models/user.model');

const isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({ message: "No hay token" });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = await User.findById(decoded.id);

    next();
};

const isAdmin = (...role) => {
    return (req,res,next) => {

        if(!role.includes(req.user.role)){
            return res.status(501).json({message:"No tienes permiso para acceder"});
        };
        
        next();
    }
}


module.exports = {isAuthenticated, isAdmin}