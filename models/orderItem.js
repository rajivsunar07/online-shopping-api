const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exchangeFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExchangeProduct'
    },
    for: {
        type: String,
        default: 'sell',
        enum: ['rent', 'exchange', 'sell']
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

const orderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = orderItem