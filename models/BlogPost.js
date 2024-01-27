const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    body: {
        type: String,
        required: [true, "Please provide description"]
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: [true, "Please provide image"]
    }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);