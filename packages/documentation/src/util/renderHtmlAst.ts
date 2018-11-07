import { createElement } from 'react'
import { componentIndex } from 'react-dnd-documentation-examples'
import processImages from './processImagesInMarkdownAst'
const log = require('debug')('site:renderHtmlAst')
const rehypeReact = require('rehype-react')

// Registers the examples as custom components
const renderAst = new rehypeReact({
	createElement,
	components: componentIndex,
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
