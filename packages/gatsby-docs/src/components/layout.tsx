// tslint:disable jsx-no-lambda
import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const { StaticQuery, graphql } = require('gatsby')

import Header from './header'
import './layout.css'

export interface LayoutProps {
	sidebar: JSX.Element
}

const Layout: React.SFC<LayoutProps> = ({ children, sidebar }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={(data: any) => (
			<>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{ name: 'description', content: 'Sample' },
						{ name: 'keywords', content: 'sample, something' },
					]}
				>
					<html lang="en" />
				</Helmet>
				<Header />
				<ChildrenContainer>{children}</ChildrenContainer>
			</>
		)}
	/>
)

const ChildrenContainer = styled.div`
	margin: 0 auto;
	max-width: 960px;
	padding: 0 1.0875rem 1.45rem 0;
	height: 100%;
`

export default Layout
