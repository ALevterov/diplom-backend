const path = require('path')

const SQUID_LOGS_PATH = path.join('/var', '/log', 'squid', 'access.log')

module.exports = {
	SQUID_LOGS_PATH
}