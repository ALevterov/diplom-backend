const { defineThematic } = require("../parsing/defineWebsiteThematic");
const { getSquidLogs } = require("../parsing/getSquidLogs");
const { transformSquidLogs } = require("../parsing/transformSquidLogs");

class ThematicController {
	async defineTheme(req, res, next) {
		console.log('define theme!')
		try {
			const thematics = await defineThematic('https://skillbox.ru')
			// const transformedLogs = transformSquidLogs(getSquidLogs())
			// console.log(transformedLogs)
			return res.json({response: thematics})
		} catch (e) {
			console.log(e)
			res.json({response: e.message})
		}
	}
}

module.exports = new ThematicController()