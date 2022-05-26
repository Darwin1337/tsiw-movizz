module.exports = {
	pwa: {
		workboxOptions: {
			skipWaiting: true,
			clientsClaim: true,
			navigateFallback: 'index.html'
		}
	}
}