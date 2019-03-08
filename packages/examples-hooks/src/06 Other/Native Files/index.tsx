import React, { useState, useCallback } from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'
export interface ContainerState {
	droppedFiles: any[]
}
const Container: React.FC = () => {
	const [droppedFiles, setDroppedFiles] = useState([])
	const { FILE } = NativeTypes

	const handleFileDrop = useCallback(
		(item: any, monitor: DropTargetMonitor) => {
			if (monitor) {
				const files = monitor.getItem().files
				setDroppedFiles(files)
			}
		},
		[],
	)

	return (
		<>
			<h1>EXPERIMENTAL API</h1>
			<TargetBox accepts={[FILE]} onDrop={handleFileDrop} />
			<FileList files={droppedFiles} />
		</>
	)
}
export default Container
