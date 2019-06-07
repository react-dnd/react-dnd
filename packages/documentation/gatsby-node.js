/* eslint-disable */
const path = require('path')

/**
 * Dynamically creates pages in the static website
 */
async function createPages({ actions, graphql }) {
	const retrieveMarkdownPages = () =>
		graphql(`
			{
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							frontmatter {
								path
							}
						}
					}
				}
			}
		`)

	const exampleTemplate = path.resolve(`src/templates/exampleTemplate.tsx`)
	const docTemplate = path.resolve(`src/templates/docTemplate.tsx`)
	const result = await retrieveMarkdownPages()

	if (result.errors) {
		console.error('graphql error', result.errors)
		throw new Error('Error invoking graphql for pages')
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const {
			frontmatter: { path: pagePath },
		} = node
		const category = (pagePath || '/').split('/').filter(t => !!t)[0]
		const isExample = category === 'examples'
		console.log(`create page for ${pagePath} - type is ${category}`)
		actions.createPage({
			path: pagePath,
			component: isExample ? exampleTemplate : docTemplate,
			context: {}, // additional data can be passed via context
		})
	})
}

exports.createPages = createPages
