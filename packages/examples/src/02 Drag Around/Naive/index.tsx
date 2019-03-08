import React from 'react'
import Container from './Container'

export interface DragAroundNaiveState {
	hideSourceOnDrag: boolean
}

export default class DragAroundNaive extends React.Component<
	{},
	DragAroundNaiveState
> {
	public state = {
		hideSourceOnDrag: true,
	}

	public render() {
		const { hideSourceOnDrag } = this.state

		return (
			<div>
				<Container hideSourceOnDrag={hideSourceOnDrag} />
				<p>
					<label htmlFor="hideSourceOnDrag">
						<input
							id="hideSourceOnDrag"
							type="checkbox"
							checked={hideSourceOnDrag}
							onChange={this.handleHideSourceClick}
						/>
						<small>Hide the source item while dragging</small>
					</label>
				</p>
			</div>
		)
	}

	private handleHideSourceClick = () => {
		this.setState({
			hideSourceOnDrag: !this.state.hideSourceOnDrag,
		})
	}
}
