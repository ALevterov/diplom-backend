
const sortFunc = (a,b) => { 
	if(a.count < b.count) return 1
	if(a.count === b.count) return 0
	if(a.count > b.count) return -1
 }
function defineThematicByWordsCount(thematic) {
	thematic.sort(sortFunc)
	return thematic[0].name
}

module.exports = {
	defineThematicByWordsCount
}