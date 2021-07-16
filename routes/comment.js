const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Comment = require('../models/comment')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')


router.post('/comment/insert', auth.verifyUser, function(req, res){
    const data = new Comment(res, body);
    data.save()
    .then(function(result){
        res.status(201).json({ message: "Comment inserted", success: "true"})
    })
    .catch(function(err){
        res.status(201).json({ message: err })
    })
})

router.put('/comment/update', auth.verifyUser, function(req, res){
    const id = req.body.id
    const description = res.body.description
    Comment.updateOne({ _id: id }, {description: description})
    .then(function(result){
        res.status(201).json({ message: "Comment updated", success: "true"})
    })
    .catch(function(err){
        res.status(201).json({ message: err })
    })
})

router.delete('/comment/delete', auth.verifyUser, function(req, res){
    const id = res.body.id
    Comment.deleteOne({ _id: id })
    .then(function(result){

    })
    .catch(function(err){

    })
})

module.exports = router