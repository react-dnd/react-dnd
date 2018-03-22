import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	height: 100%;
	color: ${props => props.color};
	background-color: ${props => props.backgroundColor};
`

export default class Square extends Component {
	static propTypes = {
		black: PropTypes.bool,
		children: PropTypes.node,
	}

	render() {
		const { black } = this.props
		const backgroundColor = black ? 'black' : 'white'
		const color = black ? 'white' : 'black'

		return (
			<Container color={color} backgroundColor={backgroundColor}>
				{this.props.children}
			</Container>
		)
	}
}
