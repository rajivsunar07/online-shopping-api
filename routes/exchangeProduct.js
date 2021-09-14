const express = require('express')

const {create } = require('../controllers/exchangeProduct')
const {verifyUser} = require('../middleware/auth')


const router = new express.Router()

router
.route('/')
.get(verifyUser, get_requests)
.post(verifyUser, upload.array('image', 12), create)

