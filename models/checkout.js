const mongoose = require('mongoose')

const checkoutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: {
        type: String
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


const Checkout = mongoose.model('Checkout', checkoutSchema)

module.exports = Checkout