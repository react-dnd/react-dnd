// tslint:disable jsx-no-lambda
import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import PageBody from './pagebody'
import Sidebar from './sidebar'
import { PageGroup } from '../constants'
import { APIPages, ExamplePages } from '../constants'
import Header from './header'
import './layout.css'
require('prismjs/themes/prism.css')
const favicon = require('../favicon.png')

export interface LayoutProps {
	location?: { pathname: string }
	hideSidebar?: boolean
}

const Layout: React.SFC<LayoutProps> = props => {
	const { children, location } = props
	const sitepath = location && location.pathname
	const isExampleUrl = (sitepath || '')
		.replace('/react-dnd', '')
		.startsWith('/examples')
	const sidebarItems: PageGroup[] = isExampleUrl ? ExamplePages : APIPages
	const hideSidebar = props.hideSidebar || sitepath === '/about'
	return (
		<>
			<Helmet
				title="React DnD"
				meta={[
					{ name: 'description', content: 'Drag and Drop for React' },
					{ name: 'keywords', content: 'react, drag drop, html5' },
				]}
				link={[{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }]}
			>
				<html lang="en" />
			</Helmet>
			<Header />
			<DragDropContextProvider backend={HTML5Backend}>
				<ContentContainer>
					<PageBody hasSidebar={sitepath !== '/about'}>
						{hideSidebar ? null : (
							<SidebarContainer>
								<Sidebar
									groups={sidebarItems}
									location={location && location.pathname}
								/>
							</SidebarContainer>
						)}
						<ChildrenContainer>{children}</ChildrenContainer>
					</PageBody>
				</ContentContainer>
			</DragDropContextProvider>
		</>
	)
}

const SidebarContainer = styled.div`
	flex: 1;
`
const ChildrenContainer = styled.div`
	flex: 4;
`

const ContentContainer = styled.div`
	margin: 0;
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: row;
`

export default Layout
