const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/database")

const app = express()
require('dotenv').config({ path: './config/.env' })

connectDB()

app.use(express.json())

app.use(cors()) 

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})


