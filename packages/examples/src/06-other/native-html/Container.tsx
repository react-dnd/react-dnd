import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { HTMLContent } from './HTMLContent.js'
import { TargetBox } from './TargetBox.js'

export const Container: FC = () => {
	const [droppedHTML, setDroppedHTML] = useState<string>('')

	const handleHTMLDrop = useCallback(
		(item: { html: any }) => {
			if (item) {
				setDroppedHTML(item.html)
			}
		},
		[setDroppedHTML],
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
