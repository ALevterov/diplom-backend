function transformSquidLogs(logs) {
	const result = []
	let urlArray = []
	const rows = logs.split('\n')
	rows.forEach(row => {
		let fields = row.split(' ')
		const log = {}
		fields =  fields.filter(f => f !== '' && f !== '-')
		
		log['time'] = +fields[0] * 1000
		log['method'] = fields[5]
		log['user'] = fields[7]

		if(log['method'] === 'GET' || log['method'] === 'CONNECT') {
			let url = fields[6]
			let match
			if(url.match(/http/)) {
				match = url.match(/http:\/\/[a-z|а-я|.|\d+]+/i) || []
			} else if(url.match(/https/)) {
				match = url.match(/https:\/\/[a-z|а-я|.|\d+]+/i) || []
			} else {
				match = url.match(/[a-z|а-я|.|\d+]+/i) || []
			}

			if(match.length) {
				log['url'] = match[0]
				urlArray.push(match[0])
			} else {
				console.log('invalid url string')
				return
			}

			result.push(log)
		}
	})
	
	return {logs: result, urlArray}
}

module.exports = {
	transformSquidLogs
}