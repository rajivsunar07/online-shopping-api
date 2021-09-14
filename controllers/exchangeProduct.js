const mongoose = require("mongoose");
const ExchangeProduct = require("../models/exchangeProduct")

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
    .then(result=>{
        res.status(200).json({
            success: true,
            message: "Exchange product created successfully",
            
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: "Error in exchange product creation"
        })
    })
}

// for sellers
exports.get_requests = (req, res, next) => {

    ExchangeProduct.find({ user: req.userdata._id})
        .populate('exchangeFor', '_id name image')
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



