const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const upload = require('../middleware/fileUpload')
const {get_all, create, get_one, update, delete_product, get_for_user } = require('../controllers/product')
const {verifyUser} = require('../middleware/auth')

const router = new express.Router()

router
.route('/')
.get(get_all)
.post(verifyUser, upload.array('image', 5), create)

router
.route('/user/all')
.get(verifyUser, get_for_user)

router
.route('/:id')
.get(get_one)
.patch(verifyUser, upload.array('newImages', 5), update)
.delete(verifyUser, delete_product)



module.exports = router