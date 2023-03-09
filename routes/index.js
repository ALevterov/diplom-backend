const Router = require('express')
const router = new Router()
const thematicRouter = require('./thematicRouter')
const authRouter = require('./authRouter')

router.use('/defineTheme', thematicRouter)
router.use('/auth', authRouter)

module.exports = router
