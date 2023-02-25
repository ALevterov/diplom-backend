const { defineThematic } = require('../parsing/defineWebsiteThematic')
const { getSquidLogs } = require('../parsing/getSquidLogs')
const { transformSquidLogs } = require('../parsing/transformSquidLogs')
const axios = require('axios')
const HttpsProxyAgent = require('https-proxy-agent')
let httpsAgent = new HttpsProxyAgent({
  protocol: 'http',
  host: '10.33.74.3',
  port: 3333,
  rejectUnauthorized: false,
})

instance = axios.create({httpsAgent, proxy: false})
class ThematicController {
  async defineTheme(req, res, next) {
    console.log('define theme!')
    try {
      // let url = 'https://skillbox.ru/asdasdas/'
      // let match = url.match(/https:\/\/[a-z|а-я|.|\d+]+/i)
      // if (match) {
      //   url = match[0]
      //   console.log(url)
      // } else {
      //   console.log('invalid url string')
      //   return
      // }
      // const thematics = await defineThematic(url)
      const {logs, urlArray} = transformSquidLogs(getSquidLogs())
      
      const thematicArray = []

      for(let url of urlArray) {
        try {
          const thematic = await defineThematic(url)
          thematicArray.push(thematic)
        }
        catch(e) {
          console.log(e);
          continue
        } 
      }
      

      return res.json({response: logs})
      // return res.json({ response: thematics })
    } catch (e) {
      console.log(e)
      res.json({ response: e.message })
    }
  }
  async suckDick (req, res, next) {
    try {
      const response = await instance.get('http://10.33102.97/asdasd/asdasd/')
      console.log(response);
    } catch(e) {
      
    }
  }
}

module.exports = new ThematicController()
