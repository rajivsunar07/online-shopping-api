const express = require('express')

const {create, get_requests, update, delete_exchangeProduct } = require('../controllers/exchangeProduct')
const {verifyUser} = require('../middleware/auth')
const upload = require('../middleware/fileUpload')



const router = new express.Router()

router
.route('/')
.post(verifyUser, upload.array('image', 12), create)

router
.route('/:for')
.get(verifyUser, get_requests)


router
.route('/:id')
.patch(verifyUser, update)
.delete(verifyUser, delete_exchangeProduct)


module.exports = router
