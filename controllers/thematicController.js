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

instance = axios.create({httpsAgent, proxy: false})
class ThematicController {
  async defineTheme(req, res, next) {
    try {
      const {logs, urlArray} = transformSquidLogs(getSquidLogs())
      console.log(logs);
      const thematicArray = []

      for (let url of urlArray) {
        try {
          let thematic
          const saved = await ClassifiedURLs.findOne({where: {url}}) // ищем тематику в базе
          if(saved) {
            thematic = saved
            thematicArray.push({thematic, url}) 
          } else {
            let {definedThematic: thematic} = await defineThematic(url)
            if(thematic) {
              ClassifiedURLs.create({url, thematic}) // добавлеяем тематику в базу
              thematicArray.push({thematic, url})
            }
          }
        }
        catch(e) {
          console.log(e);
          continue
        } 
      }
      classifyUserRequests(logs, thematicArray) // добавляем к каждому логу тематику
      return res.json({response: logs})
    } catch (e) {
      console.log(e)
      res.json({ response: e.message })
    }
  }
}

module.exports = new ThematicController()
