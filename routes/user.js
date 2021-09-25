const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = new express.Router()
const { verifyUser } = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

const { register, login, get_user, get_user_from_id, update, change_password } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)

router.route('/')
.get(verifyUser, get_user)
.patch(verifyUser, upload.single('image'), update)

router.route('/password')
.patch(verifyUser, change_password)

router.route('/:id')
.get(get_user_from_id)



module.exports = router