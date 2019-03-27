declare var require: any
import { createElement } from 'react'
import { componentIndex } from 'react-dnd-examples/lib/esm/index'
import { componentIndex as hookComponentIndex } from 'react-dnd-examples-hooks/lib/esm/index'
import { parse } from 'query-string'
import processImages from './processImagesInMarkdownAst'
const log = require('debug')('site:renderHtmlAst')
const rehypeReact = require('rehype-react')

export function isExperimentalApiMode() {
	if (typeof window !== 'undefined') {
		const queryObject = parse(window.location.search)
		return queryObject.experimental !== undefined
	} else {
		return false
	}
}

// Registers the examples as custom components
const renderAst = new rehypeReact({
	createElement,
	components: {
		...(isExperimentalApiMode() ? hookComponentIndex : componentIndex),
	},
}).Compiler

export default function renderHtmlAst(node: any) {
	try {
		processImages(node)
		const result = renderAst(node)
		return result
	} catch (err) {
		log('error rendering doc page', err)
	}
}
