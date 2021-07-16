const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {type: String}
})

const product = mongoose.model('Product', productSchema)

module.exports = product