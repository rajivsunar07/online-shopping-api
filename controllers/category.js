const mongoose = require("mongoose");
const Category = require("../models/category")

const { success_message, error_message, success_result } = require("./messages")

exports.create = (req, res, next) => {
    let category = new Category({
        _id: mongoose.Types.ObjectId(),
        category: req.userdata.category
    })

    category.save()
    .then(result => success_message(res, "Category created successfully"))
    .catch(err => error_message(res, err, "Category creation failed"))
}


