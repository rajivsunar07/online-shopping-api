const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    product: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {type: String},
    date: {type: Date}
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment