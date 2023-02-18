const axios = require('axios')
const jsdom = require("jsdom"); 
const HttpsProxyAgent = require('https-proxy-agent');
const { Thematic } = require('../models');
const { getLinks } = require('./getLinks');
const { defineWordCount } = require('./defineWordCount');
const { cutStylesAndScripts } = require('./cutStylesAndScripts');

let httpsAgent = new HttpsProxyAgent({protocol: 'http', host: '10.33.78.12', port: 3333, rejectUnauthorized: false});

instance = axios.create({httpsAgent, proxy: false})

const { JSDOM } = jsdom;
const defineThematic = async (url) => { 
	try {
		const thematics = await Thematic.findAll()

		const {data} = await instance.get(url)
		const dom = new JSDOM(data)
		
		cutStylesAndScripts(dom)

		const text =  dom.window.document.body.innerHTML
		const links = getLinks(dom) // получаем ссылки первого уровня
		defineWordCount(text, thematics) // определяем количество слов по темам на основной странице

		links.forEach(async link => {
			try {
				const {data} = await instance.get(url + link)
				const dom = new JSDOM(data)
				cutStylesAndScripts(dom) // обрезаем скрипты и стили
				const text =  dom.window.document.body.innerHTML
				defineWordCount(text, thematics) // определяем количество слов по темам по ссылке первого уровня
			} catch(e) {
				console.log(e)
			}

		})

		// const definedThematic = defineThematicByWordsCount(thematics)

		return links

	} catch(e) {
		console.log(e)
		return e
	}

}

module.exports = {defineThematic}