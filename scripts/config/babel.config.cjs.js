module.exports = {
	presets: [
		[
			require.resolve('@babel/preset-env'),
			{
				modules: 'cjs',
				targets: {
					browsers: ['>0.25%, not dead'],
				},
			},
		],
	],
	plugins: [
		require.resolve('@babel/plugin-proposal-class-properties'),
		require.resolve('@babel/plugin-proposal-optional-chaining'),
		require.resolve('@babel/plugin-proposal-object-rest-spread'),
	],
}
