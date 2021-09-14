const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const Order = require("../models/order")
const OrderItem = require("../models/orderItem")
const Product = require("../models/product")

exports.create = (req, res, next) => {

    const orderItem = new OrderItem({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price,
        seller: req.body.seller
    })

    orderItem.save()
        .then(result => {
            console.log('order item created')
        })
        .catch(err => {
            console.log('error creating order item')
        })

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

exports.get_for_user = (req, res, next) => {

    Order.find({ user: req.userdata._id, ordered: false }).sort({ created_at: -1 }).limit(1)
        .populate('item')
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

exports.add_order_item = (req, res, next) => {

    Order.find({ user: req.userdata._id, ordered: false }).sort({ created_at: -1 }).limit(1)
        .populate('item')
        .then(result => {
            console.log(result[0]);
            let exists = false
            let item = null
            let current = result[0]
            for (i in current.item) {
                if (current.item[i].product == req.body.product) {
                    exists = true
                    item = current.item[i]
                    break
                }
            }

            if (exists) {
                OrderItem.findByIdAndUpdate(item._id, { price: (item.price / item.quantity) + item.price, quantity: parseInt(item.quantity) + 1 })
                    .then(r => {
                        Order.findByIdAndUpdate(result[0]._id, { total_price: String(parseInt(result[0].total_price) + parseInt(r.price))})
                        .exec()


                        res.status(200).json({
                            success: true,
                            message: "Order item quantity and price increased"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err,
                            message: "Order item quantity and price not incrased"
                        })
                    })

            } else if (exists == false){

                const orderItem = new OrderItem({
                    _id: mongoose.Types.ObjectId(),
                    product: req.body.product,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    seller: req.body.seller
                })

                orderItem.save()
                    .then(r => {
                        Order.find({ user: req.userdata._id, ordered: false }).sort({ created_at: -1 }).limit(1)
                            .then(result => {
                                Order.findByIdAndUpdate( result[0]._id , { $addToSet: { item: orderItem }, total_price: String(parseInt(result[0].total_price) + parseInt(req.body.price)) })
                                    .exec()
                                    .then(rslt => {
                                        res.status(200).json({
                                            success: true,
                                            message: "Order item added to the order"
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err,
                                            message: "Order item not added to the order"
                                        })
                                    })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err,
                                    message: "Order not found"
                                })
                            })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err,
                            message: "Failed to save order item"
                        })
                    })
            }
        })





}

exports.update_order_item = (req, res, next) => {
    OrderItem.findByIdAndUpdate(req.params.itemId, req.body)
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Order item updated successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Error in updating order item"
            })
        })
}

exports.delete_order_item = (req, res, next) => {
    OrderItem.findByIdAndDelete(req.params.itemId)
        .then(result => {
            // console.log(result)
            Order.findOneAndUpdate({ item: result._id }, { $pull: { item: { _id: result._id } } }, { safe: true })
                .then(r => {
                    res.status(200).json({
                        message: "Order item deleted and removed successfully"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err,
                        message: "Error in removing item form the order"
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Error in deleteing item"
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