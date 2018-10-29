import * as React from 'react'
import styled from 'styled-components'

export default class Cover extends React.Component {
	public render() {
		return (
			<Container>
				<Header>
					<Description>Drag and Drop for React</Description>
				</Header>
			</Container>
		)
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	// background-color: @color-darkBlue;
	padding: 2em;
	overflow: hidden;
	top: 0;
	width: 100%;
	z-index: 1;
	border-bottom: inset 1px solid rgba(255, 255, 255, 0.1);
`

const Header = styled.div`
	margin: 6rem 0 3rem;
	text-align: center;
`

const Description = styled.p`
	margin: 0;
	font-size: 2.25em;
	line-height: 1.3;
`
