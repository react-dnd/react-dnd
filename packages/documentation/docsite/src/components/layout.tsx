/* eslint-disable @typescript-eslint/no-var-requires */
declare const require: any

import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isDebugMode } from '../util/isDebugMode'
import { isTouchBackend } from '../util/isTouchBackend'
import { DndProvider } from 'react-dnd'
import { PageBody } from './pagebody'
import { Sidebar } from './sidebar'
import { PageGroup } from '../constants'
import { APIPages, ExamplePages } from '../constants'
import { Header } from './header'
import './layout.css'
import 'prismjs/themes/prism.css'

const favicon = require('../favicon.png')

export interface LayoutProps {
	location?: { pathname: string }
	hideSidebar?: boolean
}

const touchBackendOptions = { delay: 5 }
const HEADER_META = [
	{ name: 'description', content: 'Drag and Drop for React' },
	{ name: 'keywords', content: 'react, drag drop, html5' },
]
const HEADER_LINK = [
	{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
]

export const Layout: React.FC<LayoutProps> = memo(function Layout(props) {
	const { children, location } = props
	const sitepath = location && location.pathname
	const isExampleUrl = (sitepath || '')
		.replace('/react-dnd', '')
		.startsWith('/examples')
	const sidebarItems: PageGroup[] = isExampleUrl ? ExamplePages : APIPages
	const hideSidebar = props.hideSidebar || sitepath === '/about'
	const debugMode = isDebugMode()
	const touchBackend = isTouchBackend()
	return (
		<>
			<Helmet title="React DnD" meta={HEADER_META} link={HEADER_LINK}>
				<html lang="en" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.2/gh-fork-ribbon.min.css"
				/>
			</Helmet>
			<Header debugMode={debugMode} touchBackend={touchBackend} />
			<DndProvider
				backend={touchBackend ? TouchBackend : HTML5Backend}
				options={touchBackend ? touchBackendOptions : undefined}
				debugMode={debugMode}
			>
				<ContentContainer>
					<PageBody hasSidebar={sitepath !== '/about'}>
						{hideSidebar ? null : (
							<SidebarContainer>
								<Sidebar
									groups={sidebarItems}
									location={location ? location.pathname : '/'}
								/>
							</SidebarContainer>
						)}
						<ChildrenContainer>{children}</ChildrenContainer>
					</PageBody>
				</ContentContainer>
			</DndProvider>
		</>
	)
})

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
