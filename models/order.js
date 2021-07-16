const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: {type: [String]},
    user: {type: String},
    date: {type: Date}
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order