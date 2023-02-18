const Router = require('express')
const router = new Router()
const thematicRouter = require('./thematicRouter')

router.use('/defineTheme', thematicRouter)
module.exports = router