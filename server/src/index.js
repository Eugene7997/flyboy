const dotenv = require('dotenv').config()
const express = require("express")
const Mongoclient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const cors = require("cors");
const FlightLog = require('../models/flightLog.model');

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("App is Working");
})

app.get("/api/flightlog", async (req, res)=> {
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

app.post("/api/flightlog", async (req, res)=> {
    try {
        console.log("Received request to create flight log")
        const flightLogs = await FlightLog.create(req.body)
        res.status(200).json(flightLogs)
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

