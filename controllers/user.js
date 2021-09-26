const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const User = require("../models/user")

const { success_message, error_message, success_result } = require("../utils/messages")

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
                        return error_message(res, err, "Registration failed")
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
                            .then(result => success_message(res, "User created succesfully"))
                            .catch(err => error_message(res, err, "Registration failed"))
                    }
                })
            }
        })
};


exports.login = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    })
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: '24h'
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
            res.status(500).json({
                error: err
            })
        })
}

exports.get_user = (req, res, next) => {
    res.status(200).json({
        user: req.userdata 
    })  
}

exports.get_user_from_id = (req, res, next) => {

    User.findOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            })
            next()
        })
        .catch(err => {
            res.status(401).json({ error: err })
        })

}

exports.update = (req, res, next) => {

    const id = req.userdata._id;
    
    User.findByIdAndUpdate(id, req.body)
      .exec()
      .then(result => {
          console.log(req.file)
        User.findByIdAndUpdate(id, {image: req.file.path})
        .then(result => success_message(res, "User details updated"))
        .catch(err => error_message(res, err, "User image update failed"))
        
      })
      .catch(err => error_message(res, err, "Error in user update"));
  };

  exports.change_password = (req, res, next) => {
    User.findById( req.userdata._id)
    .exec()
    .then(user => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Incorrect password"
                })
            }

            if (result) {
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {

                        User.findByIdAndUpdate( req.userdata._id, { password: hash} )
                            .then(result => {
                                return res.status(200).json({
                                    success: true,
                                    message: "Password changed successfully"
                                })
                            })
                            .catch(err => {
                                res.status(401).json({
                                    error: err,
                                    message: "Error in password change"
                                })
                            })

                    }
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
  }