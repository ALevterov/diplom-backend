require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const sequelize = require('./db')
const fileUpload = require('express-fileupload')

const errorHandler = require('./middleware/errorHandlingMiddleware') 
const router = require('./routes/index')
const { initThematics } = require('./helpers/initThematics')

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors()) 
app.use(express.json()) 
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) 
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
  // функция запускающая приложение
  try {
    await sequelize.authenticate() // подключаемся к БД
    await sequelize.sync()
    app.listen(PORT, async () => {
			await initThematics()
      console.log(`Server started on port: ${PORT}`)
    })
  } catch (error) {
		console.log(error)
	}
}

start()