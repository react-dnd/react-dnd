/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { createElement } from 'react'
import * as components from 'react-dnd-documentation-examples'
import processImages from './processImagesInMarkdownAst'
// tslint:disable-next-line
const log = require('debug')('site:renderHtmlAst')

// tslint:disable-next-line
const rehypeReact = require('rehype-react')
const renderAst = new rehypeReact({
	createElement,
	components,
}).Compiler

export default function renderHtmlAst(node: any) {
	try {
		processImages(node)
		const result = renderAst(node)
		return result
	} catch (err) {
		// tslint:disable-next-line
		log('error rendering doc page', err)
	}
}
