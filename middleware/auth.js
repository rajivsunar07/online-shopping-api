const jwt = require('jsonwebtoken') // used to checck whether user is logged in or not
const User = require('../models/user')

module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1] // bearer token
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)

        User.findOne({_id: data.userId})
        .then(result => {
            req.userdata = result
            next()
        })
        .catch(err => {
            res.status(401).json({error: err})
        })
    }
    catch(err){
        res.status(401).json({
            error: err,
            message: "Authentication failed"
        })
    }
}

module.exports.verifyAdmin = (req, res, next) => {
    if(req.userdata.is_admin) {
        next()
    }else{
        res.status(401).json({
            message: "Authorization failed"
        })
    }
}
