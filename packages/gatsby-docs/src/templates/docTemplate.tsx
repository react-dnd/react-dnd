/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { graphql } from 'gatsby'
import Doc from '../components/doc'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

// tslint:disable-next-line
require('prismjs/themes/prism.css')

export default function Template(arg: any) {
  const { currentPage, toc } = arg.data

  return (
    <Layout
      title={currentPage.frontmatter.title}
      sidebar={<Sidebar activePath={arg.location.pathname} />}
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
