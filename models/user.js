const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {type: String},
    address: {type: String},
    phone: {type: String},
    password: {type: String},
    is_admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User