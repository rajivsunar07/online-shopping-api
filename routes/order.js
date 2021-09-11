const express = require('express')

const { create, get_for_user, update_order_item, delete_order } = require('../controllers/order')
const { verifyUser } = require('../middleware/auth')

const router = new express.Router()

router
.route('/')
.post(verifyUser, create)
.get(verifyUser, get_for_user)



router
.route('/:id')
.delete(verifyUser, delete_order)

router
.route('/:itemId')
.patch(verifyUser, update_order_item)


module.exports = router