const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const UserController = require('../controllers/user')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

//-- login --
// router.post('/user/login', function(req,res){
//     const username = req.body.username
//     const password = req.body.password

//     User.findOne({username: username})
//     .then(function(userData){
//         if(userData == null){
//             return res.status(403).json({message: 'invalid'})
//         }
        
//         bcrypt.compare(password.userData.password, function(err, result){
//             if(result==false){
//                 return res.status(403).json({message: "invalid credentials"})
//             }

//             const token = jwt.sign({YourId: data._id}, "anysecretkey")
//             res.status(200).json({token11: token, message: "Auth Success"})
//         })
//     })
// })

router.post('/profile/upload', upload.single('myImage'), function(req,res){
    if(req.file == undefined){
        return res.status(400).json({message: 'only png allowed'})
    }
    
    const data = new User({
        profile_pic: req.file.filename
    })
    data.save()
    .then(function(){
        
    })
    .catch(function(){
        
    })


})

module.exports = router
