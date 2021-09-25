const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        type: String
    },
    subCategory: {
        type: [this]
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


const Category = mongoose.model('Category', categorySchema)

module.exports = Category