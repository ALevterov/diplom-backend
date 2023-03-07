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

		if(log['method'] === 'GET') {
			let url = fields[6]
			let match
			if(url.match(/https/)) {
				match = url.match(/https:\/\/[a-z|а-я|.|\d+]+/i) || []
			} else if(url.match(/http/)) {
				match = url.match(/http:\/\/([a-z|а-я|.|\d+]+)/i) || []
				if(match[1]) {
					match[0] = 'https://' + match[1]
				}
			} else {
				match = url.match(/[a-z|а-я|.|\d+]+/i) || []
				if(match.length) {
					match[0] = 'https://' + match[0]
				}
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
	
	urlArray = new Set(urlArray)


	return {logs: result, urlArray}
}

module.exports = {
	transformSquidLogs
}