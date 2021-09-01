const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const {get_all, create, get_one, update, delete_product } = require('../controllers/product')
const {verifyUser} = require('../middleware/auth')

router
.route('/')
.get(get_all)
.post(upload.single('image'), create)

router
.route('/:id')
.get(get_one)
.patch(update)
.delete(delete_product)


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