const express = require('express')

const { create, get_for_user, update_order_item, delete_order,delete_order_item, add_order_item } = require('../controllers/order')
const { verifyUser } = require('../middleware/auth')

const router = new express.Router()

router
.route('/')
.post(verifyUser, create)
.get(verifyUser, get_for_user)

router
.route('/item')
.post(verifyUser, add_order_item)


router
.route('/item/:itemId')
.patch(verifyUser, update_order_item)
.delete(verifyUser, delete_order_item)

module.exports = router