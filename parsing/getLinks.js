function getLinks(dom) {
	const a = dom.window.document.querySelectorAll('a')
	const links = []
	a.forEach(link => {
		if(!link.href.includes('http') && !link.href.includes('https') && !link.href.includes('tel') && !link.href.includes('mailto') && !link.href.includes('tg:')) {
			links.push(link.href)	
		}
	})
	return links
}

module.exports = {
	getLinks
}