/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
module.exports = {
	presets: [
		[require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
		require.resolve('@babel/preset-typescript'),
		require.resolve('@babel/preset-react'),
	],
}
