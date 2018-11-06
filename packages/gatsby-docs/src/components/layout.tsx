// tslint:disable jsx-no-lambda
import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PageBody from './pagebody'
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
				<ChildrenContainer>
					<PageBody hasSidebar={true}>
						{sidebar}
						{children}
					</PageBody>
				</ChildrenContainer>
			</>
		)}
	/>
)

const ChildrenContainer = styled.div`
	margin: 0 auto;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
`

export default Layout
