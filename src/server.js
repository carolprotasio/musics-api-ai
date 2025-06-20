// server.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const musicRoutes = require('./routes/musicRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/swagger.json')

const app = express()
app.use(express.json())

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Rotas
app.use('/api/users', userRoutes)
app.use('/api/musics', musicRoutes)

// Rota de healthcheck
app.get('/api/users/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})
// Rota simples para o GitHub Actions verificar se a API está no ar
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Conectar ao MongoDB e iniciar servidor
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB')
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000 🚀')
    })
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err))
