const dotenv = require('dotenv').config()
const express = require("express")
const Mongoclient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const cors = require("cors");
const FlightLog = require('./models/flightLog.model');
const app = express()
const multer = require('multer')
const upload = multer({ dest: "uploads/" });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get("/", (req, res)=>{
    res.send("App is Working");
})

app.get("/api/flightlogs", async (req, res)=> {
    try {
        console.log("Received request for flight logs")
        const flightLogs = await FlightLog.find({});
        console.log(flightLogs)
        res.status(200).json(flightLogs)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/api/flightlog/:id", async (req, res)=> {
    try {
        const {id} = req.params
        console.log(`Received request for flight log with ${id}`)
        const flightLog = await FlightLog.findById(id);
        console.log(flightLog)
        res.status(200).json(flightLog)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post("/api/flightlog", upload.array("files"), async (req, res)=> {
    try {
        console.log("Received request to create flight log")
        const flightLogs = await FlightLog.create(req.body)
        res.status(200).json(flightLogs)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put("/api/flightlog/:id", upload.array("files"), async (req, res)=> {
    try {
        const {id} = req.params
        console.log(`Received request to update flight log ${id}`)
        const flightLog = await FlightLog.findByIdAndUpdate(id, req.body)
        if (!flightLog) {
            res.status(404).json({message: "Flight log not found"})
        }
        const updatedFlightLog = await FlightLog.findById(id)
        res.status(200).json(updatedFlightLog)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete("/api/flightlog/:id", async (req, res)=> {
    try {
        const {id} = req.params
        console.log(`Received request to delete flight log ${id}`)
        const flightLog = await FlightLog.findByIdAndDelete(id)
        if (!flightLog) {
            res.status(404).json({message: "Flight log not found"})
        }
        res.status(200).json({message: "Flight log deleted successfully"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log(`Connection is successful`)
        app.listen(5000)
    })
    .catch((error)=>{
        console.log(error)
    })

