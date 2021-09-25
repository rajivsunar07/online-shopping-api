const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const Order = require("../models/order")
const OrderItem = require("../models/orderItem")
const Product = require("../models/product")

const { success_message, error_message, success_result } = require("./messages")

exports.get_order_for_user = async (req) => {
    return await Order.find({ user: req.userdata._id, status: 'unordered' }).sort({ created_at: -1 }).limit(1).populate({
        path: 'item',
        populate: [{ path: 'product', select: 'name image' }, { path: 'seller', select: 'name' }],
    })
}

exports.create_order_item = async (req) => {
    let orderItem = new OrderItem({
        _id: mongoose.Types.ObjectId()
    })

    for (i in req.body) {
        orderItem[i] = req.body[i]
    }

    await orderItem.save()

    return orderItem
}



exports.create = async (req, res, next) => {

    // check if order exists 
    let user_order = await this.get_order_for_user(req)

    if (user_order.length > 0) {
        let exists = false
        let current_item = {}

        // check if product already in the order
        for (i in user_order[0].item) {
            if (user_order[0].item[i].product._id == req.body.product && user_order[0].item[i].for == 'sell') {

                current_item = user_order[0].item[i]
                exists = true

                OrderItem.findByIdAndUpdate(current_item._id,
                    {
                        price: parseInt(current_item.price / current_item.quantity) + parseInt(current_item.price),
                        quantity: parseInt(current_item.quantity) + 1
                    })
                    .exec()
                break
            }
        }

        if (!exists) { current_item = await this.create_order_item(req) }

        Order.findByIdAndUpdate(user_order[0]._id,
            { total_price: parseInt(user_order[0].total_price) + parseInt(current_item.price / current_item.quantity), $addToSet: { item: current_item._id } },
        )
            .then(result => success_message(res, 'Item added succesfully to the order'))
            .catch(err => error_message(res, err, 'Error in adding item to the order'))


    } else {
        const orderItem = await this.create_order_item(req)

        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            item: [orderItem],
            total_price: parseInt(orderItem.price),
            user: req.userdata._id
        })

        order.save()
            .then(result => success_message(res, "Order created succesfully"))
            .catch(err => error_message(res, err, "Order creation failed"))
    }

}

exports.get_for_user = (req, res, next) => {

    Order.find({ user: req.userdata._id, status: 'unordered' }).sort({ created_at: -1 }).limit(1)
        .populate({
            path: 'item',
            populate: [{ path: 'product', select: 'name image' }, { path: 'seller', select: 'name' }],
        })
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

exports.get_all_for_user = (req, res, next) => {

    Order.find({ user: req.userdata._id, status: 'ordered' })
        .populate({
            path: 'item',
            populate: [{ path: 'product', select: 'name image' }, { path: 'seller', select: 'name' }],
        })
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

exports.get_all_admin = (req, res, next) => {
    Order.find({ status: { $in: ['ordered', 'completed'] } })
        .populate({
            path: 'item',
            populate: [{ path: 'product', select: 'name image' }, { path: 'seller', select: 'name' }]
        })
        .then(result => success_result(res, result))
        .catch(err => error_message(res, err, "Error getting orders"))
}

exports.get_for_seller = (req, res, next) => {
    let orderitems = []

    Order.find({ status: 'ordered' })
        .populate({
            path: 'item',
            populate: { path: 'product', select: 'name image' },
        })
        .then(result => {
            result.map(doc => {
                doc.item.map(orderitem => {
                    if (String(orderitem.seller) == String(req.userdata._id)) {
                        console.log(orderitem.seller);
                        orderitems.push(orderitem)
                    }
                })
            })

            res.status(200).json({
                success: true,
                result: orderitems
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Error getting order items for seller"
            })
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

exports.update_order = (req, res, next) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Order updated successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error in order update",
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