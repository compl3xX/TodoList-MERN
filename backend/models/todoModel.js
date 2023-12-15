const mongoose = require('mongoose')
const todoModel = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    isDone: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model('todo', todoModel)

module.exports = todo