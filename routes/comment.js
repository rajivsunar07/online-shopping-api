const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = new express.Router()
const { verifyUser } = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const { create } = require('../controllers/comment')

router
.route('/')
.post(verifyUser, create)

module.exports = router 