const express = require('express')
const router = express.Router()
const musicController = require('../controllers/musicController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, musicController.createMusic)
router.get('/', musicController.getAllMusics)
router.get('/:id', musicController.getMusicById)
router.put('/:id', authMiddleware, musicController.updateMusic)
router.delete('/:id', authMiddleware, musicController.deleteMusic)

module.exports = router
