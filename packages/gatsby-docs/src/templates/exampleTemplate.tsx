/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Doc from '../components/doc'

// tslint:disable-next-line
require('prismjs/themes/prism-tomorrow.css')

export default function Template(arg: any) {
	const { currentPage } = arg.data

	return (
		<Layout sidebar={<Sidebar activePath={arg.location.pathname} />}>
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
