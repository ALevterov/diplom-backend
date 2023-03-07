function classifyUserRequests(logs, thematicArray) {
    logs.forEach((log,i) => {
        const thematic = thematicArray.find(thm => thm.url === log.url)
        logs[i].thematic = thematic?.thematic?.thematic || 'Not defined'
    })
}

module.exports = {
    classifyUserRequests
}