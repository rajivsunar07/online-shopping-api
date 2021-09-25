const mongoose = require("mongoose");
const Comment = require("../models/comment")

const { success_message, error_message, success_result } = require("./messages")

exports.create = (req, res, next) => {
    const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        user: req.userdata._id,
        product: req.body.product,
        description: req.body.description
    })

    comment.save()
    .then(res => success_message(res, "Comment created successfully"))
    .catch(err => error_message(res, err, "Comment creation failed"))
}

exports.get_all = (req, res, next) => {
    Comment.find({ product: req.params.product })
    .then(res => success_result(res, result))
    .catch(err => error_message(res, err, "Error getting comment for product"))
}