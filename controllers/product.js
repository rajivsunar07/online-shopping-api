const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const User = require("../models/user")
const Product = require("../models/product")

exports.get_all = (req, res) => {
    Product.find()
    .exec()
    .then(result => {
        res.status(200).json({
            success: true,
            result: result
        })
    })
    .catch()
}

exports.create = (req, res) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })

    product
    .save()
    .then(result=>{
        res.status(200).json({
            success: true,
            message: "Product created successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}