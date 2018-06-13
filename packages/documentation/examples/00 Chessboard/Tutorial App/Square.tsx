import React from 'react'

export interface SquareProps {
	black: boolean
	children: JSX.Element
}

export default class Square extends React.Component<SquareProps> {
	public render() {
		const { black } = this.props
		const backgroundColor = black ? 'black' : 'white'
		const color = black ? 'white' : 'black'

		return (
			<div
				style={{
					color,
					backgroundColor,
					width: '100%',
					height: '100%',
				}}
			>
				{this.props.children}
			</div>
		)
	}
}
