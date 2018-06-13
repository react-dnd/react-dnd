import * as React from 'react'

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
	public render() {
		const { title, yellow } = this.props
		const backgroundColor = yellow ? 'yellow' : 'white'

		return <div style={{ ...styles, backgroundColor }}>{title}</div>
	}
}
