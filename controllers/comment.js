const mongoose = require("mongoose");
const Comment = require("../models/comment")

const { success_message, error_message, success_result } = require("../utils/messages")

exports.create = (req, res, next) => {
    let comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        user: req.userdata._id,
        product: req.body.product,
        description: req.body.description
    })

    comment.save()
    .then(result => success_message(res, "Comment created successfully"))
    .catch(err => error_message(res, err, "Comment creation failed"))
}

exports.get_all = (req, res, next) => {
    Comment.find({ product: req.params.product })
    .populate('user', 'name image')
    .sort({ created_at: -1})
    .exec()
    .then(result => success_result(res, result))
    .catch(err => error_message(res, err, "Error getting comment for product"))
}

exports.update = (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(result => success_message(res, "Comment updated succesfully"))
    .catch(err => error_message(res, err, "Error in updating comment"))
}

exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(result => success_message(res, "Comment deleted succesfully"))
    .catch(err => error_message(res, err, "Error in deleting comment"))
}