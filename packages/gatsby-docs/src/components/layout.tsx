// tslint:disable jsx-no-lambda
import * as React from 'react'
import Helmet from 'react-helmet'
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
				<div
					style={{
						margin: '0 auto',
						maxWidth: 960,
						padding: '0px 1.0875rem 1.45rem',
						paddingTop: 0,
					}}
				>
					{children}
				</div>
			</>
		)}
	/>
)
export default Layout
