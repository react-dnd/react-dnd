module.exports = {
	presets: [
		[
			require('@babel/preset-env'),
			{
				modules: 'cjs',
				targets: {
					browsers: ['>0.25%, not dead'],
				},
			},
		],
	],
	plugins: [
		require('@babel/plugin-proposal-class-properties'),
		require('@babel/plugin-proposal-object-rest-spread'),
		require('@babel/plugin-proposal-optional-chaining'),
		require('@babel/plugin-proposal-nullish-coalescing-operator'),
	],
}
