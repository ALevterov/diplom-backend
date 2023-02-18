function cutStylesAndScripts(dom) {
	const scripts = dom.window.document.querySelectorAll('script')
	const styles = dom.window.document.querySelectorAll('style')

	scripts.forEach(scr => {
		scr.remove()
	})
	styles.forEach(stl => {
		stl.remove()
	})
}

module.exports = {
	cutStylesAndScripts
}