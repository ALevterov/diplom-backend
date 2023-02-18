function transformSquidLogs(logs) {
	const result = []
	const rows = logs.split('\n')
	rows.forEach(row => {
		let fields = row.split(' ')
		const log = {}
		fields =  fields.filter(f => f !== '' && f !== '-')
		
		log['time'] = +fields[0] * 1000
		log['method'] = fields[5]
		log['user'] = fields[7]

		if(log['method'] === 'GET' || log['method'] === 'CONNECT') {
			log['url'] = fields[6].split(':')[0]
			result.push(log)
		}
	})
	return result
}

module.exports = {
	transformSquidLogs
}