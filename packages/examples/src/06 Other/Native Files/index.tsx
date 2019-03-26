import React, { useState, useMemo } from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'

const { FILE } = NativeTypes

export interface ContainerState {
	droppedFiles: any[]
}

const Container: React.FC = () => {
	const [droppedFiles, setDroppedFiles] = useState<any[]>([])
	const accepts = useMemo(() => [FILE], [])
	const handleFileDrop = (item: any, monitor: DropTargetMonitor) => {
		if (monitor) {
			setDroppedFiles(monitor.getItem().files)
		}
	}
	return (
		<>
			<TargetBox accepts={accepts} onDrop={handleFileDrop} />
			<FileList files={droppedFiles} />
		</>
	)
}

export default Container
