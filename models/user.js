const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {type: String},
    address: {type: String},
    phone: {type: String},
    password: {type: String},
    image: {type: String},
    is_admin: {
        type: Boolean
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User