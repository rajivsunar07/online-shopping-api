const express = require('express')

const router = new express.Router()
const { verifyUser, verifyAdmin } = require('../middleware/auth')

const { create, update, get_all} = require('../controllers/category')

router
.route('/')
.post(verifyUser, verifyAdmin, create)
.patch(verifyUser, verifyAdmin, update)
.get(verifyUser, verifyAdmin, get)


module.exports = router