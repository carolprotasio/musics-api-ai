const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Cadastro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe com este e-mail.' })
    }

    const user = await User.create({ name, email, password })
    res.status(201).json({ message: 'Usuário criado com sucesso.', userId: user._id })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message })
  }
}

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha inválida.' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.status(200).json({
      message: 'Login bem-sucedido.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message })
  }
}
