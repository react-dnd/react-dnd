import React, { useContext, useState } from 'react'
import { DndContext } from 'react-dnd'

export function Profiler() {
	const dndContext = useContext(DndContext)
	const backend = dndContext?.dragDropManager?.getBackend()
	const [key, setKey] = useState(0)

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setKey(Math.random())
		}, 100)
		return () => clearTimeout(timeout)
	})

	return (
		<div key={key}>
			Previews in memory: {(backend as any)?.sourcePreviewNodes?.size}
		</div>
	)
}
