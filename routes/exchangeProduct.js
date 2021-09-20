const express = require('express')

const {create, get_requests, update } = require('../controllers/exchangeProduct')
const {verifyUser} = require('../middleware/auth')
const upload = require('../middleware/fileUpload')



const router = new express.Router()

router
.route('/')
.get(verifyUser, get_requests)
.post(verifyUser, upload.array('image', 12), create)
.patch(verifyUser, update)

module.exports = router
