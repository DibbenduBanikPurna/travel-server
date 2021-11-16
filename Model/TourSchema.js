const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    img: {
        type: String
    }
})

const TourData = new mongoose.model("tourdata", tourSchema);
module.exports = TourData;