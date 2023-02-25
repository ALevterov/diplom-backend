const Router = require('express')
const router = new Router()
const thematicController = require('../controllers/thematicController')
// const { check } = require('express-validator')

router.get(
  '/',
  thematicController.suckDick
)

module.exports = router