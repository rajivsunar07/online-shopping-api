const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const data = jwt.verify(token, 'anyseceretkey')

        User.findOne({_id: data.YourId})
        .then(function(result){
            req.userdata = result
            next()
        })
        .catch(function(e){
            res.status(401).json({error: e})
        })
    }
    catch(e){
        res.status(401).json({error: e})
    }
}