const mongoose = require("mongoose");
const ExchangeProduct = require("../models/exchangeProduct")

const { success_message, error_message, success_result } = require("../utils/messages")


exports.create = (req, res) => {
    const exchangeProduct= new ExchangeProduct({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        user: req.userdata._id,
        exchangeFor:  req.body.exchangeFor,
        seller:  req.body.seller,
        image: req.files.map(file => {
                return file.path
            })
    })

    exchangeProduct
    .save()
    .then(result=> success_message(res, "Exchange product created successfully"))
    .catch(err => error_message(res, err, "Error in exchange product creation"))
}

exports.get_requests = (req, res, next) => {
    ExchangeProduct.find({ [req.params.for] : req.userdata._id})
    .populate('exchangeFor')
        .then(result => {
                console.log(result)
            success_result(res, result)})
        .catch(err => error_message(res, err, "Error retreiving requests"))
}


exports.get_one = (req, res, next) => {
    ExchangeProduct.findOne({ _id : req.params._id})
    .populate('exchangeFor')
    .then(result => success_result(res, result))
    .catch(err => error_message(res, err, "Error retreiving requests"))
}

exports.update = (req, res, next) => {
    ExchangeProduct.findByIdAndUpdate(req.params.id, {status: req.body.status})
    .then(result => success_message(res, "Exchange Product updated successfully"))
    .catch(err => error_message(res, "Error updating Exchange Product"))
}

exports.delete_exchangeProduct = (req, res, next) => {
    ExchangeProduct.findByIdAndDelete(req.params.id)
        .exec()
        .then(result => {

            // delete images from files
            for (i in result.image) {
                fs.unlinkSync(result.image[i])
            }

            success_message(res, "Exchange product deleted")
        })
        .catch(err => error_message(res, err, "Error deleting exchange product"));
}

