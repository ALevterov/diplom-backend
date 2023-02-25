function defineWordCount(text, thematics) {
	thematics.forEach((theme,i) => {
		theme.keywords.forEach(word => {
			if(typeof thematics[i].count === 'undefined') {
				thematics[i].count = 0
			}
			const reg = new RegExp(`${word}`, 'gi')
			const count = text.match(reg)?.length
			if(Number.isInteger(count)) {
				thematics[i].count += count
			}
			if(word === 'cd') {
				console.log(count)
			}
		})
	})
}

module.exports = {
	defineWordCount
}