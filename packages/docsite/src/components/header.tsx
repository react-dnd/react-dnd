import { FC, memo } from 'react'
import styled from 'styled-components'

import { NavBar } from './navbar'

export interface HeaderProps {
	debugMode?: boolean
	touchBackend?: boolean
}

const DebugModeFlag: FC<HeaderProps> = ({ debugMode, touchBackend }) => {
	if (!(debugMode || touchBackend)) {
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
		<a className="github-fork-ribbon" href="/" data-ribbon={text} title={text}>
			{text}
		</a>
	)
}

export const Header: FC<HeaderProps> = memo(function Header(props) {
	return (
		<Container>
			<DebugModeFlag {...props} />
			<NavBar />
		</Container>
	)
})
const Container = styled.header`
	overflow: hidden;
`
