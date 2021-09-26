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
        type: [String]
    },
    exchangeFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['accepted', 'rejected', 'pending', 'added to cart']
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

const exchangeProduct = mongoose.model('ExchangeProduct', exchangeProductSchema)

module.exports = exchangeProduct