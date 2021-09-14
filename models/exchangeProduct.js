const mongoose = require('mongoose')

const exchangeProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    exchangeFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accepted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

const exchangeProduct = mongoose.model('exchangeProduct', exchangeProductSchema)

module.exports = exchangeProduct