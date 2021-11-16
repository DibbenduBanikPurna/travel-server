const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()



const TourData = require('./Model/TourSchema')
const BookData = require('./Model/BookSchema')



mongoose.connect('mongodb://localhost:27017/tours', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log("database connect"))
    .catch(err => console.log(err))


const app = express()
app.use(cors())
app.use(bodyParser.json())


//post single data
app.post('/singletour', async (req, res) => {
    try {
        const singleData = new TourData(req.body)
        await singleData.save()
        res.send("data-post")
    }
    catch (err) {
        console.log(err.message)
    }

})

//post all data
app.post('/tour', async (req, res) => {

    try {
        await TourData.insertMany(req.body)
        res.send("data posted")

    }
    catch (err) {
        console.log(err.message);
    }

})

//get all data
app.get("/alltour", async (req, res) => {
    try {
        const allData = await TourData.find({})
        res.send(allData)
    }
    catch (err) {
        console.log(err.message)
    }
})

//get single data
app.get('/singletour/:id', async (req, res) => {
    try {
        const singleData = await TourData.findOne({ id: req.body.id })
        res.send(singleData)
    }
    catch (err) {
        console.log(err.message)
    }
})

//post bookdata
app.post('/bookdata', async (req, res) => {

    try {
        const newData = new BookData(req.body);
        await newData.save();
        res.send("send");
    }
    catch (err) {
        console.log(err.message)
    }
})


//getsinglebookData
app.get('/bookdata', async (req, res) => {

    const datas = await BookData.find({})
    res.send(datas);
})

//getallbookdata
app.get('/allbook', async (req, res) => {
    try {
        const all = await BookData.find({})
        res.send(all);
    }
    catch (err) {
        console.log(err.message)
    }
})

//delete book data
app.delete('/remove/:id', async (req, res) => {
    console.log(req.body)

    try {
        await BookData.deleteOne({ _id: req.params.id })

        res.status(200).json({
            success: "Deleted"
        })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("errrs")
    }
})

//update book
app.put('/update/:id', async (req, res) => {

    try {
        const update = await BookData.updateOne({ _id: req.params.id }, {
            status: "Approved"
        })
        res.send("updated")
        //console.log("updated")
    }
    catch (err) {
        console.log(err.message)
    }
})

app.get("/", (req, res) => {

    res.send("Welcome To MY Travel server");
})


app.listen(5000, () => {
    console.log("app started");


})



