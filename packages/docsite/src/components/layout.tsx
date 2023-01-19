/* eslint-disable @typescript-eslint/no-var-requires */
import './layout.css'
import 'prismjs/themes/prism.css'

import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend, TouchBackendOptions } from 'react-dnd-touch-backend'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import type { PageGroup } from '../constants'
import { APIPages, ExamplePages } from '../constants'
import { isDebugMode } from '../util/isDebugMode'
import { isTouchBackend } from '../util/isTouchBackend'
import { Header } from './header'
import { PageBody } from './pagebody'
import { Sidebar } from './sidebar'

declare const require: any

const favicon = require('../favicon.png')

export interface LayoutProps {
	location?: { pathname: string }
	hideSidebar?: boolean
	children?: ReactNode
}

const touchBackendOptions: Partial<TouchBackendOptions> = {
	delay: 5,
	enableMouseEvents: true,
	enableTouchEvents: true,
}
const HEADER_META = [
	{ name: 'description', content: 'Drag and Drop for React' },
	{ name: 'keywords', content: 'react, drag drop, html5' },
]
const HEADER_LINK = [
	{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
]

export const Layout: FC<LayoutProps> = memo(function Layout(props) {
	const { children, location } = props
	const sitepath = location?.pathname
	const isExampleUrl = (sitepath || '')
		.replace('/react-dnd', '')
		.startsWith('/examples')
	const sidebarItems: PageGroup[] = isExampleUrl ? ExamplePages : APIPages
	const hideSidebar = props.hideSidebar || sitepath === '/about'
	const debugMode = isDebugMode()
	const touchBackend = isTouchBackend()
	const [dndArea, setDndArea] = useState<HTMLDivElement | null>(null)
	const html5Options = useMemo(() => ({ rootElement: dndArea }), [dndArea])

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
					<ChildrenContainer
						ref={useCallback((node: HTMLDivElement) => setDndArea(node), [])}
					>
						{dndArea == null ? null : (
							<DndProvider
								backend={touchBackend ? TouchBackend : HTML5Backend}
								options={touchBackend ? touchBackendOptions : html5Options}
								debugMode={debugMode}
							>
								{children}
							</DndProvider>
						)}
					</ChildrenContainer>
				</PageBody>
			</ContentContainer>
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
