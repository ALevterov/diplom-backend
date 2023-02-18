const { Thematic } = require("../models")
const { initialThematics } = require("./thematics")

async function initThematics() {
	const thematics = await Thematic.findAll()
	if(thematics.length === 0) {
		initialThematics.forEach(thm => {
			Thematic.create({...thm})
		})
	}
}

module.exports = {
	initThematics
}