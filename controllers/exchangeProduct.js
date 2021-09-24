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

exports.get_requests = (req, res, next) => {

    ExchangeProduct.find({ [req.params.for] : req.userdata._id})
        .populate('exchangeFor')
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retreiving requests",
                error: err
            })
        })
}


exports.update = (req, res, next) => {
    ExchangeProduct.findByIdAndUpdate(req.params.id, {accepted: req.body.accepted})
    .then(result => {
        res.status(200).json({
            success: true,
            message: "Exchange Product updated successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Error updating Exchange Product",
            error: err
        })
    })
}

exports.delete_exchangeProduct = (req, res, next) => {

    ExchangeProduct.findByIdAndDelete(req.params.id)
        .exec()
        .then(result => {

            // delete images from files
            for (i in result.image) {
                fs.unlinkSync(result.image[i])
            }

            res.status(200).json({
                message: "Exchange product deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,

            });
        });
}

