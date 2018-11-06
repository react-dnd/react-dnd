import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Doc from '../components/doc'
import { ExamplePages } from '../constants'

// tslint:disable-next-line
require('prismjs/themes/prism-tomorrow.css')

export default function Template(props: any) {
	const { currentPage } = props.data

	return (
		<Layout {...props}>
			<Doc docPage={currentPage} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query($path: String!) {
		currentPage: markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			htmlAst
			frontmatter {
				path
				title
			}
		}

		toc: allMarkdownRemark(
			filter: { frontmatter: { path: { regex: "/^/documentation/.*/" } } }
		) {
			edges {
				node {
					frontmatter {
						title
						path
					}
				}
			}
		}
	}
`
