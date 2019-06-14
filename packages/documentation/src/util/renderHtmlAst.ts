import { createElement } from 'react'
import { parse } from 'query-string'
import processImages from './processImagesInMarkdownAst'
import exampleTabs from '../components/exampleTabs'
import debug from 'debug'
// @ts-ignore
import rehypeReact from 'rehype-react'

const log = debug('site:renderHtmlAst')

export function isLegacyMode() {
	if (typeof window !== 'undefined') {
		const queryObject = parse(window.location.search)
		return queryObject.legacy !== undefined
	} else {
		return false
	}
}

// Registers the examples as custom components
const renderAst = new rehypeReact({
	createElement,
	components: {
		'view-source': exampleTabs,
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
