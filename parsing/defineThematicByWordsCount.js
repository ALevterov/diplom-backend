
const sortFunc = (a,b) => { 
	if(a.count < b.count) return 1
	if(a.count === b.count) return 0
	if(a.count > b.count) return -1
 }
function defineThematicByWordsCount(thematic) {
	thematic.sort(sortFunc)
	console.log(thematic[0].count);
	if(thematic[0].count) {
		return thematic[0].name
	}
	return null	
}

module.exports = {
	defineThematicByWordsCount
}