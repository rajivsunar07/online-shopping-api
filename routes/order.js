const express = require('express')

const { create, get_all_for_user, update_order, get_for_user,
     update_order_item, delete_order, delete_order_item, add_order_item,
      get_for_seller, get_all_admin } = require('../controllers/order')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

const router = new express.Router()

router
.route('/')
.post(verifyUser, create)
.get(verifyUser, get_for_user)

router
.route('/user/all')
.get(verifyUser, get_all_for_user)

router
.route('/admin')
.get(verifyUser, verifyAdmin, get_all_admin)

router
.route('/:id')
.patch(verifyUser, update_order)
.delete(verifyUser, delete_order)

router
.route('/seller/ordered')
.get(verifyUser, get_for_seller)

router
.route('/item/:itemId')
.patch(verifyUser, update_order_item)
.delete(verifyUser, delete_order_item)

module.exports = router