const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

app.use(express.json())

// Rotas
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/musics', require('./routes/musicRoutes'))

module.exports = app
