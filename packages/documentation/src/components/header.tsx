import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
	experimentalMode?: boolean
}

const DebugModeFlag = ({ debugMode, experimentalMode }: any) => {
	if (!debugMode && !experimentalMode) {
		return null
	}

	let text = ''
	if (debugMode && experimentalMode) {
		text = 'Dbg Experimental.'
	} else if (debugMode) {
		text = 'Debug'
	} else if (experimentalMode) {
		text = 'Experimental'
	}
	return (
		<a className="github-fork-ribbon" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

const Header: React.FC<HeaderProps> = ({ debugMode, experimentalMode }) => (
	<Container>
		<DebugModeFlag debugMode={debugMode} experimentalMode={experimentalMode} />
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
