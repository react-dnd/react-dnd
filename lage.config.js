module.exports = {
	pipeline: {
		clean: [],
		build: ['^build'],
		test: ['build'],
		lint: [],
	},
	npmClient: 'yarn',
}
