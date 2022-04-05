import type { CSSProperties, FC } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

export interface TargetBoxProps {
  onDrop: (item: { files: any[] }) => void
}

export const TargetBox: FC<TargetBoxProps> = (props) => {
  const { onDrop } = props
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        if (onDrop) {
          onDrop(item)
        }
      },
      canDrop(item: any) {
        console.log('canDrop', item.files, item.items)
        return true
      },
      hover(item: any) {
        console.log('hover', item.files, item.items)
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item) {
          console.log('collect', item.files, item.items)
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [props],
  )

  const isActive = canDrop && isOver
  return (
    <div ref={drop} style={style}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  )
}
