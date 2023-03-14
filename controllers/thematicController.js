const { defineThematic } = require('../parsing/defineWebsiteThematic')
const { getSquidLogs } = require('../parsing/getSquidLogs')
const { transformSquidLogs } = require('../parsing/transformSquidLogs')
const axios = require('axios')
const HttpsProxyAgent = require('https-proxy-agent')
const { ClassifiedURLs } = require('../models')
const { classifyUserRequests } = require('../parsing/classifyUserRequests')
let httpsAgent = new HttpsProxyAgent({
  protocol: 'http',
  host: '10.33.74.3',
  port: 3333,
  rejectUnauthorized: false,
})

// instance = axios.create({ httpsAgent, proxy: false })
instance = axios.create()
class ThematicController {
  async defineTheme(req, res, next) {
    console.log('defineTheme')
    try {
      const { logs, urlArray } = transformSquidLogs(getSquidLogs())
      console.log('urlArray', urlArray)
      const thematicArray = []

      for (let url of urlArray) {
        try {
          let thematic
          const saved = await ClassifiedURLs.findOne({ where: { url } }) // ищем тематику в базе
          if (saved) {
            console.log('saved', saved)
            thematic = saved
            thematicArray.push({ thematic, url })
          } else {
            let { definedThematic: thematic } = await defineThematic(url)
            console.log('DEFINED', thematic)
            if (thematic !== 'null') {
              await ClassifiedURLs.create({ url, thematic }) // добавлеяем тематику в базу
              thematicArray.push({ thematic, url })
            } else {
              await ClassifiedURLs.create({ url, thematic: 'null' }) // добавлеяем тематику в базу
              thematicArray.push({ thematic, url })
            }
          }
        } catch (e) {
          console.log(e)
          continue
        }
      }
      const result = classifyUserRequests(logs, thematicArray) // добавляем к каждому логу тематику
      return res.json({ response: result })
    } catch (e) {
      console.log(e)
      next(e.message)
      res.json({ response: e.message })
    }
  }
}

module.exports = new ThematicController()
