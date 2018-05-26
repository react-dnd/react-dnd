import React from 'react'
import PropTypes from 'prop-types'

const styles: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export interface BoxProps {
	title: string
	yellow?: boolean
}

export default class Box extends React.PureComponent<BoxProps> {
	public static propTypes = {
		title: PropTypes.string.isRequired,
		yellow: PropTypes.bool,
	}

	public render() {
		const { title, yellow } = this.props
		const backgroundColor = yellow ? 'yellow' : 'white'

		return <div style={{ ...styles, backgroundColor }}>{title}</div>
	}
}
