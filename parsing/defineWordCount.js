function defineWordCount(text, thematics) {
	thematics.forEach(theme => {
		theme.keywords.forEach(word => {
			const count = text.match(word)
			console.log(count)
		})
	})
}

module.exports = {
	defineWordCount
}