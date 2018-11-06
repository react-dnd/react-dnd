/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
const { graphql } = require('gatsby')
import Doc from '../components/doc'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { APIPages } from '../constants'

// tslint:disable-next-line
require('prismjs/themes/prism.css')

export default function Template(arg: any) {
	const { currentPage } = arg.data

	return (
		<Layout
			sidebar={
				<Sidebar groups={APIPages} location={currentPage.frontmatter.path} />
			}
		>
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
			filter: { frontmatter: { path: { regex: "/^/docs/.*/" } } }
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
