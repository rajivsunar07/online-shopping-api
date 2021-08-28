const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
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