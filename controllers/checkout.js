const mongoose = require("mongoose");
const Checkout = require("../models/checkout")

const { success_message, error_message, success_result } = require("./messages")

exports.create = (req, res, next) => {
    let checkout = new Checkout({
        _id: mongoose.Types.ObjectId(),
        address: req.body.address,
        phone: req.body.phone
    })

    checkout.save()
    .then(result => success_result(res, result))
    .catch(err => error_message(res, err, "Comment creation failed"))
}