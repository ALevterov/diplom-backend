const { defineThematic } = require('../parsing/defineWebsiteThematic')
const { getSquidLogs } = require('../parsing/getSquidLogs')
const { transformSquidLogs } = require('../parsing/transformSquidLogs')

class ThematicController {
  async defineTheme(req, res, next) {
    console.log('define theme!')
    try {
      let url = 'https://skillbox.ru/asdasdas/'
      let match = url.match(/https:\/\/[a-z|а-я|.|\d+]+/i)
      if (match) {
        url = match[0]
        console.log(url)
      } else {
        console.log('invalid url string')
        return
      }
      const thematics = await defineThematic(url)
      // const transformedLogs = transformSquidLogs(getSquidLogs())
      // console.log(transformedLogs)
      return res.json({ response: thematics })
    } catch (e) {
      console.log(e)
      res.json({ response: e.message })
    }
  }
}

module.exports = new ThematicController()
