const mongoose = require('mongoose')
const orderItem = require('./orderItem')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'OrderItem'
    },
    total_price: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    status : {
        type: String,
        default: 'unordered',
        required: true,
        enum : ['unordered', 'ordered', 'completed']
    },
    checkout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checkout'
    }
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const order = mongoose.model('order', orderSchema)

module.exports = order