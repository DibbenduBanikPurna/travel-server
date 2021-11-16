const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    destination: {
        type: String
    },
    date: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending",
    }

})

const BookData = new mongoose.model("BookData", bookSchema)

module.exports = BookData;