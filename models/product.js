const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    for: {
        type: [String],
        required: true
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }
})

const product = mongoose.model('Product', productSchema)

module.exports = product