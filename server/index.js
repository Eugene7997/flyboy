const express = require("express")
var Mongoclient = require("mongodb").Mongoclient
const cors = require("cors");

const app = express()
app.use(cors())

app.get("/", (req, res)=>{
    res.send("App is Working");
})

app.listen(5000);