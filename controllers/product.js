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
            result: result.map(product => {
                return {
                    productId : product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    user: product.user
                }
            })
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
    .then(result=>{
        if(result){
            res.status(200).json({
                success: true,
                result: result
            })
        }else{
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
        // user: req.userdata._id,
        image: req.file.path
    })

    product
    .save()
    .then(result=>{
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
    const id = req.params.id;

    
    Product.findByIdAndUpdate(id, req.body)
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
  };