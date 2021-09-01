const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const {get_all, create, get_one, update} = require('../controllers/product')
const {verifyUser} = require('../middleware/auth')

router
.route('/')
.get(get_all)
.post(upload.single('image'), create)

router
.route('/:id')
.get(get_one)
.patch(update)




router.delete('/product/delete', auth.verifyUser, function(req, res){
    const id = res.body.id
    Product.deleteOne({ _id: id })
    .then(function(result){

    })
    .catch(function(err){

    })

})


exports.products_info = (req, res, next) => {
    Product
    .find()
    .exec()
    .then(result => {
      res.status(200).json({
        count: result.length,
        
      })
    })
  }

module.exports = router