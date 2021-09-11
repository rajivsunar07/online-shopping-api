const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const Order = require("../models/order")
const OrderItem = require("../models/orderItem")
const Product = require("../models/product")

exports.create =  (req, res, next) => {
    const orderItem = new OrderItem({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        price: () => { 
            Product.findById(req.body.product)
            .then(result => {
                return result.price * parseInt(req.body.quantity)
            })
        },
        seller: req.body.seller
    })

    orderItem.save()
    .then()
    .catch()

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        item: [orderItem],
        total_price: orderItem.price,
        user: req.userdata._id,
        shipping_address: req.body.shipping_address
    })

    order.save()
    .then(result => {
        res.status(200).json({
            success: true,
            message: "Order created succesfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Order creation failed",
            error: err
        })
    })
}

exports.get_for_user =  (req, res, next) => {

    Order.find({ user: req.userdata._id, ordered: false }).sort({ created_at: -1 }).limit(1)
    .exec()
    .then(result => {
        res.status(200).json({
            success: true,
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Error retreiving order",
            error: err
        })
    })
}

exports.delete_order = (req, res, next) => {

    Order.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Error in order deletion",
            error: err
        })
    })
}