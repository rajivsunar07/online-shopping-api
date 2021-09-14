const express = require('express')

const {create } = require('../controllers/exchangeProduct')
const {verifyUser} = require('../middleware/auth')


const router = new express.Router()

router
.route('/')
.post(verifyUser, upload.array('image', 12), create)