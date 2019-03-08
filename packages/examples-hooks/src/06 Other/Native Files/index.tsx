import React from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'

export interface ContainerState {
	droppedFiles: any[]
}

export default class Container extends React.Component<{}, ContainerState> {
	public state = { droppedFiles: [] }

	public render() {
		const { FILE } = NativeTypes
		const { droppedFiles } = this.state

		return (
			<>
				<TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
				<FileList files={droppedFiles} />
			</>
		)
	}

	private handleFileDrop = (item: any, monitor: DropTargetMonitor) => {
		if (monitor) {
			const droppedFiles = monitor.getItem().files
			this.setState({ droppedFiles })
		}
	}
}
