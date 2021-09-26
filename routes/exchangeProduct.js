const express = require('express')

const {create, get_requests, update, delete_exchangeProduct, get_one } = require('../controllers/exchangeProduct')
const {verifyUser} = require('../middleware/auth')
const upload = require('../middleware/fileUpload')



const router = new express.Router()

router
.route('/')
.post(verifyUser, upload.array('image', 5), create)

router
.route('/:for')
.get(verifyUser, get_requests)


router
.route('/:id')
.patch(verifyUser, update)
.delete(verifyUser, delete_exchangeProduct)

router
.route('/one/:id')
.get(verifyUser, get_one)


module.exports = router
