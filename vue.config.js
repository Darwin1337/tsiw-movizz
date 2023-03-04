module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/tsiw-movizz/' : '/',
	pwa: {
		workboxOptions: {
			skipWaiting: true,
			clientsClaim: true,
			navigateFallback: 'index.html'
		}
	},
	lintOnSave: false
}