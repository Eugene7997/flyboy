const dotenv = require('dotenv').config()
const Mongoclient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors");
const app = express()
const flightlogRoutes = require('./routes/flightlog.route')
const userRoutes = require('./routes/auth.route')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/flightlogs", flightlogRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res)=>{
    res.send("App is Working");
})

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log(`Connection is successful`)
        app.listen(5000)
    })
    .catch((error)=>{
        console.log(error)
    })

