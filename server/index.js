const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/database")
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")

const app = express()
require('dotenv').config({ path: './config/.env' })

connectDB()

app.use(express.json())

app.use(cors()) 

app.get('/', (req, res) => {
    res.send("Hey you !! Welcome home")
})

app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})


