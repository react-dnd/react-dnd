import * as React from 'react'
import styled from 'styled-components'
import NavBar from './navbar'

export interface HeaderProps {
	debugMode?: boolean
}

const Header: React.SFC<HeaderProps> = ({ debugMode }) => (
	<Container>
		{debugMode ? (
			<a
				className="github-fork-ribbon"
				data-ribbon="Debug Mode"
				title="Debug Mode"
			>
				Fork me on GitHub
			</a>
		) : null}
		<NavBar />
	</Container>
)

export default Header

const Container = styled.header`
	overflow: hidden;
`
