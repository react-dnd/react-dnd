import { withPrefix } from 'gatsby'

export interface MarkdownAstNode {
	tagName?: string
	type: string
	properties?: { [key: string]: any }
	children: MarkdownAstNode[]
	data: any
}

export function processImagesInMarkdownAst(ast: MarkdownAstNode): void {
	checkNode(ast)
}

function checkNode(node: MarkdownAstNode) {
	if (!node) {
		return
	}
	if (node.tagName === 'img') {
		const properties = node.properties as { [key: string]: any }
		const imageSrc: string = properties?.['src'] || ''
		if (imageSrc.startsWith('/images')) {
			properties['src'] = withPrefix(imageSrc)
		}
	}
	const children = node.children || []
	children.forEach((child) => checkNode(child))
}
