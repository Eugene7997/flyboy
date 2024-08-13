const dotenv = require('dotenv').config()
const Mongoclient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const flightlogRoutes = require('./routes/flightlog.route')
const userRoutes = require('./routes/auth.route')
const path = require('path');

app.use(cors({credentials:true, origin: "http://localhost:3000", methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use("/api/flightlogs", flightlogRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res)=>{
    res.send("App is Working");
})

// For production
app.use(express.static(path.join(__dirname, "../../client/build")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log(`Connection is successful`)
        app.listen(5000)
    })
    .catch((error)=>{
        console.log(error)
    })

