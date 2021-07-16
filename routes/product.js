const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

router.get('/product/detail/:id', function(req, res){
    var id = res.send(req.params.id)

    var product = Product.findOne({_id: id})
    
    res.send().json(product)
})

router.post('/product/insert', auth.verifyUser, function(req, res){
    const data = new Product(res, body);
    data.save()
    .then(function(result){
        res.status(201).json({ message: "Product inserted", success: "true"})
    })
    .catch(function(err){
        res.status(201).json({ message: err })
    })
})

router.put('/product/update', auth.verifyUser, function(req, res){
    const id = req.body.id
    const price = res.body.price
    Product.updateOne({ _id: id }, {price: price})
    .then(function(result){
        res.status(201).json({ message: "Product updated", success: "true"})
    })
    .catch(function(err){
        res.status(201).json({ message: err })
    })
})

router.delete('/product/delete', auth.verifyUser, function(req, res){
    const id = res.body.id
    Product.deleteOne({ _id: id })
    .then(function(result){

    })
    .catch(function(err){

    })

})

module.exports = router