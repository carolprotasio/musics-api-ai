const Music = require('../models/Music')

// Criar nova música
exports.createMusic = async (req, res) => {
  try {
    const { singer, title, year, genre, description } = req.body

    if (!singer || !title || !year || !genre || !description) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const newMusic = await Music.create({
      singer,
      title,
      year,
      genre,
      description,
      user: req.userId
    })

    res.status(201).json(newMusic)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar música.', error: error.message })
  }
}

// Listar todas as músicas
exports.getAllMusics = async (req, res) => {
  try {
    const musics = await Music.find().populate('user', 'name email')
    res.status(200).json(musics)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar músicas.', error: error.message })
  }
}

// Buscar música por ID
exports.getMusicById = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id)
    if (!music) {
      return res.status(404).json({ message: 'Música não encontrada.' })
    }
    res.status(200).json(music)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar música.', error: error.message })
  }
}

// Atualizar música
exports.updateMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!music) {
      return res.status(404).json({ message: 'Música não encontrada.' })
    }

    res.status(200).json(music)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar música.', error: error.message })
  }
}

// Deletar música
exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndDelete(req.params.id)
    if (!music) {
      return res.status(404).json({ message: 'Música não encontrada.' })
    }

    res.status(200).json({ message: 'Música removida com sucesso.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover música.', error: error.message })
  }
}
