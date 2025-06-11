const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
  singer: {
    type: String,
    required: [true, 'Cantor(a) é obrigatório']
  },
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  year: {
    type: Number,
    required: [true, 'Ano é obrigatório']
  },
  genre: {
    type: String,
    required: [true, 'Gênero é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Music', musicSchema)
