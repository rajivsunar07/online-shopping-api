const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const User = require("../models/user")
const Product = require("../models/product")
const fs = require('fs')

exports.get_all = (req, res) => {
    Product.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: err
            })
        })
}

exports.get_one = (req, res) => {
    Product.find({ _id: req.params.id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    success: true,
                    result: result
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "Product not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create = (req, res) => {

    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        user: req.userdata._id,
        image: req.files.map(file => file.path)
    })

    product
        .save()
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Product created successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/" + result._id
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Error in product creation"
            })
        })
}

exports.update = (req, res, next) => {
    Product.findOne({_id: req.params.id})
    .then(result => {
        result.image.forEach(img => {
            let images = []
            images =  Array(req.body.image) 
            if( images.includes(img)){
                fs.unlinkSync(img)
            }
        });
        console.log(req.files);

        Product.findByIdAndUpdate(req.params.id, req.body , { $addToSet: { image: req.files.map(file => file.path) }})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product updated"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
        

    })
    .catch()

    
};

exports.delete_product = (req, res, next) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .exec()
        .then(result => {

            // delete images from files
            for (i in result.image) {
                fs.unlinkSync(result.image[i])
            }

            res.status(200).json({
                message: "Product deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_for_user = (req, res, next) => {
    Product.find({ user: req.userdata._id })
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}