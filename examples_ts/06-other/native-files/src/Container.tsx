import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { FileList } from './FileList'
import { TargetBox } from './TargetBox'

export const Container: FC = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([])

  const handleFileDrop = useCallback(
    (item: { files: any[] }) => {
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
