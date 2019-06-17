import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
}

const DebugModeFlag = ({ debugMode }: any) => {
	if (!debugMode) {
		return null
	}

	const text = debugMode ? 'Debug' : ''
	return (
		<a className="github-fork-ribbon" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

const Header: React.FC<HeaderProps> = ({ debugMode }) => (
	<Container>
		<DebugModeFlag debugMode={debugMode} />
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
