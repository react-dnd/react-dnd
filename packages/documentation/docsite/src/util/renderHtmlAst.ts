import { createElement } from 'react'
import {
	processImagesInMarkdownAst as processImages,
	MarkdownAstNode,
} from './processImagesInMarkdownAst'
import { ExampleTabs } from '../components/exampleTabs'
import debug from 'debug'
import rehypeReact from 'rehype-react'

const log = debug('site:renderHtmlAst')

// Registers the examples as custom components
const renderAst = new rehypeReact({
	createElement,
	components: {
		'view-source': ExampleTabs,
	},
}).Compiler

export function renderHtmlAst(node: MarkdownAstNode): any {
	try {
		processImages(node)
		const result = renderAst(node)
		return result
	} catch (err) {
		log('error rendering doc page', err)
	}
}
