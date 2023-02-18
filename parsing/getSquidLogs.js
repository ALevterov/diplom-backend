const fs = require('fs')
const { SQUID_LOGS_PATH } = require('../helpers/consts')

function getSquidLogs() {
	try {
		let content = fs.readFileSync(SQUID_LOGS_PATH, 'utf8')
		return content
	} catch (e) {
		console.log(e)
		throw e
	}

}

module.exports = {
	getSquidLogs
}