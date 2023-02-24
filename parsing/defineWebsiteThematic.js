const axios = require('axios')
const jsdom = require('jsdom')
const HttpsProxyAgent = require('https-proxy-agent')
const { Thematic } = require('../models')
const { getLinks } = require('./getLinks')
const { defineWordCount } = require('./defineWordCount')
const { cutStylesAndScripts } = require('./cutStylesAndScripts')
const { defineThematicByWordsCount } = require('./defineThematicByWordsCount')

// let httpsAgent = new HttpsProxyAgent({
//   protocol: 'http',
//   host: '10.33.78.12',
//   port: 3333,
//   rejectUnauthorized: false,
// })

// instance = axios.create({httpsAgent, proxy: false})
instance = axios.create()

const { JSDOM } = jsdom
const defineThematic = async url => {
  try {
    let thematics = await Thematic.findAll()

    thematics = thematics.map(thm => {
      return thm.dataValues
    })

    const { data } = await instance.get(url)
    const dom = new JSDOM(data)

    cutStylesAndScripts(dom)

    const text = dom.window.document.body.innerHTML
    const links = getLinks(dom) // получаем ссылки первого уровня
    defineWordCount(text, thematics) // определяем количество слов по темам на основной странице
    console.log(url + ' completed!!')
    for (const link of links) {
      try {
        const { data } = await instance.get(url + link)
        const dom = new JSDOM(data)
        cutStylesAndScripts(dom) // обрезаем скрипты и стили
        const text = dom.window.document.body.innerHTML

        defineWordCount(text, thematics) // определяем количество слов по темам по ссылке первого уровня
        console.log(url + link + ' completed!!')
      } catch (e) {
        console.log(e)
      }
    }

    const definedThematic = defineThematicByWordsCount(thematics)
    console.log('theme defined!!!')
    return { thematics, definedThematic }
  } catch (e) {
    console.log(e)
    return e
  }
}

module.exports = { defineThematic }
