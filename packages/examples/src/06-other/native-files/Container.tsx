import type { FC } from 'react'
import { useState, useCallback } from 'react'
import { TargetBox } from './TargetBox.js'
import { FileList } from './FileList.js'

export const Container: FC = () => {
	const [droppedFiles, setDroppedFiles] = useState<File[]>([])

	const handleFileDrop = useCallback(
		(item) => {
			if (item) {
				const files = item.files
				setDroppedFiles(files)
			}
		},
		[setDroppedFiles],
	)

	return (
		<>
			<TargetBox onDrop={handleFileDrop} />
			<FileList files={droppedFiles} />
		</>
	)
}
