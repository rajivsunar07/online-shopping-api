const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = new express.Router()
const { verifyUser } = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const { create, get_all } = require('../controllers/comment')

router
.route('/')
.post(verifyUser, create)

router
.route('/:product')
.get(get_all)

module.exports = router 