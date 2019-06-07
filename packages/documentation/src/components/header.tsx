import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
	hooksMode?: boolean
}

const DebugModeFlag = ({ debugMode, hooksMode }: any) => {
	if (!debugMode && !hooksMode) {
		return null
	}

	let text = ''
	if (debugMode && hooksMode) {
		text = 'Debug Hooks.'
	} else if (debugMode) {
		text = 'Debug'
	} else if (hooksMode) {
		text = 'Hooks'
	}
	return (
		<a className="github-fork-ribbon" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

const Header: React.FC<HeaderProps> = ({ debugMode, hooksMode }) => (
	<Container>
		<DebugModeFlag debugMode={debugMode} hooksMode={hooksMode} />
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
