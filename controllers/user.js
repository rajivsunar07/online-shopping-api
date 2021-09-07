const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

const User = require("../models/user")

exports.register = (req, res) => {
    // first check if the given email is already registered or not
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // if user is found then give error
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email address already used"
                });
            } else {
                // if user not found then hash the password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        // if hashing successful create a user
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name
                        });

                        // save the user
                        user
                        .save()
                        .then(result => {
                            // if user succesfully saved
                            res.status(201).json({
                                success: true,
                                message: "User created succesfully"
                            })
                        })
                        .catch(err => {
                            // if an error occures
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
    };


exports.login = (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }

            if(result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn : '24h'
                    }
                )
                return res.status(200).json({
                    success: true,
                    message: "Authentication successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Authentication failed"
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.get_user = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(" ")[1] // bearer token
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)

        User.findOne({_id: data.userId})
        .then(result => {
            res.status(200).json({
                user: result
            })
            next()
        })
        .catch(err => {
            res.status(401).json({error: err})
        })
    }
    catch(err){
        res.status(401).json({
            error: err,
            message: "User not found"
        })
    }
}