import { FC } from 'react'
import { useState, useCallback } from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { TargetBox } from './TargetBox'
import { HTMLContent } from './HTMLContent'

export const Container: FC = () => {
	const [droppedHTML, setDroppedHTML] = useState<string>('')

	const handleHTMLDrop = useCallback(
		(item: any, monitor: DropTargetMonitor) => {
			if (monitor) {
				const html = monitor.getItem().html
				setDroppedHTML(html)
			}
		},
		[],
	)

	return (
		<>
			<iframe
				srcDoc={`<img src='https://react-dnd.github.io/react-dnd/favicon-32x32.png' />`}
			/>
			<TargetBox onDrop={handleHTMLDrop} />
			<HTMLContent html={droppedHTML} />
		</>
	)
}
