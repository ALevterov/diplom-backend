function classifyUserRequests(logs, thematicArray) {
  console.log('logs', logs)
  console.log('thematicArray', thematicArray)
  logs.forEach((log, i) => {
    const thematic = thematicArray.find(thm => thm.url === log.url)
    if (thematic?.thematic?.thematic) {
      logs[i].thematic = thematic?.thematic?.thematic
    }
  })
  return logs.filter(log => log.thematic !== 'null')
}

module.exports = {
  classifyUserRequests,
}
