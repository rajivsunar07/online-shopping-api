const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const upload = require('../middleware/fileUpload')
const {get_all, create, get_one, update, delete_product } = require('../controllers/product')
const {verifyUser} = require('../middleware/auth')

const router = new express.Router()

router
.route('/')
.get(get_all)
.post(upload.array('image', 12), create)

router
.route('/:id')
.get(get_one)
.patch(update)
.delete(delete_product)

module.exports = router