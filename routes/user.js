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
