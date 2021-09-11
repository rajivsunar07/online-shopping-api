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
    shipping_address: {
        type: String,
        required: true,
        default: ''
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const order = mongoose.model('order', orderSchema)

module.exports = order