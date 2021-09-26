const express = require('express')
const router = new express.Router()

const {create} = require('../controllers/checkout')
const {verifyUser} = require('../middleware/auth')

router
.route('/')
.post(verifyUser, create)

module.exports = router