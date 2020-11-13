/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
}
