const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
router.post(
  '/registration',
  [check('username', 'username не может быть пустым').notEmpty()],
  authController.registration
)
router.post('/login', authController.login)
router.post(
  '/register',
  [check('username', 'username не может быть пустым').notEmpty()],
  authController.registration
)
router.post('/refresh', authController.refresh)

module.exports = router
