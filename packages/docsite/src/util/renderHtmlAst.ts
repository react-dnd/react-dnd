import debug from 'debug'
import { createElement } from 'react'
import rehypeReact from 'rehype-react'

import { ExampleTabs } from '../components/exampleTabs'
import {
	MarkdownAstNode,
	processImagesInMarkdownAst as processImages,
} from './processImagesInMarkdownAst'

const log = debug('site:renderHtmlAst')

// Registers the examples as custom components
const renderAst = new (rehypeReact as any)({
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
