import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { FileList } from './FileList.js'
import { TargetBox } from './TargetBox.js'

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
