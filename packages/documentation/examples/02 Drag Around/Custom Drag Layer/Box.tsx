import React from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'

const styles = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export default class Box extends React.Component {
	public static propTypes = {
		title: PropTypes.string.isRequired,
		yellow: PropTypes.bool,
	}

	public shouldComponentUpdate = shouldPureComponentUpdate

	public render() {
		const { title, yellow } = this.props
		const backgroundColor = yellow ? 'yellow' : 'white'

		return <div style={{ ...styles, backgroundColor }}>{title}</div>
	}
}
