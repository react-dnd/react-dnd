import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
	legacyMode?: boolean
}

const DebugModeFlag = ({ debugMode, legacyMode }: any) => {
	if (!debugMode && !legacyMode) {
		return null
	}

	let text = ''
	if (debugMode && legacyMode) {
		text = 'Debug Legacy.'
	} else if (debugMode) {
		text = 'Debug'
	} else if (legacyMode) {
		text = 'Legacy'
	}
	return (
		<a className="github-fork-ribbon" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

const Header: React.FC<HeaderProps> = ({ debugMode, legacyMode }) => (
	<Container>
		<DebugModeFlag debugMode={debugMode} legacyMode={legacyMode} />
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
