const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = new express.Router()
const { verifyUser } = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const { create, get_all, update, delete_comment } = require('../controllers/comment')

router
.route('/')
.post(verifyUser, create)

router
.route('/:product')
.get(get_all)

router
.route('/:id')
.patch(verifyUser, update)
.delete(verifyUser, delete_comment)


module.exports = router 