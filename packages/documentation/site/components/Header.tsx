import * as React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'

export default class Header extends React.Component {
	public render() {
		return (
			<Container>
				<NavBar />
			</Container>
		)
	}
}

const Container = styled.header`
	overflow: hidden;
`
