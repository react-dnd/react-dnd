import * as React from 'react'
import {
	DragDropContext,
	DragDropContextProvider,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'

export interface ContainerState {
	droppedFiles: any[]
}

@DragDropContext(HTML5Backend)
export default class Container extends React.Component<{}, ContainerState> {
	constructor(props: {}) {
		super(props)
		this.handleFileDrop = this.handleFileDrop.bind(this)
		this.state = { droppedFiles: [] }
	}

	public render() {
		const { FILE } = NativeTypes
		const { droppedFiles } = this.state

		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div>
					<TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
					<FileList files={droppedFiles} />
				</div>
			</DragDropContextProvider>
		)
	}

	private handleFileDrop(item: any, monitor: DropTargetMonitor) {
		if (monitor) {
			const droppedFiles = monitor.getItem().files
			this.setState({ droppedFiles })
		}
	}
}
