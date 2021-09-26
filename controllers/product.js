const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const User = require("../models/user")
const Product = require("../models/product")
const fs = require('fs')

const { success_message, error_message, success_result } = require("../utils/messages")


exports.get_all = (req, res) => {
    Product.find()
        .exec()
        .then(result => success_result(res, result))
        .catch(err => error_message(res, err, "Error getting products"))
}

exports.get_one = (req, res) => {
    Product.find({ _id: req.params.id })
        .exec()
        .then(result => {
            if (result) success_result(res, result)
            else error_message(res, err, "Product not found")
        })
        .catch(err =>  error_message(res, err, "Product not found"))
}

exports.create = (req, res) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        user: req.userdata._id,
        for: req.body.for,
        image: req.files.map(file => file.path)
    })

    product
        .save()
        .then(result => success_message(res, "Product created successfully"))
        .catch(err => error_message(res, err,  "Error in product creation"))
}

exports.update = (req, res, next) => {
    Product.findOne({_id: req.params.id})
    .then(result => {
        let images = []
        images =  Array(req.body.image) 

        result.image.forEach(img => {
            if(!images.includes(img)){
                fs.unlinkSync(img)
            }
        });
        
        req.files.map(file => {
            images.push(file.path)
        })

        req.body.image = images

        Product.findByIdAndUpdate(req.params.id, req.body)
        .exec()
        .then(result => success_message(res, "Product updated"))
        .catch(err => error_message(res, err, "Error updating product"));
        

    })
    .catch(err => error_message(res, err, "Product not found"))

    
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

            success_message(res, "Product deleted successfully")
        })
        .catch(err => error_message(res, err, "Error deleting product"));
};

exports.get_for_user = (req, res, next) => {
    Product.find({ user: req.userdata._id })
        .then(result => success_result(res, result))
        .catch(err => error_message(res, err, "Error getting product"))
}