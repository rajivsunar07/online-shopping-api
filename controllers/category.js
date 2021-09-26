const mongoose = require("mongoose");
const Category = require("../models/category")

const { success_message, error_message, success_result } = require("./messages")

exports.create = (req, res, next) => {
    const category = new Category({
        _id: mongoose.Types.ObjectId(), 
        category: req.body.category
    })

    category.save()
    .then(result => success_message(res, "Category created successfully"))
    .catch(err => error_message(res, err, "Category creation failed"))
}


exports.update = (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
    .then(result => success_message(res, "Category updated successfully"))
    .catch(err => error_message(res, err, "Category update failed"))
}


exports.get_all = (req, res, next) => {
    Category.find()
    .then(result => success_result(res, result))
    .catch(err => error_message(res, err, "Category get failed"))
}