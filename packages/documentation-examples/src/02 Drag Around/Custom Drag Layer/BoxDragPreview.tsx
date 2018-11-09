import * as React from 'react'
import Box from './Box'

const styles = {
	display: 'inline-block',
	transform: 'rotate(-7deg)',
	WebkitTransform: 'rotate(-7deg)',
}

export interface BoxDragPreviewProps {
	title: string
}

export interface BoxDragPreviewState {
	tickTock: any
}

export default class BoxDragPreview extends React.PureComponent<
	BoxDragPreviewProps,
	BoxDragPreviewState
> {
	public state = {
		tickTock: false,
	}
	private interval: any

	public componentDidMount() {
		this.interval = setInterval(this.tick, 500)
	}

	public componentWillUnmount() {
		clearInterval(this.interval)
	}

	public render() {
		const { title } = this.props
		const { tickTock } = this.state

		return (
			<div style={styles}>
				<Box title={title} yellow={tickTock} />
			</div>
		)
	}

	private tick = () => {
		this.setState({
			tickTock: !this.state.tickTock,
		})
	}
}
