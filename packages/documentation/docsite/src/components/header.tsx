import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
	touchBackend?: boolean
}

const DebugModeFlag: React.FC<HeaderProps> = ({ debugMode, touchBackend }) => {
	if (!debugMode && !touchBackend) {
		return null
	}

	let text = ''
	if (debugMode && touchBackend) {
		text = 'Debug Touch'
	} else if (touchBackend) {
		text = 'Touch Backend'
	} else if (debugMode) {
		text = 'Debug'
	}
	return (
		<a className="github-fork-ribbon" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

const Header: React.FC<HeaderProps> = props => (
	<Container>
		<DebugModeFlag {...props} />
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
