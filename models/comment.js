const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment