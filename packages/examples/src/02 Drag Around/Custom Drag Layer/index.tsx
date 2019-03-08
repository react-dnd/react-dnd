import React from 'react'
import Container from './Container'
import CustomDragLayer from './CustomDragLayer'

export interface DragAroundCustomDragLayerState {
	snapToGridAfterDrop: boolean
	snapToGridWhileDragging: boolean
}
export default class DragAroundCustomDragLayer extends React.Component<
	{},
	DragAroundCustomDragLayerState
> {
	public state = {
		snapToGridAfterDrop: false,
		snapToGridWhileDragging: false,
	}

	public render() {
		const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state

		return (
			<div>
				<Container snapToGrid={snapToGridAfterDrop} />
				<CustomDragLayer snapToGrid={snapToGridWhileDragging} />
				<p>
					<label htmlFor="snapToGridWhileDragging">
						<input
							id="snapToGridWhileDragging"
							type="checkbox"
							checked={snapToGridWhileDragging}
							onChange={this.handleSnapToGridWhileDraggingChange}
						/>
						<small>Snap to grid while dragging</small>
					</label>
					<br />
					<label htmlFor="snapToGridAfterDrop">
						<input
							id="snapToGridAfterDrop"
							type="checkbox"
							checked={snapToGridAfterDrop}
							onChange={this.handleSnapToGridAfterDropChange}
						/>
						<small>Snap to grid after drop</small>
					</label>
				</p>
			</div>
		)
	}

	private handleSnapToGridAfterDropChange = () => {
		this.setState({
			snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
		})
	}

	private handleSnapToGridWhileDraggingChange = () => {
		this.setState({
			snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
		})
	}
}
