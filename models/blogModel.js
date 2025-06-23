const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
     },
     content: {
        type: String
     },
     category: {
        type: String,
        enum: ['Technology', 'Health', 'Lifestyle', 'Education', 'Travel'], 
        required: true
    },
     published: {
        type: Boolean,
        default: false
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
     isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})


module.exports = mongoose.model('Blog',blogSchema)